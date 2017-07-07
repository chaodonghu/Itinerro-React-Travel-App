import React from 'react';
import {findDOMNode} from 'react-dom';
import {DragSource, DropTarget} from 'react-dnd';
import Comments from './Trip_comments';

import {connect} from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentClear from 'material-ui/svg-icons/content/clear';
import ContentCreate from 'material-ui/svg-icons/content/create';

import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import CommentIcon from 'material-ui/svg-icons/communication/comment';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite';

class SelectedPlacesListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComments :false,
      likeCounter:1,
      commentCounter:0
    };
    this.increaseCommentCounter = this.increaseCommentCounter.bind(this);
  }



  increaseCommentCounter() {
    this.setState({increaseCommentCounter: this.state.commentCounter + 1});
  }


  render() {
    const { isDragging, connectDragSource, connectDropTarget } = this.props;
    return connectDragSource(connectDropTarget(
      <li style={{opacity:isDragging ? 0.5 : 1}}>
        <div className='dash-item-img'></div>
          <div className='dash-item-text'>
            <div className='text-plus-icons'>
              <h5>
                {this.props.place.name}
              </h5>
            <div className="control-buttons">
              {//badgeContent={this.props.likes[this.props.post.id - 1].likes}
            }
            {this.state.likeCounter}
              <IconButton className='control-icon-btn' id='like-btn' onClick={() => {
                //e.preventDefault();
                this.setState({likeCounter: this.state.likeCounter + 1});
              }}//onTouchTap={this.props.increment.bind(null, this.props.post.id - 1)}
                >
                <FavoriteIcon />
              </IconButton>

              {  //badgeContent={this.props.comments[this.props.post.id] ? this.props.comments[this.props.post.id].length : 0 }
            }{this.state.increaseCommentCounter}
              <IconButton className='control-icon-btn' id='com-btn' onClick={(e) => {
                e.preventDefault();
                this.setState({showComments: !this.state.showComments});


              }}>
                <CommentIcon />
              </IconButton>
            </div>
          </div>
        </div>
        {this.state.showComments && <Comments postComments={this.props.comments} comCounter={this.increaseCommentCounter}
        />}
      </li>
    ));
  }
}


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
