import React from 'react';
import ListOfSelectionsItem from './ListOfSelections_Item';

class ListOfSelections extends React.Component {
  render() {
    return (
    <ul className='cartPlaces board'>
      {this.props.places
        .map((location, i) =>
          <ListOfSelectionsItem
            location={location}
            key={location.id}
            index={i}
            id={location.id}
            onDelete={this.props.onItemDelete}
            handleCollapseSelected={this.props.handleCollapseSelected}
          />
        )
      }
    </ul>);
  }
}

export default ListOfSelections;
