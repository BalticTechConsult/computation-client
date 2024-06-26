import { Client } from '@/client'
import { isServiceError } from '@/helpers'


export async function tasksCommand(brokerAddress: string) {
  const client = new Client(brokerAddress)
  try {
    const response = await client.tasks()
    console.log('Tasks response:', JSON.stringify(response.tasks, null, 2))
  } catch (error) {
    console.error('Error getting tasks:')

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
