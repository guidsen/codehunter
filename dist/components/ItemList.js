import React from 'react';
import Item from './item';

class ItemList extends React.Component {
  static propTypes = {
    categories: React.PropTypes.array,
  }

  render() {
    return (
      <div id="test">
        {this.props.categories.map(item => <Item key={item.id} categoryName={item.name}/>)}
      </div>
    );
  }
}

export default ItemList;
