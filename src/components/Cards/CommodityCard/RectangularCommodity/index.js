import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { utils } from '../../../../helpers';

const { formatting: { formatCurrency } } = utils;
const CommodityCard = memo(({ commodity }) => {
  const { image, commodity_name, price, id, profit_percentage, availability } = commodity;
  return (
    <div className="product-card margin-bottom-md margin-right-md cursor-pointer">
      <div className="thumbnail position-relative margin-bottom-sm">
        <Link to={`/commodities/${id}`}><img src={image} alt="product thumbnail" /></Link>
        <div className={`padding-sm d-inline-block status ${availability >= 1 ? 'bg-yellow' : 'bg-danger'}`}>
          <span className="color-white font-weight-600 font-xsm capitalize">{availability >= 1 ? 'now selling' : 'No Orders'}</span>
        </div>
      </div>
      <div className="d-flex column details padding-horizontal-sm overflow-h">
        <h3 className="product-title font-md capitalize">{commodity_name}</h3>
        <span className="font-sm font-weight-500 color-gray categories">{profit_percentage} return</span>
        <h4 className="price font-md color1 font-weight-600">{formatCurrency(price)}</h4>
      </div>
    </div>
  )
});

export default CommodityCard;
