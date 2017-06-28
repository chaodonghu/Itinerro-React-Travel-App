import React from 'react';
import {connect} from 'react-redux';
import GoogleMap from './google_map';
import SelectedPlacesList from './selected_places_list';
// import GridListExampleSimple from './GridDashboard';
import PhotoGrid from './PhotoGrid';
import {getPlacesSelection} from '../actions/databasePlacesActions';

class RealDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    this.props.getPlacesSelection(this.props.user_id);
    console.log('component did mount', this.props);
  }

  render() {
    // console.log('RealDashboard', this.state);
    console.log('COMPONENT MOUNTED', this.props)
    console.log('PLACES ID', this.props.places[0] )
    // debugger;
    return (
      <div>
        <section className='info-bar'>
          <div className='direction-bar'>
          </div>
        </section>
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
    )
  }
}

const mapStateToProps = state => {
  console.log('real_dashboard state', state)
  return {
    // cities: Object.keys(state.selectedPlaces),
    // storeDates: state.storeDates,
    user_id: state.auth.user.id,
    places: state.trips.places
  };
};

export default connect(mapStateToProps, {getPlacesSelection} //grabbing pieces of information from global state
//  mapDispatchToProps
)(RealDashboard);
