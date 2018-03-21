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

const routerData = [{
  path: '/',
  exact: true,
  authority: true,
  component: Loadable({
    loader: () =>
      import ("../containers/Video/UploadVideo"),
    loading: myLoadingComponent,
    delay: 300,
  })
}, {
  path: '/userUpload',
  exact: true,
  authority: true,
  component: Loadable({
    loader: () =>
      import ("../containers/Video/UploadVideo"),
    loading: myLoadingComponent,
    delay: 300,
  })
}, {
  path: '/publishList',
  exact: true,
  authority: true,
  component: Loadable({
    loader: () =>
      import ("../containers/Video/PublishList"),
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
}];

export const getRouterData = () => {
  return routerData
};