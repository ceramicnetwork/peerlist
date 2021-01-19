# Ceramic Peerlist

A centrally curated list of Ceramic nodes used for peer discover for the clay testnet.

## Adding your node
In order to add your node to the list simply submit a PR that adds the *multiaddress* of your node to the [`testnet-clay.json`](./testnet-clay.json) file. Before you do so make sure that the correct port is open so that other peers can make connections to your node.

### Find your *multiaddress*
When you start the Ceramic daemon you will get an output that looks something like this:
```sh
$ ceramic daemon
Swarm listening on /ip4/127.0.0.1/tcp/4002/p2p/QmNZfs1Vevknvmykz3fWKTjhmEpckabhd2JyEGJuymZFsC
Swarm listening on /ip4/192.168.188.22/tcp/4002/p2p/QmNZfs1Vevknvmykz3fWKTjhmEpckabhd2JyEGJuymZFsC
Swarm listening on /ip4/10.70.198.64/tcp/4002/p2p/QmNZfs1Vevknvmykz3fWKTjhmEpckabhd2JyEGJuymZFsC
Swarm listening on /ip4/127.0.0.1/tcp/4003/ws/p2p/QmNZfs1Vevknvmykz3fWKTjhmEpckabhd2JyEGJuymZFsC
```
We reccomend that you use the `ws` multiaddress. Make sure that the appropriate port is open (`4003` in the example above), then replace `127.0.0.1` with your external ip address. You may also choose to configure your multiaddress with a DNS name (see [multiaddress docs](https://github.com/multiformats/multiaddr)).

If you run an ipfs node external to the Ceramic daemon simply get the multiaddress from there.
