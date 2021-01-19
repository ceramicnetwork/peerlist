# 🌐 Ceramic Peerlist

This repository contains a list of Ceramic nodes that can be used as a bootstrap mechanism for peer discovery on the [Ceramic Network](https://github.com/ceramicnetwork/ceramic). When you start up a new Ceramic node it will automatically query this repository to discover available peers and connect to them. 

> **⚠️  If you're running a Cermic node, you need to add your node to this list.**

## Adding your node

Submit a pull request to this repository adding your node to the correct peerlist file. Peerlist files are organized by name of the Ceramic network. Currently, there is only one peerlist:

- **[`testnet-clay.json`](testnet-clay.json)**: A list of nodes that run the `testnet-clay` Ceramic network

Please add the maintainers below as reviewers for your PR. They will do their best to merge PRs as soon as they come in. If you need more immediate assistance, reach out on [Discord](https://chat.ceramic.network) and include the URL of your PR.

## Why peerlist?

Peerlist is a *temporary* solution for peer discovery in Ceramic that will be used during the Clay testnet. Peerlist is needed because the current JavaScript implementation of the DHT in libp2p (a p2p networking library used in Ceramic) is not yet sufficient to deliver optimal performance for a live decentralized network. However when Ceramic launches Fire mainnet near the end of Q1 2021, we will replace `peerlist` with the purely decentralized peer-to-peer discovery mechanism provided by libp2p. 🚀

## Maintainers

- Joel Thorstensson ([@oed](https://github.com/oed))
- Spencer T Brody ([@stbrody](https://github.com/stbrody))
- Zach Ferland ([@zachferland](https://github.com/zachferland))

## License

Ceramic is fully open source and dual-licensed under MIT and Apache 2.
