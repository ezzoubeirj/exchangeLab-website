import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request) {
  try {
    const formData = await request.formData()

    // Extract fields
    const firstName = formData.get('firstName')
    const lastName = formData.get('lastName')
    const phone = formData.get('phone')
    const email = formData.get('email')
    const motivation = formData.get('motivation')
    const cv = formData.get('cv')

    // Setup transporter
    console.log(process.env.EMAIL_USER, process.env.EMAIL_APP_PASSWORD);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    })

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'xlab.teacherapplication@gmail.com',
      subject: `New Teacher Application - ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
            New Teacher Application
          </h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #4F46E5; margin-top: 0;">Applicant Information</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
          </div>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #4F46E5; margin-top: 0;">Motivation</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${motivation}</p>
          </div>
          <div style="background-color: #e8f4f8; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #666;">
              ${cv ? `CV file attached: ${cv.name}` : 'No CV file attached'}
            </p>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>This application was submitted through the teacher application form.</p>
            <p>Submission time: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
      attachments: cv ? [{
        filename: cv.name,
        content: Buffer.from(await cv.arrayBuffer()),
      }] : [],
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully'
    })
  } catch (error) {
    console.error('Email sending error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to submit application' },
      { status: 500 }
    )
  }
}