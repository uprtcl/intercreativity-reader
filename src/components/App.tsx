import * as React from 'react';
import { hot } from 'react-hot-loader';

import './../assets/scss/App.scss';

interface IProps {}

interface IState {
  perspectiveId?: string;
}

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { perspectiveId: '' };
  }

  async componentWillMount() {
    this.setState((state) => ({ perspectiveId: 'hello' }));

    // console.log('Perspective created', perspectiveId);
  }

  public render() {
    return <div>{this.state.perspectiveId}</div>;
  }
}

declare let module: object;

export default hot(module)(App);
