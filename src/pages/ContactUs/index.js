import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, PageWrapper, HttpStatusNotification, } from '../components';
import { actions } from '../../helpers';
const { otherActions: { contactUsRequest } } = actions;
const { FormField, useFormInput, SubmitButton, TextArea, useSelectInput } = Form;

const ContactUs = ({ loading, contactUsRequest, success, error }) => {
  const { value: name, handleUserInput: setName, setValue: resetName, error: fullNameErr, isValid: fullNameIsValid } = useFormInput();
  const { value: phone, handleUserInput: setPhone, setValue: resetPhone, isValid: phoneIsValid, error: phoneErr } = useFormInput();
  const { value: email, handleUserInput: setEmail, setValue: resetEmail, error: emailErr, isValid: emailIsValid } = useFormInput();
  const { value: message, handleUserInput: setMessage, setValue: resetMessage, isValid: messageIsValid } = useFormInput();
  const { value: userType, SelectInput } = useSelectInput();
  const validateAllFields = messageIsValid && emailIsValid && fullNameIsValid && phoneIsValid && userType;
  useEffect(() => {
    if(success) {
      resetName('')
      resetPhone('')
      resetMessage('')
      resetEmail('')
    }
  })
  return (
    <PageWrapper>
      <div className="d-flex justify-content-center">        
        <div className="contact-card bg-white padding-horizontal-lg margin-vertical-md border-r-5 card">
          <h1 className="margin-bottom-sm margin-top-md font-lg font-weight-bold">Contact Us</h1>
          <form className="d-flex column fadeIn-animation" style={{width: '100%'}}>
            <p className="font-md margin-bottom-md">To get in touch please contact us directly or fill out this form, we will get in touch promptly</p>
            <div className="d-flex">
              <FormField name="name" value={name} onChange={setName} err={fullNameErr} isValid={fullNameIsValid} placeholder="Name" className="flex-equal margin-right-sm"/>
              <FormField type="tel" name="phone" value={phone} onChange={setPhone} err={phoneErr} isValid={phoneIsValid} min={11} max={14} placeholder="Phone Number" className="flex-equal" />
            </div>
            <FormField type="email" name="email" value={email} onChange={setEmail} err={emailErr}  placeholder="Email" isValid={emailIsValid} />
            <SelectInput className="margin-bottom-md" label="Account type" name="account type" options={["Manufacturer", "Dealer"]} placeholder="Account type" />
            <TextArea name="send message" label="Message" value={message} onChange={setMessage} placeholder="Type your message..." />
            <SubmitButton
              text="SEND"
              disabled={!validateAllFields}
              className="padding-horizontal-lg"
              isLoading={loading}
              action={() => contactUsRequest({ name, phone, email, message, user_type: userType.value }) }
            />
            {(error || success) && <HttpStatusNotification  message={error || success} status={error ? 'error' : 'success'}  />}
          </form>
        </div>
      </div>
    </PageWrapper>
  )
}

const mapStateToProps = state => {
  const {
    loadingIndicators: { contactUs: loading },
    success: { contactUs: success },
    errors: { contactUs: error }
  } = state.otherReducer
  return { loading, success, error }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ contactUsRequest }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
