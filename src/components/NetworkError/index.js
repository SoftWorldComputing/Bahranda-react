import React, { useCallback } from 'react';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BsExclamationTriangleFill } from 'react-icons/bs'
import { actions } from '../../helpers';
const { UIActions: { eraseNetworkError } } = actions;
const NetworkError = ({ networkError, eraseNetworkError, children }) => {
  const { show, dispatch: action } = networkError;
  const dispatch = useDispatch()
  const callback = useCallback(() => {
    eraseNetworkError();
    dispatch(action)
  },[action, eraseNetworkError, dispatch])
  if(!show && !action) return children
  return (
    <section className="d-flex column flex-center bg-white">
      <div className="padding-horizontal-xlg d-flex column flex-center network-error">
        <div className="d-flex flex-center">
          <div className="d-flex column flex-center round border-r-circle bg-gray margin-bottom-md margin-right-lg">
            <BsExclamationTriangleFill className="font-xlg danger-text margin-bottom-sm" />
            <p className="font-md capitalize font-eright-600 danger-text">Page loading error</p>
          </div>
          <div className="flex-equal padding-horizontal-lg">
            <p className="font-md text-content font-weight-500 margin-bottom-md">Your browser can't establish a connection to the server at bahranda.com</p>
            <ul className="text-content font-sm">
              <li className="margin-bottom-sm">Bahranda could be temporarily unavailable or too busy. Try again in a few moments.</li>
              <li className="margin-bottom-sm">If you are unable to load any pages, check your computer’s network connection.</li>
              <li className="margin-bottom-sm">If your computer or network is protected by a firewall or proxy, make sure that your browser is permitted to access the Web.</li>
            </ul>
            <div className="d-flex justify-content-end" style={{width: '100%'}}>
              <button
                onClick={callback}
                className="cursor-pointer padding-md padding-vertical-sm bg-color1 color-white ripple font-sm font-weight-600">
                TRY AGAIN
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const mapStateToProps = state => {
  const { networkError } = state.UIReducer
  return { networkError }
}

const mapDispatchToProps = dispatch => 
  bindActionCreators({ eraseNetworkError }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NetworkError)