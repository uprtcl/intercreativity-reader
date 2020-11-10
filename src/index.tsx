import * as React from 'react';
import { render } from 'react-dom';
import IPFS from 'ipfs';

import App from './components/App';

import { EveesReader } from '@uprtcl/evees-reader';
import { EveesPolkadotWrapper } from '@uprtcl/evees-polkadot';
import { env } from './env';

export let wrapper: EveesPolkadotWrapper;
export let reader: EveesReader;

(async function () {
  const ipfs = IPFS.create();
  wrapper = new EveesPolkadotWrapper(ipfs, env.pinner);
  await wrapper.load();
  reader = new EveesReader(this.wrapper.remotes, this.wrapper.ipfsStore);

  const rootEl = document.getElementById('root');

  render(<App />, rootEl);
})();
