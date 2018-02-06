import React from 'react';
import Loadable from "react-loadable";

const myLoadingComponent = ({ isLoading, error, pastDelay }) => {
  if (isLoading) {
    return <div style={{color:'#999'}}>Loading...</div>;
  } else if (error) {
    return <div style={{color:'#999'}}>Sorry,there was a problem loading the page.</div>;
  } else {
    return null;
  }
}

const checkAuth = (routerPath) => {

}

const routerData = [{
  path: '/',
  exact: true,
  authority: true,
  component: Loadable({
    loader: () =>
      import ("../containers/BasicMonit/Dashboard"),
    loading: myLoadingComponent,
    delay: 300,
  })
}, {
  path: '/user/setting',
  exact: true,
  authority: true,
  component: Loadable({
    loader: () =>
      import ("../containers/User/UserSetting"),
    loading: myLoadingComponent,
    delay: 300,
  })
}, {
  path: '/user/management',
  exact: true,
  authority: true,
  component: Loadable({
    loader: () =>
      import ("../containers/User/UserManagement"),
    loading: myLoadingComponent,
    delay: 300,
  })
}, {
  path: '/dashboard/analysis',
  exact: true,
  authority: true,
  component: Loadable({
    loader: () =>
      import ("../containers/BasicMonit/Dashboard"),
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

export const getRouterData = (userInfo) => {
  console.log("userInfo--router", userInfo);
  let accesses = "ConsoleServerDeployReadOnlyAccess,ConsoleBasicMonitorReadOnlyAccess,ConsoleBusinessMonitorFullAccess,ConsoleAuthorityModuleFullAccess";
  return routerData
};