import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, HttpStatusNotification, SectionTitle } from '../../../components';
import { actions } from '../../../../../helpers'
const { FormField, useFormInput, useSelectInput, SubmitButton } = Form;
const { accountActions: { updateProfileRequest } } = actions;
const Profile = ({ profile, updateProfileRequest, token, loading, success, error }) => {
  const { value: sex, SelectInput } = useSelectInput(profile.sex);
  const { value: first_name, handleUserInput: setFirstName, isValid: firstNameIsValid, error: firstNameErr } = useFormInput(profile.first_name);
  const { value: last_name, handleUserInput: setLastName, isValid: lastNameIsValid, error: lastNameErr } = useFormInput(profile.last_name);
  const { value: phone, handleUserInput: setPhone, isValid: phoneIsValid, error: phoneErr } = useFormInput(profile.phone ? profile.phone : '');
  const { value: email, handleUserInput: setEmail, error: emailErr, isValid: emailIsValid } = useFormInput(profile.email);
  const validateAllFields = firstNameIsValid && lastNameIsValid && phoneIsValid
  return (
    <section className="overflow-h slim-border-2 padding-horizontal-md margin-bottom-md bg-white summary">
      <SectionTitle title="Profile" />
      <div className="d-flex">
        <SelectInput label="Sex" options={['male', 'female']} className="margin-right-sm margin-bottom-sm name-title" />
        <FormField name="name" value={first_name} onChange={setFirstName} placeholder="First name" err={firstNameErr} isValid={firstNameIsValid}  className="flex-equal margin-right-sm" />
        <FormField name="name" value={last_name} onChange={setLastName} placeholder="Last name" err={lastNameErr} isValid={lastNameIsValid} className="flex-equal" />
      </div>
      <div className="d-flex">
        <FormField type="tel" name="phone" value={phone} onChange={setPhone} placeholder="Phone" err={phoneErr} isValid={phoneIsValid} min={11} max={14} className="flex-equal margin-right-sm" />
        <FormField type="email" name="email" value={email} onChange={setEmail} placeholder="Email address" err={emailErr} isValid={emailIsValid} disabled={true} className="flex-equal" />
      </div>
      <SubmitButton text="SAVE CHANGES" isLoading={loading} disabled={!validateAllFields}
        action={() => updateProfileRequest({ first_name, last_name, sex: sex.value, phone }, token)}
      />
      {(error || success) && <HttpStatusNotification  message={error || success} status={error ? 'error' : 'success'}  />}
    </section>
  )
}

const mapStateToProps = state => {
  const { profile, loadingIndicators: { updateProfile }, success, errors } = state.accountReducer;
  const { token } = state.authReducer;
  return {
    profile, token, loading: updateProfile,
    success: success.updateProfile,
    error: errors.updateProfile
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateProfileRequest }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
