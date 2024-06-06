import { Client } from '@/client'

import task from './test-data/task.json'
import optimizationTask from './test-data/optimization-task.json'


describe('delete', () => {
  const brokerAddress = process.env.BROKER_ADDRESS ?? 'localhost:50051'
  const client = new Client(brokerAddress)

  it('should be deleted from the list of tasks', async () => {
    const id = await client.solve({ task })
    await client.solve({ optimizationTask })

    const tasks = await client.tasks()

    expect(tasks.tasks.some(task => task.id === id)).toBeTruthy()

    await client.delete(id)
    const updatedTasks = await client.tasks()

    expect(updatedTasks.tasks.some(task => task.id === id)).toBeFalsy()
    await client.clear()
  })
})
