import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const OWNER_EMAIL = 'hello@jacksonpottery.com'
const FROM_EMAIL = 'Jackson Pottery <hello@jacksonpottery.com>'

export async function POST(req: NextRequest) {
  try {
    const { name, email, type, message } = await req.json()

    if (!name || !email || !type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const projectLabel: Record<string, string> = {
      residential: 'Home / Residential',
      patio: 'Patio & Outdoor Living',
      garden: 'Garden Project',
      commercial: 'Commercial / Hospitality',
      other: 'Other',
    }

    // Notify the owner
    await resend.emails.send({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      subject: `New Design Consultation Request — ${name}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#1a1410;padding:32px 0;">
          <div style="border-bottom:1px solid #e8e0d4;padding-bottom:24px;margin-bottom:28px;">
            <p style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#B8924A;margin:0 0 8px;">Jackson Pottery · Design Consultation</p>
            <h1 style="font-size:24px;font-weight:600;margin:0;line-height:1.3;">New Request from ${name}</h1>
          </div>

          <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
            <tr>
              <td style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#888;padding:10px 0 4px;border-top:1px solid #f0ebe4;width:130px;vertical-align:top;">Name</td>
              <td style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#1a1410;padding:10px 0 4px;border-top:1px solid #f0ebe4;">${name}</td>
            </tr>
            <tr>
              <td style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#888;padding:10px 0 4px;border-top:1px solid #f0ebe4;vertical-align:top;">Email</td>
              <td style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;padding:10px 0 4px;border-top:1px solid #f0ebe4;"><a href="mailto:${email}" style="color:#B8924A;">${email}</a></td>
            </tr>
            <tr>
              <td style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#888;padding:10px 0 4px;border-top:1px solid #f0ebe4;vertical-align:top;">Project Type</td>
              <td style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#1a1410;padding:10px 0 4px;border-top:1px solid #f0ebe4;">${projectLabel[type] ?? type}</td>
            </tr>
            ${message ? `
            <tr>
              <td style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#888;padding:10px 0 4px;border-top:1px solid #f0ebe4;vertical-align:top;">Message</td>
              <td style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#1a1410;padding:10px 0 4px;border-top:1px solid #f0ebe4;line-height:1.6;">${message.replace(/\n/g, '<br/>')}</td>
            </tr>` : ''}
          </table>

          <p style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;color:#999;margin:0;">Submitted via jacksonpottery.com</p>
        </div>
      `,
    })

    // Confirmation to the customer
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Your Design Consultation Request — Jackson Pottery',
      html: `
        <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#1a1410;padding:32px 0;">
          <div style="text-align:center;padding-bottom:28px;margin-bottom:28px;border-bottom:1px solid #e8e0d4;">
            <p style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;letter-spacing:0.32em;text-transform:uppercase;color:#B8924A;margin:0 0 10px;">Jackson Pottery</p>
            <h1 style="font-size:22px;font-weight:600;margin:0 0 8px;line-height:1.3;">We received your request, ${name.split(' ')[0]}.</h1>
            <p style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#888;margin:0;">Our design team will be in touch within one business day.</p>
          </div>

          <p style="font-size:16px;line-height:1.7;color:#3a3028;margin:0 0 20px;">
            Thank you for reaching out. We've noted your interest in a <strong>${projectLabel[type] ?? type}</strong> project and look forward to helping you find the perfect pieces for your space.
          </p>

          <p style="font-size:15px;font-style:italic;color:#888;line-height:1.7;margin:0 0 32px;">
            "Timeless design. Premium materials. Spaces transformed."
          </p>

          <div style="border-top:1px solid #e8e0d4;padding-top:24px;">
            <p style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;color:#aaa;margin:0 0 4px;">Questions in the meantime?</p>
            <a href="mailto:${OWNER_EMAIL}" style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#B8924A;">${OWNER_EMAIL}</a>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Consultation email error:', err)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
