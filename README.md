# ChinaVisaPhotoCom — marketing site

Live site: **https://china.visaphoto1tap.com/**

| Path | Purpose |
|------|---------|
| `index.html` | Landing with live iPhone App Store download |
| `privacy.html` | Privacy policy (linked from App Store Connect) |
| `china-visa-photo-australia/` | English guide for ordinary-passport visa applicants lodging from Australia |
| `BingSiteAuth.xml` | Bing Webmaster Tools ownership verification for the China website |
| `sitemap.xml` / `robots.txt` | SEO |
| `VisaPhotoApps/Marketing/China/xiaohongshu/` | Xiaohongshu post previews & export scripts |

**SEO checklist:** [VisaPhotoApps/docs/seo-launch-checklist.md](https://github.com/peterjiajunzhang/VisaPhotoApps/blob/main/docs/seo-launch-checklist.md)

**iOS app repo:** [VisaPhotoApps](https://github.com/peterjiajunzhang/VisaPhotoApps) — scheme `ChinaVisaPhoto`.

Clone on a new machine:

```bash
git clone https://github.com/peterjiajunzhang/ChinaVisaPhotoCom.git
git clone https://github.com/peterjiajunzhang/VisaPhotoApps.git
```

Open **`VisaPhotoApps/README.md`** for full workstation setup.

## Static CSS, icons and images

The homepage and privacy policy no longer load Tailwind or Lucide at runtime. The only third-party script left is the Cloudflare Web Analytics beacon.

- **CSS**: `assets/tailwind.css` is prebuilt with Tailwind CSS v3.4.17 from `index.html` and `privacy.html`, using `tailwind.config.cjs` (the theme that used to be inline in the page) and `assets/tailwind.input.css`. After changing any class in `index.html` or `privacy.html`, rebuild it and commit the output:

  ```bash
  npx tailwindcss@3.4.17 -c tailwind.config.cjs -i assets/tailwind.input.css -o assets/tailwind.css --minify
  ```

- **Icons**: Lucide icons are inline `<svg>` in `index.html`. Licence: `assets/licenses/lucide.txt` (ISC).
- **App icons**: `assets/icons/*.webp` are resized copies of each app's `AppIcon.png`, the same files the US site uses; see `assets/icons/provenance.json`. `AppIcon.png` stays as the favicon and social image.
- **Images**: PNG or JPG files over about 300 kB have a WebP copy next to them, and the page uses the WebP. The originals stay in the repo. Images below the fold use `loading="lazy"` and have their real `width`/`height`.

## 2026-11-17 website update

The homepage shows the published app’s 420×560 JPEG and links both to the online application troubleshooting guide and to the Chinese Embassy’s original instructions for applicants in its U.S. jurisdiction. The previous title called exports compliant. The linked guide and embassy instructions distinguish a measured file from the portal’s own checks.

The iPhone download buttons share the App Store Connect campaign `china-website-20261117` with the matching Visa Photo 1-Tap links. The provider token is the one issued for this developer account. The structured app listing URL remains clean.

## Applying from Australia

The guide at `/china-visa-photo-australia/` connects applicants to the official Sydney or Melbourne visa centre, explains the separate JPEG upload and glossy paper specifications, and covers the local paper fallback. Official sources were checked on 17 November 2026, including the [Chinese Embassy’s centre notice](https://au.china-embassy.gov.cn/eng/lsfw_12/vc/202509/t20250905_11702975.htm) and both centres’ own procedures and upload FAQs. The centres publish byte-identical English photo specifications.

The App Store badge and desktop QR use the existing `china-website-20261117` campaign. The QR is a local static PNG generated from the full HTTPS link. Chrome checks at 320, 390, 768 and 1440 pixels verified homepage entry, guide anchors, layout and the badge destination. An independent QR decoder verified both the source PNG and the displayed desktop QR against the badge URL.

### Applying from the United States

The homepage links directly to the [U.S. application section of the China upload guide](https://visaphoto1tap.com/guides/china-visa-photo-upload-failed.html#apply-from-us). It lists the five U.S. consular districts by residence and links to the corresponding procedures and official online form. The existing Australia entry serves its own local procedure.
