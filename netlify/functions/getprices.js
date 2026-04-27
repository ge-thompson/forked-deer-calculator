exports.handler = async function(event, context) {
  const KEY = process.env.JSONBIN_KEY;
  const BIN = process.env.JSONBIN_BIN;

  if (!KEY || !BIN) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing environment variables' })
    };
  }

  try {
    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN}/latest`, {
      method: 'GET',
      headers: {
        'X-Master-Key': KEY,
        'X-Bin-Meta': 'false'
      }
    });

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
