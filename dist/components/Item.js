import React from 'react';

class Item extends React.Component {
    static propTypes = {
        categoryName: React.PropTypes.string,
    }

    render() {
        return (
            <article className="item">
                <div className="content">
                    <span className="item-text">{this.props.categoryName}</span>
                    <a className="item-link" href="#"></a>
                </div>
            </article>
        );
    }
}

export default Item;

