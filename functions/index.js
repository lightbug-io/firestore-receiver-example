'use strict';

// [START firebaseimport]
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
// [END firebaseimport]
// [START additionalimports]
// Moments library to format dates.
const moment = require('moment');
// request to fetch subscription confirmation url
const request = require('request');
// [END additionalimports]


// [START trigger]
exports.lbListener = functions.https.onRequest((req, res) => {
  // [END trigger]
  // [START sendError]
  // Optional - Forbidding non POST requests.
  // if (req.method !== 'POST') {
  //   return res.status(403).send('Forbidden!');
  // }
  // [END sendError]

   const body = JSON.parse(req.body);

   console.log('Incoming data:', body);

   // Confirm we want to receive data
   if(body.Type === 'SubscriptionConfirmation')
   {
       console.log('Fetching subscribe url', body.SubscribeURL);
       request(body.SubscribeURL, (err, response) => {
           if (err) {
               console.log('failed to fetch subscribe url, check that your function has external connectivity or visit ' +
                   body.SubscribeURL + ' from your browser', err);
               res.status(500).send('fail');
           } else {
               console.log('Fetched subscribe url', response);
               res.status(200).send('ok');
           }
       });
     return; // stop function here
   }

   // Once confirmed, we'll receive all notifications
   // See https://docs.lightbug.io/apps/cloud/account/notifications#api-push for details on the structure
    if(body.Type === 'Notification')
    {
      const notification = JSON.parse(body.Message);
      const datapoint = notification.datapoint;
      const device = notification.device;

      // Example: log entries
      console.log(`Device #${device.id} has a new point for ${moment(datapoint.timestamp)} at
                  ${datapoint.location.lat}, ${datapoint.location.lng} - ${datapoint.address}`);

      // Example 2: write to firestore
        db.collection('incoming/'+device.id+'/datapoints').doc(datapoint.timestamp).set(datapoint);
    }

    // [START sendResponse]
    // NOTE - If this script returns anything other than a 2XX (HTTP OK) code, the notification will be retried
    res.status(200).send('ok');
    // [END sendResponse]
});
// [END all]
