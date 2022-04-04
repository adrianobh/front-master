import React from "react";
import App from "./App";
import { Provider } from "react-redux";
import { render } from "react-dom";
import { createStore, compose, applyMiddleware } from "redux";
import { persistReducer } from "redux-persist";
import rootReducer from "./store/reducers";
import thunk from "redux-thunk";
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: "root",
  storage,
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, composeEnhancer(applyMiddleware(thunk)));

render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
