import React from 'react';
import {connect} from 'react-redux';
import {fetchGoogleData} from '../actions/';

const PlacesListItem = props =>
  <div className={`list-item-container ${props.collapseSelected}`} id='list-item-container'>
      {//console.log('placesListItem props', props)
      props.data.photos && <div className='place-img-div' style={{backgroundImage:`url(https://maps.googleapis.com/maps/api/place/photo?maxheight=300&maxwidth=300&photoreference=${props.data.photos[0].photo_reference}&key=AIzaSyCXiqhqWirUweH866gqhPGCtSQ3tI9wMtM)`}}/>
    }

    <div className='list-item-info-section'>
      <span>Type of Attraction: {JSON.stringify(props.data.types[0])}</span>
      <span>Rating: {JSON.stringify(props.data.rating)}</span>
      <a href="#" onClick={(e)=>{
        e.preventDefault();
        props.goFetchDetails(props.data.place_id);
      }}>Get more Info</a>
    </div>

        <span
        className='img-title'>{JSON.stringify(props.data.name)}
        </span>
        <div id='GDbtn'
          onClick={()=>{
            props.selectPlace(props.data, props.city);
            props.handleCollapseSelected(props.index, true);
          }}
          className="GDbtn btn-floating waves-effect waves-light">
          <i className="material-icons">add</i>
        </div>

    </div>;
const mapStateToProps = (state, ownProps) => ({
  ownProps,
  photoURL: `https://maps.googleapis.com/maps/api/place/photo?photoreference=${ownProps.data.photos[0].photo_reference}&key=AIzaSyCSDGmGBz9DSvJStHj_Pdbzk3-VeO9-loI&maxwidth=300`
});

const mapDispatchToProps = (dispatch) => ({
  goFetchDetails(placeID) {
    fetchGoogleData(null, {type: 'placeID', placeID});
  }
});

export default connect(//mapStateToProps,
   mapDispatchToProps)(PlacesListItem);
