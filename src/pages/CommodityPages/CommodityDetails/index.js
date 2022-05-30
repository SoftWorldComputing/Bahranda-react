import React, { useState, useEffect, memo } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Cards, Carousels, Spinners, NotFound } from "../../components";
import { actions } from "../helpers";
import { FillInvestment } from "../components";
import { Link } from "react-router-dom";
const { CommodityCard } = Cards;
const { PaddedCarousel } = Carousels;
const { SectionSpinner } = Spinners;
const {
  commodityActions: { getRelatedCommoditiesRequest, getSingleCommodityRequest },
} = actions;

const CommodityDetails = ({
  getSingleCommodityRequest,
  token,
  error,
  loading,
  match: { params },
}) => {
  const [details, setDetails] = useState({});
  useEffect(() => {
    getSingleCommodityRequest(token, setDetails, params.id);
  }, [token, setDetails, params.id, getSingleCommodityRequest]);
  if (loading) return <SectionSpinner isLoading={loading} />;
  if (error && error === 404)
    return (
      <NotFound
        message="The commodity you tried to access is currently out of stock. Please check back later or kindly check others"
        link="/commodities"
        linkTitle="Available Commodities"
      />
    );
  if (details.availability === 0)
    return (
      <NotFound
        message="The commodity you tried to access is out of stock. Please kindly check others"
        link="/commodities"
        linkTitle="More Commodities"
      />
    );
  const { image, description, ...rest } = details;
  return (
    <article className="d-flex column commodity" style={{ width: "100%" }}>
      <div
        className="d-flex justify-content-s-between thumbnail-details margin-bottom-md"
        style={{ width: "100%" }}
      >
        <div className="thumbnail-slider  margin-right-md">
          <img src={image} alt="commodity thumbnail" />
        </div>
        <section className="details flex-equal">
          <FillInvestment details={rest} id={params.id} />
        </section>
      </div>
      <main className="product-details" style={{ width: "100%" }}>
        <h2 className="uppercase font-md">description</h2>
        <div className="bg-white slim-border">
          <p className="font-sm padding-horizontal-md padding-vertical-md">
            {description}
          </p>
        </div>
        <RelatedCommodities token={token} />
      </main>
    </article>
  );
};

const mapDispatchToRelatedCommodities = (dispatch) =>
  bindActionCreators({ getRelatedCommoditiesRequest }, dispatch);
const mapIndicatorToProps = (state) => {
  const {
    loadingIndicators: { relatedCommodity: loading },
  } = state.commodityReducer;
  return { loading };
};
const RelatedCommodities = connect(
  mapIndicatorToProps,
  mapDispatchToRelatedCommodities
)(
  memo(({ token, loading, getRelatedCommoditiesRequest }) => {
    const [state, setState] = useState([]);
    useEffect(() => {
      let isSubscribed = true;
      if (isSubscribed) getRelatedCommoditiesRequest(token, setState);
      return () => (isSubscribed = false);
    }, [token, getRelatedCommoditiesRequest]);
    if (loading)
      return (
        <div
          className="bg-gray bg-color1 padding-horizontal-md margin-top-md padding-vertical-md"
          style={{ width: "100%" }}
        >
          <h3 className="font-lg margin-bottom-md">Related Commodities</h3>
          <SectionSpinner isLoading={loading} />
        </div>
      );
    return (
      <div className="padding-vertical-lg" style={{ width: "100%" }}>
        <div
          className="bg-gray bg-color1 padding-horizontal-md padding-vertical-md"
          style={{ width: "100%" }}
        >
          <h3 className="font-lg margin-bottom-md">Related Commodities</h3>
          <PaddedCarousel
            slides={state.map((commodity) => (
              <CommodityCard commodity={commodity} />
            ))}
            cardAlign={true}
            autoSlide={false}
          />
          <div className="d-flex justify-content-center">
            <Link
              to="/commodities"
              className="btn-color1 ripple color-white font-sm"
            >
              VIEW ALL
            </Link>
          </div>
        </div>
      </div>
    );
  })
);
const mapStateToProps = (state) => {
  const {
    loadingIndicators: { singleCommodity: loading },
    error: { singleCommodity: error },
  } = state.commodityReducer;
  const { token } = state.authReducer;
  return { token, loading, error };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getSingleCommodityRequest }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CommodityDetails);
