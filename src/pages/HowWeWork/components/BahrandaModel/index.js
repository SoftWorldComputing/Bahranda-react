import React from 'react';
import { Animation } from '../../../components';
const { ScrollToBottom } = Animation;
const BahrandaModel = () => {
  return (
    <div className="padding-horizontal-xlg padding-vertical-md bg-gray d-flex column align-items-center model margin-bottom-md">
      <ScrollToBottom duration={.1}>
        <h1 className="font-lg text-center margin-bottom-md">The Bahranda Model</h1>
      </ScrollToBottom>
      <img src={"https://res.cloudinary.com/bahranda/image/upload/v1598105474/Bahranda%20Assets/model_qcylix.svg"} alt="bahranda" className="bahranda-triangle margin-bottom-md" />
      <div className="font-md text-content">
        <p className="margin-bottom-sm">We provide access to agricultural raw materials required by the Manufacturing sector by committing to Off-take agreements with Small Holder Farmer Groups, Mid-Size and Large Farms to purchase their aggregated harvests, thereby side-stepping the unpredictability of “Farming Risk”.  </p>
        <p className="margin-bottom-sm">We also provide warehousing for Dealers in order to even out the demand driven nature and limited storage of Small to Mid-Sized Manufacturers so as to ensure raw materials are delivered when needed. </p>
        <p className="margin-bottom-sm">We supply Manufacturers based on their demand and utilizing our existing Partner relationships to ensure seamless delivery and at Target prices. </p>
      </div>
    </div>
  )
}

export default BahrandaModel
