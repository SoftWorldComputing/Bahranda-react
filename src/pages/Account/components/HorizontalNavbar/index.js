import React from 'react';
import { FaBars} from 'react-icons/fa';
import { connect } from 'react-redux';

const HorizontalNavbar = ({ first_name, last_name, toggleSidebar }) => {
  return (
    <nav className="d-flex nowrap justify-content-s-between align-items-center padding-bottom-md margin-vertical-md slim-border-bottom" style={{width: '100%'}}>
      <div className="d-flex align-items-center">
        <button className="bar border-r-circle margin-right-md cursor-pointer"
          onClick={toggleSidebar}>
          <FaBars className="bar-icon" style={{fontSize: '20px'}} />
        </button>
        <h2 className="greet font-lg capitalize">Hello, {`${first_name} ${last_name}`}</h2>
      </div>
    </nav>
  )
};

const mapNameToProps = state => {
  const { first_name, last_name } = state.accountReducer.profile;
  return { first_name, last_name }
}

export default connect(mapNameToProps, null)(HorizontalNavbar);
