import 'reflect-metadata'

import { ComputationService } from '@/services'
import { eProtocolVersion, isProtocolVersion } from '@/consts'
import { iTask } from '@/models'


describe('testing ComputationService', () => {
  const protocolVersion = Number(process.env.SOCKET_PROTOCOL_VERSION)

  const service = new ComputationService({
    hostname: process.env.SOCKET_HOST || 'localhost',
    port: Number(process.env.SOCKET_PORT) || 8000,
    path: process.env.SOCKET_PATH || '/broadcasting',
    protocolVersion: isProtocolVersion(protocolVersion) ? protocolVersion : eProtocolVersion.TWO,
  })

  const task: iTask = {
    version: 1,
    settings: {
      maxPir: 10,
      minPir: 1,
      routes: 1,
    },
    matrix: {
      values: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
    },
    priority: {
      list: [1, 0, -1],
    }
  }

  test('connection to computation service', async () => {
    await service.connect()

    expect(service.isConnected()).toBe(true)
  })

  test('task registration', async () => {
    let taskId: string = ''

    try {
      taskId = await service.registerTask(task)
    } catch (error) {
      expect(error).toBe(null)
    }

    try {
      await service.unregisterTask(taskId)
    } catch (error) {
      console.error(error)
      expect(error).toBe(null)
    }

    expect(taskId).not.toBe('')
  })


  test('disconnection from computation service', async () => {
    service.disconnect()

    expect(service.isConnected()).toBe(false)
  })
})
