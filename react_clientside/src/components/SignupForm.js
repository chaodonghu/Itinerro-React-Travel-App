import React from 'react';
import {Link} from 'react-router-dom';
import classnames from 'classnames';
import validateInput from '../../../server/shared/validations/signup.js';
import TextFieldGroup from './Common/TextFieldGroup';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import DoneIcon from 'material-ui/svg-icons/action/done';

export default class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: {},
      isLoading: false,
      invalid: false
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  isValid() {
    const {errors, isValid} = validateInput(this.state);

    if (!isValid) {
      this.setState({errors});
    }
    return isValid;
  }

  checkUserExists(e) {
    const field = e.target.name;
    const val = e.target.value;
    if (val !== '') {
      this.props.isUserExists(val).then(res => {
        let errors = this.state.errors;
        let invalid;
        if (res.data.user) {
          errors[field] = 'There is already a registered user with that ' + field;
          invalid = true;
        } else {
          errors[field] = '';
          invalid = false;
        }
        this.setState({errors, invalid});
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.isValid()) {
      console.log('User data', this.state);
      this.setState({errors: {}, isLoading: true});
      this.props.userSignupRequest(this.state).then(() => {
        this.props.addFlashMessage({type: 'success', text: 'Signup sucessful. Welcome!'});
        // Directs user to create-trip page upon signing up
        this.context.router.history.push('/login');
      }, ({response}) => {
        this.setState({errors: response.data, isLoading: false})
      });
    }
  }

  render() {
    const {errors} = this.state;
    const {userSignupRequest} = this.props;
    return (
      <div className="panel-body">
        <div className="row">
          <div className="col-lg-12">
            <form id="register-form" onSubmit={this.onSubmit} style={{
              'display': 'block'
            }}>
              <TextFieldGroup error={errors.username} label="Username" onChange={this.onChange} checkUserExists={this.checkUserExists} value={this.state.username} field="username"/>
              <TextFieldGroup error={errors.email} label="Email" onChange={this.onChange} checkUserExists={this.checkUserExists} value={this.state.email} field="email"/>
              <TextFieldGroup error={errors.password} label="Password" onChange={this.onChange} value={this.state.password} field="password" type="password"/>
              <TextFieldGroup error={errors.passwordConfirmation} label="Password Confirmation" onChange={this.onChange} value={this.state.passwordConfirmation} field="passwordConfirmation" type="password"/>
              <div className="form-group text-center">
                <div className="row">
                  <div className="col-sm-6 col-sm-offset-3">
                    <FloatingActionButton mini={false} disabled={this.state.isLoading || this.state.invalid} iconStyle={{'backgroundColor': '#029f5b'}}>
                      <DoneIcon onClick={this.onSubmit}/>
                    </FloatingActionButton>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  isUserExists: React.PropTypes.func.isRequired
}

SignupForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

{/* <form id='signup-form'  onSubmit={this.onSubmit}>
  <h1>Welcome!</h1>

  <TextFieldGroup error={errors.username} label="Username" onChange={this.onChange} checkUserExists={this.checkUserExists} value={this.state.username} field="username"/>

  <TextFieldGroup error={errors.email} label="Email" onChange={this.onChange} checkUserExists={this.checkUserExists} value={this.state.email} field="email"/>

  <TextFieldGroup error={errors.password} label="Password" onChange={this.onChange} value={this.state.password} field="password" type="password"/>

  <TextFieldGroup error={errors.passwordConfirmation} label="Password Confirmation" onChange={this.onChange} value={this.state.passwordConfirmation} field="passwordConfirmation" type="password"/>

  <div className="form-group-btn">
    <button disabled = {this.state.isLoading || this.state.invalid} className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">done</i></button>
  </div>
</form> */
}
