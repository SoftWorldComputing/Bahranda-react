import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../../../helpers';
import { Form } from '../../../components';
const { authActions: { checkPinRequest } } = actions;
const { FormField, useFormInput, SubmitButton } = Form;

const ForgotPasswordPin = ({ checkPinRequest, isLoading, error, userEmail }) => {
  const { replace } = useHistory()
  const { value: email, handleUserInput: setEmail, error: emailErr, isValid: emailIsValid } = useFormInput(userEmail);
  const { value: pin, handleUserInput: setPin, error: pinErr, isValid: pinIsValid } = useFormInput();
  const validateFields = emailIsValid && pinIsValid;
  const handleSubmit = () => checkPinRequest({ email, pin }, replace)
  return (
    <main className="d-flex auth-container padding-horizontal-lg padding-vertical-md">
      <section className="auth-card border-r-10 padding-horizontal-lg padding-vertical-lg border_r_5">
        <form className="d-flex column fadeIn-animation" style={{width: '100%'}}>
          <div className="margin-bottom-md">
            <h1 className="font-weight-normal">Validate Pin</h1>
            <p className="font-weight-300">Please enter the pin that was sent to the email you provided</p>
          </div>
          <FormField name="email" value={email} onChange={setEmail} placeholder="Email address" err={emailErr} isValid={emailIsValid} />
          <FormField name="Pin" value={pin} onChange={setPin} placeholder="Pin" err={pinErr} isValid={pinIsValid} />
          <div className="margin-bottom-sm">
            {error && <p className="font-sm danger-text font-weight-600">Error: {error}</p> }
          </div>
          <SubmitButton isLoading={isLoading} disabled={!validateFields} text="Verify Pin" action={handleSubmit} style={{width: '100%'}} />
        </form>
      </section>
    </main>
  )
}

const mapDispatchToProps = dispatch => 
  bindActionCreators({ checkPinRequest }, dispatch)

const mapStateToProps = state => {
  const { isLoading, email: userEmail, errors: { checkPin: error } } = state.authReducer;
  return { isLoading, error, userEmail }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPin);
