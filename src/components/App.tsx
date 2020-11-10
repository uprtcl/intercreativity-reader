import { EveesReader } from '@uprtcl/evees-reader';
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { wrapperP } from '..';

import './../assets/scss/App.scss';

interface IProps {}

interface IState {
  loading: boolean;
  reading: boolean;
  perspectiveId: string;
  dataRead: any;
}

class App extends React.Component<IProps, IState> {
  reader!: EveesReader;

  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: true,
      reading: false,
      perspectiveId: '',
      dataRead: {},
    };
  }

  async componentWillMount() {
    const wrapper = await wrapperP;
    await wrapper.load();

    this.reader = new EveesReader(wrapper.remotes, wrapper.ipfsStore);

    this.setState((state) => ({ loading: false }));
  }

  async read() {
    this.setState({ reading: true });
    const dataRead = await this.reader.resolve(this.state.perspectiveId);
    this.setState({ dataRead });
    this.setState({ reading: false });
  }

  setPerspectiveId(perspectiveId: string) {
    this.setState({ perspectiveId });
  }

  public render() {
    if (this.state.loading) {
      return <p>loading...</p>;
    }
    return (
      <div>
        <input
          onChange={(event) => this.setPerspectiveId(event.target.value)}
        />
        <button onClick={() => this.read()}>Read</button>
        <br />
        {this.state.reading ? (
          <p>reading...</p>
        ) : (
          <pre>{JSON.stringify(this.state.dataRead, undefined, 2)}</pre>
        )}
      </div>
    );
  }
}

declare let module: object;

export default hot(module)(App);
