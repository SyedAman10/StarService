import { NextResponse } from "next/server";
import { Resend } from "resend";
import { writeFile, readFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const resend = new Resend(process.env.RESEND_API_KEY);
const DATA_DIR = path.join(process.cwd(), "data");
const SUBSCRIBERS_FILE = path.join(DATA_DIR, "subscribers.json");

// Ensure data directory exists
async function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
}

// Read subscribers from file
async function getSubscribers(): Promise<{ email: string; timestamp: string }[]> {
  try {
    await ensureDataDir();
    if (existsSync(SUBSCRIBERS_FILE)) {
      const data = await readFile(SUBSCRIBERS_FILE, "utf-8");
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error("Error reading subscribers:", error);
    return [];
  }
}

// Save subscribers to file
async function saveSubscribers(subscribers: { email: string; timestamp: string }[]) {
  try {
    await ensureDataDir();
    await writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
  } catch (error) {
    console.error("Error saving subscribers:", error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received body:", body);
    const { email } = body;
    console.log("Extracted email:", email);

    // Validate email
    if (!email || !email.includes("@")) {
      console.log("Email validation failed:", email);
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Get existing subscribers
    const subscribers = await getSubscribers();

    // Check if email already exists
    const existingSubscriber = subscribers.find((sub) => sub.email === email);
    if (existingSubscriber) {
      return NextResponse.json(
        { error: "This email is already registered for early access" },
        { status: 400 }
      );
    }

    // Store the subscriber
    const newSubscriber = {
      email,
      timestamp: new Date().toISOString(),
    };
    subscribers.push(newSubscriber);
    await saveSubscribers(subscribers);

    console.log(`📧 Attempting to send welcome email to: ${email}`);
    console.log(`Total subscribers: ${subscribers.length}`);

    // Send welcome email
    try {
      const { data, error } = await resend.emails.send({
        from: process.env.FROM_EMAIL || "StarServices <onboarding@resend.dev>",
        to: [email],
        subject: "Welcome to StarServices - Your Early Access is Confirmed! 🚀",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #1e90ff 0%, #4169e1 100%);
                color: white;
                padding: 30px;
                border-radius: 10px;
                text-align: center;
                margin-bottom: 30px;
              }
              .content {
                background: #f8f9fa;
                padding: 30px;
                border-radius: 10px;
                margin-bottom: 20px;
              }
              .features {
                background: white;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
              }
              .feature-item {
                margin: 15px 0;
                padding-left: 10px;
              }
              .cta-button {
                display: inline-block;
                background: linear-gradient(135deg, #1e90ff 0%, #4169e1 100%);
                color: white;
                padding: 15px 30px;
                text-decoration: none;
                border-radius: 25px;
                font-weight: bold;
                margin: 20px 0;
              }
              .footer {
                text-align: center;
                color: #666;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #ddd;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>⭐ Welcome to StarServices!</h1>
            </div>
            
            <div class="content">
              <h2>Hi there!</h2>
              
              <p>Thank you for signing up for early access to StarServices! We're thrilled to have you on board.</p>
              
              <div class="features">
                <h3>Here's what you can expect:</h3>
                
                <div class="feature-item">
                  🔍 <strong>Discover validated startup ideas</strong> from real conversations on Reddit, Twitter, and social media
                </div>
                
                <div class="feature-item">
                  ✅ <strong>Get instant market validation</strong> and demand insights powered by AI
                </div>
                
                <div class="feature-item">
                  🎨 <strong>Create professional landing pages</strong> in minutes with our builder
                </div>
                
                <div class="feature-item">
                  📈 <strong>Launch complete marketing campaigns</strong> with pre-written content and strategies
                </div>
              </div>
              
              <h3>As an early access member, you'll be among the first to:</h3>
              <ul>
                <li>Access our curated idea database</li>
                <li>Use our AI-powered validation tools</li>
                <li>Launch your startup with automated tools</li>
                <li>Get exclusive lifetime benefits</li>
              </ul>
              
              <p><strong>We'll notify you as soon as we launch!</strong> In the meantime, follow us on social media for updates and behind-the-scenes content.</p>
            </div>
            
            <div class="footer">
              <p>Best regards,<br><strong>The StarServices Team</strong></p>
              <p style="margin-top: 20px; font-size: 14px;">
                StarServices - Transforming ideas into successful startups
              </p>
            </div>
          </body>
          </html>
        `,
      });

      if (error) {
        console.error("Resend API error:", error);
        // Don't fail the signup if email fails, just log it
        return NextResponse.json(
          {
            success: true,
            message: "Successfully signed up! However, there was an issue sending the confirmation email. We'll reach out to you soon.",
            warning: "Email delivery failed",
          },
          { status: 200 }
        );
      }

      console.log("✅ Email sent successfully:", data);
      
      return NextResponse.json(
        {
          success: true,
          message: "Thank you! Check your email for early access details.",
        },
        { status: 200 }
      );
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      // Signup was successful even if email fails
      return NextResponse.json(
        {
          success: true,
          message: "Successfully signed up! We'll send you an email soon.",
          warning: "Email delivery pending",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "An error occurred. Please try again later." },
      { status: 500 }
    );
  }
}

// Optional: Add GET endpoint to retrieve subscriber count
export async function GET() {
  try {
    const subscribers = await getSubscribers();
    return NextResponse.json({
      count: subscribers.length,
      message: "Subscriber count retrieved successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve subscriber count" },
      { status: 500 }
    );
  }
}

