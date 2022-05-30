import React, { memo, useLayoutEffect, useEffect, useState, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spinners, Animation, Form } from '../../../components';
import { actions, utils } from '../../helpers';
import EmptyDataRender from '../EmptyDataRender';
import { default as useSort, sorts, statuses } from '../Sort';

const { useFormInput, QuantityInput } = Form;
const { history: historySorts } = sorts;
const { history: historyStatuses } = statuses;
const { FadeInLeft } = Animation;
const { walletActions: { getWalletHistoryRequest } } = actions;
const { SectionSpinner } = Spinners;
const { formatting: { formatCurrency, formatDate } } = utils;

const History = ({ getWalletHistoryRequest, token, loading, history, sortHistory, pageNum }) => {
  const [sortResult, setSortResult] = useState(history)
  const { SortDropdown, value: sortValue } = useSort(historySorts.MOST_RECENT);
  const { SortDropdown: StatusDropdown, value: statusValue } = useSort(historyStatuses.COMPLETED);
  const { value: min, handleUserInput: setMin } = useFormInput();
  const { value: max, handleUserInput: setMax } = useFormInput();
  useLayoutEffect(() => {
    if(history.length === 0) getWalletHistoryRequest(pageNum, token)
  }, [token, pageNum, history.length, getWalletHistoryRequest]);
  useEffect(() => {
    if(sortValue && sortValue.value === historySorts.AMOUNT && min && max) {
      setSortResult(sortHistory(historySorts.AMOUNT, { min, max }))
    }
    if(sortValue && sortValue.value === historySorts.STATUS && statusValue.value) {
      setSortResult(sortHistory(historySorts.STATUS, {status: statusValue.value }));
    }
    if(sortValue && sortValue.value === historySorts.MOST_RECENT) {
      setSortResult(sortHistory(historySorts.MOST_RECENT))
    }
  }, [sortValue, statusValue, min, max, sortHistory])
  if(loading) return <SectionSpinner isLoading={loading} />
  return (
      <section className="overflow-h slim-border-2 padding-horizontal-md bg-white activity">
        <div className="d-flex justify-content-s-between slim-border-bottom padding-vertical-sm margin-bottom-md">
          <FadeInLeft duration={.1}>
            <h2 className="font-weight-500 font-style-normal font-lg">History</h2>
          </FadeInLeft>
          <Link to="/account/wallet/history" className="font-sm font-weight-600 padding-sm border-r-5 bg-color1 color-white ripple">SEE ALL</Link>
        </div>
        <div className="sort margin-bottom-md d-flex justify-content-end">
          <SortDropdown options={Object.values(historySorts)} className="margin-right-sm" />
          {sortValue && sortValue.value === historySorts.AMOUNT && (
          <div className="d-flex" style={{maxWidth: '200px'}}>
            <QuantityInput value={min} onChange={setMin} autoFocus={true} name="amount" className="flex-equal margin-right-sm" placeholder="Min" />
            <QuantityInput value={max} onChange={setMax} name="amount" className="flex-equal" placeholder="Max" />
          </div>
          )}
          {sortValue && sortValue.value === historySorts.STATUS && (
            <StatusDropdown label="Status" options={Object.values(historyStatuses)} className="margin-right-sm" />
          )}
        </div>
        <div style={{overflowX: 'auto'}}>
          {sortResult.length === 0
          ? <EmptyDataRender message="You have no history record" />
          : <table className="margin-bottom-md">
              <thead>
                <tr className="slim-border-bottom">
                  <th className="font-weight-500 font-style-normal font-sm margin-right-sm uppercase">remark</th>
                  <th className="font-weight-500 font-style-normal font-sm margin-right-sm uppercase">date</th>
                  <th className="font-weight-500 font-style-normal font-sm margin-right-sm uppercase">amount</th>
                  <th className="font-weight-500 font-style-normal font-sm margin-right-sm uppercase">status</th>
                </tr>
              </thead>
              <tbody>
                {sortResult.map((el) =>  <HistoryRow history={el} key={el.id} />)}
              </tbody>
            </table>
          }
        </div>
      </section>
  )
}

export const HistoryRow = memo(({history }) => {
  const { amount, created_at, remark, status } = history
  return (
    <tr className="padding-vertical-sm" >
      <td className="font-weight-500 font-style-normal font-sm margin-right-sm">{remark}</td>
      <td className="font-weight-500 font-style-normal font-sm margin-right-sm">{formatDate(created_at)}</td>
      <td className="font-weight-500 font-style-normal font-sm margin-right-sm">{formatCurrency(amount)}</td>
      <td className={`font-weight-600 font-style-normal font-sm margin-right-sm capitalize`}>
        <span className={`capitalize ${status !== 'debit' ? 'color1' : 'danger-text'}`}>{status}</span>
      </td>
    </tr>
  )
})

export const LastHistoryRow = forwardRef(({history }, ref) => {
  const { amount, created_at, remark, status } = history
  return (
    <tr ref={ref} className="padding-vertical-sm" >
      <td className="font-weight-500 font-style-normal font-sm margin-right-sm">{remark}</td>
      <td className="font-weight-500 font-style-normal font-sm margin-right-sm">{formatDate(created_at)}</td>
      <td className="font-weight-500 font-style-normal font-sm margin-right-sm">{formatCurrency(amount)}</td>
      <td className={`font-weight-600 font-style-normal font-sm margin-right-sm capitalize`}>
        <span className={`capitalize ${status !== 'debit' ? 'color1' : 'danger-text'}`}>{status}</span>
      </td>
    </tr>
  )
})

const mapStateToProps = state => {
  const { historyData: { history, pageNum }, loadingIndicators } = state.walletReducer;
  const { AMOUNT, STATUS, MOST_RECENT } = historySorts;
  const sortHistory = (type, payload) => {
    switch(type) {
      case AMOUNT:
        const { min, max } = payload;
       return history.filter(history => max
        ? parseFloat(history.amount) >= parseFloat(min)
          && parseFloat(history.amount) <= parseFloat(max)
        : parseFloat(history.amount) >= parseFloat(min));
      case STATUS:
        const { status } = payload;
        return  history.filter(history => history.status === status)
      case MOST_RECENT:
        return history
      default:
       return history
    }
  }
  const { token } = state.authReducer;
  return {
    history, sortHistory, token, pageNum, loading: loadingIndicators.history,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getWalletHistoryRequest }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(History);
