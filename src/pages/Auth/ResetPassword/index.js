import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../../../helpers';
import { Form } from '../../../components';
const { authActions: { resetPasswordRequest } } = actions;
const { PasswordField, useFormInput, SubmitButton } = Form;

const ResetPassword = ({ error, checkPin: { email, pin }, isLoading, resetPasswordRequest, history: { replace } }) => {
  useLayoutEffect(() => {
    if(!email && !pin) replace('/auth/forgot-password')
  }, [email, pin, replace])
  const { value: password, handleUserInput: setNewPass, isValid: newPassIsValid, error: newPassErr } = useFormInput();
  const { value: password_confirmation, handleUserInput: setNewPass2 } = useFormInput();
  const validatePasswords = password !== password_confirmation ? 'Passwords do not match' : '';
  const validateAllFields =  newPassIsValid && password === password_confirmation;
  const handleSubmit = () => resetPasswordRequest({ email, pin, password, password_confirmation }, replace)
  return (
    <main className="d-flex auth-container padding-horizontal-lg padding-vertical-md">
      <section className="auth-card border-r-10 padding-horizontal-lg padding-vertical-lg border_r_5">
        <form className="d-flex column fadeIn-animation" style={{width: '100%'}}>
          <h1 className="font-weight-normal margin-bottom-md">Reset Password</h1>
          <PasswordField name="password" value={password} onChange={setNewPass} placeholder="New password" err={newPassErr} className="flex-equal margin-right-sm" autoComplete="new-password" />
          <PasswordField name="password" value={password_confirmation} onChange={setNewPass2} placeholder="Confirm new password" err={validatePasswords} className="flex-equal" autoComplete="new-password" />
          <div className="margin-bottom-sm">
            {error && <p className="font-sm danger-text font-weight-600">Error: {error}</p> }
          </div>
          <SubmitButton isLoading={isLoading} disabled={!validateAllFields} text="Reset Password" action={handleSubmit} style={{width: '100%'}} />
        </form>
      </section>
    </main>
  )
}

const mapDispatchToProps = dispatch => 
  bindActionCreators({ resetPasswordRequest }, dispatch)

const mapStateToProps = state => {
  const {
    isLoading,
    success: { checkPin },
    errors: { resetPassword: error }
  } = state.authReducer;
  return { isLoading, error, checkPin }
}


export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
