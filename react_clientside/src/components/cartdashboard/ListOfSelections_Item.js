import React from 'react';

const ListOfSelectionsItem = (props) => {
  console.log('listOF', props)
  return (
    <li>

      <button
        className="btn-floating waves-effect waves-light red"
        onClick={() => {
          props.handleCollapseSelected(props.location.index, false);
          props.onDelete(props.index);
        }}
      >
        <i className="material-icons">clear</i>
      </button>
      {props.id && <div className='dash-item-img' style={{backgroundImage:`url(https://maps.googleapis.com/maps/api/place/photo?maxheight=100&maxwidth=100&photoreference=${props.location.photos[0].photo_reference}&key=AIzaSyCXiqhqWirUweH866gqhPGCtSQ3tI9wMtM)`}} >
      </div>
    }
      <div className='dash-item-text'>
        <span>
          {props.location.name}
        </span>
      </div>
    </li>
  );
};


export default ListOfSelectionsItem;
