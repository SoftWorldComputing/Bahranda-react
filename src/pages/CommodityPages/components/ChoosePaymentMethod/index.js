import React, { useCallback, useEffect } from "react";
import { usePaystackPayment } from "react-paystack";
import { useDispatch, useSelector } from "react-redux";
import { SubmitButton } from "../../../../components/Form";
import { useCenterModal } from "../../../../components/Modal";
import {
  payFromWalletRequest,
  purchaseCommodityRequest,
} from "../../../../helpers/redux/actions/commodity";
import ClipLoader from "react-spinners/ClipLoader";
import { HttpStatusNotification } from "../../../components";

const ChoosePaymentMethod = ({ isValid, amount, commodityDetails }) => {
  const { qty: quantity, id: commodity_id } = commodityDetails;
  const dispatch = useDispatch();
  const { token, email, firstname, lastname, error, success, loading } =
    useSelector((state) => {
      const { token } = state.authReducer;
      const {
        loadingIndicators: { payFromWallet: loading },
        success: { payFromWallet: success },
        error: { payFromWallet: error },
      } = state.commodityReducer;
      const {
        email,
        first_name: firstname,
        last_name: lastname,
      } = state.accountReducer.profile;
      return { token, email, firstname, lastname, error, success, loading };
    });
  const { CenterModal, openModal, isOpen, closeModal } = useCenterModal();
  const handlePaymentWithWallet = () => {
    dispatch(payFromWalletRequest({ commodity_id, quantity }, token));
  };
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
    amount: +amount.toFixed(2) * 100,
  });
  const onSuccess = useCallback(
    (res) => {
      const { reference: transaction_ref } = res;
      closeModal();
      dispatch(
        purchaseCommodityRequest(
          { transaction_ref, quantity, commodity_id },
          token
        )
      );
    },
    [commodity_id, quantity, token]
  );
  const onClose = useCallback(() => {}, []);
  useEffect(() => {
    if (success) {
      closeModal();
    }
  }, [success]);
  return (
    <section>
      <SubmitButton disabled={!isValid} action={openModal} text="Purchase" />
      <CenterModal>
        <div className="full-width d-flex column padding-vertical-md">
          <button
            onClick={handlePaymentWithWallet}
            className="full-width bg-color1 ripple btn color-white margin-bottom-sm full-width"
          >
            {loading ? (
              <ClipLoader size={22} color="#fff" loading={loading} />
            ) : (
              "Pay From Your Wallet"
            )}
          </button>
          <button
            onClick={() => initializePayment(onSuccess, onClose)}
            className="full-width bg-color1 ripple btn color-white margin-bottom-sm full-width"
          >
            Pay With Card
          </button>
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

export default ChoosePaymentMethod;
