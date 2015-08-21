import React from 'react';

class SearchBox extends React.Component {
  static propTypes = {
    inputText: React.PropTypes.string,
  }

  render() {
    return (
      <div className="search-box col-md-4">
        <label htmlFor="search" className="search-label">
          <i className="fa fa-search"/>
        </label>
        <input id="search" type="text"
          className="form-control"
          value={this.props.inputText ? this.props.inputText : ''}
          placeholder="Search for specific language or framework"
          />
      </div>
    );
  }
}

export default SearchBox;
