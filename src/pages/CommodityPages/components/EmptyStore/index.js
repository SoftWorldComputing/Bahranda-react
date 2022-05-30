import React from 'react';
import emptyCart from '../../../../assets/empty-cart.svg';
const EmptyShop = () => (
  <div className="d-flex column flex-center empty-store">
    <div className="svg margin-bottom-md">
      <img src={emptyCart} alt="Empty store" className="margin-bottom-md"/>
    </div>
    <h2 className="font-lg color-gray capitalize text-center font-weight-500">No commodity available. Kindly check back later</h2>
  </div>
)

export default EmptyShop