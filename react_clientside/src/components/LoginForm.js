import React from 'react';
import {Link} from 'react-router-dom';
import classnames from 'classnames';
import validateInput from '../../../server/shared/validations/login.js';
import TextFieldGroup from './Common/TextFieldGroup';
import { connect } from 'react-redux';
import { login } from './../actions/authActions';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import DoneIcon from 'material-ui/svg-icons/action/done';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  isValid() {
    const {errors, isValid} = validateInput(this.state);

    if (!isValid) {
      this.setState({errors});
    }
    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      console.log('User data', this.state);
      this.setState({errors: {}, isLoading: true});
      this.props.login(this.state).then(
        (res) => this.context.router.history.push('/create-trip'),
        (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
      );
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const {errors, identifier, password, isLoading} = this.state;
    return (
      <div className="panel-body">
        <div className="row">
          <div className="col-lg-12">
            <form id="login-form" onSubmit={this.onSubmit} style={{
              'display': 'block'
            }}>
            <TextFieldGroup field="identifier" label="Username / Email" value={identifier} error={errors.identifier} onChange={this.onChange}/>

            <TextFieldGroup field="password" label="Password" value={password} error={errors.password} onChange={this.onChange} type="password"/>
            <div className="form-group text-center">
                <div className="row">
                  <div className="col-sm-6 col-sm-offset-3">
                    <FloatingActionButton mini={false} disabled={isLoading} iconStyle={{'backgroundColor': '#029f5b'}}>
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

LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired
}

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(null , { login })(LoginForm);
