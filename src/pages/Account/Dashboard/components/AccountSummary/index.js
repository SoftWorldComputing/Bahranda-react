import React from 'react';
import { connect } from 'react-redux';
import { utils } from '../../../helpers';
import { SectionTitle } from '../../../components';
const { formatting: { formatCurrency } } = utils;
const AccountSummary = ({ summary }) => {
  const { total_deals_amount, withdrawn, total_deals, active_deals } = summary;
  return (
    <section className="overflow-h slim-border-2 padding-horizontal-md margin-bottom-md bg-white summary">
      <SectionTitle title="Account Summary" />
      <div className="d-flex align-items-stretch padding-vertical-md">
        <div className="d-flex column flex-center padding-horizontal-md padding-vertical-xsm margin-bottom-sm slim-border-right slim-border-bottom statement">
          <p className="font-lg font-weight-500 uppercase">{formatCurrency(total_deals_amount)}</p>
          <span className="uppercase font-sm font-weight-300 text-center">Total Deals Amount</span>
        </div>
        <div className="d-flex column flex-center padding-horizontal-md padding-vertical-xsm margin-bottom-sm slim-border-right slim-border-bottom statement">
          <p className="font-lg font-weight-500 uppercase">{formatCurrency(withdrawn)}</p>
          <span className="uppercase font-sm font-weight-300 text-center">withdrawn</span>
        </div>
        <div className="d-flex column flex-center padding-horizontal-md padding-vertical-xsm margin-bottom-sm slim-border-right slim-border-bottom statement">
          <p className="font-lg font-weight-500 uppercase">{total_deals}</p>
          <span className="uppercase font-sm font-weight-300 text-center">Total deals</span>
        </div>
        <div className="d-flex column flex-center padding-horizontal-md padding-vertical-xsm margin-bottom-sm slim-border-right slim-border-bottom statement">
          <p className="font-lg font-weight-500 uppercase">{parseInt(active_deals, 10)}</p>
          <span className="uppercase font-sm font-weight-300 text-center">Active deals</span>
        </div>
      </div>
    </section>
  )
}

const mapStateToProps = state => {
  const { account_summary: summary } = state.accountReducer;
  return { summary }
}

export default connect(mapStateToProps, null)(AccountSummary);
