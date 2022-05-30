import React, { useLayoutEffect, memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions, utils } from '../../helpers';
import { DealHistory } from '../components';
import { Spinners, Animation, SectionTitle } from '../../components';
const { SectionSpinner } = Spinners;
const { dealActions: { getDealsRequest } } = actions;
const { formatting: { formatCurrency } } = utils;
const { ScrollToBottom } = Animation;

const Deals = ({
  getDealsRequest, token, hasNoDeal, active_deals, cancelled_deals,
  closed_deals, total_investment, total_profit, completed_deals,
  loading
}) => {

  useLayoutEffect(() => {
   if(hasNoDeal) getDealsRequest(token)
  }, [hasNoDeal, token, getDealsRequest])
  if(loading) return  <SectionSpinner isLoading={loading} />
  return (
    <div className="overflow-h">
      <DealStatus
        statuses={{
          active_deals, cancelled_deals,
          closed_deals, total_investment,
          total_profit, completed_deals
        }}
      />
      <DealHistory />
    </div>
  )
}

const DealStatus = memo(({ statuses }) => {
  const {
    active_deals, cancelled_deals,
    closed_deals, total_investment,
    total_profit, completed_deals,
  } = statuses;
  return (
    <ScrollToBottom repeat={false} duration={.2} threshold={.1}>
      <section className="overflow-h slim-border-2 padding-horizontal-md margin-bottom-md bg-white summary">
        <SectionTitle title="Deal Statistics" />
        <div className="d-flex align-items-stretch padding-vertical-md">
          <div className="d-flex column flex-center padding-horizontal-md padding-vertical-xsm margin-bottom-sm slim-border-right slim-border-bottom statement">
            <p className="font-lg font-weight-500 uppercase">{formatCurrency(total_investment)}</p>
            <span className="uppercase font-sm font-weight-300 text-center">Total Deals</span>
          </div>
          <div className="d-flex column flex-center padding-horizontal-md padding-vertical-xsm margin-bottom-sm slim-border-right slim-border-bottom statement">
            <p className="font-lg font-weight-500 uppercase">{formatCurrency(total_profit)}</p>
            <span className="uppercase font-sm font-weight-300 text-center">Total Profit</span>
          </div>
          <div className="d-flex column flex-center padding-horizontal-md padding-vertical-xsm margin-bottom-sm slim-border-right slim-border-bottom statement">
            <p className="font-lg font-weight-500 uppercase">{completed_deals}</p>
            <span className="uppercase font-sm font-weight-300 text-center">completed</span>
          </div>
          <div className="d-flex column flex-center padding-horizontal-md padding-vertical-xsm margin-bottom-sm slim-border-right slim-border-bottom statement">
            <p className="font-lg font-weight-500 uppercase color1">{parseInt(active_deals, 10)}</p>
            <span className="uppercase font-sm font-weight-300 text-center">Active</span>
          </div>
          <div className="d-flex column flex-center padding-horizontal-md padding-vertical-xsm margin-bottom-sm slim-border-right slim-border-bottom statement">
            <p className="font-lg font-weight-500 uppercase danger-text">{parseInt(cancelled_deals, 10)}</p>
            <span className="uppercase font-sm font-weight-300 text-center">cancelled</span>
          </div>
          <div className="d-flex column flex-center padding-horizontal-md padding-vertical-xsm margin-bottom-sm slim-border-right slim-border-bottom statement">
            <p className="font-lg font-weight-500 uppercase color-yellow">{parseInt(closed_deals, 10)}</p>
            <span className="uppercase font-sm font-weight-300 text-center">closed</span>
          </div>
        </div>
      </section>
    </ScrollToBottom>
  )
})

const mapStateToProps = state => {
  const { token } = state.authReducer;
  const {
    deals, active_deals, cancelled_deals,
    closed_deals, total_investment, total_profit,
    completed_deals,
    loadingIndicators: { getDeals: loading }
  } = state.dealReducer;

  return {
    token, hasNoDeal: deals.length === 0, active_deals, cancelled_deals,
    closed_deals, total_investment, total_profit,
    completed_deals, loading
  }
}


const mapDispatchToProps = dispatch => 
  bindActionCreators({ getDealsRequest }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Deals);

