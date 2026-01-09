# Deployment Guide for Pomodoro Timer

## Issues Resolved

This guide addresses the following deployment issues:
1. ✅ Large video files exceeding Vercel's limits
2. ✅ Missing environment variables
3. ✅ Build configuration optimization
4. ✅ TypeScript compatibility

## Prerequisites

- A Vercel account
- (Optional) A Spotify Developer account for music integration
- (Optional) A cloud storage service for video backgrounds (Cloudflare R2, AWS S3, etc.)

## Step 1: Handle Video Files

### Option A: Use External CDN (Recommended for Production)

The video files are too large for Vercel's deployment limits. You have two options:

1. **Upload videos to a CDN** (Cloudflare R2, AWS S3, Vercel Blob, etc.)
2. **Use YouTube/Vimeo embeds** as background videos
3. **Use CSS gradients/animations** instead of videos

To use external CDN:
- Upload all videos from `public/videos/` to your CDN
- Update the video paths in `components/ParticlesBackground.tsx`

### Option B: Remove Videos (Fallback to Gradient Backgrounds)

The app will work without videos using the gradient overlays already in place.

## Step 2: Configure Environment Variables

### For Local Development:

1. Create a `.env.local` file in the root directory:
```bash
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_spotify_client_id_here
```

2. Get your Spotify Client ID:
   - Go to https://developer.spotify.com/dashboard
   - Create a new app
   - Copy the Client ID
   - Add your deployment URL to "Redirect URIs" (e.g., `https://your-app.vercel.app`)

### For Vercel Deployment:

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add:
   - Key: `NEXT_PUBLIC_SPOTIFY_CLIENT_ID`
   - Value: Your Spotify Client ID
   - Environment: Production, Preview, Development

## Step 3: Update Code for Environment Variables

The code has been updated to use environment variables instead of hardcoded values.

## Step 4: Deploy to Vercel

### Method 1: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to https://vercel.com/new
3. Import your repository
4. Vercel will auto-detect Next.js
5. Add environment variables
6. Click "Deploy"

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Step 5: Post-Deployment Configuration

### Update Spotify Redirect URI

1. Go to your Spotify Developer Dashboard
2. Edit your app
3. Add your Vercel deployment URL to "Redirect URIs":
   - `https://your-app-name.vercel.app`
   - `https://your-custom-domain.com` (if using custom domain)

## Troubleshooting

### Build Fails

- Check the build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify TypeScript has no errors: `npm run build`

### Videos Not Loading

- Videos are gitignored and won't deploy
- Use external CDN or remove video backgrounds
- The app will still work with gradient backgrounds

### Spotify Not Connecting

- Verify `NEXT_PUBLIC_SPOTIFY_CLIENT_ID` is set in Vercel
- Check redirect URIs match your deployment URL
- Ensure the environment variable starts with `NEXT_PUBLIC_`

### Environment Variables Not Working

- Environment variables must start with `NEXT_PUBLIC_` to be accessible in the browser
- Redeploy after adding environment variables
- Clear browser cache

## Performance Optimization

The app is already optimized with:
- ✅ Next.js 15 with App Router
- ✅ React 19 for better performance
- ✅ Image optimization via next/image
- ✅ Code splitting and lazy loading
- ✅ Tailwind CSS for minimal CSS bundle

## Custom Domain (Optional)

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Update Spotify redirect URIs with new domain

## Monitoring

- View deployment logs in Vercel dashboard
- Use Vercel Analytics (optional)
- Monitor Web Vitals in production

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify all environment variables are set
3. Test the build locally: `npm run build && npm start`
4. Check browser console for errors

---

**Note**: The current configuration works perfectly for deployment without videos. The gradient backgrounds and particle effects provide a beautiful UI even without video backgrounds.
