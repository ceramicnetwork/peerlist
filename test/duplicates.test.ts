import peerlistDevUnstable from '../dev-unstable.json'
import peerlistTestnetClay from '../testnet-clay.json'
import peerlistMainnet from '../mainnet.json'

const ceramicNetwork: string = process.env.JEST_CERAMIC_NETWORK || ''

const peerlistByNetwork: Record<string, string[]> = {
    'dev-unstable': peerlistDevUnstable,
    'testnet-clay': peerlistTestnetClay,
    'mainnet': peerlistMainnet
}

const peerlist = peerlistByNetwork[ceramicNetwork]

test('does not contain duplicate peer ids', async () => {
    const occurrences = {}
    for (const multiaddress of peerlist) {
        const peerId = multiaddress.split('/').pop()
        expect(occurrences[peerId]).toBeUndefined()
        occurrences[peerId] = 1
    }
})

test('does not contain duplicate hosts', async () => {
    const occurrences = {}
    for (const multiaddress of peerlist) {
        const host = multiaddress.split('/')[2]
        expect(occurrences[host]).toBeUndefined()
        occurrences[host] = 1
    }
})
