import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { utils } from '../../../helpers';
import { EmptyDataRender, Form, SectionTitle, statuses, sorts, useSort} from '../../../components';
const { formatting: { formatDate } } = utils;
const { useFormInput, QuantityInput } = Form;
const { deal: dealSorts } = sorts;
const { deal: dealStatuses } = statuses;

const DealHistory = ({ deals, sortDeals }) => {
  const [sortResult, setSortResult] = useState(deals);
  const { SortDropdown, value: sortValue } = useSort(dealSorts.MOST_RECENT);
  const { SortDropdown: StatusDropdown, value: statusValue } = useSort(dealStatuses.ONGOING);
  const { value: min, handleUserInput: setMin } = useFormInput();
  const { value: duration, handleUserInput: setDuration } = useFormInput();
  const { value: commodity, handleUserInput: setCommodity } = useFormInput();
  useEffect(() => {
    if(sortValue && sortValue.value === dealSorts.QUANTITY && min) { // sort for quantity
      setSortResult(sortDeals(dealSorts.QUANTITY, { min }))
    }
    if(sortValue && sortValue.value === dealSorts.DURATION && duration) { // sort base on duration
      setSortResult(sortDeals(dealSorts.DURATION, { duration }))
    }
    if(sortValue && sortValue.value === dealSorts.STATUS && statusValue.value) {
      setSortResult(sortDeals(dealSorts.STATUS, { status: statusValue.value }))
    }
    if(sortValue && sortValue.value === dealSorts.MOST_RECENT) {
      setSortResult(sortDeals(dealSorts.MOST_RECENT))
    }
    if(sortValue && sortValue.value === dealSorts.COMMODITY && commodity) {
      setSortResult(sortDeals(dealSorts.COMMODITY, { commodity }))
    }
  }, [sortValue, statusValue, min, duration, commodity, sortDeals])
  return (
    <section className="overflow-h slim-border-2 padding-horizontal-md bg-white activity">
      <SectionTitle title="Deals" />
      <div className="sort margin-bottom-md d-flex justify-content-end">
        <SortDropdown options={Object.values(dealSorts)} className="margin-right-sm" />
        {sortValue && sortValue.value === dealSorts.QUANTITY && (
        <div className="d-flex" style={{maxWidth: '100px'}}>
          <QuantityInput value={min} onChange={setMin} autoFocus={true} name="quantity" className="flex-equal" placeholder="Min Qty" />
        </div>
        )}
        {sortValue && sortValue.value === dealSorts.DURATION && (
        <div className="d-flex" style={{maxWidth: '100px'}}>
          <QuantityInput value={duration} onChange={setDuration} autoFocus={true} name="quantity" className="flex-equal margin-right-sm" placeholder="Min Dur." />
        </div>
        )}
        {sortValue && sortValue.value === dealSorts.STATUS && (
          <StatusDropdown label="Status" options={Object.values(dealStatuses)} className="margin-right-sm" />
        )}
        {sortValue && sortValue.value === dealSorts.COMMODITY && (
           <div className="d-flex" style={{maxWidth: '100px'}}>
            <QuantityInput value={commodity} onChange={setCommodity} autoFocus={true} name="name" className="flex-equal" placeholder="Commodity" />
          </div>
        )}
      </div>
      <div style={{overflowX: 'auto'}}>
        {sortResult.length === 0
        ? <EmptyDataRender message="You have no Deal" />
        : <table className="margin-bottom-md">
            <thead>
              <tr className="slim-border-bottom">
                <th className="font-weight-500 font-style-normal font-sm margin-right-sm">COMMODITY</th>
                <th className="font-weight-500 font-style-normal font-sm margin-right-sm">QTY</th>
                <th className="font-weight-500 font-style-normal font-sm margin-right-sm">DUR.</th>
                <th className="font-weight-500 font-style-normal font-sm margin-right-sm hide-sm">START</th>
                <th className="font-weight-500 font-style-normal font-sm margin-right-sm hide-sm">END</th>
                <th className="font-weight-500 font-style-normal font-sm margin-right-sm">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {sortResult.map(deal => <Deal deal={deal} key={deal.id} />)}
            </tbody>
          </table>
        }
      </div>
    </section>
  )
}

const Deal = ({ deal }) => {
  const { push } = useHistory()
  const { 
    commodity: { commodity_name }, duration, status, deal_start_date, deal_end_date, quantity, id
  } = deal;
  return (
    <tr onClick={() => push(`/account/deals/${id}`)} className="cursor-pointer" >
      <td className="font-weight-500 font-style-normal font-sm margin-right-sm">{commodity_name}</td>
      <td className="font-weight-500 font-style-normal font-sm margin-right-sm">{quantity}</td>
      <td className="font-weight-500 font-style-normal font-sm margin-right-sm">{duration}</td>
      <td className="font-weight-500 font-style-normal font-sm margin-right-sm hide-sm">{formatDate(deal_start_date)}</td>
      <td className="font-weight-500 font-style-normal font-sm margin-right-sm hide-sm">{formatDate(deal_end_date)}</td>
      <td className={`font-weight-600 font-style-normal font-sm margin-right-sm capitalize`}>
        <div className={`padding-xsm border-r-10 ${status === 'on-going' ? 'bg-color1-opacity' : 'bg-danger-opacity'}`}>
          <span className={`capitalize font-sm ${status === 'on-going' ? 'color1' : 'danger-text'}`}>{status}</span>
        </div>
      </td>
    </tr>
  )
}


const mapStateToProps = state => {
  const { deals } = state.dealReducer;
  const { QUANTITY, STATUS, DURATION, COMMODITY } = dealSorts;
  const sortDeals = (type, payload) => {
    switch(type) {
      case QUANTITY:
        const { min } = payload;
       return deals.filter(deal =>  parseFloat(deal.quantity) >= parseFloat(min));
      case STATUS:
        const { status } = payload;
        return deals.filter(deal => deal.status === status)
      case DURATION:
        const { duration } = payload;
        return deals.filter(deal => deal.duration === `${duration} Months`);
      case COMMODITY:
        const { commodity } = payload;
        return deals.filter(deal => deal.commodity.commodity_name.toLowerCase().includes(commodity.toLowerCase()))
      default:
       return deals
    }
  }
  return { deals, sortDeals }
}

export default connect(mapStateToProps, null)(DealHistory);
