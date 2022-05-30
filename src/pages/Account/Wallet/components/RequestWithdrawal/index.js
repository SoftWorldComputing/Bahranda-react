import React, { useCallback, useState, useRef, useEffect } from "react";
import { Form, HttpStatusNotification } from "../../../components";
import { utils, actions } from "../../../helpers";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MdKeyboardArrowDown } from "react-icons/md";
import PinFields from "../PinField";
import { useCenterModal } from "../../../../../components/Modal";
const { CurrencyInput, SubmitButton } = Form;
const { checkObjectProperties } = utils;
const {
  walletActions: { requestWithdrawalRequest },
} = actions;
const RequestWithdrawal = ({
  hasBankInfo,
  requestWithdrawal,
  token,
  loading,
  error,
  success,
}) => {
  const { CenterModal, isOpen, openModal } = useCenterModal();
  const [pin, setPin] = useState(["", "", "", ""]);
  const [amount, setAmount] = useState(0);
  const validateAllFields = !pin.includes("" || undefined) && amount;
  const handleWithdrawal = useCallback(() => {
    requestWithdrawal({ pin: pin.join(""), amount: amount / 100 }, token);
  }, [pin, amount, token]);
  return (
    <section className="request-withdrawal">
      <SubmitButton
        action={openModal}
        isLoading={loading}
        text="Request Withdrawal"
      />
      <CenterModal>
        <div
          className="form-content d-flex justify-content-s-between"
          style={{ maxWidth: "300px" }}
        >
          <CurrencyInput
            label="Amount"
            value={amount}
            onValueChange={setAmount}
            placeholder="Account number"
            className="flex-equal margin-right-sm"
          />
          <PinFields setPinArray={setPin} pinArray={pin} label="Wallet Pin" />
        </div>
        <div className="d-flex justify-content-end full-width">
          <SubmitButton
            action={handleWithdrawal}
            text="Request Withdrawal"
            isLoading={loading}
            disabled={!validateAllFields}
          />
        </div>
      </CenterModal>
      {(error || success) && (
        <HttpStatusNotification
          message={error || success}
          status={error ? "error" : "success"}
        />
      )}
    </section>
  );
};

const mapStateToProps = (state) => {
  const {
    bankInfo,
    loadingIndicators: { requestWithdrawal: loading },
    errors: { requestWithdrawal: error },
    success: { requestWithdrawal: success },
  } = state.walletReducer;
  const { token } = state.authReducer;
  const hasBankInfo = checkObjectProperties(bankInfo);
  return { loading, token, hasBankInfo, error, success };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ requestWithdrawal: requestWithdrawalRequest }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RequestWithdrawal);
