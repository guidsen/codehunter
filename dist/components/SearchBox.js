import React from 'react';

class SearchBox extends React.Component {
  static propTypes = {
    inputText: React.PropTypes.string,
    handleInput: React.PropTypes.func,
  }

  render() {
    return (
      <div className="search-box col-md-4">
        <label htmlFor="search" className="search-label">
          <i className="fa fa-search"/>
        </label>
        <input id="search" type="text" ref="searchInput"
          onChange={this._updateInput.bind(this)}
          className="form-control"
          placeholder="Search for specific language or framework"
          />
      </div>
    );
  }

  _updateInput(e) {
    this.props.handleInput(e.target.value);
  }
}

export default SearchBox;
