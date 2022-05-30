import React, { useLayoutEffect, forwardRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Spinners, EmptyDataRender, Animation, Form, useSort, sorts, statuses } from '../../../components';
import { actions, utils } from '../../../helpers';
const { walletActions: { getWalletRequests } } = actions;
const { FadeInLeft } = Animation;
const { useFormInput, QuantityInput } = Form;
const { walletRequest: walletRequestSorts } = sorts;
const { walletRequest: walletRequestStatuses } = statuses;
const { SectionSpinner } = Spinners;
const { formatting: { formatDate, formatCurrency } } = utils;

const WalletRequests = ({ walletRequests, sortWalletRequests, getWalletRequests, token, pageNum, loading }) => {
  const [sortResult, setSortResult] = useState(walletRequests);
  const { SortDropdown, value: sortValue } = useSort(walletRequestSorts.MOST_RECENT);
  const { SortDropdown: StatusDropdown, value: statusValue } = useSort(walletRequestStatuses.PENDING);
  const { value: min, handleUserInput: setMin } = useFormInput();
  const { value: max, handleUserInput: setMax } = useFormInput();
  useLayoutEffect(() => {
    if(walletRequests.length === 0) getWalletRequests(pageNum, token)
  }, [token, pageNum, walletRequests.length, getWalletRequests]);
  useEffect(() => {
    if(sortValue && sortValue.value === walletRequestSorts.AMOUNT && min ) {
      setSortResult(sortWalletRequests(walletRequestSorts.AMOUNT, { min, max }));
    };
    if(sortValue && sortValue.value === walletRequestSorts.STATUS && statusValue.value) {
      setSortResult(sortWalletRequests(walletRequestSorts.STATUS, {status: statusValue.value }));
    }
    if(sortValue && sortValue.value === walletRequestSorts.MOST_RECENT){
      setSortResult(sortWalletRequests(walletRequestSorts.MOST_RECENT))
    }
  }, [sortValue, statusValue, min, max, sortWalletRequests])
  if(loading) return <SectionSpinner isLoading={loading} />
  return (
    <section className="overflow-h slim-border-2 padding-horizontal-md bg-white activity margin-bottom-md">
      <div className="d-flex justify-content-s-between slim-border-bottom padding-vertical-sm margin-bottom-md">
        <FadeInLeft duration={.1}>
          <h2 className="font-weight-500 font-style-normal font-lg">Wallet Requests</h2>
        </FadeInLeft>
        <Link to="/account/wallet/requests" className="font-sm font-weight-600 padding-sm border-r-5 bg-color1 color-white ripple">SEE ALL</Link>
      </div>
      <div className="sort margin-bottom-md d-flex justify-content-end">
        <SortDropdown options={Object.values(walletRequestSorts)} className="margin-right-sm" />
        {sortValue && sortValue.value === walletRequestSorts.AMOUNT && (
        <div className="d-flex" style={{maxWidth: '200px'}}>
          <QuantityInput value={min} onChange={setMin} autoFocus={true} name="amount" className="flex-equal margin-right-sm" placeholder="Min" />
          <QuantityInput value={max} onChange={setMax} name="amount" className="flex-equal" placeholder="Max" />
        </div>
        )}
        {sortValue && sortValue.value === walletRequestSorts.STATUS && (
          <StatusDropdown label="Status" options={Object.values(walletRequestStatuses)} className="margin-right-sm" />
        )}
      </div>
      <div style={{overflowX: 'auto'}}>
        {sortResult.length === 0 
        ? <EmptyDataRender message="You have no current Wallet Request" />
        : <table>
            <RequestTableHead />
            <tbody>
              {sortResult.map((el) => <Request request={el} key={el.id} />)}
            </tbody>
          </table>
        }
      </div>
    </section>
  )
}

export const RequestTableHead = () => {
  return (
    <thead>
      <tr className="slim-border-bottom">
        <th className="font-weight-500 font-style-normal uppercase font-md margin-right-sm">amount</th>
        <th className="font-weight-500 font-style-normal uppercase font-md margin-right-sm">date</th>
        <th className="font-weight-500 font-style-normal uppercase font-md margin-right-sm">status</th>
      </tr>
    </thead>
  )
}
export const Request = ({ request }) => {
  const { amount, updated_at, status } = request;
  return (
    <tr>
      <td className="font-weight-500 font-style-normal font-sm margin-right-sm">{formatCurrency(amount)}</td>
      <td className="font-weight-500 font-style-normal font-sm margin-right-sm">{formatDate(updated_at)}</td>
      <td className={`font-weight-600 font-style-normal font-sm margin-right-sm capitalize  ${status === 'pending' ? 'color-yellow' : 'color1'}`}>{status}</td>
    </tr>
  )
}

export const LastWalletRequest = forwardRef(({ request }, ref) => {
  const { amount, updated_at, status } = request;
  return (
    <tr ref={ref}>
      <td className="font-weight-500 font-style-normal font-sm margin-right-sm">{formatCurrency(amount)}</td>
      <td className="font-weight-500 font-style-normal font-sm margin-right-sm">{formatDate(updated_at)}</td>
      <td className={`font-weight-600 font-style-normal font-sm margin-right-sm capitalize  ${status === 'pending' ? 'color-yellow' : 'color1'}`}>{status}</td>
    </tr>
  )
})

const mapStateToProps = state => {
  const { walletRequestsData: { walletRequests, pageNum }, loadingIndicators } = state.walletReducer;
  const { AMOUNT, STATUS, MOST_RECENT } = walletRequestSorts;
  const sortWalletRequests = (type, payload) => {
    switch(type) {
      case AMOUNT:
        const { min, max } = payload;
       return walletRequests.filter(walletRequest => max
        ? parseFloat(walletRequest.amount) >= parseFloat(min)
          && parseFloat(walletRequest.amount) <= parseFloat(max)
        : parseFloat(walletRequest.amount) >= parseFloat(min));
      case STATUS:
        const { status } = payload;
        return  walletRequests.filter(walletRequest => walletRequest.status === status)
      case MOST_RECENT:
        return walletRequests
      default:
       return walletRequests
    }
  }
  const { token } = state.authReducer;
  return {
    walletRequests, sortWalletRequests, token, loading: loadingIndicators.walletRequests, pageNum,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getWalletRequests,
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(WalletRequests);
