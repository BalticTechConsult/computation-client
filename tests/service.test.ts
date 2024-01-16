import 'reflect-metadata'

import { ComputationClient } from '@/index'
import { eProtocolVersion, isProtocolVersion } from '@/consts'
import { iTask } from '@/models'
import { readFileSync } from 'node:fs'


const nop = (delay: number = 1000): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, delay)
  })
}

describe('testing ComputationService', () => {
  const protocolVersion = Number(process.env.SOCKET_PROTOCOL_VERSION)

  const service = new ComputationClient({
    hostname: process.env.SOCKET_HOST || 'localhost',
    port: Number(process.env.SOCKET_PORT) || 8000,
    path: process.env.SOCKET_PATH || '/broadcasting',
    protocolVersion: isProtocolVersion(protocolVersion) ? protocolVersion : eProtocolVersion.TWO,
  })

  const filename = __dirname + '/test-data/matrix-1.json'
  const matrix1: number[][] = JSON.parse(readFileSync(filename, 'utf8'))
  const priority: number[] = Array.from({ length: matrix1.length }, () => 0)

  const task: iTask = {
    version: 1,
    settings: {
      maxPir: 10,
      minPir: 1,
      routes: 1,
    },
    matrix: {
      values: matrix1,
    },
    priority: {
      list: priority,
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

    // wait for task to be processed
    await nop(4000)

    try {
      const solutions = await service.getTopSolutions(taskId)

      expect(Array.isArray(solutions)).toBe(true)
    } catch (error) {
      expect(error).toBe(null)
    }

    try {
      await service.unregisterTask(taskId)
    } catch (error) {
      expect(error).toBe(null)
    }

    expect(taskId).not.toBe('')
    expect(typeof taskId).toBe('string')
  })


  test('disconnection from computation service', async () => {
    service.disconnect()

    expect(service.isConnected()).toBe(false)
  })
})
