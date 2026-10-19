"use client";

import { useEffect, useState } from 'react';
import { getData } from './api';
import type { PageContent } from './types';

export function usePage(slug: string) {
  const [page, setPage] = useState<PageContent | null>(null);
  useEffect(() => {
    getData<PageContent | null>(`/pages/${slug}`, null).then(setPage);
  }, [slug]);
  return page;
}
