import React from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowDown } from 'react-icons/md';
const PortraitCommodityCard = ({ commodity }) => {
  const { image, commodity_name, availability, id } = commodity;
  return (
    <div className="portrait-commodity-card padding-horizontal-sm padding-vertical-sm bg-white margin-right-sm margin-bottom-sm">
      <Link to={`/commodities/${id}`}>
        <div className="thumbnail margin-bottom-sm position-relative">
          <img src={image} alt="Commodity thumbnail" />
          <div className={`padding-sm d-inline-block status ${availability >= 1 ? 'bg-yellow' : 'bg-danger'}`}>
            <span className="color-white font-weight-600 font-xsm capitalize">{availability >= 1 ? 'now selling' : 'No Orders'}</span>
          </div>
        </div>
        <div className="d-flex justify-content-s-between align-items-center">
          <h3 className="color1 font-md">{commodity_name}</h3>
          <MdKeyboardArrowDown className="font-lg color1" />
        </div>
      </Link>
    </div>
  )
}

export default PortraitCommodityCard;
