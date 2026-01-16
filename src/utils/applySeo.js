export function applySeo(seo) {
  if (!seo) return;

  // ✅ Title
  if (seo.metaTitle) {
    document.title = seo.metaTitle;
  }

  // helper
  const setMeta = (name, content, attr = "name") => {
    let el = document.querySelector(`meta[${attr}="${name}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content || "");
  };

  // ✅ Meta tags
  setMeta("description", seo.metaDescription);
  setMeta("keywords", seo.metaKeywords);

  // ✅ Robots
  setMeta(
    "robots",
    `${seo.noIndex ? "noindex" : "index"},${
      seo.noFollow ? "nofollow" : "follow"
    }`
  );

  // ✅ Canonical
  if (seo.canonicalUrl) {
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = seo.canonicalUrl;
  }

  // ✅ Open Graph
  setMeta("og:title", seo.ogTitle, "property");
  setMeta("og:description", seo.ogDescription, "property");
  setMeta("og:image", seo.ogImage, "property");
  setMeta("og:type", seo.ogType || "website", "property");

  // ✅ Twitter
  setMeta("twitter:card", "summary_large_image");
  setMeta("twitter:title", seo.twitterTitle);
  setMeta("twitter:description", seo.twitterDescription);
  setMeta("twitter:image", seo.twitterImage);

  // ✅ Remove old schema
  document
    .querySelectorAll('script[type="application/ld+json"]')
    .forEach((el) => el.remove());

  // ✅ Inject Schema JSON-LD
  if (seo.schemaJson) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(seo.schemaJson);
    document.head.appendChild(script);
  }
}
