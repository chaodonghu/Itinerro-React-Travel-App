import React from 'react';
import {connect} from 'react-redux';
import GoogleMap from './google_map';
import SelectedPlacesList from './selected_places_list';
import {getPlacesSelection} from '../actions/databasePlacesActions';

import Comments from './trip_comments';
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
            <section key={leg.city}>
              <h2>Places in {leg.city}</h2>
              <ul>
                <SelectedPlacesList places={leg.places_data}/>
              </ul>
            </section>
          )}
        </SideNav>
        {//<SideNavItem className='heading'>
        //</SideNavItem>
        //<SideNavItem divider />
      }

        <div className='dash-map'
          style={{ display: 'flex', flexDirection: 'column', flexGrow: '1', order: 2 }}
        >
          {this.props.places.length > 0 && <GoogleMap places={this.props.places[0].places_data}/>
        }
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
          {
            //<Comments postComments={this.props.comments} tripId={tripId}/>
          }
        </div>
      </div>

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
    comments
  };
};

const mergeProps = (stateProps, dispatchProps) => {
  stateProps.places.length === 0 && getPlacesSelection(dispatchProps.dispatch, {type: 'trip_id', trip_id: stateProps.trip_id});
  return ({places: stateProps.places});
};

export default connect(mapStateToProps, dispatch => ({dispatch}), mergeProps)(ItineraryView);
