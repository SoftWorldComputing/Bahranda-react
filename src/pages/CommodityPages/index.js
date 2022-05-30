import React, { Fragment, lazy, Suspense, useRef, useCallback } from 'react';
import { Route, Switch } from 'react-router-dom';
import Commodities from './Commodities';
import { HorizontalNavbar, LeftSideBar } from '../Account/components';
import { Spinners } from '../../components';
import './product.scss';
const CommodityDetails = lazy(() => import('./CommodityDetails'));
const CommodityPages = ({ match: { path } }) => {
  const sidebarRef = useRef(null);
  const toggleSidebar = useCallback(() => sidebarRef.current.classList.toggle('toggle'), [])
  return (
    <Fragment>
      <section className="account d-flex">
        <LeftSideBar ref={sidebarRef} />
        <div className="wrapper d-flex column align-items-center padding-horizontal-xlg">
          <HorizontalNavbar toggleSidebar={toggleSidebar} />
          <main className="main padding-bottom-lg">
            <Suspense fallback={<Spinners.FullScreenSpinner isLoading={true} />}>
              <Switch>
                <Route exact path={path} component={Commodities} />
                <Route path={`${path}/:id`} component={CommodityDetails} />
              </Switch>
            </Suspense>
          </main>
        </div>
      </section>
    </Fragment>
  )
}

export default CommodityPages;
