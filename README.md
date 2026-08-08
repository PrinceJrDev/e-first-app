# E-First

Ethiopian Grade 9 & 10 EUEE exam-prep app: video lectures, short notes,
quizzes and EUEE-style questions.

## Get it live in ~10 minutes (free)

You don't need to know how to code for this part — just follow the steps.

### 1. Create a GitHub account
Go to https://github.com and sign up (free) if you don't have an account.

### 2. Upload this project to GitHub
- Create a new repository (e.g. `e-first-app`)
- Upload every file in this folder into it (GitHub's website lets you
  drag-and-drop files directly — no command line needed)

### 3. Deploy on Vercel (free hosting)
- Go to https://vercel.com and sign up using your GitHub account
- Click "Add New Project", select your `e-first-app` repository
- Vercel auto-detects it's a Vite app — leave the default settings
- Click "Deploy"

That's it. In about a minute you'll get a live link like
`e-first-app.vercel.app` that anyone can open in a browser, on desktop
or mobile.

### 4. (Optional) Use your own domain
In Vercel's project settings → Domains, you can attach a custom domain
like `efirst.et` or `efirst.app` once you've bought one (Namecheap,
GoDaddy, etc. — usually $10–15/year).

## What works right now
- All video lectures, notes, quizzes, and EUEE questions
- Grade 9 / Grade 10 toggle
- Progress and enrollment status save in the browser (per device)

## What's still mocked (for the next stage)
- **Enrollment/payment**: the "Enroll" button just flips a local flag —
  no real payment happens. Wire this to Chapa or Telebirr when ready.
- **Accounts**: progress is saved per browser/device, not per student
  account. A real backend + login is needed for progress to follow a
  student across devices.
- **Locked units**: only Unit 1 of each subject has full content —
  more units can be added the same way as content is ready.

## Local development (if you want to preview changes yourself)
```
npm install
npm run dev
```
Then open the local address it prints in your browser.
