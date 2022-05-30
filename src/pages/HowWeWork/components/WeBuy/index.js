import React from 'react';
import { Animation } from '../../../components';
const { ScrollToBottom } = Animation;
const WeBuy = () => {
  return (
    <section className="we-sell d-flex padding-vertical-md padding-horizontal-xlg">
      <article className="flex-equal margin-right-md padding-bottom-md">
        <ScrollToBottom duration={.1}>
          <h2 className="font-xlg margin-bottom-md">We Buy</h2>
        </ScrollToBottom>
        <p className="text-content font-md">
        Bahranda partners with various Small Holder Farmer Groups as well as Mid-Size and Large
        Farms to purchase only quality raw materials that meet requirements of
        Processors/Manufacturers
        </p>
      </article>
      <div className="flex-equal">
        <img src={"https://res.cloudinary.com/bahranda/image/upload/v1600896278/Bahranda%20Assets/we-buy2_1_eqngah.png"} alt="farmers" />
        <img src={"https://res.cloudinary.com/bahranda/image/upload/v1600895766/Bahranda%20Assets/we-buy1_11_g5taln.png"} alt="farmers" />
      </div>
    </section>
  )
}

export default WeBuy;
