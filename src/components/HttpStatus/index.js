import React, { useRef, useEffect } from 'react';
import { MdError } from 'react-icons/md';
import { IoMdCheckmarkCircle } from 'react-icons/io'
const HttpStatusNotification = ({ status, message }) => {
  const ref = useRef(null);
  useEffect(() => {
    const persistRef = ref.current;
    ref.current.classList.add('fadeIn-animation');
    return () => persistRef.classList.remove('fadeIn-animation')
  }, [])
  return (
    <div ref={ref} className="d-flex justify-content-center http-status">
      <div className={`d-flex nowrap align-items-center border-r-5 content
        padding-horizontal-sm padding-vertical-sm ${status === 'error' ? 'bg-danger' : 'bg-color1'}`}
        style={{zIndex: 999}}>
          {status === 'error'
          ? <MdError className="font-lg margin-right-sm color-white" />
          : <IoMdCheckmarkCircle className="font-lg margin-right-sm color-white" />
          }
        <div className="d-flex column">
          <p className="text-content font-sm font-weight-600 color-white">{message}</p>
        </div>
      </div>
    </div>
  )
}

export default HttpStatusNotification;
