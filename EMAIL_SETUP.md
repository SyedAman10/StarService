# 📧 Email Setup Instructions

## Quick Start - Get Your Resend API Key

### Step 1: Create Resend Account

1. Go to **[resend.com](https://resend.com)**
2. Click **"Sign Up"** (it's free!)
3. Complete the registration

### Step 2: Get Your API Key

1. After logging in, go to **[API Keys](https://resend.com/api-keys)**
2. Click **"Create API Key"**
3. Give it a name (e.g., "StarServices Development")
4. Click **"Create"**
5. **Copy the API key** (you'll only see it once!)

### Step 3: Add to Your Project

1. Open your `.env.local` file in the project root
2. Replace `your_resend_api_key_here` with your actual API key:

```env
RESEND_API_KEY=re_YourActualApiKeyHere123456
FROM_EMAIL=onboarding@resend.dev
```

3. Save the file

### Step 4: Restart Your Dev Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 5: Test It!

1. Go to http://localhost:3000
2. Enter your email in the waitlist form
3. Click "Join Waitlist"
4. Check your email inbox! 📬

## Free Tier Limits

✅ **What you get for FREE:**
- 100 emails per day
- Send from `onboarding@resend.dev`
- Full API access
- Email analytics

## Using Your Own Domain

Want to send from `hello@starservices.com` instead?

1. In Resend dashboard, go to **[Domains](https://resend.com/domains)**
2. Click **"Add Domain"**
3. Enter your domain (e.g., `starservices.com`)
4. Add the DNS records to your domain provider
5. Wait for verification (usually 5-30 minutes)
6. Update `.env.local`:
   ```env
   FROM_EMAIL=hello@starservices.com
   ```

## Troubleshooting

### Email not arriving?

1. **Check spam folder** - First-time emails often go to spam
2. **Verify API key** - Make sure it starts with `re_`
3. **Check console** - Look for error messages in terminal
4. **Free tier limits** - Make sure you haven't hit the 100/day limit

### API Key Invalid?

- Make sure you copied the entire key
- Keys start with `re_`
- No spaces before or after the key
- Restart dev server after adding the key

### Still having issues?

Check the Resend [documentation](https://resend.com/docs) or [contact support](https://resend.com/support).

## Production Setup

For production deployment:

1. **Get a paid plan** (if needed) - more emails/day
2. **Verify your domain** - required for custom email addresses
3. **Add environment variables** in your hosting platform:
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Environment Variables
   - Railway/Render: Add in dashboard

## Need Help?

- 📖 [Resend Documentation](https://resend.com/docs)
- 💬 [Resend Discord Community](https://resend.com/discord)
- 🐛 [Report Issues](https://github.com/resendlabs/resend-node/issues)

