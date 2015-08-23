import React from 'react';
import { createStore } from 'redux';
import { Provider, connect }  from 'react-redux';
import TopBar from './topbar';
import SearchBar from './searchbar';
import ItemList from './itemlist';
import searchBox from '../reducers/searchbox';

class Wrapper extends React.Component {
  _handleSearchBarChange(value) {
    //console.info('change input value to: %s', value);
    this.props.dispatch({
      type: 'UPDATE_FILTER',
      filter: {
        name: value,
      },
    })
  }

  render() {
    console.info('Rendered Wrapper')

    return (
      <div id="wrapper">
        <section className="top-bar">
          <TopBar />
        </section>
        <section className="search-bar">
          <SearchBar onChange={this._handleSearchBarChange.bind(this)}/>
        </section>
        <section className="category-item-list">
          <ItemList categories={this.props.categories}/>
        </section>
      </div>
    );
  }
}

function select(state) {
  return {
    categories: state.categories,
  }
}

export default connect(select)(Wrapper);

