import React, { useLayoutEffect } from 'react';
import reactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions, utils } from '../../helpers';
import { Spinners } from '../components';
const { FullScreenSpinner } = Spinners;
const { otherActions: { getPrivacyRequest } } = actions;
const { formatting: { formatDate } } = utils;
const PrivacyPolicy = ({ privacy, hasFetchedPrivacy, isLoading, getPrivacyRequest }) => {
  useLayoutEffect(() => {
    if(!hasFetchedPrivacy) getPrivacyRequest()
  }, [hasFetchedPrivacy, getPrivacyRequest]);
  if(isLoading) return <FullScreenSpinner isLoading={isLoading} />
  const { privacy_text, updated_at } = privacy
  return (
    <main className="padding-horizontal-xlg padding-vertical-lg">
      <article className="page bg-white slim-border padding-md">
        <h1 className="font-xlg font-weight-bold margin-bottom-sm">Privacy Policy</h1>
        <div className="padding-bottom-md">
          <span className="font-md">Last updated: {formatDate(updated_at)}</span>
        </div>
        <div className="content">
          {reactHtmlParser(privacy_text)}
        </div>
      </article>
    </main>
  )
}

const mapStateToProps = state => {
  const { privacy, success: { hasFetchedPrivacy } } = state.otherReducer;
  const { isLoading } = state.UIReducer
  return { privacy, hasFetchedPrivacy, isLoading }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getPrivacyRequest }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy)