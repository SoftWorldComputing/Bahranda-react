import React, { Fragment, useEffect } from 'react';
import { Header, Footer } from '../../components';
import { customerly } from 'react-customerly';

customerly.initialize("0afa5813",{ widget_position: "right" ,widget_color:'#069801'});



const PageWrapper = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <Fragment>
      <Header />
      {children}
      <Footer />
    </Fragment>
  )
}

// export const PageWrapperWithFooter
export default PageWrapper;
