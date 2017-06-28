import React from 'react';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import SelectedPlacesListItem from './selected_places_list_item';

class SelectedPlacesList extends React.Component {
  constructor(props) {
    super(props);
    this.moveItem = this.moveItem.bind(this);
    this.state = {
      placesList: props.places ? Object.values(props.places) : []
    };
  }

  moveItem(dragIndex, hoverIndex) {
    const dragItem = this.state.placesList[dragIndex];

    this.setState(update(this.state, {
      placesList: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragItem],
        ],
      },
    }));
  }

  render() {
    return (
    <ul className='selected-places-container'>
      {this.state.placesList
        .map((place, i) =>
          <SelectedPlacesListItem
            place={place}
            key={place.id}
            index={i}
            id={place.id}
            moveItem={this.moveItem}
          />
        )
      }
    </ul>);
  }
}

export default DragDropContext(HTML5Backend)(SelectedPlacesList);
