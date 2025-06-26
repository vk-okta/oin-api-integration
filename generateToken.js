import axios from 'axios';

import createJWT from './createJwt.js';
import { scopes, base_url } from './config.js';

const data = {
  grant_type: 'client_credentials',
  client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
  client_assertion: createJWT(),
  scope: scopes,
};

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded',
};

export default async function generateToken() {
  try {
    const response = await axios.post(`${base_url}/oauth2/v1/token`, data, { headers });

    console.log('New Token Generated Successfully.');

    const accessToken = response.data.access_token;

    return accessToken;
  } catch (error) {
    console.log('Error in Generating Token. Okta-Request-ID ' + error.response?.headers['x-okta-request-id']);
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}
