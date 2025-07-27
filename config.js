import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(import.meta.dirname, 'testenv') });

export const base_url = process.env.BASE_URL;
export const port = process.env.PORT;
export const client_id = process.env.CLIENT_ID;
export const client_secret = process.env.CLIENT_SECRET;
export const kid = process.env.KID;
export const scopes = process.env.SCOPES;
