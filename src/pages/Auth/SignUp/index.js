import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../../../helpers';
import { Form } from '../../../components';
import { others } from '../../../helpers/redux/types';

const { authActions: { signUpRequest } } = actions;
const { FormField, PasswordField, useFormInput, useSelectInput, SubmitButton, useCheckbox } = Form;
const SignUp = ({ signUp, loading, signUpError }) => {
  const { replace } = useHistory();
  const { value: first_name, handleUserInput: setFirstName, error: firstNameErr, isValid: firstNameIsValid } = useFormInput();
  const { value: phone, handleUserInput: setPhone, isValid: phoneIsValid, error: phoneErr } = useFormInput();
  const { value: last_name, handleUserInput: setLastName, error: lastNameErr, isValid: lastNameIsValid } = useFormInput();
  const { value: email, handleUserInput: setEmail, error: emailErr, isValid: emailIsValid } = useFormInput();
  const { value: password, handleUserInput: setPassword, error: passwordErr, isValid: passIsValid } = useFormInput();
  const { value: password_confirmation, handleUserInput: setPassword2 } = useFormInput();
  const { checked, Checkbox } = useCheckbox();
  const { value: sex, SelectInput } = useSelectInput();

  const validatePassword = password !== password_confirmation ? 'Passwords do not match' : '';
  const validateFields = emailIsValid && passIsValid && firstNameIsValid &&
    lastNameIsValid &&  password === password_confirmation && checked;

  const handleSubmit = () => signUp({ first_name, last_name, email, password, password_confirmation, phone, sex: sex.value }, replace)
  return (
    <main className="d-flex auth-container padding-horizontal-lg padding-vertical-md">
      <section className="auth-card border-r-10 padding-horizontal-lg padding-vertical-lg border_r_5">
        <div className="d-flex card-title margin-bottom-md">
          <Link to="/auth/signin" className="padding-sm cursor-pointer">
            <p className="text-center uppercase font-md">log in</p>
          </Link>
          <Link to="/auth/register" className="padding-sm active cursor-pointer">
            <p className="text-center uppercase font-md">sign up</p>
          </Link>
        </div>
        <form className="d-flex column fadeIn-animation" style={{width: '100%'}}>
          <div className="margin-bottom-md">
            <h1 className="font-weight-normal">Hello</h1>
            <p className="font-weight-300">Please fill in your details</p>
          </div>
          <div className="d-flex justify-content-s-between" style={{width: '100%'}}>
            <FormField name="name" value={first_name} onChange={setFirstName} placeholder="First name" err={firstNameErr} isValid={firstNameIsValid}  className="flex-equal margin-right-sm" />
            <FormField name="name" value={last_name} onChange={setLastName} placeholder="Last name" err={lastNameErr} isValid={lastNameIsValid} className="flex-equal" />
          </div>
          <FormField type="email" name="email" value={email} onChange={setEmail} placeholder="Email address" err={emailErr} isValid={emailIsValid} />
          <FormField type="tel" name="phone" value={phone} onChange={setPhone} placeholder="Phone" err={phoneErr} isValid={phoneIsValid} className="flex-equal margin-right-sm" max={14} min={11} />
          <SelectInput label="Sex" options={['male', 'female']} className=" margin-right-sm name-title" />
          <PasswordField name="password" value={password} onChange={setPassword} placeholder="Password" err={passwordErr} />
          <PasswordField name="password" value={password_confirmation} onChange={setPassword2} placeholder="Confirm password" err={validatePassword} />
          <div className="d-flex nowrap margin-bottom-md">
            <Checkbox checked={checked} />
            <div className="d-flex column checkbox">
              <p className="margin-left-sm font-sm">
                I agree to 
                <Link to="/terms" className="color1 margin-horizontal-xsm">terms of services</Link>
                and
                <Link to="/privacy-policy" className="color1 margin-horizontal-xsm">Privacy policy</Link>
              </p>
            </div>
          </div>
          <div className="margin-bottom-sm">
            {signUpError && <p className="font-sm danger-text font-weight-600">Error: {signUpError}</p> }
          </div>
          <SubmitButton disabled={!validateFields} isLoading={loading} text="Sign Up" action={handleSubmit} style={{width: '100%'}} />
        </form>
      </section>
    </main>
  )
}

const mapDispatchToProps = dispatch => 
  bindActionCreators({ signUp: signUpRequest }, dispatch)

const mapStateToProps = state => {
  const { isLoading: loading, errors: { signUp: signUpError } } = state.authReducer;
  return { loading, signUpError }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
