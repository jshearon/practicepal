import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom"
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from "@material-ui/styles";
import { theme } from './Theme/Theme'


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
