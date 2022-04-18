To test that your js-ipfs node is reachable by the network

> Use Node 14

1. Clone this repository

```sh
git clone https://github.com/ceramicnetwork/peerlist
```

2. Install test dependencies (using node 14)

```sh
cd peerlist/test
npm install
```

3. Run `customConnect` test with your IPFS multiaddress

```sh
JEST_CERAMIC_NETWORK=dev-unstable \
JEST_PEER_MULTIADDR=<your_js_ipfs_multiaddress> \
./node_modules/.bin/jest --runInBand --detectOpenHandles --forceExit connectCustom
```

