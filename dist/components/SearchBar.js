import React from 'react';
import SearchBox from './searchbox';

class SearchBar extends React.Component {
    render() {
        return (
            <div className="container">
                <SearchBox inputText="Test okee" />
                <div className="actions pull-right">
                    <button type="button" className="btn btn-default">Login</button>
                </div>
            </div>
        );
    }
}

export default SearchBar;
