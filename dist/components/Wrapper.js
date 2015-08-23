import React from 'react';
import { connect }  from 'react-redux';
import TopBar from './topbar';
import SearchBar from './searchbar';
import ItemList from './itemlist';

class Wrapper extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    categories: React.PropTypes.object,
  }

  render() {
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

  _handleSearchBarChange(value) {
    this.props.dispatch({
      type: 'UPDATE_FILTER',
      filter: {
        name: value,
      },
    });
  }
}

function select(state) {
  return {
    categories: state.categories,
  };
}

export default connect(select)(Wrapper);

