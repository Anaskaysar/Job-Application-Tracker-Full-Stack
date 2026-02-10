# Google OAuth Cross-Origin-Opener-Policy (COOP) Error Fix

## Problem
When implementing Google OAuth login using `@react-oauth/google`, the browser console shows:
```
Cross-Origin-Opener-Policy policy would block the window.closed call.
```

This error occurs because the Google OAuth popup window cannot communicate properly with the main application window due to security policies.

## Root Cause
The `@react-oauth/google` library uses popup windows for OAuth authentication. Modern browsers implement Cross-Origin-Opener-Policy (COOP) to prevent malicious cross-origin access, but this can block legitimate OAuth popup communication.

## Solution

### For Development (Vite)
Add COOP headers to `vite.config.js`:

```javascript
// vite.config.js
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
      'Cross-Origin-Embedder-Policy': 'unsafe-none'
    }
  }
})
```

### For Production (Vercel)
Add COOP headers to `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cross-Origin-Opener-Policy",
          "value": "same-origin-allow-popups"
        },
        {
          "key": "Cross-Origin-Embedder-Policy",
          "value": "unsafe-none"
        }
      ]
    }
  ]
}
```

### For HTML (Additional Support)
Add meta tags to `index.html`:

```html
<head>
  <meta http-equiv="Cross-Origin-Opener-Policy" content="same-origin-allow-popups">
  <meta http-equiv="Cross-Origin-Embedder-Policy" content="unsafe-none">
  <!-- other head content -->
</head>
```

## Header Explanations

### Cross-Origin-Opener-Policy: same-origin-allow-popups
- Allows popup windows from the same origin to access the opener window
- Essential for OAuth flows that use popups
- Maintains security while enabling legitimate cross-window communication

### Cross-Origin-Embedder-Policy: unsafe-none
- Allows cross-origin resources to be embedded without restrictions
- Complements COOP for OAuth functionality
- Less restrictive than other COEP values

## Deployment Checklist

When deploying Google OAuth with popup-based authentication:

1. **Development**: Ensure `vite.config.js` has the headers
2. **Production**: Ensure `vercel.json` (or equivalent) has the headers
3. **HTML**: Add meta tags as backup
4. **Test**: Verify Google login works in both environments
5. **Console**: Check for COOP errors after deployment

## Common Mistakes to Avoid

1. ❌ Only adding headers to `vite.config.js` (development only)
2. ❌ Forgetting to add headers to production configuration
3. ❌ Using wrong COOP values (e.g., `same-origin` instead of `same-origin-allow-popups`)
4. ❌ Not testing in production after deployment

## Alternative Solutions

If popup-based OAuth continues to cause issues:

1. **Redirect-based OAuth**: Use Google's redirect flow instead of popups
2. **Different OAuth libraries**: Consider libraries that handle COOP automatically
3. **Server-side OAuth**: Move OAuth flow entirely to backend

## Testing

After implementing the fix:

1. Open browser console
2. Attempt Google login
3. Verify no COOP errors appear
4. Confirm successful authentication and redirect

## Files Modified

- `frontend/vite.config.js` - Development headers
- `frontend/vercel.json` - Production headers  
- `frontend/index.html` - Meta tag headers

## Related Resources

- [MDN: Cross-Origin-Opener-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cross-Origin_Opener_Policy)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [@react-oauth/google Documentation](https://www.npmjs.com/package/@react-oauth/google)
