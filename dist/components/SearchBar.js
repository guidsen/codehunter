import React from 'react';
import SearchBox from './searchbox';

class SearchBar extends React.Component {
  static propTypes = {
    onChange: React.PropTypes.func,
  }

  render() {
    return (
      <div className="container">
        <SearchBox inputText="Test okee" handleInput={this.props.onChange}/>

        <div className="actions pull-right">
          <button type="button" className="btn btn-default">Login</button>
        </div>
      </div>
    );
  }
}

export default SearchBar;
