import React, { useCallback, Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Modal } from '../../../components'
import { usePaystackPayment } from 'react-paystack';
import { actions } from '../../helpers'
import { IoMdCheckmark } from 'react-icons/io';
import { commodity } from '../../../../helpers/redux/types';
const { useCenterModal } = Modal;
const { commodityActions: { purchaseCommodityRequest, purchaseCommodityFailure } } = actions;
const { SubmitButton } = Form;

const PaystackPayment = ({ isValid, token, purchase, amount, email, success, firstname, lastname, loading, commodityDetails }) => {
  const { qty: quantity, id: commodity_id } = commodityDetails
  const { openModal, CenterModal } = useCenterModal();
  const publicKey = process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_PAYSTACK_DEV
    : process.env.REACT_APP_PAYSTACK_PROD
  const config = {
    reference: (new Date()).getTime(),
    publicKey
  };
  const initializePayment = usePaystackPayment({
    email, metadata: { firstname, lastname },
    ...config,
    amount: +amount.toFixed(2) * 100
  });
  const onSuccess = useCallback(res => {
    const { reference: transaction_ref } = res;
    purchase({ transaction_ref, quantity, commodity_id }, token)
  }, [commodityDetails, purchase, token, commodity_id]);
  const onClose = useCallback(() => {
  }, []);
  useEffect(() => {
    if(success) openModal()
  }, [success, openModal])

  return (
    <Fragment>
      <SubmitButton
        disabled={loading || !isValid}
        isLoading={loading}
        action={() => initializePayment(onSuccess, onClose)}
        text="Purchase"
      />
      {success && (
        <CenterModal>
          <div className="d-flex column flex-center" style={{width: '250px'}}>
            <h3 className="font-md color1 font-weight-600 text-center margin-bottom-sm">Payment Successful</h3>
            <div className="d-flex flex-center bg-color1 border-r-circle margin-bottom-sm" style={{width:'50px', height: '50px'}}>
              <IoMdCheckmark className="color-white font-xlg" />
            </div>
            <p className="font-sm font-weight-600 text-center">Your Payment was successful and has been recorded</p>
          </div>
        </CenterModal>
      )}
    </Fragment>
  );
}

const mapStateToProps = state => {
  const { token } = state.authReducer;
  const { email, first_name: firstname, last_name: lastname } = state.accountReducer.profile;
  const {
    loadingIndicators: { purchaseCommodity: loading },
    success: { purchaseCommodity: success }
  } = state.commodityReducer;
  return { token, email, success, firstname, lastname, loading };
}

const mapDispatchToProps = dispatch => 
  bindActionCreators({
    purchase: purchaseCommodityRequest,
    purchaseFailure: purchaseCommodityFailure
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PaystackPayment)