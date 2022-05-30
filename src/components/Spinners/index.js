import React, { useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import SyncLoader from 'react-spinners/SyncLoader'
export const FullScreenSpinner = ({ isLoading }) => {
  return (
    <div className="modalRoot bg-color2 d-flex align-items-center justify-content-center">
      <SyncLoader
        size={35}
        color={"#069801"}
        loading={isLoading}
      />
    </div>
  )
}
export const useFullScreenSpinner = (bool) => {
  const [isLoading, setIsLoading] = useState(bool ? bool : false);
  const LoadingSpinner = isLoading &&  <FullScreenSpinner isLoading={isLoading} />
  return { LoadingSpinner, setIsLoading, isLoading }
}

export const SectionSpinner = ({ isLoading }) => {
  return (
    <div className="d-flex align-items-center justify-content-center" style={{height: '100%'}}>
      <SyncLoader
        size={25}
        color={"#069801"}
        loading={isLoading}
      />
    </div>
  )
}
export const useSectionSpinner = (bool) => {
  const [isLoading, setIsLoading] = useState(bool ? bool : false);
  const LoadingSpinner =  isLoading && (
    <div className="d-flex align-items-center justify-content-center" style={{height: '50vh'}}>
      <SyncLoader
        size={25}
        color={"#069801"}
        loading={isLoading}
      />
    </div>
  )
  return { isLoading, setIsLoading, LoadingSpinner }
}


export const useButtonSpinner = (bool = false, color = '#fff', size = 20) => {
  const [isLoading, setIsLoading] = useState(bool);
  const LoadingSpinner = <ClipLoader size={size} color={color} loading={isLoading} />
  return { setIsLoading, isLoading, LoadingSpinner }
}
