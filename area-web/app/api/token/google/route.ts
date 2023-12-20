import { OAuth2Client, Credentials } from 'google-auth-library';
import http from 'http';
import url from 'url';
import open from 'open';

const client = new OAuth2Client(
  'CLIENT_ID',
  'CLIENT_SECRET',
  'REDIRECT_URL'
);

async function getAccessToken(): Promise<void> {
  const authenticatedClient = await getAuthenticatedClient();
  const apiUrl = new URL('https://www.googleapis.com/oauth2/v4/token');

  const res = await authenticatedClient.request({
    url: apiUrl.href,
    method: 'POST',
    data: {
      grant_type: 'authorization_code',
      code: 'YOUR_AUTHORIZATION_CODE',
      redirect_uri: 'REDIRECT_URL'
    }
  });
  console.log(res.data);
}

async function getAuthenticatedClient(): Promise<OAuth2Client> {
  const authUrl = client.generateAuthUrl({
    access_type: 'offline',
    scope: 'YOUR_REQUESTED_SCOPES'
  });

  await open(authUrl);

  const authorizationCode = 'GET_THE_AUTHORIZATION_CODE_FROM_CALLBACK';
  const { tokens } = await client.getToken(authorizationCode);
  client.setCredentials(tokens);

  return client;
}

getAccessToken().catch(console.error);
