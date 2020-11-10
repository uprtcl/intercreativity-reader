import * as React from 'react';
import { render } from 'react-dom';
import * as IPFS from 'ipfs';

import App from './components/App';

import { EveesPolkadotWrapper } from '@uprtcl/evees-polkadot';
import { env } from './env';

export let wrapperP: Promise<EveesPolkadotWrapper>;

(async function () {
  const ipfsJSConfig = {
    preload: { enabled: false },
    relay: { enabled: true, hop: { enabled: true, active: true } },
    EXPERIMENTAL: { pubsub: true },
    config: {
      init: true,
      Addresses: {
        Swarm: env.pinner.Swarm,
      },
      Bootstrap: env.pinner.Bootstrap,
    },
  };

  wrapperP = new Promise((resolve) =>
    IPFS.create(ipfsJSConfig).then((ipfs) => {
      const wrapper = new EveesPolkadotWrapper(ipfs, env.pinner);
      resolve(wrapper);
    })
  );
  const rootEl = document.getElementById('root');

  render(<App />, rootEl);
})();
