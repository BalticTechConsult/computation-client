import { Client } from '@client'
import { ServiceError } from '@grpc/grpc-js'

const isServiceError = (error: unknown): error is ServiceError => {
  return typeof error === 'object' && error !== null && 'code' in error && 'message' in error
}

export async function connectionsCommand(brokerAddress: string) {
  const client = new Client(brokerAddress)
  try {
    const response = await client.getConnections()
    console.log('Connections response:', JSON.stringify(response.connections, null, 2))
    console.log('Current time:', response.currentTime)
  } catch (error) {
    console.error('Error getting connections:')

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
