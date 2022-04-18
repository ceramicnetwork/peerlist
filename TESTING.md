## Is your js-ipfs node reachable?

### Test access to your swarm multiaddress

> Do these steps on a different machine from where your js-ipfs node is currently running. For clarity, we'll refer to the location where you run the test as the "local" environment, and the location where the node that you want to test is running as the "remote" environment.

1. Clone this repository on your **local** environment

```sh
git clone https://github.com/ceramicnetwork/peerlist
```

2. Install dependencies using node 14
```sh
cd peerlist/test
# switch to using node 14. e.g. running `nvm use 14`
npm install
```

3. Run the `customConnect` test against the node on your **remote** environment
```sh
JEST_CERAMIC_NETWORK= \ # set this to the ceramic network your js-ipfs node needs to connect to
JEST_PEER_MULTIADDR= \ # set this to the multiaddress of your remote js-ipfs node
./node_modules/.bin/jest --runInBand --detectOpenHandles --forceExit connectCustom
```

