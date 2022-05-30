import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../../helpers';
import { bindActionCreators } from 'redux';
import { Cards, Carousels } from '../../../components';
const { otherActions: { getTeamMembersRequest } } = actions;
const { TeamCard } = Cards;
const { PaddedCarousel } = Carousels;
const TeamSlider = ({ getTeamMembersRequest, teamMembers, hasFetchedTeam }) => {

  useEffect(() => {
    if(!hasFetchedTeam) getTeamMembersRequest()
  }, [hasFetchedTeam, getTeamMembersRequest])
  return (
    <div className="bg-gray padding-horizontal-sm padding-vertical-md">
      <h3 className="font-xlg text-center font-weight-normal margin-bottom-md">Our Team</h3>
      {teamMembers.length === 0
        ? <div className="d-flex flex-center padding-vertical-md">
          </div>
      : <PaddedCarousel
          slides={teamMembers.map(member => <TeamCard member={member} />)}
          cardAlign={true}
          autoSlide={false}
        />
      }
    </div> 
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getTeamMembersRequest }, dispatch);
const mapStateToProps = state => {
  const { teamMembers, success: { hasFetchedTeam } } = state.otherReducer;
  return { teamMembers, hasFetchedTeam }
}
export default connect(mapStateToProps, mapDispatchToProps)(TeamSlider);
