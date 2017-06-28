import React, {Component} from 'react';
import CartDashboard from './CartDashboard';
// import Calendar from './calendar';
import GooglePlacesSuggest from './GooglePlacesSuggest';

import {connect} from 'react-redux';
import {selectPlace, storeDates, fetchGoogleData} from '../actions/';

class CreateTrip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      processStep: 'step-1',
      processPath: false,
      datesTerm: '',
      selectedCoordinate: null,
      trip_id: 1
    };
  }

  // Handle search change for where to?
  handleSearchChange(e) {
    this.setState({searchTerm: e.target.value});
  }

  // Handle suggestions for where to?
  handleSelectSuggest(suggest, coordinate) {
    this.setState({searchTerm: suggest.description, selectedCoordinate: coordinate});
  }

  render() {
    // console.log('layout props', this.props);
    return (
      <main>
        {this.props.showResults ?
        // there's results to show.
          <CartDashboard
            selectPlace={this.props.selectPlace}
            searchTerm={this.props.queryData.destination}
            trip_id={this.props.queryData.trip_id}
            storeDates={this.state.datesTerm}
            results={this.props.locationsData}
          /> :

        // path choice (i.e. creation or joining)
          <section className='creating-trip'>
            <section className='info-bar'>
              <div className='direction-bar'></div>
            </section>
            <section className={`trip-section ${this.state.processStep}`}>
            {
              // step 1
            }
              <section className='choose-path-container'>
                <div className='path-container create'>
                  <button
                    onClick={() =>
                    this.setState({
                      processStep: 'step-2',
                      processPath: 'create',
                      trip_id: this.state.trip_id++
                    })}
                    className="path-btn create-a-trip-btn waves-effect waves-light btn">
                    <img src='/static/images/create-a-trip-btn.png'/>
                  </button>
                </div>
                <div className='path-container join'>
                  <button onClick={() => this.setState({processStep: 'step-2', processPath: 'join'})} className="path-btn create-a-trip-btn waves-effect waves-light btn">
                    <img src='/static/images/join-a-trip-btn.png'/>
                  </button>
                </div>
              </section>
            {
              // step 2
            }
              <section className='create-trip-section'>
                <i className="fa fa-arrow-left backBtn" aria-hidden="true" onClick={() => this.setState({processStep: 'step-1'})}>Back</i>

                {this.state.processPath === 'create' ?
                // Creation path
                  <section className='path-forms'>
                    <h1>CREATE A TRIP</h1>
                    <div className='input-field'>
                      <GooglePlacesSuggest onChange={this.handleSearchChange.bind(this)} onSelectSuggest={this.handleSelectSuggest.bind(this)} query={this.state.searchTerm}/>
                    </div>
                    <div className='input-field'>
                      <input id="dates_input" type="text" className="dates" value={this.state.datesTerm} onChange={event => this.setState({datesTerm: event.target.value})}/>
                      <label>How many days are you travelling?</label>
                    </div>
                    <button className='go-fetch-btn' onClick={() => {
                      this.props.storeDates(this.state.datesTerm || '');
                      this.props.goFetchLocations(this.state.searchTerm, this.state.trip_id);
                    }}>Create!</button>
                  </section> :
                // joining path
                  <section className='path-forms'>
                    <h1>JOIN A TRIP</h1>
                    <div className='input-field'>
                      <input id="destination_input" type="text" className="validate" value={this.state.searchTerm} onChange={() => {
                        console.log('capture this term as trip id and check against db');
                      }}/>
                      <label>Enter your Trip ID here!</label>
                    </div>
                    <button className='go-fetch-btn' onClick={() => {
                      console.log('attach this btn to a function that selects the trip id from the db and shows those choices');
                    }}>Join!</button>
                  </section>
                }
              </section>
            </section>
          </section>
        }
      </main>
    );
  }
}

const mapStateToProps = state => ({
  showResults: state.searchResults.showResults,
  locationsData: state.searchResults.locationsData,
  queryData: state.searchResults.queryData
});

const mapDispatchToProps = dispatch => {
  // console.log('layout dispatch', dispatch);
  return {
    selectPlace: (place, city) => dispatch(selectPlace(place, city)),
    storeDates: (datesLength) => dispatch(storeDates(datesLength)),
    goFetchLocations(query, trip_id) {
      fetchGoogleData(dispatch, {type:'place', destination:query, trip_id});
    }
  };
};

export default connect(mapStateToProps, //grabbing pieces of information from global state
    mapDispatchToProps)(CreateTrip);
