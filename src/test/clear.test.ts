import { Client } from '@/client'

import optimizationTask from './test-data/optimization-task.json'


describe('clear', () => {
  const brokerAddress = process.env.BROKER_ADDRESS ?? 'localhost:50051'
  const client = new Client(brokerAddress)

  it('should return empty tasks after clearing', async () => {
    await client.solve({ optimizationTask })

    await client.clear()

    const tasks = await client.tasks()

    expect(tasks.tasks.length).toBe(0)
  })
})
