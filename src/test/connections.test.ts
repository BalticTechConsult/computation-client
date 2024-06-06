import { Client } from '@/client'


describe('connections', () => {
  const brokerAddress = process.env.BROKER_ADDRESS ?? 'localhost:50051'
  const client = new Client(brokerAddress)

  it('should return list of connections', async () => {
    const connections = await client.connections()

    expect(connections.connections.length).toBeGreaterThan(0)
    expect(connections.currentTime).toBeDefined()
  })
})
