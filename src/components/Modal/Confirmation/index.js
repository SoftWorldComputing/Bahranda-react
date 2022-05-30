import React, { useState } from 'react';
import Portal from '../Portal';
import '../modal.scss';
const Confirmation= (props) => {
  const { isOpen, closeModal, action, children: Children, heading } = props;
  const fireAction = () => {
    action();
    closeModal();
  }
  return (
    <div className={isOpen ? 'modalRoot d-flex justify-content-center align-items-center' : ''}>
      <div className={`modal bg-white overflow--h padding-md fadeIn-animation border-r-5`}>
        <div className="d-flex column">
          <h1 className="font-md font-weight-600">{heading}</h1>
          <div className="font-sm color-dark padding-bottom-md">{Children}</div>
          <div className="d-flex justify-content-end" style={{width: '100%'}}>
            <button className="padding-md margin-right-sm cursor-pointer font-sm font-weight-600 border-r-5 bg-danger color-white" onClick={fireAction}>
              Yes
            </button>
            <button className="padding-md font-sm font-weight-600 cursor-pointer border-r-5 bg-color1 color-white" onClick={closeModal}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const useConfirmation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const ConfirmationChild = ({ children, heading, action }) => {
    return isOpen && (
      <Portal component={Confirmation} heading={heading} action={action} closeModal={closeModal} isOpen={isOpen}>
        {children}
      </Portal>
    )
  }
  return { closeModal, openModal, isOpen, ConfirmationChild }
}

export default useConfirmation;
