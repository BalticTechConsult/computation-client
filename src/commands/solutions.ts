import { Client } from '@/client'
import { isServiceError } from '@/helpers'


export async function solutionsCommand(brokerAddress: string, taskId: string) {
  const client = new Client(brokerAddress)
  try {
    const response = await client.solutions(taskId)
    console.log('Solutions response:', JSON.stringify(response.solutions, null, 2))
  } catch (error) {
    console.error('Error getting solutions:')

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
