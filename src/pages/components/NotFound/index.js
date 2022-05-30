import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = ({ message, link, linkTitle }) => {
  return (
    <div className="d-flex column flex-center">
      <p className="font-md text-content font-weight-600 text-center margin-bottom-md uppercase">{message}</p>
      {link && <Link to={link} className="btn-color1 capitalize color-white font-weight-600 font-md">{linkTitle}</Link>}
    </div>
  )
}

export default NotFound;