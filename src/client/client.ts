import { ChannelCredentials } from '@grpc/grpc-js'

import { Empty } from './proto/google/protobuf/empty'
import { BrokerClient } from './proto/service'


export class Client {
  private client: BrokerClient

  constructor(address: string) {
    this.client = new BrokerClient(address, ChannelCredentials.createInsecure())
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
}
