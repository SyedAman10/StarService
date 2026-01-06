import { NextResponse } from "next/server";

// In-memory storage for demo purposes
// In production, you'd use a proper database
const subscribers: { email: string; timestamp: string }[] = [];

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

    // Check if email already exists
    const existingSubscriber = subscribers.find((sub) => sub.email === email);
    if (existingSubscriber) {
      return NextResponse.json(
        { error: "This email is already registered for early access" },
        { status: 400 }
      );
    }

    // Store the subscriber
    subscribers.push({
      email,
      timestamp: new Date().toISOString(),
    });

    // In production, you would:
    // 1. Save to database
    // 2. Send a welcome email via email service (SendGrid, Resend, etc.)
    // 3. Add to email marketing platform

    // Simulate sending an email
    console.log(`📧 Sending welcome email to: ${email}`);
    console.log(`Total subscribers: ${subscribers.length}`);

    // Mock email content that would be sent
    const emailContent = {
      to: email,
      subject: "Welcome to StarServices - Your Early Access is Confirmed! 🚀",
      body: `
        Hi there!

        Thank you for signing up for early access to StarServices!

        We're thrilled to have you on board. Here's what you can expect:

        🔍 Discover validated startup ideas from real conversations on Reddit, Twitter, and social media
        ✅ Get instant market validation and demand insights
        🚀 Create professional landing pages and marketing campaigns in minutes

        As an early access member, you'll be among the first to:
        - Access our curated idea database
        - Use our AI-powered validation tools
        - Launch your startup with automated tools
        - Get lifetime exclusive benefits

        We'll notify you as soon as we launch. In the meantime, follow us on social media for updates!

        Best regards,
        The StarServices Team

        ---
        StarServices - Turning Ideas Into Successful Startups
      `,
    };

    console.log("Email content:", emailContent);

    return NextResponse.json(
      {
        success: true,
        message: "Successfully signed up for early access!",
      },
      { status: 200 }
    );
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
  return NextResponse.json({
    count: subscribers.length,
    message: "Subscriber count retrieved successfully",
  });
}

