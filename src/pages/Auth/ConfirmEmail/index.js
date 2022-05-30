import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../../../helpers';
import { Spinners, Form } from '../../../components';
const { authActions: { confirmPin } } = actions;
const { useButtonSpinner } = Spinners;
const { FormField, useFormInput, SubmitButton } = Form;
const ConfirmEmail = ({ confirmPin, isLoading, pinError, userEmail }) => {
  const { replace } = useHistory()
  const { isLoading: loading, LoadingSpinner } = useButtonSpinner(isLoading);
  const { value: email, handleUserInput: setEmail, error: emailErr, isValid: emailIsValid } = useFormInput(userEmail);
  const { value: pin, handleUserInput: setPin, error: pinErr, isValid: pinIsValid } = useFormInput();
  const validateFields = emailIsValid && pinIsValid;
  const handleSubmit = () => confirmPin({ email, pin }, replace)
  return (
    <main className="d-flex flex-center auth-container padding-horizontal-lg padding-vertical-md">
      <section className="auth-card border-r-10 padding-horizontal-lg padding-vertical-lg border_r_5">
        <form className="d-flex column fadeIn-animation" style={{width: '100%'}}>
          <div className="margin-bottom-md">
            <h1 className="font-weight-normal">Account Activation</h1>
            <p className="font-weight-300">Please enter the pin that was sent to the email you provided</p>
          </div>
          <FormField name="email" value={email} onChange={setEmail} placeholder="Email address" err={emailErr} isValid={emailIsValid} />
          <FormField name="Pin" value={pin} onChange={setPin} placeholder="Pin" err={pinErr} isValid={pinIsValid} />
          <div className="margin-bottom-sm">
            {pinError && <p className="font-sm danger-text font-weight-600">Error: {pinError}</p> }
          </div>
          <SubmitButton isLoading={loading} disabled={!validateFields} spinner={LoadingSpinner} text="Activate Account" action={handleSubmit} style={{width: '100%'}} />
        </form>
      </section>
    </main>
  )
}


const mapDispatchToProps = dispatch => 
  bindActionCreators({ confirmPin }, dispatch)

const mapStateToProps = state => {
  const { isLoading, email: userEmail, errors: { pin: pinError } } = state.authReducer;
  return { isLoading, pinError, userEmail }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmail)

