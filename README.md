# 🌐 Ceramic Peerlist

This repository contains a list of Ceramic nodes that can be used as a bootstrap mechanism for peer discovery on the [Ceramic Network](https://github.com/ceramicnetwork/ceramic). When you start up a new Ceramic node it will automatically query this repository to discover available peers and connect to them. 

> **⚠️  If you are running a Ceramic node, you must add your node to this list. If your node is not on this list, other nodes on the network will be unable to read Ceramic streams or receive commits created on your node.**

## Adding your node
Submit a pull request to this repository adding the *multiaddress* of the IPFS node that your Ceramic node uses to the correct peerlist file. Peerlist files are organized by name of the Ceramic network. Currently, there are three peerlists:
- **[`mainnet.json`](mainnet.json)**: A list of nodes that run the `mainnet` Ceramic network
- **[`testnet-clay.json`](testnet-clay.json)**: A list of nodes that run the `testnet-clay` Ceramic network
- **[`dev-unstable.json`](dev-unstable.json)**: A list of nodes that run the `dev-unstable` Ceramic network

It is recommended to first run your node on the Clay testnet to ensure it is set up correctly before running mainnet.

### Find your *multiaddress*
When you start the Ceramic daemon you will get an output that looks something like this:

```sh
$ ceramic daemon
# ...
Swarm listening on /ip4/127.0.0.1/tcp/4002/p2p/QmNZfs1Vevknvmykz3fWKTjhmEpckabhd2JyEGJuymZFsC
Swarm listening on /ip4/192.168.188.22/tcp/4002/p2p/QmNZfs1Vevknvmykz3fWKTjhmEpckabhd2JyEGJuymZFsC
Swarm listening on /ip4/10.70.198.64/tcp/4002/p2p/QmNZfs1Vevknvmykz3fWKTjhmEpckabhd2JyEGJuymZFsC
Swarm listening on /ip4/127.0.0.1/tcp/4003/ws/p2p/QmNZfs1Vevknvmykz3fWKTjhmEpckabhd2JyEGJuymZFsC
```

This is your IPFS multiaddress. It can also be viewed in the `config` file that the IPFS daemon creates which is located by default in a directory called `ipfs`. This directory gets created wherever IPFS runs. Of you are running IPFS out-of-process, you will see a similar log output on startup and you can simply get the multiaddress from there.

It is recommended that you use a websocket multiaddress and configure SSL (e.g. `.../<port>/wss/p2p/<peerId>`). Before adding your multiaddress to the peerlist, be sure to replace the local IP addresses (e.g. `127.0.0.1`) with your external IP address or DNS name. Also ensure that the websocket port (`4003` in the example above) is open to internet connections. For more information see [multiaddress docs](https://github.com/multiformats/multiaddr).

### Connectivity test
When a pull request is submitted, it triggers a connectivity test to make sure your node is successfully connected to the network. If this fails, the 3Box Labs team will reach out to you to triage the issue. Make sure there are no firewalls blocking your instance and that your port is properly exposed.

### Readiness checklist
Before submitting a PR, ensure that your setup has the following:
- [ ] Swarm port for IPFS node is open to the internet so that peers can make connections to your node
- [ ] API port for IPFS node is reachable by the Ceramic node (True by default)
- [ ] HTTP API port for Ceramic daemon is open to requests from your client applications
- [ ] Ceramic daemon CORS allowed origins regex matches the origin of your client applications (True by default)
- [ ] Data persistence is set up so that your multiaddress will not change

## Pull request format
If you are submitting a pull request for **mainnet**, you must write a summary in the notes of the PR that describes how you are ensuring **data persistence** of your (1) multiaddress, (2) Ceramic State Store, and (3) IPFS Repo, and includes the static IP address of the machine your Ceramic daemon runs on so it can connect to the 3Box Labs hosted Ceramic Anchor Service (CAS).

```md
### Team:
<!--Team name or your github handle if you are a team of one-->
### Use case:
<!--A few words about what how your node will be used so we can make recommendations for your setup-->

### Overview:
<!--How are you running your nodes? What cloud infrastructure? Are you running IPFS out-of-process?-->

*Multiaddress persistence:*
<!--What are you doing to ensure your multiaddress won't change?-->

*Ceramic State Store persistence:*
<!--What are you doing to ensure your Ceramic data doesn't get lost?-->

*IPFS Repo persistence:*
<!--What are you doing to ensure your IPFS data doesn't get lost?-->

*Static IP:*
<!--Static IP address of the machine your Ceramic daemon runs on.-->
```

> **Data persistence is a critical step.** Remember that there are no guarantees that other nodes in the network are keeping copies of your streams so you must pin all streams that you care about and back up their data.
>
> If your nodes restart for any reason and you *do not* have data persistence in place, the following will occur: (1) Your IPFS `config` file will be regenerated with a new multiaddress and you will lose your connection to the rest of the network. (2) The state data for streams pinned on your node will get deleted and likely become unrecoverable. (3) The IPFS data for streams your node has loaded will get deleted and likely become unrecoverable, corrupting your stream state.
>
> Instructions on configuring your node for proper data persistence can be found in the Ceramic docs on the [Hosting a node](https://developers.ceramic.network/run/nodes/nodes/) page.

Please add one of the maintainers below as a reviewer for your PR. They will do their best to merge PRs as soon as they come in. If you need more immediate assistance, reach out on [Discord](https://chat.ceramic.network) and include the URL of your PR.

## Why peerlist?

Peerlist is a *temporary* solution for peer discovery in Ceramic that will be used up until DAG-JOSE becomes available in go-ipfs. Peerlist is needed because the current JavaScript implementation of the DHT in `libp2p` (a p2p networking library used in Ceramic) is not yet sufficient to deliver optimal performance for a live decentralized network.

## Maintainers

- Val ([@v-stickykeys](https://github.com/v-stickykeys))

## License

Ceramic is fully open source and dual-licensed under MIT and Apache 2.
