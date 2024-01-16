import { AGClientSocket, create } from 'socketcluster-client'

import { iConnectionParams, ConnectionParams, Task, iTask, Solution } from '@/models'
import { eRPC } from '@/consts'


/**
* Computation client.
*/
export class ComputationClient {
  /**
  * Connection parameters.
  * @type {ConnectionParams}
  * @private
  */
  private readonly params: ConnectionParams

  /**
  * Socket.
  * @type {AGClientSocket}
  * @private
  */
  private readonly socket: AGClientSocket = create()

  /**
  * Constructor
  * @param {iConnectionParams} params - Connection parameters.
  * @constructor
  */
  constructor(params: iConnectionParams) {
    this.params = ConnectionParams.fromPlain(params)

    ConnectionParams.validate(this.params)
  }

  /**
  * Check if connected to computation broker.
  * @returns {boolean}
  */
  isConnected = (): boolean => this.socket.state === this.socket.OPEN

  /**
  * Connect to computation broker.
  * @returns {Promise<boolean>}
  */
  async connect(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const { hostname, port, path, protocolVersion, logs } = this.params

      setTimeout(() => {
        logs && console.error('Failed to connect to computation broker.')

        reject('Failed to connect to computation broker.')
      }, 10000)

      ;(async () => {
        for await (let status of this.socket.listener('connect')) {
          if (this.isConnected()) {
            logs && console.log('Connected to computation broker.')

            resolve(true)
            break
          }
        }
      })()

      this.socket.connect({
        path,
        port,
        hostname,
        protocolVersion,
        autoConnect: true,
        secure: false,
        connectTimeout: 10000,
        ackTimeout: 10000,
        channelPrefix: null,
        autoReconnectOptions: {
          initialDelay: 10000,
          randomness: 10000,
          multiplier: 1.5,
          maxDelay: 60000
        },
      })
    })
  }

  /**
  * Disconnect from computation broker.
  * @returns {void}
  */
  disconnect = (): void => {
    this.socket.disconnect()
  }

  /**
  * Register task.
  * @param {iTask|Task} task - Task.
  * @returns {Promise<string | never>} - Task id.
  * @throws {Error}
  */
  registerTask = async (task: iTask | Task): Promise<string | never> => {
    return await this.socket.invoke(eRPC.REGISTER_TASK, task)
  }

  /**
  * Unregister task.
  * @param {string} taskId - Task id.
  * @returns {Promise<void | never>}
  * @throws {Error}
  */
  unregisterTask = async (taskId: string): Promise<void | never> =>
    await this.socket.invoke(eRPC.UNREGISTER_TASK, { taskId })

  /**
  * Get top 10 solutions
  * @param {string} taskId - Task id
  * @returns {Promise<Solution[] | never>}
  * @throws {Error}
  */
  getTopSolutions = async (taskId: string): Promise<Solution[] | never> => {
    const maybeSolutions = await this.socket.invoke(eRPC.GET_TOP_SOLUTIONS, { taskId })

    if (!Array.isArray(maybeSolutions)) {
      return []
    }

    return maybeSolutions.map((maybeSolution) => Solution.fromPlain(maybeSolution))
  }
}
