import React from "react";
import { Animation } from '../../../components';
const { ScrollToTop } = Animation;
const WhatWeDo = () => {
  return (
    <section className="What-we-do padding-horizontal-xlg">
      <h1 className="font-xlg font-weight-normal text-center margin-bottom-md">What we do</h1>
      <div className="d-flex flex-container flex-center">
        <ScrollToTop duration={.1} threshold={.1}>
          <div className="sub-div margin-right-md margin-bottom-md padding-vertical-md border-r-10 bg-white">
            <div className="d-flex justify-content-s-between column align-items-center padding-horizontal-md">
              <img src={"https://res.cloudinary.com/bahranda/image/upload/v1598105398/Bahranda%20Assets/webuy_mabt9m.png"} alt="svg icon" className="margin-bottom-md" />
              <h2 className="capitalize margin-bottom-md">We Buy</h2>
              <p className="text-center text-content font-weight-500">
                Bahranda partners with various Small Holder Farmer Groups as well as
                Mid-Size and large farms to purchase only quality raw materials that meet requirements of
                Processors/Manufacturers
              </p>
            </div>
          </div>
        </ScrollToTop>
        <ScrollToTop duration={.1}  threshold={.1}>
          <div className="bg-color1 sub-div margin-right-md margin-bottom-md padding-vertical-md border-r-10">
            <div className="d-flex justify-content-s-between column align-items-center padding-horizontal-md">
              <img src={"https://res.cloudinary.com/bahranda/image/upload/v1598105397/Bahranda%20Assets/westore_x3zizj.png"} alt="svg icon" className="margin-bottom-md" />
              <h2 className="capitalize margin-bottom-md color-white">We Store</h2>
              <p className="text-center color-white text-content font-weight-500">
                Bahranda stores purchased commodities on behalf of the Dealer for the period 
                needed to meet the Manufacturers future demand.
              </p>
            </div>
          </div>
        </ScrollToTop>
        <ScrollToTop duration={.1}  threshold={.1}>
          <div className="sub-div margin-bottom-md padding-vertical-md border-r-10 bg-white">
            <div className="d-flex justify-content-s-between column align-items-center padding-horizontal-md">
              <img src={"https://res.cloudinary.com/bahranda/image/upload/v1598105398/Bahranda%20Assets/wesell_gjo5on.png"} className="margin-left-md margin-bottom-md" alt="svg icon" />
              <h2 className="capitalize margin-bottom-md">we sell</h2>
              <p className="text-center text-content font-weight-500">
                Bahranda sells the right quantity and quality at the relevant best price to 
                the Manufacturer in fulfilment of their timely raw material and financial needs. 
              </p>
            </div>
          </div>
        </ScrollToTop>
      </div>
    </section>
  )
}

export default WhatWeDo;