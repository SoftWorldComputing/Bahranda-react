import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CurrencyInput, SubmitButton } from "../../../../../components/Form";
import { useCenterModal } from "../../../../../components/Modal";
import { utils } from "../../../helpers";
import * as yup from "yup";
import { useFormik } from "formik";
import { usePaystackPayment } from "react-paystack";
import {
  fundWalletRequest,
  getWalletRequest,
} from "../../../../../helpers/redux/actions/wallet";

const FundWallet = () => {
  const { CenterModal, openModal, isOpen, closeModal } = useCenterModal();
  const dispatch = useDispatch();
  const { token, firstname, lastname, email, success, error, loading } =
    useSelector((state) => {
      const { token } = state.authReducer;
      const {
        loadingIndicators: { FundWallet: loading },
        success: { fundWallet: success },
        errors: { fundWallet: error },
      } = state.walletReducer;
      const {
        email,
        first_name: firstname,
        last_name: lastname,
      } = state.accountReducer.profile;
      return { token, email, firstname, lastname, success, error, loading };
    });

  const [amount, setAmount] = useState(0);
  const publicKey =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_PAYSTACK_DEV
      : process.env.REACT_APP_PAYSTACK_PROD;
  const config = {
    reference: new Date().getTime(),
    publicKey,
  };
  const initializePayment = usePaystackPayment({
    email,
    metadata: { firstname, lastname },
    ...config,
    amount: +amount.toFixed(2),
  });
  const onSuccess = useCallback(
    (res) => {
      const { reference: transaction_ref } = res;
      dispatch(
        fundWalletRequest(
          { amount: amount / 100, transactionRef: transaction_ref },
          token
        )
      );
    },
    [amount]
  );
  useEffect(() => {
    if (success) {
      dispatch(getWalletRequest(token));
      closeModal()
    }
  }, [success]);
  const onClose = useCallback(() => {}, []);
  return (
    <section>
      <SubmitButton action={openModal} text="Fund Wallet" isLoading={loading} />
      <CenterModal>
        <CurrencyInput
          label="Amount"
          value={amount}
          onValueChange={setAmount}
          placeholder="Account number"
          className="flex-equal margin-right-sm"
        />
        <div className="d-flex justify-content-end full-width">
          <button
            onClick={() => initializePayment(onSuccess, onClose)}
            className="bg-color1 ripple btn color-white"
          >
            Pay
          </button>
        </div>
      </CenterModal>
    </section>
  );
};

export default FundWallet;
