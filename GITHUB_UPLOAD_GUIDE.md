# 🚀 Upload Your Portfolio to GitHub

## Step 1: Create a GitHub Repository

1. **Go to GitHub**: https://github.com/
2. **Sign in** to your GitHub account (or create one if you don't have it)
3. **Click the "+" icon** in the top right corner
4. **Select "New repository"**
5. **Fill in the details**:
   - Repository name: `portfolio-website` (or any name you prefer)
   - Description: `Personal portfolio website showcasing my skills and projects`
   - Set to **Public** (so others can see your work)
   - ✅ **Do NOT** check "Add a README file" (we already have files)
   - ✅ **Do NOT** add .gitignore or license (we'll add them later)
6. **Click "Create repository"**

## Step 2: Connect Your Local Project to GitHub

After creating the repository, GitHub will show you instructions. Use these commands in PowerShell:

### Set up your Git identity (if not done before):
```powershell
git config --global user.name "Gauthaam Premkumar"
git config --global user.email "gauthaam04@gmail.com"
```

### Add the remote repository:
```powershell
git remote add origin https://github.com/G4thm/gauthaam-portfolio.git
```

## Step 3: Commit and Push Your Project

```powershell
# Add all files to git
git add .

# Commit with a message
git commit -m "Initial commit: Complete portfolio website with certificates and contact form"

# Push to GitHub
git push -u origin main
```

## Step 4: Verify Upload

1. Go back to your GitHub repository page
2. Refresh the page
3. You should see all your files uploaded!

## Step 5: Set Up Netlify with GitHub (Optional but Recommended)

If you want automatic deployments:

1. **Go to Netlify**: https://www.netlify.com/
2. **Click "Add new site"** → "Import an existing project"
3. **Choose GitHub** and authorize Netlify
4. **Select your portfolio repository**
5. **Deploy settings**:
   - Build command: (leave empty)
   - Publish directory: (leave empty, it will use root)
6. **Click "Deploy site"**

Now every time you push changes to GitHub, Netlify will automatically update your live website!

## 📁 Current Project Structure

Your repository will include:
```
├── index.html                 # Main portfolio page
├── thank-you.html            # Success page for contact form
├── assets/
│   ├── css/style.css         # Styling with certificate modal fixes
│   ├── js/script.js          # JavaScript with working forms
│   ├── images/               # All your images and icons
│   ├── certificates/         # Your PDF certificates
│   └── Resume/               # Your CV
├── CONTACT_SETUP.md          # Email setup instructions
├── CONTACT_FORM_FIX.md       # Contact form troubleshooting
└── NETLIFY_FORMS_GUIDE.md    # Form submission guide
```

## 🔧 What's Working in Your Portfolio

✅ **Certificate Tab**: Fixed and working perfectly
✅ **Certificate Modal**: View, download, fullscreen PDFs
✅ **Contact Form**: Stores submissions in Netlify dashboard
✅ **Responsive Design**: Works on all devices
✅ **Professional UI**: Modern animations and styling

## 🌟 After Upload

1. **Share your GitHub repo**: Shows your code to potential employers
2. **Live website URL**: Get a shareable link from Netlify
3. **Portfolio showcase**: Add the GitHub link to your LinkedIn/resume
4. **Version control**: Track all future changes

## 🚨 Important Notes

- **Make your repository PUBLIC** so employers can see your code
- **Add a good README.md** describing your portfolio
- **Keep sensitive information secure** (no API keys in public repos)
- **Regular updates**: Push changes whenever you update your portfolio

## 🎯 Next Steps After Upload

1. **Add a README.md** to your repository describing your portfolio
2. **Star your own repository** (it's a good practice!)
3. **Share the link** on LinkedIn, resume, and job applications
4. **Keep updating** as you complete new projects or earn certificates

Your portfolio is now ready to impress potential employers! 🎉
