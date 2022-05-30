import React from 'react';
import { Animation } from '../../../components';
const { ScrollToBottom } = Animation;
const WeSell = () => {
  return (
    <section className="we-sell d-flex padding-vertical-md padding-horizontal-xlg">
      <article className="flex-equal margin-right-md margin-bottom-md">
        <ScrollToBottom duration={.1}>
          <h2 className="font-xlg margin-bottom-md">We Sell</h2>
        </ScrollToBottom>
        <p className="text-content font-md">
        Since Manufacturers cannot purchase all the necessary raw materials they need all the year
        round at the beginning of the harvest season, Bahranda provides a method that evens out their
        timely demand with timely supply.
        Thus the Sourcing, Psychological and Logistics challenges that come along with the
        Manufacturer supply chain are mitigated by the Bahranda model. We sell the right quantity and
        quality at the best price.
        </p>
      </article>
      <div className="flex-equal">
        <img src={"https://res.cloudinary.com/bahranda/image/upload/v1598105473/Bahranda%20Assets/soyabean_sctgl8.png"} alt="farmers" />
        <img src={"https://res.cloudinary.com/bahranda/image/upload/v1600896527/Bahranda%20Assets/we-sell-1_1_wd6e4i.png"} alt="farmers" />

      </div>
    </section>
  )
}

export default WeSell;
