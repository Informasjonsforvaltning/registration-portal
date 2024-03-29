import React, { memo, FC, Suspense, lazy } from 'react';
import { compose } from 'redux';
import {
  BrowserRouter,
  Router as BaseRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import type { History } from 'history';

import Header from '../../../components/header';
import Root from '../../../components/root';
import Footer from '../../../components/footer';

const routes = {
  catalogs: lazy(() => import('./catalogs'))
};

interface Props {
  history?: History;
}

const AppRouter: FC<Props> = ({ history, children }) =>
  history ? (
    <BaseRouter history={history}>{children}</BaseRouter>
  ) : (
    <BrowserRouter>{children}</BrowserRouter>
  );

const Router: FC<Props> = ({ history }) => (
  <AppRouter history={history}>
    <Header />
    <Root>
      <Suspense fallback={null}>
        <Switch>
          <Route path='/' component={routes.catalogs} />
          <Redirect to='/' />
        </Switch>
      </Suspense>
    </Root>
    <Footer />
  </AppRouter>
);

export default compose<FC>(memo)(Router);
