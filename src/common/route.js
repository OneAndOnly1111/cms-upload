import React from 'react';
import Loadable from "react-loadable";

const myLoadingComponent = ({ isLoading, error, pastDelay }) => {
  // console.log("isLoading", isLoading, error, pastDelay);
  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Sorry,there was a problem loading the page.</div>;
  } else {
    return null;
  }
}

const routerData = [{
  path: '/',
  exact: true,
  authority: true,
  component: Loadable({
    loader: () =>
      import ("../components/Test"),
    loading: myLoadingComponent,
    delay: 300,
  })
}, {
  path: '/dashboard/analysis',
  exact: true,
  authority: true,
  component: Loadable({
    loader: () =>
      import ("../components/Test"),
    loading: myLoadingComponent,
    delay: 300,
  })
}, {
  path: '/dashboard/monitor',
  exact: true,
  authority: true,
  component: Loadable({
    loader: () =>
      import ("../components/Test"),
    loading: myLoadingComponent,
    delay: 300,
  })
}, {
  path: '/form/basic-form',
  exact: true,
  authority: true,
  component: Loadable({
    loader: () =>
      import ("../components/Test"),
    loading: myLoadingComponent,
    delay: 300,
  })
}, {
  path: '/form/step-form',
  exact: true,
  authority: true,
  component: Loadable({
    loader: () =>
      import ("../components/Test"),
    loading: myLoadingComponent,
    delay: 300,
  })
}];

export const getRouterData = () => routerData;