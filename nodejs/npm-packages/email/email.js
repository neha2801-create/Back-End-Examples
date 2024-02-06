import { createTransport } from 'nodemailer';
import { config } from 'dotenv';

config();

console.log(process.env.EMAIL);
console.log(process.env.PASSWORD);

let service = 'gmail';

const transporter = createTransport({
  service: service,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

const mailOptions = {
  from: process.env.EMAIL,
  to: 'tommybolinger@yahoo.com', 
  subject: 'Sending Email using Node.js',
  //text: 'That was easy!',
  html: '<h1>Wow</h1><p>That was easy!</p>'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
