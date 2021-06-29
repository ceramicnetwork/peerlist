const { IpfsDaemon } = require('@ceramicnetwork/ipfs-daemon')

const CERAMIC_NETWORK = 'dev-unstable'
const { MULTIADDRESS } = process.env

describe('@ceramicnetwork/ipfs-daemon', () => {
  test('starts successfully with custom bootstrap list', async () => {
    const ipfsDaemon = await IpfsDaemon.create({
      useCentralizedPeerDiscovery: true,
      ceramicNetwork: CERAMIC_NETWORK,
      ipfsBootstrap: [MULTIADDRESS]
    })
    await ipfsDaemon.start()
    await ipfsDaemon.stop()
  })
})
