import axios from 'axios';
import generateToken from './generateToken.js';
import { base_url } from './config.js';

const limit = 10;

export default async function getSystemLogs() {
  try {
    const token = await generateToken();

    const response = await axios.get(base_url + '/api/v1/logs?limit=' + limit, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Get Logs successful.');

    const modResults = response.data.map(({ displayMessage, outcome }) => ({
      displayMessage,
      outcome,
    }));

    // console.log(modResults);

    return modResults;
  } catch (error) {
    console.log('Error in fetching logs');
    console.log({
      status: error.response.status,
      statusText: error.response.statusText,
      OktaRequestId: error.response.headers['x-okta-request-id'],
      data: error.response.data,
    });
  }
}
