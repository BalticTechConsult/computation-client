import 'reflect-metadata'
import { readFileSync } from 'node:fs'

import { ComputationClient, eTaskType, OptimizationTask, Solution, Task } from '@/index'
import { eProtocolVersion, isProtocolVersion } from '@/consts'


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
  let solutions: Solution[] = []

  const task = Task.fromPlain({
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
    },
    taskType: eTaskType.TASK,
    version: 1,
  })

  test('connection to computation service', async () => {
    await service.connect()

    expect(service.isConnected()).toBe(true)
  })

  let taskId: string = ''
  let optimizationTaskId: string = ''

  test('task registration', async () => {
    try {
      taskId = await service.registerTask(task)

      // wait for tasks to be processed
      await nop(1000)
    } catch (error) {
      expect(error).toBe(null)
    }
  })

  test('get task solutions', async () => {
    try {
      solutions = await service.getSolutions(taskId)

      expect(solutions.length).toBeGreaterThan(0)
    } catch (error) {
      expect(error).toBe(null)
    }
  })

  test('optimization task registration', async () => {
    try {
      const optimizationTask = OptimizationTask.fromPlain({
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
        },
        routes: solutions[0].solution,
        taskType: eTaskType.OPTIMIZATION_TASK,
        version: 1,
      })

      optimizationTaskId = await service.registerTask(optimizationTask)

      // wait for tasks to be processed
      await nop(1000)
    } catch (error) {
      expect(error).toBe(null)
    }
  })


  test('get optimization task solutions', async () => {
    try {
      solutions = await service.getSolutions(optimizationTaskId)

      expect(solutions.length).toBeGreaterThan(0)
    } catch (error) {
      expect(error).toBe(null)
    }
  })

  test('task unregistration', async () => {
    try {
      await service.unregisterTask(taskId)
    } catch (error) {
      expect(error).toBe(null)
    }

    expect(taskId).not.toBe('')
  })

  test('optimization task unregistration', async () => {
    try {
      await service.unregisterTask(optimizationTaskId)
    } catch (error) {
      expect(error).toBe(null)
    }

    expect(optimizationTaskId).not.toBe('')
  })

  test('disconnection from computation service', async () => {
    service.disconnect()

    expect(service.isConnected()).toBe(false)
  })
})
