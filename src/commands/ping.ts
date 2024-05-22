import { Client } from '@client'

export async function pingCommand() {
  const client = new Client()
  try {
    const message = await client.ping()
    console.log('Ping response:', message)
    console.log('Broker is alive and well.')
  } catch (error) {
    if (error instanceof Error) {
      console.error('Broker is unavailable:', error.message)
    } else {
      console.error('Broker is unavailable:', error)
    }
  }
}
