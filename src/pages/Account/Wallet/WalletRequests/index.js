import React, { useEffect, useState, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SyncLoader from 'react-spinners/SyncLoader'
import { Request, RequestTableHead, LastWalletRequest } from '../components/WalletRequests';
import { actions } from '../../helpers';
import { Form, sorts, statuses, useSort, EmptyDataRender } from '../../components'
const { walletActions: { getWalletRequests, incrementWalletRequestsPageNum } } = actions;
const { useFormInput, QuantityInput } = Form;
const { walletRequest: walletRequestSorts } = sorts;
const { walletRequest: walletRequestStatuses } = statuses;

const WalletRequests = ({ 
  walletRequests, sortWalletRequests, getWalletRequests, token, pageNum, hasNextPage, loading, incrementPageNum
 }) => {
  const [sortResult, setSortResult] = useState(walletRequests);
  const { SortDropdown, value: sortValue } = useSort(walletRequestSorts.MOST_RECENT);
  const { SortDropdown: StatusDropdown, value: statusValue } = useSort(walletRequestStatuses.MOST_RECENT);
  const { value: min, handleUserInput: setMin } = useFormInput();
  const { value: max, handleUserInput: setMax } = useFormInput();
  useEffect(() => {
    if(walletRequests.length === 0 && pageNum === 1) getWalletRequests(pageNum, token)
  }, [token, pageNum, walletRequests.length, getWalletRequests]);
  const observer = useRef();
  const lastWalletRequest = useCallback(node => {
    if(loading) return;
    if(observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasNextPage) {
        incrementPageNum()
      }
    })
    if(node) observer.current.observe(node)
  }, [loading, hasNextPage, incrementPageNum])
  useEffect(() => {
    if(sortValue && sortValue.value === walletRequestSorts.AMOUNT && min ) {
      setSortResult(sortWalletRequests(walletRequestSorts.AMOUNT, { min, max }));
    };
    if(sortValue && sortValue.value === walletRequestSorts.STATUS && statusValue) {
      setSortResult(sortWalletRequests(walletRequestSorts.STATUS, {status: statusValue.value }));
    }
    if(sortValue && sortValue.value === walletRequestSorts.MOST_RECENT){
      setSortResult(sortWalletRequests(walletRequestSorts.MOST_RECENT))
    }
  }, [sortValue, statusValue, min, max, sortWalletRequests])
  return (
    <section className="overflow-h slim-border-2 padding-horizontal-md bg-white margin-bottom-md">
    <h2 className="slim-border-bottom padding-vertical-sm margin-bottom-md font-weight-500 font-style-normal font-lg">Wallet Requests</h2>
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
        : <table className="margin-bottom-sm">
            <RequestTableHead />
            <tbody>
              {sortResult.map((request, index) => {
                if(index + 1 === walletRequests.length) {
                  return <LastWalletRequest key={request.id} ref={lastWalletRequest} request={request} />
                } else {
                  return <Request request={request} key={request.id} />
                }
              })}
            </tbody>
          </table>
        }
      </div>
      <div className="margin-bottom-sm d-flex justify-content-center">
        <SyncLoader size={15} color={"#069801"} loading={loading} />
      </div>
    </section>
  )
}


const mapStateToProps = state => {
  const { walletRequestsData: { walletRequests, pageNum, hasNextPage }, loadingIndicators } = state.walletReducer;
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
      default:
       return walletRequests
    }
  }
  const { token } = state.authReducer;
  return {
    walletRequests, sortWalletRequests, token, loading: loadingIndicators.walletRequests, pageNum, hasNextPage 
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getWalletRequests,
    incrementPageNum: incrementWalletRequestsPageNum
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(WalletRequests);