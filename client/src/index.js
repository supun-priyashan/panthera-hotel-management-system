import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {MuiThemeProvider} from "@material-ui/core";
import {createTheme} from "@material-ui/core/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: '#5a2360'
        },
        secondary: {
            main: '#481C4C66'
        }
    }
});

ReactDOM.render(
  <React.StrictMode>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
