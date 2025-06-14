# Security Headers for ShakeWebsite

Add these headers to your deployment platform or reverse proxy to improve security. If you migrate to Next.js or Express in the future, you can automate these headers as described below.

## Recommended HTTP Security Headers

```
Content-Security-Policy: default-src 'self'; img-src 'self' data:; script-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self';
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=()
```

## For Netlify/Vercel/Static Hosting
- Add these headers to your `_headers` file (Netlify) or your deployment provider's custom headers UI.

## For Express (if you add a server)
```js
const helmet = require('helmet');
app.use(helmet());
```

---

# External Link Security

**Ensure every `<a target="_blank">` in your codebase includes:**
```html
rel="noopener noreferrer"
```

---

# Dependency Auditing

Run these commands regularly to keep dependencies secure:
```
npm audit fix
npm update
```
Or use `yarn` equivalents.

---

# HTTPS
- Use HTTPS for all deployments. Redirect HTTP to HTTPS if possible.

---

# HTML Sanitization
- Do NOT use `dangerouslySetInnerHTML` unless content is sanitized with a library like `dompurify`.

---

# Summary
- These steps will not affect your site’s design, fonts, or layout.
- For any backend or future server, revisit these security steps.
