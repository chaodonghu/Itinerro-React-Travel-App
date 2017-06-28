import React from 'react';
import {connect} from 'react-redux';
import GoogleMap from './google_map';
import SelectedPlacesList from './selected_places_list';
// import GridListExampleSimple from './GridDashboard';
import PhotoGrid from './PhotoGrid';
import {getPlacesSelection} from '../actions/databasePlacesActions';
import Photo from './Photo';
// import { Link } from 'react-router-dom';
import Comments from './trip_comments';
import {SideNav, Button, SideNavItem} from 'react-materialize';

import {findDOMNode} from 'react-dom';
import {DragSource, DropTarget} from 'react-dnd';



import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import CommentIcon from 'material-ui/svg-icons/communication/comment';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite';


class Single extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComments:false
    };
  }

  componentWillMount() {
    this.props.getPlacesSelection(this.props.user_id);
  }

  render() {
    console.log('Single Page Params', this.props);
    let tripId = this.props.match.params.postId;
    // console.log('POSTID', postId);

    let place = this.props.places.filter(function(x) { return x.id == tripId})[0]
    let placesData = [];
    let placeId, placeCity = '';

    // const id = this.props.places.findIndex((post) => post.id === postId);
    // console.log('THE ID', id);

    // let place = this.props.places[postId - 1];
    console.log('PLACE', place);
    if (place && place.places_data) {
      console.log('PLACE DATA', place.places_data);
      console.log(typeof place.places_data);
      placesData = place.places_data;
      placeId = place.id;
      placeCity = place.city;
    }

    return (
<section className='dashboard-map-sidebar-container'>

  <section className='combine-map-and-sidebar'>
    <SideNav trigger={<a id='dash-sidemenu-btn' className='btn-floating btn-large'><i className='material-icons'>reorder</i></a>} options={{ closeOnClick: true }}>
      <SideNavItem className='heading'>Trip #{placeId} to {placeCity}
      
      </SideNavItem>
      <SideNavItem divider />
      <ul><SelectedPlacesList places={placesData}/></ul>
    </SideNav>

    <div className='dash-map' style={{ display: 'flex', flexDirection: 'column', flexGrow: '1', order: 2 }}>
      <GoogleMap places={placesData}/>
    </div>
  </section>
  <div id='extras-btn' className="fixed-action-btn horizontal">
    <a className="btn-floating btn-large">
      <i className="large material-icons">assessment</i>
    </a>
      <ul>
        <li>
          <a className="btn-floating">
            <i className="material-icons">publish</i>
          </a>
        </li>
        <li>
          <a className="btn-floating" onClick={() => {
            this.setState({showComments: true});
           console.log('pop open comments section');}}>
           <i className="material-icons">format_quote</i>
          </a>
        </li>
      </ul>
  </div>

    <div className='comments-section' style={{ display: 'flex', flexDirection: 'row' }}>
      <div className='comments-section' style={{ width: '100%', height: '200px' }}>
        <Comments postComments={this.props.comments} tripId={tripId}/>
      </div>
    </div>

</section>
    )
  }
}

const mapStateToProps = (state, props) => {
  let comments = state.comments[props.match.params.postId] || [];
  return {
    user_id: state.auth.user.id,
    places: state.trips.places,
    comments: comments

  };
};

export default connect(mapStateToProps, {getPlacesSelection}
)(Single);
