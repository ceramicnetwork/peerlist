# 🌐 Ceramic Peerlist

This repository details the process required to be added to the allow list for the 3Box Labs hosted anchor service.
## Adding your node
Create an issue using the *Peerlist Request* template filling in each section with the neccessary information. 

Once we receive your *Peerlist Request* issue we will review it and ask for more information if needed. When the *Peerlist Request* gets accepted we will add your IP address to our allow list. The *Peerlist Request* issue with then be closed and your node will be connected to the Ceramic network and the [Ceramic Anchor Service](https://github.com/ceramicnetwork/ceramic-anchor-service). You can create a *Peerlist Request* issue for the following networks: 

- **`mainnet`** 
- **`testnet-clay`** 
- **`dev-unstable`** 

It is recommended to first run your node on the Clay testnet to ensure it is set up correctly before running mainnet.

### Readiness checklist
Before creating an issue, ensure that your setup has the following:
- [ ] Swarm port for IPFS node is open to the internet so that peers can make connections to your node
- [ ] API port for IPFS node is reachable by the Ceramic node 
- [ ] HTTP API port for Ceramic daemon is open to requests from your client applications
- [ ] Ceramic daemon CORS allowed origins regex matches the origin of your client applications (True by default)
- [ ] Data persistence is set up so that your multiaddress will not change

## Issue format
If you are creating a new issue for **mainnet**, you must fill in the *PeerList Request* issue template. A *PeerList Request* will require the following information:

```md
### Team:
<!--Team name or your github handle if you are a team of one-->

### Use case:
<!--A few words about what your node will be used for so we can make recommendations for your setup-->

### Overview:
<!--How are you running your nodes? What cloud infrastructure? How are you running your IPFS node(s)?-->

*Multiaddress persistence:*
<!--What are you doing to ensure your multiaddress doesn't change?-->

*Ceramic State Store persistence:*
<!--What are you doing to ensure your Ceramic data doesn't get lost?-->

*IPFS Repo persistence:*
<!--What are you doing to ensure your IPFS data doesn't get lost?-->

*Static Egress IP:*
<!--Static Egress IP address of the machine your Ceramic daemon runs on so it can connect to the 3Box Labs hosted Ceramic Anchor Service (CAS).-->
```

> **Data persistence is a critical step.** Remember that there are no guarantees that other nodes in the network are keeping copies of your streams so you must pin all streams that you care about and back up their data.
>
> If your nodes restart for any reason and you *do not* have data persistence in place, the following will occur: (1) Your IPFS `config` file will be regenerated with a new multiaddress and you will need to reconnect to the rest of the network. (2) The state data for streams pinned on your node will get deleted and likely become unrecoverable. (3) The IPFS data for streams your node has loaded will get deleted and likely become unrecoverable, corrupting your stream state.
>
> Instructions on configuring your node for proper data persistence can be found in the Ceramic docs on the [Hosting a node](https://developers.ceramic.network/run/nodes/nodes/) page.

Please add one of the maintainers below as an assignee to your issue. They will do their best to review your issue as soon as they come in. If you need more immediate assistance, reach out on [Discord](https://chat.ceramic.network) and include the URL of your issue. 

## Why peerlist?

Peerlist is a *temporary* solution for the limitation of the 3Box Labs hosted anchor service as it is not yet sufficient to deliver optimal performance for a live decentralized network.

## Maintainers

- Val ([@v-stickykeys](https://github.com/v-stickykeys))
- Mohsin ([@smrz2001](https://github.com/smrz2001))

## License

Ceramic is fully open source and dual-licensed under MIT and Apache 2.
