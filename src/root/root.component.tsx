import React, {FC, useMemo} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {AppComponent} from '../app/app.component';
import {createStore} from './root.api';

export const RootComponent: FC = () => {

  const store = useMemo(createStore, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppComponent/>
      </BrowserRouter>
    </Provider>
  );

};
