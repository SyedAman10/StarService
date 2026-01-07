# StarServices Landing Page

A beautiful landing page for StarServices - helping entrepreneurs discover and validate startup ideas from social media conversations.

## Features

- 🎨 **Glassmorphism Design** - Modern UI with white and dodger blue color scheme
- 📧 **Email Waitlist** - Capture early access signups with automated welcome emails
- 📱 **Responsive** - Works perfectly on all devices
- 🚀 **Smooth Navigation** - Anchor links with smooth scrolling
- 💾 **Data Storage** - Subscriber emails stored in JSON file

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Resend account (free tier available)

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd StarService
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
# Get your API key from https://resend.com/api-keys
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Email configuration
FROM_EMAIL=onboarding@resend.dev
```

**How to get your Resend API Key:**

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Navigate to API Keys section
4. Create a new API key
5. Copy and paste it into your `.env.local` file

**Note:** With the free tier, you can send emails from `onboarding@resend.dev`. To use your custom domain (e.g., `hello@starservices.com`), you'll need to verify your domain in Resend settings.

4. Run the development server

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Email Configuration

The app uses [Resend](https://resend.com) for sending emails. The welcome email includes:

- Professional HTML template
- Company branding
- List of features and benefits
- Call to action

### Testing Emails

With the free Resend tier, you can:
- Send emails from `onboarding@resend.dev`
- Send to your own verified email
- Send up to 100 emails/day

To test:
1. Enter your email in the waitlist form
2. Check your inbox (and spam folder)
3. You should receive a welcome email within seconds

## Data Storage

Subscriber emails are stored in `data/subscribers.json`:

```json
[
  {
    "email": "user@example.com",
    "timestamp": "2026-01-07T12:00:00.000Z"
  }
]
```

This file is automatically created and managed by the app. It's gitignored for privacy.

## Project Structure

```
StarService/
├── app/
│   ├── api/
│   │   └── signup/
│   │       └── route.ts          # Email signup API endpoint
│   ├── globals.css                # Global styles & glassmorphism
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Landing page
├── data/
│   └── subscribers.json           # Stored email addresses (gitignored)
├── .env.local                     # Environment variables (gitignored)
└── package.json
```

## Deployment

### Deploying to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `RESEND_API_KEY`
   - `FROM_EMAIL`
4. Deploy!

**Note:** The JSON file storage works for development, but for production, consider using:
- Vercel Postgres
- Supabase
- MongoDB Atlas
- Any other database service

## Customization

### Changing Colors

Edit `app/globals.css` to modify the glassmorphism effects and color scheme.

### Updating Email Template

Edit `app/api/signup/route.ts` to customize the welcome email HTML.

### Adding New Sections

1. Add section in `app/page.tsx`
2. Give it an `id` attribute
3. Add navigation link in header and footer

## License

MIT

## Support

For issues or questions, contact: hello@starservices.com
