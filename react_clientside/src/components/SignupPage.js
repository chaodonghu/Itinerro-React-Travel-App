import React from 'react';
import {Link} from 'react-router-dom';
import SignupForm from './SignupForm'
import { connect } from 'react-redux';
import { userSignupRequest, isUserExists } from './../actions/signupActions';
import { addFlashMessage } from './../actions/flashMessages';

class SignupPage extends React.Component {
  render() {
    const {userSignupRequest, addFlashMessage, isUserExists } = this.props;
    return (
      <div>
      <div className="row">
        <div className='direction-bar'></div>
        <div className ='home-main' >
        <SignupForm isUserExists={isUserExists} userSignupRequest={userSignupRequest} addFlashMessage={addFlashMessage}/>
      </div>
    </div>
    </div>
    );
  }
}

SignupPage.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  isUserExists: React.PropTypes.func.isRequired
}

export default connect(null , { userSignupRequest, addFlashMessage, isUserExists })(SignupPage);
