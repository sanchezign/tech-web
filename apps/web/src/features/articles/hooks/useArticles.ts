"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { Article } from "../types";

export const articlesQueryKey = ["articles"] as const;

async function fetchArticles(): Promise<Article[]> {
  const { data } = await apiClient.get<Article[]>("/articles");
  return data;
}

export function useArticles() {
  return useQuery({
    queryKey: articlesQueryKey,
    queryFn: fetchArticles,
  });
}
