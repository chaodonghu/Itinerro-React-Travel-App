import React from 'react';
import {connect} from 'react-redux';
import GoogleMap from './google_map';
import SelectedPlacesList from './Selected_places_list';
// import GridListExampleSimple from './GridDashboard';
import PhotoGrid from './PhotoGrid';
import {getPlacesSelection} from '../actions/databasePlacesActions';

class RealDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log('dashboard props', this.props);
    return (
      <div>
        {/* <section className='info-bar'>
          <div className='direction-bar'>
            <span>You are going to love {this.props.cities.join('')}!</span>
            <span className='direction-additional-info'>Drag & Drop to perfect your trip!</span>
            <span className='direction-additional-info'>View your plans per day!
            </span>
          </div>
        </section> */}
        {/* <section>
          <GridListExampleSimple/>
        </section> */}
{/*
        <section className=''>
          <div className="photo-grid">
            {this.props.places.map(i =>
              <ul key={`trip-${i.id}`}>
              <h2 className='dash-city-name'>Trip #{i.id} to {i.city}</h2>
              <GoogleMap places={i.places_data}/>
              <div className='city-wrapper'>
              <h2 className='dash-city-name'>{i.city}</h2>
              <SelectedPlacesList places={i.places_data}/>
              </div>
            </ul>
          )}
          </div>
        </section> */}

        <section className=''>
            <PhotoGrid posts={this.props.places}/>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user_id: state.auth.user.id,
  places: state.trips.places
});

const mergeProps = (stateProps, dispatchProps) => {
  stateProps.places.length === 0 && getPlacesSelection(dispatchProps.dispatch, stateProps.user_id);
  return ({places: stateProps.places});
};

export default connect(mapStateToProps, dispatch => ({dispatch}), mergeProps)(RealDashboard);
