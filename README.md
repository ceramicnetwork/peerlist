# 🌐 Ceramic Peerlist

This repository contains a list of Ceramic nodes that can be used as a bootstrap mechanism for peer discovery on the [Ceramic Network](https://github.com/ceramicnetwork/ceramic). When you start up a new Ceramic node it will automatically query this repository to discover available peers and connect to them. 

> **⚠️  If you're running a Cermic node, you need to add your node to this list. If you don't, then other nodes on the network will be unable to read Ceramic documents or commits created on your node**

## Adding your node
Submit a pull request to this repository adding the *multiaddress* of your node to the correct peerlist file. Before you do so, make sure that the correct port is open so that other peers can make connections to your node. Peerlist files are organized by name of the Ceramic network. Currently, there are three peerlists:

- **[`mainnet.json`](mainnet.json)**: A list of nodes that run the `mainnet` Ceramic network
- **[`testnet-clay.json`](testnet-clay.json)**: A list of nodes that run the `testnet-clay` Ceramic network
- **[`dev-unstable.json`](dev-unstable.json)**: A list of nodes that run the `dev-unstable` Ceramic network

It is encouraged to first deploy to the Clay testnet before mainnet. If you are submitting a pull request for the mainnet Ceramic network, you must include a description of how you are ensuring data persistence of your node's multiaddress, Ceramic State Store and IPFS Repo. This is a critical step, as otherwise if your node restarts for any reason it will regenerate this file with a new address and all other nodes on the network will lose their connection to you. Any time your multiaddress changes, you will need to submit a new pull request to reconnect to hte network. The Ceramic State Store data and IPFS repo, created in the IPFS folder (your node will create a .ceramic and IPFS file) hold the data for streams you're pinning, so it's important to also persist these files as for now there are no guarantees that other nodes are also keeping copies of that data.

Please add one of the maintainers below as reviewers for your PR. They will do their best to merge PRs as soon as they come in. If you need more immediate assistance, reach out on [Discord](https://chat.ceramic.network) and include the URL of your PR.

### Find your *multiaddress*
When you start the Ceramic daemon you will get an output that looks something like this:

```sh
$ ceramic daemon
Swarm listening on /ip4/127.0.0.1/tcp/4002/p2p/QmNZfs1Vevknvmykz3fWKTjhmEpckabhd2JyEGJuymZFsC
Swarm listening on /ip4/192.168.188.22/tcp/4002/p2p/QmNZfs1Vevknvmykz3fWKTjhmEpckabhd2JyEGJuymZFsC
Swarm listening on /ip4/10.70.198.64/tcp/4002/p2p/QmNZfs1Vevknvmykz3fWKTjhmEpckabhd2JyEGJuymZFsC
Swarm listening on /ip4/127.0.0.1/tcp/4003/ws/p2p/QmNZfs1Vevknvmykz3fWKTjhmEpckabhd2JyEGJuymZFsC
```

It is recommended that you use a websocket multiaddress with SSL. Make sure that the appropriate port is open (`4003` in the example above), then replace `127.0.0.1` with your external IP address. You may also choose to configure your multiaddress with a DNS name (see [multiaddress docs](https://github.com/multiformats/multiaddr)).

You can view the multiaddress in the config file that IPFS creates. By default, it will be located in a directory call IPFS. The multiaddress includes the PeerID at the end. If you run an IPFS node external to the Ceramic daemon, you will see a similar log output on startup and you can simply get the multiaddress from there.

When a pull request is submitted, it triggers a connectivity test to make sure your node is successfully connected to the network. If this fails, the 3Box Labs team will reach out to you to triage the issue. Make sure there are no firewalls blocking your instance and that your port is properly exposed. It may also take some time for your node to be added to the Ceramic Anchor Service (CAS).


## Why peerlist?

Peerlist is a *temporary* solution for peer discovery in Ceramic that will be used during the Clay testnet. Peerlist is needed because the current JavaScript implementation of the DHT in `libp2p` (a p2p networking library used in Ceramic) is not yet sufficient to deliver optimal performance for a live decentralized network. However when Ceramic launches Fire mainnet near the end of Q1 2021, we will replace `peerlist` with the purely decentralized peer-to-peer discovery mechanism provided by libp2p. 🚀

## Maintainers

- Val ([@v-stickykeys](https://github.com/v-stickykeys))

## License

Ceramic is fully open source and dual-licensed under MIT and Apache 2.
