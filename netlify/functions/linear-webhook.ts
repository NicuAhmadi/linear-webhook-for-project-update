const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    const payload = JSON.parse(event.body);
    const { action, data } = payload;

    console.log("Received payload:", payload); // Log incoming payload

    const googleAppScriptUrl = 'https://script.google.com/macros/s/AKfycbzLFdEQtCHPpZmNS5JrgPfnlNJgM-gFAqiRIi-AO6IEmWRkFcwGm4jYYyeWhph3nec6dw/exec';

    // Send the data to Google Apps Script
    const response = await fetch(googleAppScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: action,
        data: data,
      }),
    });

    console.log("Response from Google Apps Script:", response.status); // Log the response from Google Apps Script

    if (!response.ok) {
      throw new Error('Failed to send data to Google Apps Script');
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Success' }),
    };
  } catch (error) {
    console.error("Error:", error.message); // Log any error that occurs
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
