
const nodeMailer = require('nodemailer');

async function sendEmail ({to, subject, html, from = process.env.EMAIL_FROM}) {
    const transporter = nodeMailer.createTransport({
        host: 'smtp.ethereal.email',
        port: process.env.PORTTOEMAIL,
        auth: {
            user: process.env.AUTHOFMAIL,
            pass: process.env.AUTHOFPASS
        }
    })

    await transporter.sendMail({from, to, subject, html})
}

module.exports = sendEmail;
