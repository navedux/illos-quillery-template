# Quillery

A free landing page template for a made-up product called Quillery, a records tool for regulated sites that files each finished task against the procedure version it followed. It is illustrated with three animated illustrations by [Illos](https://illos.dev) in the Illos Isometric style, and it has a light and a dark theme.

The page is a bento of rounded tiles: a headline tile over the hero illustration and a stats tile, three gaps in paper and email records, a binder versus Quillery switch with records that age live, an inspection question whose source chips open the record behind it, a per-site rollout table, a security tile on a dark ground, three kinds of sites, and a closing call to action.

Quillery is not a real company, and every person, company and figure on the page is made up. Change the name, the copy and the numbers to your own.

## Run it

You need Node 18 or later.

```
npm install
npm run dev
```

Then open the address Vite prints (the dev script uses port 4882).

## Build it

```
npm run build
```

The finished site goes to `dist/`. It is plain HTML, CSS and JavaScript, so any static host can serve it. `npm run preview` serves `dist/` locally so you can check the build.

## What's inside

- `index.html` holds the page and all its copy.
- `src/style.css` holds the styles. Colours, the type scale, spacing and radius are CSS variables at the top; `[data-theme="dark"]` holds the dark theme.
- `src/main.js` runs the theme switch, the mobile menu, the binder and Quillery switch, the live record ages and the source chips, and plays the illustrations while they are on screen.
- `illos/` holds the three illustrations as SVG files.
- `public/fonts` holds Mona Sans and Geist Mono, self-hosted.

Each illustration sits in the page as a comment such as `<!-- illos:records -->`. The build swaps the comment for the SVG inline, so the illustration can read the page's colours and follow the theme switch. To move one, move its comment.

## How the illustrations behave

- Each one loops while it is on screen and pauses when it scrolls away.
- With reduced motion turned on in the system settings, every illustration shows one still frame and the live record ages stop.
- They take their colours from the `--illos-*` variables in `src/style.css`. Change `--illos-accent` and the highlight in every illustration follows.

## Fonts

Mona Sans and Geist Mono are self-hosted in `public/fonts` under the SIL Open Font License (the licence files sit beside them).

## Licence

The code is MIT. The illustrations are free to use in sites you build from this template, but not to redistribute on their own. See `LICENSE.md`.

## Credit

The footer carries a small "Animated assets by Illos" link. More illustrations in this style are at [illos.dev](https://illos.dev), along with the skills that let your coding agent draw new ones for your own product.
