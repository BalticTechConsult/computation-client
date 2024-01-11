import { AGClientSocket, create } from 'socketcluster-client'

import { iConnectionParams, ConnectionParams } from '@/models'


/**
* Computation service.
*/
export class ComputationService {
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
  * Check if connected to computation service.
  * @returns {boolean}
  */
  isConnected = (): boolean => this.socket.state === this.socket.OPEN

  /**
  * Connect to computation service.
  * @returns {Promise<boolean>}
  */
  async connect(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const { hostname, port, path, protocolVersion, logs } = this.params

      setTimeout(() => {
        logs && console.error('Failed to connect to computation service.')

        reject('Failed to connect to computation service.')
      }, 10000)

      ;(async () => {
        for await (let status of this.socket.listener('connect')) {
          if (this.isConnected()) {
            logs && console.log('Connected to computation service.')

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
  * Disconnect from computation service.
  * @returns {void}
  */
  disconnect = (): void => {
    this.socket.disconnect()
  }

}
