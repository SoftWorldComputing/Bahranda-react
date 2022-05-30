import React, { useLayoutEffect, memo } from 'react';
import { AccountSummary, MonthlyExpenditure } from './components';
import { Spinners } from '../components';
import Activity from './components/Activity';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions, utils } from '../helpers';
const { accountActions: { getAccountDashboardRequest } } = actions;
const { SectionSpinner } = Spinners;
const { checkObjectProperties } = utils;
const Dashboard = memo(({ account_summary, monthly_expenditure, hasNoData, getAccountDashboard, token, loading }) => {
  useLayoutEffect(() => {
    if(hasNoData) getAccountDashboard(token)
  }, [token, hasNoData, getAccountDashboard])
 if(loading) return <SectionSpinner isLoading={loading} />
  return (
    <div>
      <h1 className="padding-bottom-md margin-top-md font-xlg font-weight-bold">Dashboard</h1>
      <AccountSummary summary={account_summary} />
      <MonthlyExpenditure expenditures={monthly_expenditure} />
      <Activity />
    </div>
  )
})

const mapStateToProps = state => {
  const { token } = state.authReducer;
  const {
    loadingIndicators: { getDashboard: loading },
    account_summary, monthly_expenditure
  } = state.accountReducer;
  const hasNoData = checkObjectProperties(account_summary)
  return { account_summary, monthly_expenditure, hasNoData, loading, token } 
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getAccountDashboard: getAccountDashboardRequest }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
