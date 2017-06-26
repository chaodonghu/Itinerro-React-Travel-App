
import React from 'react';
import {connect} from 'react-redux';
import GoogleMap from './google_map';
import SelectedPlacesList from './selected_places_list';
// import GridListExampleSimple from './GridDashboard';
import PhotoGrid from './PhotoGrid';
import {getPlacesSelection} from '../actions/databasePlacesActions';
import Photo from './Photo';
// import { Link } from 'react-router-dom';
// import Comments from './Comments';

class Single extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    this.props.getPlacesSelection(this.props.user_id);
    console.log('component will mount', this.props);
  }

  componentDidMount() {
    console.log('component did mount', this.props);
  }

  render() {
    console.log('PARAMS', this.props);
    let postId = this.props.match.params.postId;
    console.log('POSTID', postId);

    let place = this.props.places.filter(function(x) { return x.id == postId})[0]
    let placesData = [];

    // const id = this.props.places.findIndex((post) => post.id === postId);
    // console.log('THE ID', id);

    // let place = this.props.places[postId - 1];
    console.log('PLACE', place);
    if (place && place.places_data) {
      console.log('PLACE DATA', place.places_data);
      placesData = place.places_data;
    }

    // const postComments = this.props.comments[postId] || [];

    return (
      <div>
      <section className='info-bar'>
        <div className='direction-bar'>

          {/* <span>You are going to love {this.props.cities.join('')}!</span> */}
          <span className='direction-additional-info'>Drag & Drop to perfect your trip!</span>
          <span className='direction-additional-info'>View your plans per day!
          </span>
        </div>
      </section>
      <section className='dash-section'>
        <ul className=''>
        {/* <ul key={`trip-${place.id}`}> */}
        {/* <h2 className='dash-city-name'>Trip #{placesData.id} to {placesData.city}</h2> */}
        <GoogleMap places={placesData}/>
        {/* <div className='city-wrapper'> */}
        {/* <h2 className='dash-city-name'>{i.city}</h2> */}
        <SelectedPlacesList places={placesData}/>
        {/* </div> */}
      </ul>
        {/* <Photo id={id} post={post} /> */}
        {/* <Comments postComments={postComments} /> */}
      </section>
    </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user_id: state.auth.user.id,
    places: state.trips.places
  };
};

export default connect(mapStateToProps, {getPlacesSelection}
)(Single);
