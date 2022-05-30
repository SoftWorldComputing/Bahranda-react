import React from 'react';
import { Animation } from '../../../components';
const { ScrollToBottom } = Animation;
const WeStore = () => {
  return (
    <section className="we-store d-flex padding-vertical-md padding-horizontal-xlg">
      <div className="flex-equal margin-right-md">
        <img src={"https://res.cloudinary.com/bahranda/image/upload/v1598105472/Bahranda%20Assets/storeworkers_fc3nym.png"} alt="farmers" />
        <img src={"https://res.cloudinary.com/bahranda/image/upload/v1598105471/Bahranda%20Assets/store_hyp3dg.png"} alt="farmers"/>
      </div>
      <article className="flex-equal">
        <ScrollToBottom duration={.1}>
          <h2 className="font-xlg margin-bottom-md color-white">We Store</h2>
        </ScrollToBottom>
        <p className="text-content font-md color-white">
        The Storage of purchased raw materials is key to the Bahranda strategy aimed at providing
value for dealers. Due to Nigeria’s seasonal approach to Farming, prices tend to increase as we
move away from the harvest season. Therefore, timely storage helps to accrue value to the
dealer due to price increases while Bahranda measures the Manufacturers needs in terms of
Price Point at every demand cycle.
        </p>
      </article>
    </section>
  )
}

export default WeStore;
