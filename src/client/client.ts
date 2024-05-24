import { ChannelCredentials } from '@grpc/grpc-js'

import { Empty } from './proto/google/protobuf/empty'
import { BrokerClient, PingResponse, TaskOrOptimizationTask, TaskIdResponse, TaskIdRequest, DeleteResponse } from './proto/service';


export class Client {
  private client: BrokerClient

  constructor(address: string) {
    this.client = new BrokerClient(address, ChannelCredentials.createInsecure())
  }

  public async ping(): Promise<string> {
    const request = Empty.create();

    return new Promise((resolve, reject) => {
      this.client.ping(request, (error, response) => {
        if (error) {
          return reject(error);
        }
        resolve(response.message);
      });
    });
  }

  public async solve(task: TaskOrOptimizationTask): Promise<string> {
    return new Promise((resolve, reject) => {
      this.client.solve(task, (error, response) => {
        if (error) {
          return reject(error);
        }
        resolve(response.id);
      });
    });
  }

  public async delete(taskId: string): Promise<string> {
    const request = TaskIdRequest.create({ id: taskId });

    return new Promise((resolve, reject) => {
      this.client.delete(request, (error, response) => {
        if (error) {
          return reject(error);
        }
        resolve(response.message);
      });
    });
  }
}
