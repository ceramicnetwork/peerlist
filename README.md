# 🌐 Ceramic Peerlist

This repository contains a list of Ceramic nodes that can be used as a bootstrap mechanism for peer discovery on the Ceramic network. When you start up a new Ceramic node it will automatically query this repository to discover available peers and connect to them. 

***If you're running a Cermic node, follow the steps below to add your node to this list.***

## Adding your node

To add your node, simply submit a pull request to the correct peerlist file. Peerlist files are separated by name of the Ceramic network. Currently, there is only one peerlist:

- **[`testnet-clay.json`](testnet-clay.json)**: A list of nodes on the `testnet-clay` Ceramic network

## Why peerlist?

Peerlist is a *temporary* solution to peer discovery in Ceramic. Ceramic was designed to use libp2p DHT for peer discovery, however the [JavaScript implementaion]() is not performant enough for a live decentralized network. An alternative approach could be to delegate DHT functionality to the Go implementation, however the Go version does not yet support the IPLD codec for dag-jose which is used by Ceramic to store signed and encrypted data in IPFS. The Protocol Labs team is working on an improvement to go-ipfs to support the dag-jose codec, which will allow Ceramic to use go-ipfs with acceptable performance for a mainnet. When Ceramic launches mainnet near the end of Q1 2021, we will replace `peerlist` with the purely decentralized peer-to-peer discovery mechanism provided by libp2p. 🚀

## Maintainers

- Joel Thorstensson ([@oed](https://github.com/oed))
- Spencer ([@oed](https://github.com/stbrody))
- Zach Ferland ([@oed](https://github.com/zachferland))

## License

Ceramic is fully open source and dual-licensed under MIT and Apache 2.
