import React, { useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { FaTwitter, FaFacebookF, FaInstagram, FaBars } from 'react-icons/fa';
import {MdLocationOn, MdPhoneIphone} from 'react-icons/md';
import logo from '../../assets/baranda.png';

const Header = () => {
  return (
    <header>
      <div className="before-nav d-flex justify-content-s-between bg-color1 color-white padding-horizontal-xlg padding-vertical-sm">
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center address margin-right-md">
            <MdLocationOn color="#fff" className="font-lg margin-right-sm" style={{flex: .2}} />
            <p className="font-sm font-weight-500" style={{flex: .8}}>21 Ajasa Street, Onikan, Lagos</p>
          </div>
          <div className="d-flex align-items-center phone">
            <MdPhoneIphone color="#fff" className="font-lg" />
            <a href="tel:07062453802"className="font-sm color-white">+234-70-624-53802</a>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <a target="_blank" rel="noopener noreferrer" className="margin-right-md font-md" href="https://twitter.com/Bahranda1"><FaTwitter className="color-white"/></a> 
          <a target="_blank" rel="noopener noreferrer" className="margin-right-md font-md" href="https://www.instagram.com/bahranda1"><FaInstagram  className="color-white" /></a>
          <a target="_blank" rel="noopener noreferrer" className="margin-right-md font-md" href="https://facebook.com/Bahranda-101958331628679"><FaFacebookF className="color-white" /></a>
        </div>
      </div>
      <NavBar />
    </header>
  )
}

const mapStateToProps = state => {
  const { authReducer } = state;
  return { isLoggedIn: authReducer.token && authReducer.isLoggedIn }
}
const NavBar = connect(mapStateToProps, null)(({ isLoggedIn }) => {
  const navRef = useRef(null);
  const navBar = useRef(null)
  useEffect(() => {
    const listener = window.addEventListener('scroll', () => {
      if(navBar.current) {
        window.scrollY > 0
      ? navBar.current.classList.add('sticky_nav')
      : navBar.current.classList.remove('sticky_nav')
      }
    });
    return window.removeEventListener('scroll', listener)
  }, [])
  return (
    <nav ref={navBar} className="d-flex align-items-center justify-content-s-between padding-horizontal-xlg padding-vertical-md bg-white">
      <Link to="/"><img src={logo} className="logo-md margin-right-md" alt="bahranda logo" /></Link>
      <div ref={navRef} className="d-flex nav-links toggle align-items-center justify-content-s-between">
        <NavLink exact  activeClassName="color1 font-weight-500" to="/" className="color-dark padding-md">Home</NavLink>
        <NavLink  activeClassName="color1 font-weight-500" to="/how-we-work" className="color-dark font-md padding-md">How we work</NavLink>
        <NavLink  activeClassName="color1 font-weight-500" to="/commodities" className="color-dark font-md padding-md">Commodities</NavLink>
        <NavLink  activeClassName="color1 font-weight-500" to="/contact" className="color-dark font-md padding-md">Contact Us</NavLink>
        {!isLoggedIn &&
        <div className="d-flex align-items-center justify-content-s-between auth-links">
          <NavLink activeClassName="color1" to="/auth/signin" className="color-dark font-md margin-right-sm padding-md">Sign in</NavLink>
          <NavLink to="/auth/register" className="ripple padding-horizontal-sm font-weight-600 bg-color1 border-r-5 color-white font-sm margin-right-md">Register</NavLink>
        </div>}
      </div>
      <FaBars className="font-md cursor-pointer bar color1" onClick={() => navRef.current.classList.toggle('toggle')} />
    </nav>
  )
})
export default Header;
