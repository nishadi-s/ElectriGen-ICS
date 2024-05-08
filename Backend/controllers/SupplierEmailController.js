const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});

const sendSupplierEmail = expressAsyncHandler(async (req, res) => {
    const { emails, subject, message } = req.body; // emails is now a comma-separated list
    console.log(emails, subject, message);

    const emailList = emails.split(",").map(email => email.trim()); // Split emails by comma, trim whitespace

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: emailList.join(","), // Join emails back together with comma
        subject: subject,
        text: message, // Use 'text' instead of 'message'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(500).send({ error: "Failed to send email" });
        } else {
            console.log("Email sent successfully!");
            res.status(200).send({ message: "Email sent successfully!" });
        }
    });
});

module.exports = { sendSupplierEmail };
