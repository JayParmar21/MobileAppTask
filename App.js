import React from "react";
import Router from "./src/Router";
import rootSaga from "./src/Redux/saga";
import reducers from "./src/Redux/reducer";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
