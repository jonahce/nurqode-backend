const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // Use App Password here!
  },
  connectionTimeout: 30000, // 30 seconds
  greetingTimeout: 30000,
  socketTimeout: 30000,
  // Add TLS options for better reliability
  tls: {
    rejectUnauthorized: false
  }
});

const sendContactNotification = async (contactData) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'nurqode@gmail.com',
      subject: `New Contact Form Submission from ${contactData.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${contactData.name}</p>
        <p><strong>Email:</strong> ${contactData.email}</p>
        <p><strong>Phone:</strong> ${contactData.phone}</p>
        <p><strong>Country:</strong> ${contactData.country}</p>
        <p><strong>Message:</strong></p>
        <p>${contactData.message}</p>
        <hr>
        <p>This email was sent from your NurQode website contact form.</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Contact notification email sent');
    return true;
  } catch (error) {
    console.error('❌ Email error:', error);
    throw error; // Re-throw to handle in the route
  }
};

module.exports = { sendContactNotification };
