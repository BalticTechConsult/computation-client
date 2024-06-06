import { readFileSync } from 'fs'

import { OptimizationTask, TaskOrOptimizationTask } from '@/client/proto/service'
import { Client } from '@/client'
import { isServiceError } from '@/helpers'


const isOptimizationTask = (task: any): task is OptimizationTask => {
  return 'routes' in task
}

const loadTaskFromFile = (filePath: string): TaskOrOptimizationTask => {
  const data = readFileSync(filePath, 'utf-8')
  const json = JSON.parse(data)

  if (isOptimizationTask(json)) {
    return { optimizationTask: json }
  } else {
    return { task: json }
  }
}

export async function solveCommand(brokerAddress: string, filePath: string) {
  const client = new Client(brokerAddress)
  try {
    const task = loadTaskFromFile(filePath)
    const taskId = await client.solve(task)

    console.log('Task has been successfully submitted. Task ID: ', taskId)
  } catch (error) {
    console.error('Error submitting task:')

    if (isServiceError(error)) {
      console.error(`  Error Code: ${error.code}`)
      console.error(`  Error Message: ${error.message}`)
    }
    console.error(`  Address: ${brokerAddress}`)
    console.error(`  Timestamp: ${new Date().toISOString()}`)
  }
}
