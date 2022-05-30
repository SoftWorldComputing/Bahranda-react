import React, { useState } from 'react';
import { Form, HttpStatusNotification, SectionTitle } from '../../../components';
import { utils, actions } from '../../../helpers';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PinFields from '../PinField';
const { useSelectInput, FormField, useFormInput, SubmitButton } = Form;
const { bankNames } = utils;
const { walletActions: { updateBankInfoRequest } } = actions;
const AccountInformation = ({
  bankInfo, token, updateBankInfoRequest, loading, error, success
}) => {
  const { value: bankName, SelectInput } = useSelectInput(bankInfo.bank_name);
  const { value: account_no, handleUserInput: setAccountNo, isValid: accountNoIsValid, error: accountNoErr } = useFormInput(bankInfo.account_no);
  const { value: account_name, handleUserInput: setAccountName, isValid: accountNameIsValid, error: accountNameErr } = useFormInput(bankInfo.account_name);
  const [pin, setPin] = useState(['', '', '', ''])
  const validateAllFields = bankName && !pin.includes('') && accountNoIsValid && accountNameIsValid
  return (
    <section className="account-information slim-border-2 padding-horizontal-md margin-bottom-md bg-white activity">
      <h2 className="font-weight-500 font-style-normal font-lg slim-border-bottom padding-vertical-sm margin-bottom-md">Bank Details</h2>
      <div className="d-flex justify-content-s-between">
        <SelectInput isSearchable={true} label="Bank name" placeholder="Select bank" options={[...bankNames]} className="flex-equal margin-right-sm margin-bottom-sm" />
        <FormField value={account_no} name="account number" onChange={setAccountNo} placeholder="Account number" err={accountNoErr} isValid={accountNoIsValid} min={10} max={10} className="flex-equal margin-right-sm" />
        <FormField value={account_name} name="Account name" onChange={setAccountName} placeholder="Account name" err={accountNameErr} isValid={accountNameIsValid} className="flex-equal" />
      </div>
      <PinFields setPinArray={setPin} pinArray={pin} label="Wallet Pin" />
      <SubmitButton action={() => updateBankInfoRequest({ pin: pin.join(''), account_name, account_no, bank_name: bankName.value }, token)}
        text="SUBMIT CHANGES" isLoading={loading} disabled={!validateAllFields} />
        {(error || success) && <HttpStatusNotification  message={error || success} status={error ? 'error' : 'success'}  />}
    </section>
  )
}

const mapBankDetailsToProps = state => {
  const {
    bankInfo,
    loadingIndicators: { bankInfo: loading },
    errors: { bankInfo: error },
    success: { bankInfo: success }
  } = state.walletReducer;
  const { token } = state.authReducer;
  return { bankInfo, token, loading, error, success }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateBankInfoRequest }, dispatch)
export default connect(mapBankDetailsToProps, mapDispatchToProps)(AccountInformation);