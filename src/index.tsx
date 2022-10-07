import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import {store} from './services/store';
// import {createStore, compose, applyMiddleware} from "redux";
import { Provider } from "react-redux";
// import {rootReducer} from "./services/reducers";
// import thunk from "redux-thunk";
import { BrowserRouter as Router } from "react-router-dom";

// const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//
// const enhancer = composeEnhancers(applyMiddleware(thunk));
//
// const store = createStore(rootReducer, enhancer)

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>,
    document.getElementById('root')
);
reportWebVitals();
