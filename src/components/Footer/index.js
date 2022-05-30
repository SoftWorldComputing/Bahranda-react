import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { actions } from '../../helpers';
import { useFormInput, SubmitButton } from '../Form';
import HttpStatusNotification from '../HttpStatus';
import logo from '../../assets/baranda.png';
const { otherActions: { newsletterRequest } } = actions;
const Footer = () => {
  return (
    <div>
      <section className="dealer padding-horizontal-xlg padding-vertical-lg bg-color1">
        <div className="dealer-btn margin-bottom-md">
          <h3 className="color-white font-xlg margin-bottom-md">Become a Dealer</h3>
          <Link to="/auth/register" className="btn bg-white font-weight-600 color1 font-sm">Get started</Link>
        </div>
        <img className="truck" src={"https://res.cloudinary.com/bahranda/image/upload/v1598104890/Bahranda%20Assets/delivery-truck_qh04j3.png"} alt="Bahranda van" />
      </section>
      <footer className="padding-horizontal-xlg padding-vertical-lg bg-dark">
        <div className="d-flex justify-content-s-between">
          <Link to="/"><img src={logo} alt="Bahranda logo" className="margin-bottom-md logo-lg" /></Link>
          <NewsLetter />
        </div>
        <div className="footer-links d-flex align-items-center padding-bottom-md slim-border-bottom">
          <div className="footer-link">
            <h4 className="color-white title">Company</h4>
            <div className="d-flex column">
              <Link className="font-sm color-white" to="/how-we-work">About us</Link>
              <Link className="font-sm color-white" to="/reviews">Reviews</Link>
              <Link className="font-sm color-white" to="/commodities">Store</Link>
              <Link className="font-sm color-white" to="/faqs">Frequently asked questions</Link>
            </div>
          </div>
          <div className="footer-link">
            <h4 className="color-white title">Resources</h4>
            <div className="d-flex column">
              <Link className="font-sm color-white" to="/contact">Help</Link>
              <Link className="font-sm color-white" to="/privacy-policy">Privacy and policy</Link>
              <Link className="font-sm color-white" to="/terms">Terms and conditions</Link>
              <Link className="font-sm color-white" to="/vacancy">Vacancy</Link>
            </div>
          </div>
          <div className="footer-link">
            <h4 className="color-white title">Get in touch</h4>
            <div className="d-flex column">
            <a href="tel:07062453802"className="font-sm color-white">+234-70-624-53802</a>
              <span className="font-sm color-white">clarify@bahranda.com</span>
              <span className="font-sm color-white"></span>
              <div className="d-flex align-items-center">
                <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/Bahranda1" className="d-flex flex-center bg-color1-opacity round-icon border-r-circle margin-right-sm cursor-pointer">
                  <FaTwitter className="color-white font-sm" />
                </a>
                <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/bahranda1" className="d-flex flex-center bg-color1-opacity round-icon border-r-circle margin-right-sm cursor-pointer">
                  <FaInstagram className="color-white font-sm" />
                </a>
                <a target="_blank" rel="noopener noreferrer" href="https://facebook.com/Bahranda-101958331628679" className="d-flex flex-center bg-color1-opacity round-icon border-r-circle margin-right-sm cursor-pointer">
                  <FaFacebookF className="color-white font-sm" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
    
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ newsletterRequest }, dispatch)
const mapStateToProps = state => {
  const {
    loadingIndicators: { newsletter: loading },
    success: { newsletter: success },
    errors: { newsletter: error }
  } = state.otherReducer
  return { loading, success, error }
}
const NewsLetter = connect(mapStateToProps, mapDispatchToProps)(({ newsletterRequest, loading, success, error }) => {
  const { value: email, handleUserInput, isValid: emailIsValid } = useFormInput();
  const { value: name, handleUserInput: setName , isValid: nameIsValid } = useFormInput();
  const validateFields = emailIsValid && nameIsValid
  return (
    <form className="d-flex column padding-horizontal-lg padding-vertical-md newsletter bg-white">
      <span className="font-md margin-bottom-md">Subscribe to our mailing list</span>
      <input name="name" value={name} placeholder="Full name" onChange={setName(null, null)} className=" padding-md margin-bottom-sm" />
      <input name="email" type="email" value={email} placeholder="Email address" onChange={handleUserInput(1, null)} className=" padding-md margin-bottom-sm" />
      <SubmitButton
        isLoading={loading}
        disabled={!validateFields}
        text="Subscribe"
        action={() => newsletterRequest({ email, name })}
      />
      {(error || success) && <HttpStatusNotification  message={error || success} status={error ? 'error' : 'success'}  />}
    </form>
  )
})

export default Footer;