import React from 'react';
import TopBar from './topbar';
import SearchBar from './searchbar';
import ItemList from './itemlist';

class Wrapper extends React.Component {
    constructor() {
        super();

        this.state = {
            categories: [
                {id: 1, name: 'PHP'},
                {id: 2, name: 'JavaScript'},
                {id: 3, name: 'JavaScript2'},
                {id: 4, name: 'JavaScript3'},
                {id: 5, name: 'JavaScript4'},
            ],
        };
    }

    render() {
        return (
            <div id="wrapper">
                <section className="top-bar">
                    <TopBar />
                </section>
                <section className="search-bar">
                    <SearchBar />
                </section>
                <section className="category-item-list">
                    <ItemList categories={this.state.categories}/>
                </section>
            </div>
        );
    }
}

React.render(<Wrapper />, document.getElementById('codehunter body'));
