import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { utils } from '../../../helpers';
import { EmptyDataRender, SectionTitle, sorts, statuses, useSort } from '../../../components';
const { activity: activitySorts } = sorts;
const { activity: activityStatuses } = statuses;
const { formatting: { formatDate } } = utils;

const Activity = ({ activities, sortActivities }) => {
  const [sortResult, setSortResult] = useState(activities);
  const { SortDropdown, value: sortValue } = useSort(activitySorts.MOST_RECENT);
  const { SortDropdown: StatusDropdown, value: statusValue } = useSort(activityStatuses.COMPLETED);
  useEffect(() => {
    if(sortValue && sortValue.value === activitySorts.STATUS && statusValue) {
      setSortResult(sortActivities(activitySorts.STATUS, {status: statusValue.value }));
    }
    if(sortValue && sortValue.value === activitySorts.MOST_RECENT) {
      setSortResult(sortActivities(activitySorts.MOST_RECENT))
    }
  }, [sortValue, statusValue, sortActivities])
  return (
    <section className="overflow-h slim-border-2 padding-horizontal-md bg-white activity">
      <SectionTitle title="Activity" />
      <div className="sort margin-bottom-md d-flex justify-content-end">
        <SortDropdown
          options={Object.values(activitySorts)}
          className="margin-right-sm"
        />
        {sortValue && sortValue.value === activitySorts.STATUS && (
          <StatusDropdown
            label="Status"
            options={Object.values(activityStatuses)}
            className="margin-right-sm"
          />
        )}
      </div>
      <div style={{overflowX: 'auto'}}>
      {sortResult.length === 0
      ? <EmptyDataRender message="You do not have any activity" />
      : <table className="margin-bottom-md">
          <thead>
            <tr className="slim-border-bottom">
              <th className="font-weight-500 font-style-normal font-sm margin-right-sm">REMARK</th>
              <th className="font-weight-500 font-style-normal font-sm margin-right-sm">DATE</th>
              <th className="font-weight-500 font-style-normal font-sm margin-right-sm">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {sortResult.length === 0
              ? <EmptyDataRender message="You do not have any activity" />
              : sortResult.map(activity => <ActivityRow activity={activity} key={activity.id} />)
            }
          </tbody>
        </table>
      }
      </div>
      {/* <div className="d-flex headings slim-border-bottom padding-vertical-sm">
        <h3 className="font-weight-500 font-style-normal font-sm margin-right-sm remark">REMARK</h3>
        <div className="d-flex justify-content-center">
          <h3 className="font-weight-500 font-style-normal font-sm margin-right-sm">DATE</h3>
        </div>
        <div className="d-flex justify-content-end">
          <h3 className="font-weight-500 font-style-normal font-sm margin-right-sm" >STATUS</h3>
        </div>
      </div>
      {sortResult.length === 0
        ? <EmptyDataRender message="You do not have any activity" />
        : sortResult.map(activity => <ActivityRow activity={activity} key={activity.id} />)
      } */}
    </section>
  )
}

const ActivityRow = ({ activity }) => {
  const { created_at, remark, status } = activity;
  return (
    <tr className="padding-vertical-sm" >
      <td className="font-weight-500 font-style-normal font-sm margin-right-sm">{remark}</td>
      <td className="font-weight-500 font-style-normal font-sm margin-right-sm">{formatDate(created_at)}</td>
      <td className={`font-weight-600 font-style-normal font-sm margin-right-sm capitalize`}>
        <span className={`capitalize ${status === 'completed' ? 'color1' : 'danger-text'}`}>{status}</span>
      </td>
    </tr>
    // <div className="d-flex data-row slim-border-bottom padding-vertical-sm">
    //   <span className="font-weight-500 font-style-normal font-sm margin-right-sm remark">{remark}</span>
    //   <div className="d-flex justify-content-center">
    //     <span className="font-weight-500 font-style-normal font-sm margin-right-sm">{formatDate(created_at)}</span>
    //   </div>
    //   <div className="d-flex justify-content-end">
    //     <span className={`font-weight-500 font-style-normal font-sm margin-right-sm  ${status === 'completed' ? 'color1' : 'danger-text'}`}>{status}</span>
    //   </div>
    // </div>
  )
}

const mapStateToProps = state => {
  const { user_activities: activities } = state.accountReducer;
  const { STATUS, MOST_RECENT } = activitySorts;
  const sortActivities = (type, payload) => {
    switch(type) {
      case STATUS:
        const { status } = payload;
        return  activities.filter(walletRequest => walletRequest.status === status)
      case MOST_RECENT:
        return activities;
      default:
       return activities
    }
  }
  return { activities, sortActivities } 
}

export default connect(mapStateToProps, null)(Activity);
