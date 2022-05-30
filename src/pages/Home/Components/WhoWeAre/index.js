import React from 'react';
import { Link } from 'react-router-dom';
const WhoWeAre = () => {
  return (
    <section className="who-we-are position-relative margin-top-lg">
      <div className="d-flex justify-content-s-between content padding-horizontal-xlg">
        <div className="images d-flex ">
          <img src={"https://res.cloudinary.com/bahranda/image/upload/v1598105425/Bahranda%20Assets/carrier_bf0uni.png"} alt="display" className="margin-bottom-md" />
          <img src={"https://res.cloudinary.com/bahranda/image/upload/v1598105416/Bahranda%20Assets/warehouse_yxuhou.png"} alt="dispaly" className="margin-bottom-md" />
        </div>
        <article className="padding-vertical-md about padding-horizontal-md">
          <h1 className="color-white margin-bottom-md font-xlg">Who we are</h1>
          <p className="color-white text-content margin-bottom-md">
            Bahranda is a connector that helps to warehouse and Supply
            Agricultural raw materials to the Manufacturing Sector based on demand.
            Bahranda.com is a bridge between the Agricultural and the Manufacturing
            sectors that interfaces with Aggregators in a seamless manner
          </p>
          <Link to="/how-we-work" className="btn-color1 ripple color-white">Learn more</Link>
        </article>
      </div>
    </section>
  )
}

export default WhoWeAre;
