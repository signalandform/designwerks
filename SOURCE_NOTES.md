# Design Werks Source Notes

Source site: https://designwerksonline.com/

## Discovered Structure

The existing site is an Adobe Muse single-page site. The public navigation points to:

- `#home`
- `#aboutus`
- `#products`
- `#services`
- `#contact`
- Facebook: https://www.facebook.com/designwerkssouthlake/

## Demo Structure

The Next.js demo keeps the same single-page content model with modern section IDs:

- `/`
- `#home`
- `#about`
- `#products`
- `#services`
- `#contact`

The app also generates:

- `/sitemap.xml`
- `/robots.txt`

## Assets

Public image and SVG assets from the current website were downloaded into:

- `public/assets/`

The crawl manifest is available at:

- `public/assets/source-manifest.json`

The original fetched homepage HTML is available at:

- `public/assets/source-home.html`

## Notes

The current site did not expose a usable XML sitemap during the crawl. `robots.txt` returned `404`, `https://www.designwerksonline.com/sitemap.xml` returned `503`, and `http://designwerksonline.com/sitemap.xml` returned `500`. The new demo includes a generated Next.js sitemap route for Vercel deployment.
