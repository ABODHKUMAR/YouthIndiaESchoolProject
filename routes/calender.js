const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const { OAuth2 } = google.auth;

// Set up the OAuth2 credentials
const oAuth2Client = new OAuth2(
  '623642583884-apvlpr4jhsrddpetf7onrci2febd9la8.apps.googleusercontent.com',
  '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',
    'http://localhost:3000/rest/v1/calendar/redirect' // Your redirect URL
);

// GET /rest/v1/calendar/init/
router.get('/init', (req, res) => {
  // Generate the URL for the Google OAuth consent screen
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar'],
  });

  // Redirect the user to the Google OAuth consent screen
  res.redirect(authUrl);
});

// GET /rest/v1/calendar/redirect/
router.get('/redirect', async (req, res) => {
  // Extract the authorization code from the request query parameters
  const authorizationCode = req.query.code;
  const { tokens } = await oAuth2Client.getToken(authorizationCode);
  const accessToken = tokens.access_token;
  oAuth2Client.setCredentials({
    access_token: accessToken
  });
 
  console.log(accessToken);
   
   
    // Assign the OAuth2 client to the `auth` variable
    const auths = oAuth2Client;

  // try {
   
  //   const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

  //   const response = await calendar.events.list({
  //     calendarId: 'primary',
  //   });
  //   console.log("mae bhe");
  //   console.log(response)

  //   const events = response.data.items;

  //   res.json(events);
  // } catch (error) {
  //   console.error('Error retrieving access token:', error);
  //   res.status(500).send('Error retrieving access token');
  // }
  const timeMin = new Date(); // Current date and time
  timeMin.setHours(8, 0, 0); // Set the time to 8:00 AM
  
  const timeMax = new Date(); // Current date and time
  timeMax.setHours(20, 0, 0);
  const calendar = google.calendar({ version: 'v3', auth: auths});
    try {
      let response = await calendar.events.list({
          auth: oAuth2Client,
          calendarId: 'primary',
          timeMin: timeMin.toISOString(), // Convert the Date object to a valid RFC3339 timestamp
          timeMax: timeMax.toISOString(), // Co
          timeZone: 'Asia/Kolkata'
      });

      let items = response['data']['items'];
      console.log(items)
      res.json(items);
      // return items;
  } catch (error) {
      console.log(`Error at getEvents --> ${error}`);
      res.status(500).send('Error retrieving access token');

      // return 0;
  }
        // res.json(items);

  
  
});

module.exports = router;
