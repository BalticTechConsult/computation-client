import { ComputationService } from '@/services'
import { eProtocolVersion, isProtocolVersion } from '@/consts'


describe('testing ComputationService connection', () => {
  const protocolVersion = Number(process.env.SOCKET_PROTOCOL_VERSION)

  const service = new ComputationService({
    hostname: process.env.SOCKET_HOST || 'localhost',
    port: Number(process.env.SOCKET_PORT) || 8000,
    path: process.env.SOCKET_PATH || '/broadcasting',
    protocolVersion: isProtocolVersion(protocolVersion) ? protocolVersion : eProtocolVersion.TWO,
  })

  test('connection to computation service', async () => {
    await service.connect()

    expect(service.isConnected()).toBe(true)
  })

  test('disconnection from computation service', async () => {
    service.disconnect()

    expect(service.isConnected()).toBe(false)
  })
})
