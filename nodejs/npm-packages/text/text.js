const nodemailer = require('nodemailer');
const fs         = require('fs');
const parse      = require('csv-parse');
require('dotenv').config()

const inputFile='class_list.csv';
let toList = '';

const parser = parse({delimiter: ','}, function (err, data) {
  let number, carrier, address, i;
  
  if (err) {
    console.log(err);
  } else {
    for (i = 0; i < data.length; i++) {
        number = data[i][1];
        carrier = data[i][2];
        address = '';
        
        if (carrier == 'AT&T')
            address = number + '@txt.att.net';
        else if (carrier == 'Sprint')
            address = number + '@messaging.sprintpcs.com';
        else if (carrier == 'T-Mobile')
            address = number + '@tmomail.net';
        else if (carrier == 'Verizon')
            address = number + '@vtext.com';
        else if (carrier == 'Virgin Mobile')
            address = number + '@vmobl.com';
        else
            console.log('wrong carrier: ' + carrier);
        
        if (address !== '') {
            if (toList === '')
                toList = address;
            else
                toList += ', ' + address;
        }    
    }   
    console.log(toList);
    
    var transporter = nodemailer.createTransport({
      service: 'yahoo',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASSWORD
      }
    });

    const mailOptions = {
      from: 'thomasbolinger@yahoo.com',
      to: toList, 
      subject: 'Hello from class',
      text: 'You can send mail from the server!'
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
});

fs.createReadStream(inputFile).pipe(parser);
