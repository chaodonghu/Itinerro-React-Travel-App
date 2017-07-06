import React from 'react';
import {Link} from 'react-router-dom';
import ReactDom from 'react-dom';
import FlatButton from 'material-ui/FlatButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import MapsFlight from 'material-ui/svg-icons/maps/flight';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className='home-page-header'>
        <div className="col-md-10 col-md-offset-1">
          <div className="header-content">
            <div className="header-content-inner">
              <h1>Plan. Discuss. Travel.</h1>
              <h5>Keep it <span style={{'fontWeight': '900', 'textDecoration': 'underline'}}>"plane"</span> and simple.</h5>
              <h5>Take the stress out of extensive trip planning and collaborating procedures</h5>
              <Link to="/signup">
                <FlatButton style={{
                  color: '#fff',
                  height: '100px',
                  width: '200px',
                }} label="Signup" labelStyle={{ fontSize: '25px'}} labelPosition="before" primary={true} icon={< ContentCreate />}/>
              </Link>
              <Link to="/login">
                <FlatButton style={{
                  color: '#fff',
                  height: '100px',
                  width: '200px',
                }} label="Login" labelStyle={{ fontSize: '25px'}} labelPosition="before" primary={true} icon={< MapsFlight />}/>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
