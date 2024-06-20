import express from 'express';

import { oauthController } from '~/controllers/auth.controllers';

const authRouter = express.Router();

authRouter.get('/callback', oauthController);

export default authRouter;
