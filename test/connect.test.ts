import Ipfs from 'ipfs-core'
import { IpfsDaemon } from '@ceramicnetwork/ipfs-daemon'
import { IpfsTopology } from '@ceramicnetwork/ipfs-topology'
import { DiagnosticsLogger } from '@ceramicnetwork/common'

import peerlistDevUnstable from '../dev-unstable.json'
import peerlistTestnetClay from '../testnet-clay.json'
import peerlistMainnet from '../mainnet.json'

const ceramicNetwork: string = process.env.JEST_CERAMIC_NETWORK || ''

const peerlistByNetwork: Record<string, string[]> = {
    'dev-unstable': peerlistDevUnstable,
    'testnet-clay': peerlistTestnetClay,
    'mainnet': peerlistMainnet
}

const tempFilePath = () => `/tmp/jest/peerlist/connect.test.ts/${Date.now()}`

describe('IpfsDaemon', () => {
    test('fails to connect to invalid bootstrap list', async () => {
        const consoleSpy = jest.spyOn(console, 'log')

        const peerlist = ['not.a.multiaddress']
        const ipfsDaemon = await createIpfsDaemon(peerlist)
        await ipfsDaemon.start()

        for (const multiaddress of peerlist) {
            const peerId = multiaddress.split('/').pop()
            const result = consoleSpy.mock.calls.some((log) => {
                return log[0].includes('Connected to peers:') && !log[0].includes(peerId)
            })
            expect(result).toBeTruthy()
        }
        await ipfsDaemon.stop()
    })
    test('connects successfully to valid bootstrap list', async () => {
        const consoleSpy = jest.spyOn(console, 'log')

        const peerlist = peerlistByNetwork[ceramicNetwork]
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

describe('IpfsTopology', () => {
    let ipfs;
    let topology;
    const logger = new DiagnosticsLogger(1, false)

    beforeEach(async () => {
        ipfs = await Ipfs.create(createIpfsConfig())
        topology = new IpfsTopology(ipfs, ceramicNetwork, logger)
    })

    afterEach(async () => {
        topology.stop()
        await ipfs.stop()
        jest.clearAllMocks()
    })

    test('connects to hosted bootstrap list by default', async () => {
        const consoleSpy = jest.spyOn(console, 'log')

        await topology.start()

        const result = consoleSpy.mock.calls.some((log) => {
            return log[0].includes(`Connecting to peers found in`)
        })
        expect(result).toBeTruthy()
    })
    test('connects to custom peerlist without bootstrap list', async () => {
        const consoleSpy = jest.spyOn(console, 'log')

        const peerlist = peerlistByNetwork[ceramicNetwork]
        await topology.connect(peerlist)

        const result = consoleSpy.mock.calls.every((log) => {
            return !log[0].includes('Connecting to peers found in')
        })
        expect(result).toBeTruthy()

        for (const multiaddress of peerlist) {
            const peerId = multiaddress.split('/').pop()
            const result = consoleSpy.mock.calls.some((log) => {
                return log[0].includes('Connected to peers:') && log[0].includes(peerId)
            })
            expect(result).toBeTruthy()
        }
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
