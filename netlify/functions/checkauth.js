exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  if (!ADMIN_PASSWORD) return { statusCode: 500, body: JSON.stringify({ error: 'Not configured' }) };
  try {
    const { password } = JSON.parse(event.body);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ valid: password === ADMIN_PASSWORD })
    };
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request' }) };
  }
};
