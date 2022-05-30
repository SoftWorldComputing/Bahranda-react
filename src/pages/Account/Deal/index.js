import React from 'react';
import { Route } from 'react-router-dom';
import Deals from './Deals';
import SingleDeal from './SingleDeal';
const DealPages = ({ match: { path } }) => {
  return (
    <section className="">
      <Route exact path={path} component={Deals} />
      <Route exact path={`${path}/:id`} component={SingleDeal} />
    </section>
  )
}

export default DealPages;
