import { Client } from '@/client'

import task from './test-data/task.json'
import optimizationTask from './test-data/optimization-task.json'


describe('tasks', () => {
  const brokerAddress = process.env.BROKER_ADDRESS ?? 'localhost:50051'
  const client = new Client(brokerAddress)

  it('should have a non-empty list of tasks after adding one', async () => {
    await client.solve({ task })
    await client.solve({ optimizationTask })

    const tasks = await client.tasks()

    expect(tasks.tasks.length).toBeGreaterThan(0)

    await client.clear()
  })
})
