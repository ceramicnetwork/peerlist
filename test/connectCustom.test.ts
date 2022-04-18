import Ipfs from 'ipfs-core'
import { IpfsDaemon } from '@ceramicnetwork/ipfs-daemon'
import { IpfsTopology } from '@ceramicnetwork/ipfs-topology'
import { DiagnosticsLogger } from '@ceramicnetwork/common'

const ceramicNetwork: string = process.env.JEST_CERAMIC_NETWORK || ''
const peerMultiaddress: string = process.env.JEST_PEER_MULTIADDR || ''

const tempFilePath = () => `/tmp/jest/peerlist/connectCustom.test.ts/${Date.now()}`

describe('IpfsDaemon', () => {
    test('connects successfully to specified peer multiaddress', async () => {
        jest.setTimeout(5000 * 60) // 5m
        const consoleSpy = jest.spyOn(console, 'log')

        const peerlist = [peerMultiaddress]
        const ipfsDaemon = await createIpfsDaemon(peerlist)
        await ipfsDaemon.start()

        for (const multiaddress of peerlist) {
            const peerId = multiaddress.split('/').pop()
            const result = consoleSpy.mock.calls.some((log) => {
                return log[0].includes('Connected to peers:') && log[0].includes(peerId)
            })
            expect(result).toBeTruthy()
        }
        await ipfsDaemon.stop()
    })
})

async function createIpfsDaemon(peerlist) {
    return await IpfsDaemon.create({
        ceramicNetwork,
        ipfsBootstrap: peerlist,
        ipfsPath: tempFilePath(),
        useCentralizedPeerDiscovery: true
    })
}

function createIpfsConfig() {
    return {
        repo: tempFilePath(),
        libp2p: {
            config: {
                dht: {
                    enabled: false,
                    clientMode: true
                },
                pubsub: {
                    enabled: true
                }
            },
        },
        preload: {
            enabled: false
        },
        config: {
            Routing: {
                Type: 'dhtclient',
            }
        },
    }
}
