import React, { forwardRef, Fragment, useEffect, useState, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FaSignOutAlt, FaWindows, FaStore, FaTimes } from 'react-icons/fa';
import { MdAccountBalanceWallet, MdKeyboardArrowDown } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import { FaWarehouse } from 'react-icons/fa';
import { Modal } from '../../../components';
import { actions  } from '../../../../helpers';

const { authActions: { signOut } } = actions;
const { useConfirmation } = Modal;
const LeftSidebar = forwardRef(({}, ref) => {
  useEffect(() => {
    let event = null;
      if(ref.current) {
        event = ref.current.nextElementSibling.addEventListener('click', () => {
          ref.current.classList.remove('toggle')
        })
      }
    return () => ref.current.nextElementSibling.removeEventListener('click', event);
  }, [ref])
  return (
    <aside ref={ref} className="sidebar bg-color1 padding-horizontal-sm padding-vertical-md">
      <h3 className="text-center store font-lg color-white">Store</h3>
      <div className="d-flex justify-content-end margin-bottom-md">
        <FaTimes className="color-white font-lg margin-right-sm times cursor-pointer"
          onClick={() => ref.current.classList.remove('toggle')}
        />
      </div>
      <SidebarItem link="/account" icon={FaWindows} text='dashboard' exact={true} />
      <SidebarItem link="/commodities" icon={FaStore} text="commodities" />
      <SidebarItem link="/account/wallet" icon={MdAccountBalanceWallet} text='wallet' />
      <SidebarItem link="/account/deals" icon={FaWarehouse} text='deals' />
      <SidebarItem link="/account/settings" icon={FiSettings} text='settings' />
      <QuickLinks />
      <Logout />
    </aside>
  )
})

const QuickLinks = () => {
  const [active, setActive] = useState(true);
  const contentRef = useRef(null);
  const chevronRef = useRef(null);
  useEffect(() => {
    active
    ? chevronRef.current.classList.add('active')
    : chevronRef.current.classList.remove('active')
  }, [active])
  const toggleAccordion = () => setActive(prev => !prev) 
  return (
    <div>
      <div className="other-links-toggler d-flex align-items-center color-white sidebar-item margin-bottom-sm padding-vertical-xsm padding-horizontal-sm cursor-pointer"
        onClick={toggleAccordion}>
        <div ref={chevronRef} className="chevron-icon margin-right-sm">
          <MdKeyboardArrowDown className="font-lg color-white"/>
        </div>
        <span className="color-white font-weight-500 font-md">Others</span>
      </div>
      <div ref={contentRef} className="padding-horizontal-sm accordion-content" style={{ display: active ? 'block' : 'none', width: '100%' }}>
        <ul>
          <li><Link className="d-block font-sm font-weight-500 color-white sidebar-item padding-vertical-xsm margin-bottom-xsm padding-horizontal-sm" to="/faqs">FAQs</Link></li>
          <li><Link className="d-block font-sm font-weight-500 color-white sidebar-item padding-vertical-xsm margin-bottom-xsm padding-horizontal-sm" to="/contact">Help</Link></li>
          <li><Link className="d-block font-sm font-weight-500 color-white sidebar-item padding-vertical-xsm margin-bottom-xsm padding-horizontal-sm" to="/privacy-policy">Privacy</Link></li>
          <li><Link className="d-block font-sm font-weight-500 color-white sidebar-item padding-vertical-xsm margin-bottom-xsm padding-horizontal-sm" to="/terms">Terms</Link></li>
        </ul>
      </div>
    </div>
  )
}
const SidebarItem = ({ icon: Icon, text, link, ...rest }) => {
  return (
    <li><NavLink {...rest} to={link} activeClassName="active" className="d-flex align-items-center color-white sidebar-item padding-vertical-xsm margin-bottom-sm padding-horizontal-sm">
      <Icon className="icon margin-right-sm" />
      <span className="font-md capitalize font-weight-500 font-style-normal">{text}</span>
    </NavLink></li>
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ signOut }, dispatch)
const Logout = connect(null, mapDispatchToProps)(({ signOut }) => {
  const { ConfirmationChild, openModal } = useConfirmation();
  return (
    <Fragment>
      <li onClick={openModal} className="d-flex align-items-center color-white sidebar-item padding-vertical-xsm padding-horizontal-sm cursor-pointer">
        <FaSignOutAlt className="margin-right-sm font-md" />
        <span className="font-md">Log out</span>
      </li>
      <ConfirmationChild action={signOut} heading={"Log out"}>
        <p>Are you sure you want to logout ?</p>
      </ConfirmationChild>
    </Fragment>
  )
})
export default LeftSidebar;
