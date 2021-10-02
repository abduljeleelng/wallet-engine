"use strict";
const nodemailer = require("nodemailer");

async function mainEmail(emailData){
  let transporter = nodemailer.createTransport({
    host:process.env.EMAIL_HOST,
    port:process.env.EMAIL_PORT,//465, //578
    secure:true, //process.env.EMAIL_SECURE, // true for 465, false for other ports
    // debug:true,
    // pool: true,
    // logger:true,
    direct: true,
    auth: {
      user:process.env.EMAIL_USER, // your domain email address
      pass:process.env.EMAIL_PASS, // your password
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  const verify = await transporter.verify();
  if(!verify)  return res.status(401).json({error:"wrong email server crediential"})
  let info = await transporter.sendMail(emailData);
  return info
}
module.exports = {mainEmail}


// exports.sendEmail = emailData  => {
//     //let testAccount = await nodemailer.createTestAccount();
//   //   nodemailer.createTestAccount((er, testAccount)=>{
//   //     console.log({er, testAccount})
//   //   })

//   //   const transporter = nodeMailer.createTransport({
//   //     host:"mail.jtalk.com.ng", //process.env.EMAIL_HOST,
//   //     port:465, //process.env.EMAIL_PORT,//465, //578
//   //     secure:true, //process.env.EMAIL_SECURE, // true for 465, false for other ports
//   //     debug:true,
//   //     pool: true,
//   //     logger:true,
//   //     direct: true,
//   //     auth: {
//   //       user:process.env.EMAIL_USER, // your domain email address
//   //       pass:process.env.EMAIL_PASS, // your password

//   //     },
//   //     tls: {
//   //       rejectUnauthorized: false
//   //     }
//   // });

//   // transporter.verify(function(error, success) {
//   //   if (error) {
//   //     console.log(error);
//   //   } else {
//   //     console.log("Server is ready to take our messages");
//   //   }
//   // });
 
//   // return transporter
//   //   .sendMail(emailData)
//   //   .then(info => {
//   //     console.log(`Message sent: ${info.response}`);
//   //     console.log("response from the server")
//   //     return info
//   //   })
//   //   .catch(err => {
//   //     console.log(`Problem sending email: ${err}`)
//   //     console.log("catch error here")
//   //     return err;
//   //   });
//   return "messeage empty"
// };
