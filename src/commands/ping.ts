import { Client } from '@/client'
import { isServiceError } from '@/helpers'


export async function pingCommand(brokerAddress: string) {
  const client = new Client(brokerAddress)

  try {
    const message = await client.ping()
    console.log('Ping response:', message)
    console.log('Broker is alive and well.')
  } catch (error) {
    console.error('Broker is unavailable:')

    if (isServiceError(error)) {
      console.error(`  Error Code: ${error.code}`)
      console.error(`  Error Message: ${error.message}`)
    }

    console.error(`  Address: ${brokerAddress}`)
    console.error(`  Timestamp: ${new Date().toISOString()}`)
  }
}
