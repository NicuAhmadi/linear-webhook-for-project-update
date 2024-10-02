import fetch from 'node-fetch';

export const handler = async (event: any) => {
  try {
    // Log the event data to make sure the payload is received
    console.log("Received event:", event.body);

    const payload = JSON.parse(event.body);
    const { action, data } = payload;

    // Log the extracted action and data
    console.log("Action:", action);
    console.log("Data:", data);

    // Forward the payload to Google Apps Script
    const response = await fetch('https://script.google.com/macros/s/AKfycbzLFdEQtCHPpZmNS5JrgPfnlNJgM-gFAqiRIi-AO6IEmWRkFcwGm4jYYyeWhph3nec6dw/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: action,
        data: data,
      }),
    });

    // Log the status of the request to Google Apps Script
    if (!response.ok) {
      console.log('Failed to send data to Google Apps Script');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to send data to Google Apps Script' }),
      };
    }

    const result = await response.json();
    console.log('Success:', result); // Log the success message from Google Apps Script

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Success' }),
    };
  } catch (error) {
    console.error('Error occurred:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
