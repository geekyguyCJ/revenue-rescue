# Revenue Rescue

A lightweight static website for https://callrescue.ca. No build step, framework, external fonts, analytics, or third-party scripts. Uses a local SVG logo, CSS effects, and progressive enhancement.

## Preview

Run `node .tools/serve.cjs` and open http://127.0.0.1:4175. You can also open `index.html` directly.

## Contact form

The form validates the fields and prepares a `mailto:` enquiry to hello@callrescue.ca. The visitor must send it from their email application. There is a copy-to-clipboard fallback with selectable text if clipboard access is unavailable. The site does not claim an enquiry was sent or store personal information. Without JavaScript, the form still opens the visitor's email application.

An email inbox and form delivery service have not been provisioned. If you want direct web submissions, connect an approved form provider or backend before replacing this explicit email-draft flow.

## Publish

Upload `index.html`, `styles.css`, `script.js`, `robots.txt`, `sitemap.xml`, and the `assets` folder to your static host, then connect callrescue.ca and enable HTTPS. Exclude `.qa`, `.tools`, and this README from the published site. No deployment or DNS changes have been made. Keep the assets directory alongside index.html. Canonical, social metadata, sitemap, and business schema already use https://callrescue.ca/.

The supplied Ottawa address is labeled as the business address. Greater Sudbury is identified as the service area. No setup deadline or universal carrier compatibility is promised. The phone example is labeled illustrative and distinguishes the automatic first response from the business taking over the conversation.

The site supports keyboard navigation, native FAQ disclosures, reduced motion, and mobile navigation. System sans-serif fonts keep the page fast and avoid external requests.
