import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import axios from 'axios';


import {BrowserRouter} from 'react-router-dom'

const clientID="9f50a6eb-f310-4cc7-be6b-cbfffb49b623"
const clientSecret="]b[dtj5pNc5@R5GndwGMvn0fLkkb?jG"
const url="https://aey0y39na.trial-accounts.ondemand.com"

const root = ReactDOM.createRoot(document.getElementById('root'));

// const CREDENTIALS = xsenv.getServices({myIas: {label:'identity'}}).myIas


// async function _fetchJwtToken (){
//   const clientid = CREDENTIALS.clientid
//   const auth = "Basic " + Buffer.from(clientid + ':' + CREDENTIALS.clientsecret).toString("base64");

//   const options = {
//       method: 'POST',
//       url: `${CREDENTIALS.url}/oauth2/token?grant_type=client_credentials&client_id=${clientid}`,
//       headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//           'Authorization': auth
//       }
//   }
//   const response = await axios(options);
//   return response.data.access_token
// }

// async function _callBackend(token){
//   const options = {
//       method: 'GET',
//       url: 'https://backendapp.cfapps.sap.hana.ondemand.com/endpoint',
//       headers: {
//           'Accept': 'application/json',
//           'Authorization': 'bearer ' + token 
//       }
//   }
//   const response = await axios(options)
// }


async function _fetchJwtToken (){
  const clientid = clientID
  const auth = "Basic " + Buffer.from(clientid + ':' + clientSecret).toString("base64");

  const options = {
      method: 'POST',
      url: `${url}/oauth2/token?grant_type=client_credentials&client_id=${clientid}`,
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': auth
      }
  }
  const response = await axios(options);
  return response.data.access_token
}

async function _callBackend(token){
  const options = {
      method: 'GET',
      url: 'https://backendapp.cfapps.sap.hana.ondemand.com/endpoint',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'bearer ' + token 
      }
  }
  const response = await axios(options)
}
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

reportWebVitals();
