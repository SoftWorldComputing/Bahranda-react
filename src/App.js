import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history'
import Home, { Auth, ContactUs, HowWeWork, FAQs } from './pages';
import { IconContext } from "react-icons";
import { ProtectedRoute, Spinners, Error404 } from './components';
import './styles/App.scss';
import './styles/form.scss';
const Account = lazy(() => import('./pages/Account'));
const CommodityPages = lazy(() => import('./pages/CommodityPages'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfServices = lazy(() => import('./pages/TermsOfServices'));

function App() {
  useEffect(() => {
    ReactGA.initialize('UA-179562010-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [])

  return (
    <IconContext.Provider value={{ className: "global-class-name" }}>
      <Router>
        <Suspense fallback={<Spinners.FullScreenSpinner isLoading={true} />}>
          <Switch>
            <Route path="/" component={Home} exact={true} />
            <Route path="/auth" component={Auth} />
            <Route path="/contact" component={ContactUs} exact={true} />
            <Route path="/how-we-work" component={HowWeWork} exact={true} />
            <Route path="/faqs" component={FAQs} exact={true} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/terms" component={TermsOfServices} />
            <ProtectedRoute auth={true} path="/commodities" redirectPath="/auth/signin" component={CommodityPages} />
            <ProtectedRoute auth={true} path="/account" redirectPath="/auth/signin" component={ Account } />
            <Route component={Error404} />
          </Switch>
        </Suspense>
      </Router>
    </IconContext.Provider>
  );
}

export default App;
