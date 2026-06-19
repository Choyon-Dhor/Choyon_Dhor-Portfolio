# Portfolio Dashboard Phase 1

## Current status
- The public portfolio now reads from a shared content contract in `src/content/portfolioContent.js` for the homepage hero, quote, projects, contact, footer, and blog content.
- This is the first step toward moving all editable data behind a private dashboard and MongoDB-backed API.

## What you need to do from your side
1. Create a MongoDB Atlas cluster.
2. Create a database user for the app.
3. Whitelist your IP address or use a development access policy.
4. Decide the dashboard hosting location:
   - same app under a private route like `/admin`
   - or a separate app/subdomain like `admin.yourdomain.com`
5. Prepare the content you want editable in the first release:
   - hero text
   - quote
   - projects
   - skills
   - contact links
   - blog posts
   - footer/social info
6. Send the MongoDB connection string and the admin login approach you want.

## Recommended phase-one backend shape
- `content` collection for singleton site sections
- `projects` collection for project cards
- `posts` collection for blog content
- `skills` collection for grouped skill data
- `settings` collection for global and SEO values
- `revisions` collection for rollback history

## Safe publish flow
- Edit in dashboard
- Save as draft
- Validate content
- Publish manually
- Public site reads only published records

## Next implementation step
- Add the backend API layer and MongoDB schema.
- Then replace the remaining hardcoded sections one by one.
