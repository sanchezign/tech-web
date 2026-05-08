import type { Metadata } from "next";
import Link from "next/link";
import type { Article } from "@/features/articles/types";

export const metadata: Metadata = {
  title: "Articles",
  description: "Browse all articles on Tech Web.",
};

async function getArticles(): Promise<Article[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/articles`,
      // Revalidate every 60 seconds (ISR)
      { next: { revalidate: 60 } },
    );

    if (!res.ok) {
      console.error(`Failed to fetch articles: ${res.status}`);
      return [];
    }

    return res.json() as Promise<Article[]>;
  } catch (err) {
    // API unavailable at build time — return empty list
    console.error('Articles fetch failed:', err);
    return [];
  }
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <main className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Articles</h1>

      {articles.length === 0 ? (
        <p className="text-muted-foreground">No articles published yet.</p>
      ) : (
        <ul className="space-y-6">
          {articles.map((article) => (
            <li key={article._id} className="border-b pb-6 last:border-none">
              <Link
                href={`/articles/${article.slug}`}
                className="group block"
              >
                <h2 className="text-xl font-semibold group-hover:underline">
                  {article.title}
                </h2>
                <p className="mt-1 text-muted-foreground">{article.summary}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {article.publishedAt && (
                  <time
                    dateTime={article.publishedAt}
                    className="mt-1 block text-xs text-muted-foreground"
                  >
                    {new Date(article.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
