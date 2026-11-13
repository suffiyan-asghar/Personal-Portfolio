// Turns the image and video paths written in data.js into real URLs.
//
// Paths in data.js are relative to src/assets, e.g. 'projects/football-rag-1.jpg'.
// Any file you drop into src/assets/projects, logos or about is picked up on
// the next build. If a path has no file yet, `media()` returns null and the
// component shows a placeholder instead.

const files = import.meta.glob('./assets/{projects,logos,about}/*.{png,jpg,jpeg,webp,avif,svg,mp4,webm}', {
  eager: true,
  query: '?url',
  import: 'default',
});

export function media(path) {
  if (!path) return null;
  return files[`./assets/${path}`] ?? null;
}
