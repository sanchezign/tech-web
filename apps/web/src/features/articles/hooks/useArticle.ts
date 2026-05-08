"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { Article } from "../types";

export const articleQueryKey = (slug: string) =>
  ["articles", slug] as const;

async function fetchArticle(slug: string): Promise<Article> {
  const { data } = await apiClient.get<Article>(`/articles/${slug}`);
  return data;
}

export function useArticle(slug: string) {
  return useQuery({
    queryKey: articleQueryKey(slug),
    queryFn: () => fetchArticle(slug),
    enabled: !!slug,
  });
}
