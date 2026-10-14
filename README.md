# Spirit Events Uganda

Responsive event equipment hire and production website. Existing HTML, Tailwind CSS, vanilla JavaScript, Sharp and Puppeteer stack retained.

Run `npm install`, `npm run build`, then `npm run serve` to preview at http://localhost:3000. Use `npm run dev` to watch stylesheet edits.

`npm run verify` checks assets, anchors, markup, brand content and JavaScript. `npm run shoot` runs browser checks with its own temporary local server and saves desktop, tablet and mobile screenshots in `shots/`. Chrome or Edge must be installed. `npm run check` runs both. No lint or type-check command is configured.

Static checks and production booking-handler tests pass. Browser launch in the editing sandbox was blocked with `spawn EPERM`; responsive visual checks must still be run locally with `npm run shoot`. Existing screenshots without the `spirit-` prefix predate this rebrand.

The booking form validates details and prepares an encoded WhatsApp enquiry for 256756408204. The customer must open WhatsApp and press Send; the website has no submission backend and stores no enquiries. Quote links prefill the equipment field. Date validation uses Kampala time. Email and guest count are optional.

Set the verified business email in `public/js/config.js`; until then a neutral placeholder is displayed. No opening hours, prices, reviews or social accounts are assumed.

Images come exclusively from the supplied `public/img/` files. `scripts/optimize-images.js` creates cropped WebP derivatives without changing originals or upscaling. Source photography is limited to audio equipment and performance footage; tent, chair and stage cards use decorative vector graphics. Higher-resolution event and equipment photos can replace these later.

The site is served from the project root, so public asset URLs intentionally use `public/img/`. Existing build commands and dependencies are preserved. No deployment is performed.

Brand refinement uses the supplied logo in both navigation and footer, with blue, red and yellow accents taken from it. Copy now focuses on the people and occasions behind each event. Mobile layouts include stacked booking fields, larger touch controls, and single-column service cards on small screens. Stylesheet build and static/booking verification pass; browser screenshot verification remains blocked by spawn EPERM in this environment.
