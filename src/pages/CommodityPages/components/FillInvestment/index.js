import React, { useState, useEffect, useCallback } from 'react';
import { Form, Spinners, HttpStatusNotification } from '../../../components';
import { EmptyDataRender } from '../../../Account/components'
import { utils, actions } from '../../helpers';
import PaystackPayment from '../PaystackPayment';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import ChoosePaymentMethod from '../ChoosePaymentMethod';
const { formatting: { formatCurrency } } = utils;
const { SectionSpinner } = Spinners;
const {
  commodityActions: { calculatePriceRequest }
} = actions;
const { useFormInput, QuantityInput, useSelectInput } = Form;
const FillInvestment = ({ details, id, token, calculatePriceRequest }) => {
  const {
    price_break_down, price,
    duration, commodity_name,
    profit_percentage, quantity_left_for_deal,
    unit, minimum_quantity
  } = details;
  const { SelectInput } = useSelectInput(duration)
  const { value: qty, handleUserInput: setQty } = useFormInput(minimum_quantity);
  const [priceBreakdown, setPriceBreakdown] = useState(price_break_down);
  useEffect(() => {
    qty && parseInt(qty, 10) >= 1 && calculatePriceRequest(qty, id, token, setPriceBreakdown)
  }, [calculatePriceRequest, id, qty, token])
  return (
    <section className="">
      <div className="d-flex justify-content-s-between" style={{width: '100%'}}>
        <div className="d-flex column flex-equal padding-right-md slim-border-right margin-right-md">
          <h2 className="font-lg margin-bottom-sm">{commodity_name}</h2>
          <DataRow tag="Price">
            <div className="d-flex font-md color1">
              <p className="font-weight-600 font-sm">{formatCurrency(price)}</p>
              <span className="font-xsm">/{unit}</span>
            </div>
          </DataRow>
          <DataRow tag="Quantity left">
            <span className="font-weight-500 font-sm color1">{parseInt(quantity_left_for_deal, 10)}</span>
          </DataRow>
          <DataRow tag="Minimum Purchase Quantity">
            <span className="font-weight-500 font-sm color1">{parseInt(minimum_quantity, 10)}</span>
          </DataRow>
          <DataRow tag="Quantity">
            <div className="" style={{width: '50px'}}>
              <QuantityInput type="numeric" name="quantity" placeholder="Qty" value={qty} onChange={setQty} min={parseInt(minimum_quantity, 10)} max={parseInt(quantity_left_for_deal, 10)} />
            </div>
          </DataRow>
          <DataRow tag="Profit %">
            <span className="font-weight-500 font-sm color1">{profit_percentage}</span>
          </DataRow>
          <div className="d-flex align-items-center justify-content-s-between margin-bottom-sm" style={{width: '100%'}}>
            <span className={`font-sm font-weight-500`}>Duration: </span>
            <div style={{width: '150px'}}>
              <SelectInput options={[duration]} placeholder="Duration" />
            </div>
          </div>
        </div>
        <PriceBreakDown isValid={qty >= minimum_quantity} priceBreakdown={priceBreakdown} commodityDetails={{id, qty }} />
      </div>
    </section>
  )
}

export const DataRow = ({ children, tag, className="" }) => {
  return (
    <div className="d-flex align-items-center justify-content-s-between margin-bottom-sm" style={{width: '100%'}}>
      <span className={`font-sm font-weight-500 ${className}`}>{tag}: </span>
      <div className="d-flex column">{children}</div>
    </div>
  )
}

const PriceBreakDown = ({ isValid, priceBreakdown = {}, commodityDetails }) => {
  const { commodity_cost, expected_return, other_costs, state_tax, total_deal_cost, transportation, warehousing } = priceBreakdown;
  const { loading, error } = useSelector(state => {
    const {
      loadingIndicators: { calculatePrice: loading },
      error: { calculatePrice: error }
    } = state.commodityReducer;
    return { loading, error }
  });
  console.log('error', error)
  if(loading) return (
    <section className="details flex-equal">
      <SectionSpinner isLoading={loading} />
    </section>
  )
  if(!isValid) return (
    <EmptyDataRender message="Quantity is invalid" />
  )
  return (
      <div className="d-flex column flex-equal fadeIn-animation">
        <DataRow tag="Commodity cost">
          <span className="font-weight-500 font-sm color1">{formatCurrency(commodity_cost)}</span>
        </DataRow>
        <DataRow tag="State tax">
          <span className="font-weight-500 font-sm color1">{formatCurrency(state_tax)}</span>
        </DataRow>
        <DataRow tag="Transportation">
          <span className="font-weight-500 font-sm color1">{formatCurrency(transportation)}</span>
        </DataRow>
        <DataRow tag="Warehousing">
          <span className="font-weight-500 font-sm color1">{formatCurrency(warehousing)}</span>
        </DataRow>
        <DataRow tag="Other costs">
          <span className="font-weight-500 font-sm color1">{formatCurrency(other_costs)}</span>
        </DataRow>
        <div className="d-flex align-items-center justify-content-s-between margin-bottom-sm" style={{width: '100%'}}>
          <span className="uppercase font-weight-600 font-sm">total cost: </span>
          <span className="font-weight-600 font-sm color1">{formatCurrency(total_deal_cost)}</span>
        </div>
        <div className="d-flex align-items-center justify-content-s-between margin-bottom-sm" style={{width: '100%'}}>
          <span className="uppercase font-weight-600 font-sm">expected return: </span>
          <span className="font-weight-600 font-sm color1">{formatCurrency(expected_return)}</span>
        </div>
        <div className="d-flex justify-content-end" style={{width: '100%'}}>
          <ChoosePaymentMethod isValid={isValid} amount={+total_deal_cost} commodityDetails={commodityDetails} />
          {/* <PaystackPayment isValid={isValid} amount={+total_deal_cost} commodityDetails={commodityDetails} /> */}
        </div>
        {error && <HttpStatusNotification  message={error} status={'error'} />}
      </div>
  )
}

const mapStateToProps = state => {
  const { token } = state.authReducer;
  return { token }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ calculatePriceRequest }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(FillInvestment);
