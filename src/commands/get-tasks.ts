import { Client } from '@client'
import { ServiceError } from '@grpc/grpc-js'


const isServiceError = (error: unknown): error is ServiceError => {
  return typeof error === 'object' && error !== null && 'code' in error && 'message' in error
}

export async function getTasksCommand(brokerAddress: string) {
  const client = new Client(brokerAddress)
  try {
    const response = await client.getTasks()
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
