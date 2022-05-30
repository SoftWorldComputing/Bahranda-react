import React from 'react';
import error404 from '../../assets/404_error.svg';
import { Link } from 'react-router-dom';
const Error404 = ({link = '/'}) => (
  <section className="error-404 d-flex column align-items-center">
    <div className="svg-container d-flex flex-center">
      <img src={error404} alt="404 Error display" className="svg" />
    </div>
    <div className="d-flex column align-items-center">
      <h2 className="margin-bottom-sm uppercase font-lg font-weight-400">page not found</h2>
      <Link to={link} className="padding-md border-r-5 bg-color1 color-white ripple">Go Home</Link>
    </div>
  </section>
)

export default Error404;
