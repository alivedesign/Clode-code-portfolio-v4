import { useEffect } from "react";

const BASE_URL = "https://www.shkuratovdesigner.com";

export function usePageMeta(title: string, description: string, path: string) {
  useEffect(() => {
    document.title = title;
    const fullUrl = `${BASE_URL}${path}`;

    const setMeta = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", fullUrl);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('link[rel="canonical"]', "href", fullUrl);
  }, [title, description, path]);
}
