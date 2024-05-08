const nodemailer=require("nodemailer");
require("dotenv").config();

const transporter=nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:process.env.USER,
        pass:process.env.APP_PASSWORD,
    },
});

const mailOptions={
    from: {
        name:'Shanali',
        address:process.env.USER
    }, // sender address
    to: ["rajakarunashanali@gmail.com"], // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  }