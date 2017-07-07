import React from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';

const SelectedPlacesListItem = (props) => {
  const { isDragging, connectDragSource, connectDropTarget } = props;
  return connectDragSource(connectDropTarget(
     <li style={{opacity:isDragging ? 0.5 : 1}}>
       <SelectedPlacesListItem  style={{opacity:isDragging ? 0.5 :1}}/>
     </li>
   ));
};

const selectedPlaceSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  }
};

 const selectedPlaceTarget = {
   hover(props, monitor, component) {
     const dragIndex = monitor.getItem().index;
     const hoverIndex = props.index;

     // Don't replace items with themselves
     if (dragIndex === hoverIndex) {
      return;
     }

     // Determine rectangle on screen
     const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

     // Get vertical middle
     const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

     // Determine mouse position
     const clientOffset = monitor.getClientOffset();

     // Get pixels to the top
     const hoverClientY = clientOffset.y - hoverBoundingRect.top;

     // Only perform the move when the mouse has crossed half of the items height
     // When dragging downwards, only move when the cursor is below 50%
     // When dragging upwards, only move when the cursor is above 50%

     // Dragging downwards
     if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
       return;
     }

     // Dragging upwards
     if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
       return;
     }

     // Time to actually perform the action
     props.moveItem(dragIndex, hoverIndex);

     // Note: we're mutating the monitor item here!
     // Generally it's better to avoid mutations,
     // but it's good here for the sake of performance
     // to avoid expensive index searches.
     monitor.getItem().index = hoverIndex;
   },
 };

 const dragSource = DragSource('selected place',
                           selectedPlaceSource,
                           (connect, monitor) => ({
                             connectDragSource: connect.dragSource(),
                             isDragging: monitor.isDragging()
                           })
                           )(SelectedPlacesListItem);

 export default DropTarget('selected place',
                           selectedPlaceTarget,
                           connect => ({
                             connectDropTarget: connect.dropTarget()
                           })
                        )(dragSource);
