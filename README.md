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
- **Photo:** replace `src/assets/portrait-2.jpg`. If the face moves, adjust `left`/`top` on `.portrait img` in `src/styles.css`.
- **Accent colour:** change `--accent` at the top of `src/styles.css`.
- **Link preview image:** add `public/og-image.png` (1200×630). After deploying, change the `og:image` and `twitter:image` URLs in `index.html` to the full address.

## Images, logos and video

Image paths in `src/data.js` are relative to `src/assets`. Drop a file at the path and it appears on the next build or reload. Until then a placeholder shows for screenshots (logos are simply left out); in `npm run dev` the placeholder also prints the expected path.

| Where | Field in `src/data.js` | Expected file |
| --- | --- | --- |
| Project screenshots | `project.images` (list of `{ src, alt }`) | `src/assets/projects/<slug>-1.png`, `-2.png`, … at 16:10 |
| Project hover video | `project.video` (optional) | `src/assets/projects/<slug>-preview.mp4`, short and muted |
| Experience logos | `experience.logo`, `experience.logoAlt` | `src/assets/logos/techmonkeys.svg`, `corrtec.svg`, `iba.svg` (optional; nothing shows until the file exists) |
| Affiliation logos | `experience.affiliations` (list of `{ name, logo, logoAlt }`) | `src/assets/logos/gdg.svg` (optional; the row shows only once the logo exists) |
| About photos | `about.photos` (one or two `{ src, alt }`, empty by default) | `src/assets/about/*.jpg`, portrait 4:5 |

Other fields:

- `project.slug`: short id used in file names and the detail view.
- `project.details`: optional extra paragraphs shown only in the detail view.
- `project.diagram`: set to `'rag'` to show the built-in RAG pipeline diagram in the detail view.
- `about.paragraphs`: the About text (this used to be the whole `about` list).
- `skills[].items`: each item is `{ name, icon }`. `icon` is a key from `src/icons.jsx`; leave it out for no icon. To add an icon, find it on [simpleicons.org](https://simpleicons.org), import it in `src/icons.jsx` and add it to the `icons` map.
- `certifications.items`: each item is `{ name, url }`. The card links to `url` in a new tab.
- `profile.portraitAlt`: alt text for the hero photo.

Every image needs alt text; it lives next to the path in `src/data.js`. Use WebP for large screenshots where you can.

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
  media.js             turns paths in data.js into image URLs
  icons.jsx            technology icons (simple-icons)
  App.jsx              page layout
  components/
    Nav.jsx            floating nav with the active-section highlight
    Hero.jsx           portrait, name and cursor searchlight
    Skyline.jsx        the generated night city
    About.jsx
    Projects.jsx       project cards with screenshot spotlight
    ProjectDetail.jsx  full-screen project view and gallery
    RagDiagram.jsx     the RAG pipeline diagram
    Experience.jsx
    Skills.jsx         moving rows and certification cards
    Contact.jsx        contact details and form
    motion.jsx         shared animation helpers
```

## Animations

- The hero text settles in with a staggered, blur-to-sharp entrance.
- Lit windows in the skyline switch on in batches as the page loads.
- As the hero scrolls away the city fades and eases forward, then blends into the page.
- The main buttons lean slightly toward the cursor and spring back.
- Project screenshots are dimmed until hovered; a spotlight follows the cursor. Clicking a card opens it full screen.
- The experience timeline draws itself as you scroll.
- A thin yellow bar at the top shows how far down the page you are.
- The hero ends in a night skyline in three layers, with lit window grids, a moon and two rooftop searchlights that sweep the sky. A few windows flicker.
- A searchlight follows the cursor across the hero, lighting the name and the buildings under it.
- The skyline layers drift at different speeds as you scroll.
- Sections lift into place the first time they scroll into view.
- Buttons and cards respond the moment they are pressed; cards carry a glow that follows the cursor.
- The nav highlight slides between sections as you scroll.
- Skill rows scroll sideways and pause on hover.

Visitors who have asked their device to reduce motion get simple fades instead: no parallax, no hover video, no travelling pulses in the diagram, and the skill rows stay still.
