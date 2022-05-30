import React, { useState, memo } from 'react';
import Select from 'react-select';
export const sorts = {
  history: {
    MOST_RECENT: 'Most Recent',
    AMOUNT: 'Amount',
    STATUS: 'Status'
  },
  walletRequest: {
    MOST_RECENT: 'Most Recent',
    AMOUNT: 'Amount',
    STATUS: 'Status',
  },
  deal: {
    COMMODITY: 'Commodity',
    QUANTITY: 'Quantity',
    DURATION: 'Duration',
    STATUS: 'Status',
    MOST_RECENT: 'Most Recent'
  },
  activity: {
    MOST_RECENT: 'Most Recent',
    STATUS: 'Status'
  }
}

export const statuses = {
  history: {
    COMPLETED: 'completed',
  },
  walletRequest: {
    PENDING: 'pending',
    PAID: 'paid'
  },
  deal: {
    ONGOING: 'on-going',
    CANCELLED: 'Cancelled',
    CLOSED: 'Closed'
  },
  activity: {
    COMPLETED: 'completed',
    PENDING: 'pending'
  }
}

export const useSort = (initialValue) => {
  const [value, setValue] = useState(initialValue
    ? {value: initialValue, label: initialValue}
    : {value: '', label: ''});
  const SortDropdown = memo((props) => {
    const { name, options, label = 'Sort by', placeholder, className = '', ...rest } = props;
    return (
      <label className={`d-flex align-items-center margin-bottom-sm ${className}`}>
        <span className="font-md font-weight-500 color1 margin-right-sm">{label}:</span>
        <div className="" style={{width: '150px'}}>
          <Select isSearchable={false}
            name={name}
            className="form-control font-weight-500 bg-white font-sm color1 capitalize"
            value={value}
            options={options.map(value => ({value, label: value}))}
            placeholder={placeholder} onChange={setValue} {...rest}
          />
        </div>
      </label>
    )
  }, (prev, next) => prev.options === next.options)
  return { value, SortDropdown }
}

export default useSort