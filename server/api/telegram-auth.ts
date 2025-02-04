import crypto from 'node:crypto';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const secret = crypto.createHash('sha256').update('<Ваш токен бота>').digest();

  const dataCheckString = Object.keys(body)
    .filter(key => key !== 'hash')
    .map(key => `${key}=${body[key]}`)
    .sort()
    .join('\n');

  const hash = crypto.createHmac('sha256', secret).update(dataCheckString).digest('hex');

  if (hash === body.hash) {
    // Данные валидны
    return { success: true, user: body };
  } else {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }
});
