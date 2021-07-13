const { IpfsDaemon } = require('@ceramicnetwork/ipfs-daemon')

const { CERAMIC_NETWORK, MULTIADDRESS } = process.env

const peerId = MULTIADDRESS.split('/').pop()

describe('@ceramicnetwork/ipfs-daemon', () => {
  test('connects successfully with custom bootstrap list', async () => {
    const consoleSpy = jest.spyOn(console, 'log')

    const ipfsDaemon = await IpfsDaemon.create({
      useCentralizedPeerDiscovery: true,
      ceramicNetwork: CERAMIC_NETWORK,
      ipfsBootstrap: [MULTIADDRESS]
    })
    await ipfsDaemon.start()

    const result = consoleSpy.mock.calls.some((log) => {
      return log[0].includes(peerId)
    })

    expect(result).toBeTruthy()

    await ipfsDaemon.stop()
  })
})
