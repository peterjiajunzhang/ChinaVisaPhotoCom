// Formerly the inline `tailwind.config` used with the cdn.tailwindcss.com runtime.
// Rebuild assets/tailwind.css after editing index.html: see README.md.
const siteConfig = {
    theme: {
        extend: {
            colors: {
                brand: '#e41e2d',
                'brand-dark': '#c41522',
                navy: '#0a1628',
                'china-ink': '#1a0a0c',
            },
            fontFamily: {
                sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
            },
        }
    }
};

module.exports = { content: ['./index.html'], ...siteConfig };
