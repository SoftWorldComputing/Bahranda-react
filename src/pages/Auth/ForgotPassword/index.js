import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../../../helpers';
import { Form } from '../../../components';
const { authActions: { forgotPasswordRequest } } = actions;
const { FormField, useFormInput, SubmitButton } = Form;

const ForgotPassword = ({ isLoading, error, forgotPasswordRequest }) => {
  const { replace } = useHistory()
  const { value: email, handleUserInput: setEmail, error: emailErr, isValid: emailIsValid } = useFormInput();
  const handleSubmit = () => forgotPasswordRequest({ email }, replace)
  return (
    <main className="d-flex auth-container padding-horizontal-lg padding-vertical-md">
      <section className="auth-card border-r-10 padding-horizontal-lg padding-vertical-lg border_r_5">
        <form className="d-flex column fadeIn-animation" style={{width: '100%'}}>
          <div className="margin-bottom-md">
            <h1 className="font-weight-normal">Forgot Password</h1>
            <p className="font-weight-300">Please provide your email to help us find your account</p>
          </div>
          <FormField type="email" name="email" value={email} onChange={setEmail} placeholder="Email address" err={emailErr} isValid={emailIsValid} />
          <div className="margin-bottom-sm">
            {error && <p className="font-sm danger-text font-weight-600">{error}</p> }
          </div>
          <SubmitButton isLoading={isLoading} disabled={!emailIsValid} text="Continue" action={handleSubmit} style={{width: '100%'}} />
        </form>
      </section>
    </main>
  )
}

const mapDispatchToProps = dispatch => 
  bindActionCreators({ forgotPasswordRequest }, dispatch)

const mapStateToProps = state => {
  const { isLoading, errors: { forgotPassword: error } } = state.authReducer;
  return { isLoading, error }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
