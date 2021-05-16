import {Spin} from 'antd';
import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router-dom';
import {appInitRequest} from './app.action';
import {selectApp} from './app.selector';

const HomeComponent: FC = () => {

  const dispatch = useDispatch();
  const app = useSelector(selectApp);

  useEffect(() => {
    dispatch(appInitRequest());
  }, [dispatch]);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {app.init === 'success' ? (
        <span className="text-6xl">Hello, World!</span>
      ) : (
        <Spin size="large"/>
      )}
    </div>
  );

};

const NotFoundComponent: FC = () => {

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <span className="text-6xl">404</span>
      <span className="text-xl">Not Found</span>
    </div>
  );

};

export const AppComponent: FC = () => {

  return (
    <Switch>
      <Redirect from="/" to="/home" exact/>
      <Route path="/home">
        <HomeComponent/>
      </Route>
      <Route path="*">
        <NotFoundComponent/>
      </Route>
    </Switch>
  );

};
