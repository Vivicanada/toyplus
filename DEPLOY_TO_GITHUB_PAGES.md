# Deploy to GitHub Pages

## Quick Steps to Push and Deploy

### Step 1: Push to GitHub

Open PowerShell in this directory and run:

```powershell
git add .
git commit -m "Add GitHub Pages deployment configuration"
git push -u origin main
```

**Important**: When it asks for authentication, you may need to:
- Enter your GitHub username
- Use a Personal Access Token instead of password

To create a token: https://github.com/settings/tokens
- Click "Generate new token (classic)"
- Select: `repo` and `workflow` permissions
- Use the token as your password

### Step 2: Enable GitHub Pages

1. Go to: https://github.com/Vivicanada/toyplus/settings/pages
2. Under "Build and deployment"
   - Source: Select **GitHub Actions**
3. Click Save

### Step 3: Wait for Deployment

1. Go to: https://github.com/Vivicanada/toyplus/actions
2. Wait for the "Deploy to GitHub Pages" workflow to complete (about 2-3 minutes)
3. Once complete, your site will be live at:
   
   **https://vivicanada.github.io/toyplus/**

---

## Alternative: Manual Push (if authentication fails)

If you have trouble with command line authentication:

1. Visit: https://github.com/Vivicanada/toyplus
2. Click "Add file" → "Upload files"
3. Drag all files from this folder
4. Click "Commit changes"

Then enable GitHub Pages (Step 2 above).

---

## Troubleshooting

### If GitHub Pages shows 404:
- Make sure GitHub Pages source is set to "GitHub Actions"
- Check that the workflow completed successfully
- Wait a few minutes for DNS propagation

### If you see authentication errors:
- Use GitHub Desktop instead: https://desktop.github.com/
- Or create a Personal Access Token (see Step 1 above)

---

## What I've Configured

✅ Next.js configured for static export
✅ GitHub Actions workflow created
✅ Base path set to `/toyplus`
✅ All files ready to deploy

You just need to push to GitHub and enable Pages!
