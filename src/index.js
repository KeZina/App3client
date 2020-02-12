import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import "./SCSS/index.scss";
import * as serviceWorker from './serviceWorker';
import App from './components/App';

ReactDOM.render(
    <Router>
        <App />  
    </Router>,
    document.getElementById('root')
)

serviceWorker.unregister()
