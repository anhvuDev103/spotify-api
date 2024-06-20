import axios from 'axios';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import querystring from 'querystring';

import { OauthQueries } from '~/models/queries/oauth.queries';
import { OauthResponse } from '~/models/responses/oauth.responses';
import { generateRandomString } from '~/utils/common.utils';

export const oauthController = async (req: Request<ParamsDictionary, any, any, OauthQueries>, res: Response) => {
  const { code, state } = req.query;

  const authorizationString = `Basic ${Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')}`;

  const { data } = await axios.post<OauthResponse>(
    'https://accounts.spotify.com/api/token',
    {
      grant_type: 'authorization_code',
      redirect_uri: process.env.REDIRECT_URI,
      code
    },
    {
      headers: {
        Authorization: authorizationString,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );

  res.cookie('access_token', data.access_token);
  res.cookie('refresh_token', data.refresh_token);
  res.cookie('expires_in', data.expires_in);
  res.cookie('scope', data.scope);
  res.cookie('token_type', data.token_type);

  return res.redirect(process.env.CLIENT_REDIRECT_CALLBACK as string);
};
