import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../../helpers';
import { bindActionCreators } from 'redux';
import { Cards, Carousels, Spinners } from '../../../components';
const { commodityActions: { getLatestCommoditiesRequest } } = actions;
const { PortraitCommodityCard } = Cards;
const { SectionSpinner } = Spinners;
const { PaddedCarousel } = Carousels;
const LatestCommodities = ({ loading, getLatestCommoditiesRequest, latestCommodities }) => {
  useEffect(() => {
    if(latestCommodities.length === 0) getLatestCommoditiesRequest()
  }, [latestCommodities.length, getLatestCommoditiesRequest]);
  if(loading) return <SectionSpinner isLoading={loading} />
  return (
    <div className="padding-horizontal-md padding-vertical-md margin-bottom-md">
      <h3 className="font-xlg text-center font-weight-normal margin-bottom-md capitalize">commodities</h3>
      <PaddedCarousel
        slides={latestCommodities.map(commodity => <PortraitCommodityCard commodity={commodity} />)}
        cardAlign={true}
        autoSlide={false}
      />
    </div> 
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getLatestCommoditiesRequest }, dispatch);
const mapStateToProps = state => {
  const {
    latestCommodities,
    loadingIndicators: { 
      getLatestCommodities: loading
    }
  } = state.commodityReducer;
  return { latestCommodities, loading }
}
export default connect(mapStateToProps, mapDispatchToProps)(LatestCommodities);
