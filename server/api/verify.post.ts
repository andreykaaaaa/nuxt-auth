import OAuth2Client from 'google-auth-library';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const client = new OAuth2Client('168110425588-cte0v8not56pr9e12eo0ub1fbahabfi6.apps.googleusercontent.com');
  const payload = await client.verifyIdToken({
    idToken: body.token as string,
    audience: '168110425588-cte0v8not56pr9e12eo0ub1fbahabfi6.apps.googleusercontent.com'
  });

  return payload;
});
