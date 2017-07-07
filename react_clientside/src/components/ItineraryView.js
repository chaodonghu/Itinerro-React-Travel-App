import React from 'react';
import {connect} from 'react-redux';
import GoogleMap from './google_map';
import SelectedPlacesList from './Selected_places_list';
import {getPlacesSelection} from '../actions/databasePlacesActions';

import {SideNav, Button, SideNavItem} from 'react-materialize';

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import CommentIcon from 'material-ui/svg-icons/communication/comment';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite';

class ItineraryView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComments:false
    };
  }

  changeMap(leg) {
    this.setState({mapData: leg});
  }

  render() {
    //console.log('Dashboard props', this.props)
    return (
      <section className='dashboard-map-sidebar-container'>
        <section className='combine-map-and-sidebar'>
          <SideNav options={{ closeOnClick: true }}
            trigger={
              <a id='dash-sidemenu-btn' className='btn-floating btn-large'>
                <i className='material-icons'>reorder</i>
              </a>}
            >
            { this.props.places.map(leg =>
              <li key={leg.city+leg.places_data.length+(new Date())}
              >
                <div className='places-title'>
                  <h2 onClick={() =>
                    this.changeMap(leg.places_data)
                  }
                  >
                    Places in {leg.city}
                  </h2>
                </div>
                <ul>
                  <SelectedPlacesList places={leg.places_data}/>
                </ul>
              </li>
            )}
          </SideNav>
          {//<SideNavItem className='heading'>
          //</SideNavItem>
          //<SideNavItem divider />
          }

          <div className='dash-map'
            style={{ display: 'flex', flexDirection: 'column', flexGrow: '1', order: 2 }}
          >
            {this.props.places.length > 0 && <GoogleMap key={this.state.mapData} places={this.state.mapData || this.props.places[0].places_data}/>
          }
          </div>
        </section>

        <div id='extras-btn' className="fixed-action-btn horizontal">
          <a className="btn-floating btn-large">
            <i className="large material-icons"><img id='share-icon' src='/static/images/share-icon.png' /></i>
          </a>
          <ul>
            <li>
              <a className="btn-floating red" id='download-icon'>
               <i className='material-icons'><img id='download-icon' src='/static/images/download-icon.png' /></i>
              </a>
            </li>
            <li>
              <a className="btn-floating" onClick={() => {
                this.setState({showComments: true});
               console.log('pop open comments section');}}>
               <i className="material-icons">email</i>
              </a>
            </li>
          </ul>
        </div>

        {// <div className='comments-section' style={{ display: 'flex', flexDirection: 'row' }}>
        //   <div className='comments-section' style={{ width: '100%', height: '200px' }}>
        //     {
        //       //<Comments postComments={this.props.comments} tripId={tripId}/>
        //     }
        //   </div>
        // </div>
      }

      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const comments = state.comments[ownProps.match.params.postId] || [];
  return {
    trip_id: ownProps.match.params.trip_id,
    user_id: state.auth.user.id,
    places: state.trips.places,
    comments: state.comments || []
  };
};

const mergeProps = (stateProps, dispatchProps) => {
  getPlacesSelection(dispatchProps.dispatch, stateProps.places, {type: 'trip_id', id: stateProps.trip_id});
  return ({places: stateProps.places});
};

export default connect(mapStateToProps, dispatch => ({dispatch}), mergeProps)(ItineraryView);
