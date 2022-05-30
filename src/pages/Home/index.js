import React from 'react';
import { PageWrapper, StickyElement } from '../components'
import { WhoWeAre, WhatWeDo, HeaderSlides, TeamSlider, LatestCommodities } from './Components';
import './home.scss';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
const Home = ({ token }) => {
  if(token) return <Redirect to="/account" />
  return (
      <PageWrapper>
      <main>
        <HeaderSlides />
        <WhatWeDo />
        <WhoWeAre />
        <LatestCommodities />
        <TeamSlider />
      </main>
      <StickyElement />
    </PageWrapper>
  )
}

const mapStateToProps = state => {
  const { token } = state.authReducer;
  return { token }
}
export default connect(mapStateToProps, null)(Home);
