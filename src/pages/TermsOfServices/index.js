import React, { useLayoutEffect } from 'react';
import reactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions, utils } from '../../helpers';
import { Spinners } from '../components';
const { FullScreenSpinner } = Spinners;
const { otherActions: { getTermsRequest } } = actions;
const { formatting: { formatDate } } = utils;

const TermsOfServices = ({ terms, isLoading, getTermsRequest }) => {
  useLayoutEffect(() => {
    if(terms.length === 0) getTermsRequest()
  }, [terms.length, getTermsRequest]);
  if(isLoading) return <FullScreenSpinner isLoading={isLoading} />
  const { term_text, created_at } = terms;
  return (
    <main className="padding-horizontal-xlg padding-vertical-lg">
    <article className="page bg-white slim-border padding-md">
      <h1 className="font-xlg font-weight-bold margin-bottom-sm">Terms Of Services</h1>
      <div className="padding-bottom-md">
        <span className="font-sm text-content">Last updated: {formatDate(created_at)}</span>
      </div>
      <div className="content">
        {reactHtmlParser(term_text)}
      </div>
    </article>
  </main>
  )
}

const mapStateToProps = state => {
  const { terms } = state.otherReducer;
  const { isLoading } = state.UIReducer
  return { terms, isLoading }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getTermsRequest }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TermsOfServices)