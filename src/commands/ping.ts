import { ServiceError } from '@grpc/grpc-js'

import { Client } from '@client'


const isServiceError = (error: unknown): error is ServiceError => {
  return typeof error === 'object' && error !== null && 'code' in error && 'message' in error
}

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
    } else if (error instanceof Error) {
      console.error(`  Error Message: ${error.message}`)
    } else {
      console.error(`  Unknown Error: ${error}`)
    }

    console.error(`  Address: ${brokerAddress}`)
    console.error(`  Timestamp: ${new Date().toISOString()}`)
  }
}
