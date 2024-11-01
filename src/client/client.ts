import { credentials } from '@grpc/grpc-js'
import { readFileSync } from 'fs'

import { Empty } from './proto/google/protobuf/empty'
import {
  BrokerClient,
  ConnectionsResponse,
  SolutionsRequest,
  SolutionsResponse,
  TaskIdRequest,
  TaskOrOptimizationTask,
  TasksResponse
} from './proto/service'


export class Client {
  private client: BrokerClient

  constructor(
    address: string,
    certPath: string,
    keyPath: string,
  ) {
    const clientCert = readFileSync(certPath)
    const clientKey = readFileSync(keyPath)

    const creds = credentials.createSsl(
      null, // не проверяем сертификат брокера
      clientKey,
      clientCert,
      {
        rejectUnauthorized: false,
      }
    )

    this.client = new BrokerClient(address, creds)
  }

  public async ping(): Promise<string> {
    const request = Empty.create()

    return new Promise((resolve, reject) => {
      this.client.ping(request, (error, response) => {
        if (error) {
          return reject(error)
        }
        resolve(response.message)
      })
    })
  }

  public async solve(task: TaskOrOptimizationTask): Promise<string> {
    return new Promise((resolve, reject) => {
      this.client.solve(task, (error, response) => {
        if (error) {
          return reject(error)
        }
        resolve(response.id)
      })
    })
  }

  public async delete(taskId: string): Promise<string> {
    const request = TaskIdRequest.create({ id: taskId })

    return new Promise((resolve, reject) => {
      this.client.delete(request, (error, response) => {
        if (error) {
          return reject(error)
        }
        resolve(response.message)
      })
    })
  }

  public async clear(): Promise<string> {
    const request = Empty.create()

    return new Promise((resolve, reject) => {
      this.client.clear(request, (error, response) => {
        if (error) {
          return reject(error)
        }
        resolve(response.message)
      })
    })
  }

  public async tasks(): Promise<TasksResponse> {
    const request = Empty.create()

    return new Promise((resolve, reject) => {
      this.client.getTasks(request, (error, response) => {
        if (error) {
          return reject(error)
        }
        resolve(response)
      })
    })
  }

  public async solutions(taskId: string): Promise<SolutionsResponse> {
    const request = SolutionsRequest.create({ id: taskId })

    return new Promise((resolve, reject) => {
      this.client.getSolutions(request, (error, response) => {
        if (error) {
          return reject(error)
        }
        resolve(response)
      })
    })
  }

  public async connections(): Promise<ConnectionsResponse> {
    const request = Empty.create()

    return new Promise((resolve, reject) => {
      this.client.getConnections(request, (error, response) => {
        if (error) {
          return reject(error)
        }
        resolve(response)
      })
    })
  }
}
