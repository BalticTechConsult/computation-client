import { Client } from '@/client'

import task from './test-data/task.json'


describe('solutions', () => {
  const brokerAddress = process.env.BROKER_ADDRESS ?? 'localhost:50051'
  const client = new Client(brokerAddress)

  it('should have a list of solutions', async () => {
    const id = await client.solve({ task })

    await new Promise(resolve => setTimeout(resolve, 5000))

    const solutions = await client.solutions(id)

    expect(solutions.solutions.length).toBeGreaterThan(0)

    await client.clear()
  }, 10000)
})
