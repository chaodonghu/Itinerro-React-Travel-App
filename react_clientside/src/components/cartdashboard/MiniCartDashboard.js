import React from 'react';
import {connect} from 'react-redux';
import ListOfSelections from './ListOfSelections';
import {deletePlace} from '../../actions';
import {submitPlacesSelection} from '../../actions/databasePlacesActions';
import * as selectors from '../../reducers/rootReducer';

class MiniCartDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler() {
    this.props.places.length > 0 ?
      this.props.submitPlacesSelection({
        data: {
          city: this.props.city,
          places: this.props.places,
          trip_id: this.props.trip_id
        }
      })
      .then(result => {
        console.log('if any', result);
        //this.context.router.history.push(`/itinerary/${this.props.trip_id}`);
      })
      .catch((reason) => alert('failure to submit because of', reason)) :
    console.log('nope, needs places. gtfo')
  }

  render() {
    return (
      <div className='cart-selections-container'>

      <button onClick={this.onClickHandler} className="submit btn waves-effect waves-light">Submit your Selections</button>
        <section className='dash-section'>
          <ListOfSelections
            places={this.props.places}
            onItemDelete={this.props.handleItemDelete}
            handleCollapseSelected={this.props.handleCollapseSelected}
          />
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  places: selectors.selectedPlacesEnhancer(state),
  submitPlacesSelection(data) {
    return new Promise((resolve, reject) => {
      submitPlacesSelection(data);
      resolve(setTimeout(()=> console.log('waited so long'), 1000));
    });
  }
});

const mapDispatchToProps = dispatch => {
  return {
    handleItemDelete: (index) => {
      dispatch(deletePlace(index));
    }
  }
};

MiniCartDashboard.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps, //grabbing pieces of information from global state,
    mapDispatchToProps)(MiniCartDashboard);
