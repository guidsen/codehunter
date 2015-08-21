import React from 'react';
import Item from './item';

class ItemList extends React.Component {
    static propTypes = {
        categories: React.PropTypes.array,
    }

    render() {
        const itemNodes = this.props.categories.map(item => {
            return (
                <Item key={item.id} categoryName={item.name}/>
            );
        });

        return (
            <div id="test">{itemNodes}</div>
        );
    }
}

export default ItemList;
