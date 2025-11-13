const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendContactNotification = async (contactData) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'nurqode@gmail.com', // Use the same email as sender for testing
      subject: `New Contact Form Submission from ${contactData.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${contactData.name}</p>
        <p><strong>Email:</strong> ${contactData.email}</p>
        <p><strong>Phone:</strong> ${contactData.phone}</p>
        <p><strong>Country:</strong> ${contactData.country}</p>
        <p><strong>Project Type:</strong> ${contactData.projectType}</p>
        <p><strong>Message:</strong></p>
        <p>${contactData.message}</p>
        <hr>
        <p>This email was sent from your NurQode website contact form.</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Contact notification email sent');
  } catch (error) {
    console.error('❌ Email error:', error);
  }
};

module.exports = { sendContactNotification };