import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../../../helpers';
import { Form } from '../../../components';
const { authActions: { signInRequest } } = actions;
const { FormField, PasswordField, useFormInput, SubmitButton } = Form;
const SignIn = ({ signIn, loading, signInError, location: { state  } }) => {
  const { replace } = useHistory();
  const { value: email, handleUserInput: setEmail, error: emailErr, isValid: emailIsValid } = useFormInput();
  const { value: password, handleUserInput: setPassword, error: passwordErr, isValid: passIsValid } = useFormInput();
  const validateFields = emailIsValid && passIsValid;
  const handleSubmit = () => signIn({ email, password }, replace, state ? state.prevLocation : undefined)
  return (
    <main className="d-flex auth-container padding-horizontal-lg padding-vertical-md">
      <section className="auth-card border-r-10 padding-horizontal-lg padding-vertical-lg border_r_5">
        <div className="d-flex card-title margin-bottom-md">
          <Link to="/auth/signin" className="padding-sm active cursor-pointer">
            <p className="text-center uppercase font-md">log in</p>
          </Link>
          <Link to="/auth/register" className="padding-sm cursor-pointer">
            <p className="text-center uppercase font-md">sign up</p>
          </Link>
        </div>
        <form className="d-flex column fadeIn-animation" style={{width: '100%'}}>
          <div className="margin-bottom-md">
            <h1 className="font-weight-normal">Hello</h1>
            <p className="font-weight-300">Please fill in your login details</p>
          </div>
          <FormField type="email" name="email" value={email} onChange={setEmail} placeholder="Email address" err={emailErr} isValid={emailIsValid} />
          <PasswordField name="Password" value={password} onChange={setPassword} placeholder="Password" err={passwordErr} />
          <div className="margin-bottom-sm">
            {signInError && <p className="font-sm danger-text font-weight-600">Error: {signInError}</p> }
          </div>
          <Link to="/auth/forgot-password" className="color1 margin-bottom-sm">Forgot password ?</Link>
          <SubmitButton isLoading={loading} disabled={!validateFields} text="Log in" action={handleSubmit} style={{width: '100%'}} />
        </form>
      </section>
    </main>
  )
}


const mapDispatchToProps = dispatch => 
  bindActionCreators({ signIn: signInRequest }, dispatch)

const mapStateToProps = state => {
  const { isLoading: loading, errors: { signIn: signInError } } = state.authReducer;
  return { loading, signInError }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

