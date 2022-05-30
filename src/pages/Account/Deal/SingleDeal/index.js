import React, { useState, useEffect, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spinners, SectionTitle, NotFound } from '../../components'
import { actions, utils } from '../../helpers';
import { DataRow } from '../../../CommodityPages/components/FillInvestment';
const { dealActions: { getSingleDealRequest, getSingleDealIndicator } } = actions;
const { formatting: { formatCurrency, formatDate } } = utils;
const { SectionSpinner } = Spinners;

const dealProp = {
  commodity: { commodity_name: '' },
  deal_end_date: '', deal_start_date: '',
  duration: '', expected_return: '',
  price_break_down: {
    commodity_cost: '', other_costs: '',
    state_tax: '', transportation: '',
    warehouse: ''
  },
  profit: '', quantity: '',
  status: '', total_amount_invested: '',
  warehouse: {
    address: '', city: '',
    contact_person: '', contact_person_name: '',
    created_at: '', state: '',
    warehouse_name: '', warehouse_image: ''
  }
}
const Deal = ({ getSingleDealRequest, setLoading, loading, error, token, match: { params } }) => {
  const [deal, setDeal] = useState(dealProp);
  useLayoutEffect(() => {
    setLoading()
  }, [setLoading])
  useEffect(() => {
    getSingleDealRequest(token, setDeal, params.id)
  }, [token, params.id, getSingleDealRequest]);
  if(loading) return <SectionSpinner isLoading={loading} />;
  if(error && error === 404) return (
    <NotFound
      message="The commodity you tried to access is currently out of stock. Please check back later or kindly check others"
      link="/account/deals"
      linkTitle="Your Deals"
    />
  )
  const {
    commodity: { commodity_name, commodity_image },
    deal_end_date, deal_start_date,
    duration, expected_return,
    price_break_down: {
      commodity_cost, other_costs,
      state_tax, transportation,
      warehousing
    },
    profit, quantity,
    status, total_amount_invested,
    warehouse: {
      address, city,
      contact_person, contact_person_phone, state,
      warehouse_name, warehouse_image
    }
} = deal;
  return (
    <div className="single-deal slim-border-2 padding-horizontal-md bg-white">
      <section className="overflow-h">
        <SectionTitle title="Deal" />
        <div className="d-flex align-items-center justify-content-s-between margin-bottom-sm">
          <h3 className="font-md">{commodity_name}</h3>
          <span className={`capitalize font-weight-600 font-sm border-r-10 padding-horizontal-sm padding-xsm ${status === 'on-going' ? 'color1 bg-color1-opacity' : 'danger-text bg-danger-opacity'}`}>{status}</span>
        </div>
        <div className="d-flex margin-bottom-sm padding-bottom-sm slim-border-bottom">
          <div className="thumbnail margin-right-md">
            <img src={commodity_image} alt='Commodity thumbnail' />
          </div>
          <div className="d-flex column flex-equal">
            <DataRow tag="Start Date">
              <span className="font-weight-500 font-sm">{formatDate(deal_start_date)}</span>
            </DataRow>
            <DataRow tag="End Date">
              <span className="font-weight-500 font-sm">{formatDate(deal_end_date)}</span>
            </DataRow>
            <DataRow tag="Duration">
              <span className="font-weight-500 font-sm">{duration}</span>
            </DataRow>
            <DataRow tag="Invested">
              <span className="font-weight-500 color1 font-sm">{formatCurrency(total_amount_invested)}</span>
            </DataRow>
            <DataRow tag="Profit">
              <span className="font-weight-500 color1 font-sm">{formatCurrency(profit)}</span>
            </DataRow>
            <DataRow tag="Expected Returns">
              <span className="font-weight-500 color1 font-sm">{formatCurrency(expected_return)}</span>
            </DataRow>
          </div>
        </div>
        <div className="margin-bottom-md slim-border-bottom">
          <h4 className="font-md capitalize padding-bottom-sm">Price breakdown</h4>
          <div className="d-flex justify-content-s-between">
            <div className="d-flex column flex-equal margin-right-md padding-right-md slim-border-right">
              <DataRow tag="Quantity">
                <span className="font-weight-500 font-sm">{quantity}</span>
              </DataRow>
              <DataRow tag="commodity Cost">
                <span className="font-weight-500 color1 font-sm">{formatCurrency(commodity_cost)}</span>
              </DataRow>
              <DataRow tag="State Tax">
                <span className="font-weight-500 color1 font-sm">{formatCurrency(state_tax)}</span>
              </DataRow>
            </div>
            <div className="d-flex column flex-equal">
              <DataRow tag="Transportation">
                <span className="font-weight-500 color1 font-sm">{formatCurrency(transportation)}</span>
              </DataRow>
              <DataRow tag="Warehousing">
                <span className="font-weight-500 color1 font-sm">{formatCurrency(warehousing)}</span>
              </DataRow>
              <DataRow tag="Other Costs">
                <span className="font-weight-500 color1 font-sm">{formatCurrency(other_costs)}</span>
              </DataRow>
            </div>
          </div>
        </div>
      </section>
      <section className="">
        <h2 className="font-weight-500 font-style-normal font-lg padding-vertical-sm margin-bottom-md">Warehousing</h2>
        <div className="d-flex padding-vertical-sm slim-border-bottom">
          <div className="thumbnail margin-right-md">
            <img src={warehouse_image} alt='Warehouse thumbnail' />
          </div>
          <div className="d-flex column flex-equal">
            <DataRow tag="Warehouse">
              <span className="font-weight-500 font-sm">{warehouse_name}</span>
            </DataRow>
            <DataRow tag="Address">
              <span className="font-weight-500 text-right font-sm">{address}</span>
            </DataRow>
            <DataRow tag="City">
              <span className="font-weight-500 font-sm">{city}</span>
            </DataRow>
            <DataRow tag="State">
              <span className="font-weight-500 font-sm">{state}</span>
            </DataRow>
            <DataRow tag="Contact person">
              <span className="font-weight-500 color1 font-sm capitalize">{contact_person}</span>
            </DataRow>
            <DataRow tag="Number">
              <span className="font-weight-500 color1 font-sm">{contact_person_phone}</span>
            </DataRow>
          </div>
        </div>
      </section>
    </div>
  )
}

const mapStateToProps = state => {
  const { token } = state.authReducer;
  const {
    loadingIndicators: { getDeal: loading },
    errors: { getDeal: error }
  } = state.dealReducer;
  return { token, loading, error }
}
const mapDispatchToProps = dispatch => 
  bindActionCreators({
    getSingleDealRequest,
    setLoading: getSingleDealIndicator
  }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Deal);
