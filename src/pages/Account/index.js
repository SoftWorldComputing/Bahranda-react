import React, { Fragment, useRef, lazy, Suspense, useCallback } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import { HorizontalNavbar, LeftSideBar } from './components';
import { Error404, Spinners } from '../components';
import './account.scss';
const Wallet = lazy(() => import('./Wallet'));
const Settings = lazy(() => import('./Settings'));
const DealPages = lazy(() => import('./Deal'));

const Account = ({ match: { path } }) => {
  const sidebarRef = useRef(null);
  const toggleSidebar = useCallback(() => {
    sidebarRef.current.classList.toggle('toggle')
  }, []);
  return (
    <Fragment>
      <section className="account d-flex">
        <LeftSideBar ref={sidebarRef} />
        <div className="wrapper d-flex column position-relative align-items-center padding-horizontal-xlg">
          <HorizontalNavbar toggleSidebar={toggleSidebar} />
          <main className="main padding-bottom-lg">
            <Suspense fallback={<Spinners.FullScreenSpinner isLoading={true} />}>
              <Switch>
                <Route exact path={path} component={Dashboard} />
                <Route path={`${path}/wallet`} component={Wallet} />
                <Route exact path={`${path}/settings`} component={Settings} />
                <Route path={`${path}/deals`} component={DealPages} />
                <Route component={Error404} />
              </Switch>
            </Suspense>
          </main>
        </div>
      </section>
    </Fragment>
  )
}

export default Account;
