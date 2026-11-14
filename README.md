# ChinaVisaPhotoCom — marketing site

Live site: **https://china.visaphoto1tap.com/**

| Path | Purpose |
|------|---------|
| `index.html` | Landing; App Store CTA → `https://apps.apple.com/app/id6769270493` |
| `privacy.html` | Privacy policy (linked from App Store Connect) |
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
