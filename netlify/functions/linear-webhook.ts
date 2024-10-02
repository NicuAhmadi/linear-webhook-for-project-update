import fetch from 'node-fetch';

export const handler = async (event: any) => {
  const payload = JSON.parse(event.body);
  const { action, data } = payload;

  // Forward the payload to Google Apps Script
  const response = await fetch('https://script.google.com/macros/s/AKfycbzLFdEQtCHPpZmNS5JrgPfnlNJgM-gFAqiRIi-AO6IEmWRkFcwGm4jYYyeWhph3nec6dw/exec', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: action,
      data: data,
    }),
  });

  if (!response.ok) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send data to Google Apps Script' }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
