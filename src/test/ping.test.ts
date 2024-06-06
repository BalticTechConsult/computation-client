import { pingCommand } from '@/commands'


describe('ping', () => {
  const validAddress = process.env.BROKER_ADDRESS ?? 'localhost:50051'
  const invalidAddress = 'localhost:12345'

  it('should return pong message from the broker', async () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation()
    const errorSpy = jest.spyOn(console, 'error').mockImplementation()

    await pingCommand(validAddress)

    expect(logSpy).toHaveBeenCalledWith('Ping response:', 'pong')
    expect(logSpy).toHaveBeenCalledWith('Broker is alive and well.')
    expect(errorSpy).not.toHaveBeenCalled()

    logSpy.mockRestore()
    errorSpy.mockRestore()
  })

  it('should handle errors when broker is unavailable', async () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation()
    const errorSpy = jest.spyOn(console, 'error').mockImplementation()

    await pingCommand(invalidAddress)

    expect(logSpy).not.toHaveBeenCalled()
    expect(errorSpy).toHaveBeenCalledWith('Broker is unavailable:')
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('Error Code:'))
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('Error Message:'))
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining(`Address: ${invalidAddress}`))
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('Timestamp:'))

    logSpy.mockRestore()
    errorSpy.mockRestore()
  })
})
