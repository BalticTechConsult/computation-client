import { Client } from '@/client'
import { isServiceError } from '@/helpers'


export async function deleteCommand(
  brokerAddress: string,
  taskId: string,
  certPath: string,
  keyPath: string,
) {
  const client = new Client(brokerAddress, certPath, keyPath)

  try {
    const responseMessage = await client.delete(taskId)
    console.log('Broker response:', responseMessage)
  } catch (error) {
    console.error('Error deleting task:')

    if (isServiceError(error)) {
      console.error(`  Error Code: ${error.code}`)
      console.error(`  Error Message: ${error.message}`)
    }

    console.error(`  Address: ${brokerAddress}`)
    console.error(`  Timestamp: ${new Date().toISOString()}`)
  }
}
