import React, { useState, useRef, useEffect } from "react";
import { MdKeyboardArrowDown } from 'react-icons/md';
import "./accordion.scss";

function Accordion({ title, content }) {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const contentRef = useRef(null);
  const chevronRef = useRef(null);
  useEffect(() => {
    setActive === "active"
    ? chevronRef.current.classList.add('active')
    : chevronRef.current.classList.remove('active')
  }, [setActive])
  const toggleAccordion = () => {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${contentRef.current.scrollHeight}px`
    );
  }
 return (
   <div className="d-flex column slim-border-bottom">
      <button className="accordion d-flex padding-md align-items-center justify-content-s-between cursor-pointer" onClick={toggleAccordion}>
        <p className="font-weight-600 font-md">{title}</p>
        <div className="chevron-icon" ref={chevronRef}>
          <MdKeyboardArrowDown className={"font-xlg"}/>
        </div>
      </button>
      <div ref={contentRef} className="accordion-content bg-white overflow-h" style={{ maxHeight: `${setHeight}`, width: '100%' }}>
        <div className="accordion__text">{content}</div>
      </div>
    </div>
  );
}

export default Accordion;
