import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Portal from "../Portal";
import "../modal.scss";
const Confirmation = (props) => {
  const { isOpen, children: Children } = props;
  const ref = useRef(null);
  console.log("isOpen", isOpen);
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleOutsideClick = useCallback((e) => {
    console.log("ref.current", ref.current);
    if (!ref.current?.contains(e.target)) props.toggleModal();
  }, []);
  return (
    <div
      className={
        isOpen
          ? "modalRoot d-flex justify-content-center align-items-center"
          : ""
      }
    >
      <div
        ref={(node) => (ref.current = node)}
        className={`modal bg-white overflow--h padding-md fadeIn-animation border-r-5`}
      >
        <div className="d-flex column modal-body"> {Children} </div>
      </div>
    </div>
  );
};

const useCenterModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const toggleModal = () => setIsOpen((prev) => !prev);
  const CenterModal = useCallback(
    ({ children }) => {
      return (
        isOpen && (
          <Portal
            component={Confirmation}
            closeModal={closeModal}
            isOpen={isOpen}
            toggleModal={toggleModal}
          >
            {children}
          </Portal>
        )
      );
    },
    [isOpen]
  );
  return { closeModal, openModal, isOpen, CenterModal };
};

export default useCenterModal;
