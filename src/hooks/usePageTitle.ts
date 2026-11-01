import { useEffect } from "react";

const SITE_NAME = "Youssof Soliman";

// Sets the browser tab title; pass nothing for the default home title.
export function usePageTitle(page?: string) {
  useEffect(() => {
    document.title = page ? `${page} | ${SITE_NAME}` : `${SITE_NAME} | Engineering Portfolio`;
  }, [page]);
}
