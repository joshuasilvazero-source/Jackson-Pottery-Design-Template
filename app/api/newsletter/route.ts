import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const OWNER_EMAIL = 'hello@jacksonpottery.com'
const FROM_EMAIL = 'Jackson Pottery <hello@jacksonpottery.com>'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    // Notify the owner of new subscriber
    await resend.emails.send({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      subject: `New Newsletter Subscriber — ${email}`,
      html: `
        <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:480px;margin:0 auto;color:#1a1410;padding:32px 0;">
          <p style="font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#B8924A;margin:0 0 8px;">Jackson Pottery · Newsletter</p>
          <h2 style="font-size:20px;font-weight:600;margin:0 0 20px;">New Subscriber</h2>
          <p style="font-size:14px;margin:0 0 6px;"><strong>Email:</strong> <a href="mailto:${email}" style="color:#B8924A;">${email}</a></p>
          <p style="font-size:12px;color:#999;margin:24px 0 0;">Submitted via jacksonpottery.com</p>
        </div>
      `,
    })

    // Welcome email to subscriber
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Welcome to Jackson Pottery',
      html: `
        <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#1a1410;padding:32px 0;">
          <div style="text-align:center;padding-bottom:28px;margin-bottom:28px;border-bottom:1px solid #e8e0d4;">
            <p style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;letter-spacing:0.32em;text-transform:uppercase;color:#B8924A;margin:0 0 10px;">Jackson Pottery</p>
            <h1 style="font-size:24px;font-weight:600;margin:0 0 8px;line-height:1.3;">Welcome to our world.</h1>
            <p style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#888;margin:0;">You're now part of our inner circle.</p>
          </div>

          <p style="font-size:16px;line-height:1.75;color:#3a3028;margin:0 0 20px;">
            Thank you for subscribing. You'll be among the first to know about new arrivals, seasonal collections, exclusive offers, and design inspiration from our team.
          </p>

          <p style="font-size:15px;font-style:italic;color:#888;line-height:1.7;margin:0 0 32px;">
            "Timeless design. Premium materials. Spaces transformed."
          </p>

          <div style="text-align:center;margin-bottom:32px;">
            <a href="https://jacksonpottery.com/shop" style="display:inline-block;padding:14px 32px;background:#0C0A08;color:#fff;font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;text-decoration:none;border-radius:100px;">
              Explore the Collection
            </a>
          </div>

          <div style="border-top:1px solid #e8e0d4;padding-top:24px;">
            <p style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;color:#bbb;margin:0;">
              © ${new Date().getFullYear()} Jackson Pottery · <a href="mailto:${OWNER_EMAIL}" style="color:#B8924A;">hello@jacksonpottery.com</a>
            </p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Newsletter email error:', err)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
