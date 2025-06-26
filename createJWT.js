import njwt from 'njwt';
import { readFileSync } from 'fs';

import { base_url, kid, client_id } from './config.js';

const { create } = njwt;

export default function createJWT() {
  const privateKey = readFileSync('private.key', 'utf8');
  const clientId = client_id;
  const now = Math.floor(new Date().getTime() / 1000);
  const expirationTime = new Date((now + 60 * 60) * 1000);
  const alg = 'RS256';

  const claims = {
    aud: base_url + '/oauth2/v1/token',
  };

  const jwt = create(claims, privateKey, alg)
    .setHeader('kid', kid)
    .setIssuedAt(now)
    .setExpiration(expirationTime)
    .setIssuer(clientId)
    .setSubject(clientId);

  return jwt.compact();
}
