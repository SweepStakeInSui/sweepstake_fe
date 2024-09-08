import { useEffect, useState } from 'react';

import { useDebounce } from './useDebounce';

async function fetchSiteTitle(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const match = html.match(/<title>(.*?)<\/title>/i);
    return match && match[1] ? match[1] : null;
  } catch (error) {
    console.error('Error fetching site title:', error);
    return null;
  }
}

export function useUrlsToLabelLinks(urlString: string) {
  const debouncedUrlString = useDebounce(urlString, 300);
  const [labelLinks, setLabelLinks] = useState<
    Array<{ label: string; link: string }>
  >([]);

  useEffect(() => {
    const urls = debouncedUrlString
      .split(';')
      .filter((url) => url.trim() !== '');

    const fetchTitles = async () => {
      const results = await Promise.all(
        urls.map(async (url) => {
          const title = await fetchSiteTitle(url);
          return { label: title || url, link: url };
        }),
      );
      setLabelLinks(results);
    };

    fetchTitles();
  }, [debouncedUrlString]);

  return labelLinks;
}
