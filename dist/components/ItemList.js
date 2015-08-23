import React from 'react';
import Item from './item';
import _ from 'lodash';

class ItemList extends React.Component {
  static propTypes = {
    categories: React.PropTypes.array,
    filter: React.PropTypes.object,
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
