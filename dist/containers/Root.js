import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Wrapper from '../components/Wrapper';
import { createStore } from 'redux';
import rootReducer from '../reducers';

const store = createStore(rootReducer);

store.subscribe(() => {
  console.info(store.getState());
})

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        {() => <Wrapper />}
      </Provider>
    );
  }
}

React.render(<Root />, document.getElementById('codehunter body'));