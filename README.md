# Suffiyan Asghar Ali — Portfolio

A single-page portfolio built with React, Vite and Motion.

## Run it locally

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm run dev
```

Open the address it prints (usually http://localhost:5173).

## Edit the content

Everything you would want to change is in `src/data.js`: your intro, about text, projects, experience, skills and certifications.

Things to update before you publish:

1. **Project links.** Each project in `src/data.js` has a `repo` link that currently points to your GitHub profile. Replace each with the real repository. Add a `live` link to show a "Live demo" link next to it.
2. **Contact form key.** See the next section.

To replace other files:

- **CV:** replace `public/Suffiyan_Asghar_CV.pdf` (keep the same file name, or change `cv` in `src/data.js`).
- **Photo:** replace `src/assets/portrait.jpg` with a square image.
- **Accent colour:** change `--accent` at the top of `src/styles.css`.

## Make the contact form send email

The form uses [Web3Forms](https://web3forms.com), which is free and needs no backend.

1. Go to web3forms.com, enter your email address and you will receive an access key.
2. Copy `.env.example` to a new file named `.env`.
3. Paste the key after `VITE_WEB3FORMS_KEY=`.
4. Restart `npm run dev`.

Until a key is set, the form opens the visitor's email app with the message filled in instead.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. On [vercel.com](https://vercel.com), choose **Add New → Project** and import the repository. Vercel detects Vite on its own.
3. Under **Environment Variables**, add `VITE_WEB3FORMS_KEY` with your key.
4. Deploy.

## Where things are

```
src/
  data.js              all content
  styles.css           all styling
  App.jsx              page layout
  components/
    Nav.jsx            floating nav with the active-section highlight
    Hero.jsx           portrait, name and cursor searchlight
    Skyline.jsx        the generated night city
    About.jsx
    Projects.jsx
    Experience.jsx
    Skills.jsx         moving rows and certification cards
    Contact.jsx        contact details and form
    motion.jsx         shared animation helpers
```

## Animations

- The hero text settles in with a staggered, blur-to-sharp entrance.
- The hero ends in a night skyline in three layers, with lit window grids, a moon and two rooftop searchlights that sweep the sky. A few windows flicker.
- A searchlight follows the cursor across the hero, lighting the name and the buildings under it.
- The skyline layers drift at different speeds as you scroll.
- Sections lift into place the first time they scroll into view.
- Buttons and cards respond the moment they are pressed; cards carry a glow that follows the cursor.
- The nav highlight slides between sections as you scroll.
- Skill rows scroll sideways and pause on hover.

Visitors who have asked their device to reduce motion get simple fades instead, and the skill rows stay still.
