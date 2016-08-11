// const {Wit, log} = require('node-wit');
const Botkit = require('botkit');
var apiai = require('apiai');

//API.AI---------------

var app = apiai("12c811c806aa4f388ca221980cf3bb4a");

//BOTKIT--------------

var controller = Botkit.slackbot({
  debug: false
  //include "log: false" to disable logging
  //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});

// connect the bot to a stream of messages
controller.spawn({
  token: 'xoxb-68187915027-JCXdwNCzUDYYVyIm1JbnVGEH',
}).startRTM()

// give the bot something to listen for.
// controller.hears('hello',['direct_message','direct_mention','mention'],function(bot,message) {
//
//   bot.reply(message,'Hello yourself.');
//
// });
//reply to any incoming message -------
// controller.on('message_received', function(bot, message) {
//     bot.reply(message, 'Incoming!');
// });
// reply to a direct mention - @bot hello ------
controller.on('direct_mention',function(bot,message) {
  // reply to _message_ by using the _bot_ object
  var request = app.textRequest(message.text);

  request.on('response', function(response) {
      bot.reply(message,"Action:  " + response.result.action + "\n Answer:  " + response.result.fulfillment.speech);
      console.log(response.result);
  });
  request.end()

});
//reply to a direct message --------
controller.on('direct_message',function(bot,message) {
  // reply to _message_ by using the _bot_ object
  // bot.reply(message,'You are talking directly to me');
  var request = app.textRequest(message.text);

  request.on('response', function(response) {
      bot.reply(message,"Action:  " + response.result.action + "\n Answer:  " + response.result.fulfillment.speech);
      console.log(response.result);
  });
  request.end()
});

//WIT-----------------

// const client = new Wit({
//   accessToken: MY_TOKEN,
//   actions: {
//     send(request, response) {
//       return new Promise(function(resolve, reject) {
//         console.log(JSON.stringify(response));
//         return resolve();
//       });
//     },
//     myAction({sessionId, context, text, entities}) {
//       console.log(`Session ${sessionId} received ${text}`);
//       console.log(`The current context is ${JSON.stringify(context)}`);
//       console.log(`Wit extracted ${JSON.stringify(entities)}`);
//       return Promise.resolve(context);
//     }
//   },
//   logger: new log.Logger(log.DEBUG) // optional
// });

// const client = new Wit({accessToken: 'MY_TOKEN'});
// client.message('what is the weather in London?', {})
// .then((data) => {
//   console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
// })
// .catch(console.error);