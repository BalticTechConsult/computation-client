import { Client } from '@/client'
import { isServiceError } from '@/helpers'


export async function clearCommand(brokerAddress: string) {
  const client = new Client(brokerAddress)

  try {
    const message = await client.clear()
    console.log('Clear response:', message)
  } catch (error) {
    console.error('Error clearing broker:')

    if (isServiceError(error)) {
      console.error(`  Error Code: ${error.code}`)
      console.error(`  Error Message: ${error.message}`)
    } else {
      console.error('Unknown error:', error)
    }
    console.error(`  Address: ${brokerAddress}`)
    console.error(`  Timestamp: ${new Date().toISOString()}`)
  }

}
