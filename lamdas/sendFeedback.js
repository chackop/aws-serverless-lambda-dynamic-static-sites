const querystring = require("querystring");
const AWS = require("aws-sdk");

// Object to handle email
var ses = new AWS.SES();

exports.handler = function (event, context, callback) {
  const params = querystring.parse(event.body);

  var emailParams = {
    Destination: {
      ToAddresses: ["chacko@skykatltd.com"],
    },
    Message: {
      Body: {
        Text: {
          Data: "Hello this is the email body!",
        },
      },
      Subject: {
        Data: "Email from Lambda!",
      },
    },
    Source: "chacko@skykatltd.com",
  };

  ses.sendEmail(emailParams, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log(data); // successful response
  });

  const response = {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "http://chacsdev.com" },
    body: JSON.stringify(
      "Thank you, " + params["name"] + "! " + "Your feedback was received!"
    ),
  };
  // return response;
  callback(null, response);
};
