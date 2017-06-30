import React from 'react';
import {Link} from 'react-router-dom';
import ReactDom from 'react-dom';
import Avatar from 'material-ui/Avatar';

export default class Intro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <section className="intro">
        <div className="container">
          <div className="row justify-content-start">
            <div className="col-lg-8">
              <div id="intro-content">
                <h2 className="section-header">About Us.</h2>
                  <div className="row">
                    <div className="col-lg-6">
                      <Link to='https://www.github.com/chaodonghu'>
                      <Avatar src="static/images/dong.png" size={200}/>
                      <h3 className="lead text-muted">
                      Dong
                      @chaodonghu

                    </h3>
                    </Link>
                    </div>
                    <div className="col-lg-6">
                      <Link to='https://www.github.com/ssbelle'></Link>
                      <Avatar src="static/images/shawna.jpg" size={200}/>
                      <h3 className="lead text-muted">
                      Shawna
                      @ssbelle
                    </h3>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-end">
            <div className="col-lg-offset-7">
              <div id="intro-content">
                <h2 className="section-header">What is Itineroo?</h2>
                <ol>
                <h3 className="lead text-muted" style={{'textAlign': 'left'}}>
                  <li>Build a "wishlist" of destinations where you'd like to travel and experience.</li>
                  <li>Make decisions based on each location's reviews, type and photos.</li>
                  <li>Share your list with friends and family and collaborate on a desired itinerary</li>
                  <li>Explore!</li>
                </h3>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
