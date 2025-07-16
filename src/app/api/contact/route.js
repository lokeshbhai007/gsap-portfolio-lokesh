// app/api/contact/route.js
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    console.log('Contact API called'); // Debug log
    
    const { name, email, message } = await request.json();
    console.log('Received data:', { name, email, message }); // Debug log

    // Validate required fields
    if (!name || !email || !message) {
      console.log('Validation failed: Missing fields'); // Debug log
      return Response.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Missing environment variables: EMAIL_USER or EMAIL_PASS');
      return Response.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    console.log('Creating transporter...'); // Debug log

    // Create transporter with better configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // This should be an App Password, not your regular password
      },
      // Add these for better reliability
      secure: true,
      port: 465,
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
      console.log('Transporter verified successfully'); // Debug log
    } catch (verifyError) {
      console.error('Transporter verification failed:', verifyError);
      return Response.json(
        { error: 'Email service configuration error' },
        { status: 500 }
      );
    }

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Your inbox
      subject: `${name} wants to connect with you`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">
              ${name} wants to connect with you
            </h3>
            
            <div style="margin: 15px 0;">
              <strong>Name:</strong> ${name}
            </div>
            
            <div style="margin: 15px 0;">
              <strong>Email:</strong> 
              <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">
                ${email}
              </a>
            </div>
            
            <div style="margin: 15px 0;">
              <strong>Message:</strong>
            </div>
            <div style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #6c757d; font-size: 14px;">
            <p>This message was sent from your website contact form.</p>
          </div>
        </div>
      `,
      // Also include plain text version
      text: `
${name} wants to connect with you

Name: ${name}
Email: ${email}

Message:
${message}

This message was sent from your website contact form.
      `,
    };

    console.log('Sending email...'); // Debug log

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId); // Debug log

    return Response.json(
      { 
        message: 'Email sent successfully',
        messageId: info.messageId 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Detailed error:', error);
    
    // More specific error messages
    let errorMessage = 'Failed to send email';
    
    if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed';
    } else if (error.code === 'ECONNECTION') {
      errorMessage = 'Failed to connect to email server';
    } else if (error.code === 'ETIMEDOUT') {
      errorMessage = 'Email server timeout';
    }
    
    return Response.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}