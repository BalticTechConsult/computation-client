import { grpc } from '@improbable-eng/grpc-web'
import { Empty } from 'google-protobuf/google/protobuf/empty_pb'

import { BrokerClient  } from './proto'

export class Client {
  private client: BrokerClient

  constructor(host: string, port: number) {
    this.client = new BrokerClient(`${host}:${port}`)
  }

  public async ping(): Promise<string> {
    const request = new Empty()
    const metadata = new grpc.Metadata()

    return new Promise((resolve, reject) => {
      this.client.ping(request, metadata, (error, responseMessage) => {
        if (error) {
          return reject(error)
        }

        if (responseMessage === null) {
          return reject(new Error('Response is null'))
        }

        resolve(responseMessage.getMessage())
      })
    })
  }
}
