(() => {
    "use strict";

    const endpoint = "https://metrics.visaphoto1tap.com/v1/store-click";
    const attributionSelector = "a[data-acquisition-store][data-acquisition-app]";
    const canonical = document.querySelector('link[rel="canonical"]');
    const page = canonical ? new URL(canonical.href) : window.location;
    const path = page.pathname;
    const qa = navigator.webdriver === true
        || new URLSearchParams(window.location.search).get("acq_qa") === "1";

    function recordStoreClick(event) {
        if (!event.isTrusted || event.defaultPrevented) return;
        if (event.type === "auxclick" ? event.button !== 1 : event.button !== 0) return;
        if (!(event.target instanceof Element)) return;

        const link = event.target.closest(attributionSelector);
        if (!link) return;
        const { acquisitionStore: store, acquisitionApp: app } = link.dataset;
        const body = JSON.stringify({ path, store, app, ...(qa ? { qa: true } : {}) });

        fetch(endpoint, {
            method: "POST",
            mode: "cors",
            credentials: "omit",
            referrerPolicy: "no-referrer",
            keepalive: true,
            headers: { "Content-Type": "text/plain;charset=UTF-8" },
            body,
        }).catch(() => {});
    }

    document.addEventListener("click", recordStoreClick);
    document.addEventListener("auxclick", recordStoreClick);
})();
