const sendGrid = require('@sendgrid/mail')

const SENDGRID_API_KEY = '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'
sendGrid.setApiKey(SENDGRID_API_KEY);


const sendWelcomeEmail = (email, name) => {
  sendGrid.send({
    to: email,
    from: 'adnanaslam475@gmail.com',
    subject: 'thanks for joining us',
    text: `welcome to the app, ${name}`
  })
}

const sendByeEmail = (email, name) => {
  sendGrid.send({
    to: email,
    from: 'adnanaslam475@gmail.com',
    subject: 'sorry tos see you by',
    text: `see you in the future ${name}`
  })
}

module.exports = {
  sendWelcomeEmail,
  sendByeEmail
}

          // sendGrid.send({
          //   to: 'adnanaslam475@gmail.com',
          //   from: 'adnanaslam475@gmail.com',
          //   subject: 'thanks for joining us',
          //   text: `welcome to the app`
          // })

          // sendGrid.send(msg)
// console.log(msg)