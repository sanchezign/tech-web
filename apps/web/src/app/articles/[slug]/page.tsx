import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Article } from "@/features/articles/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getArticle(slug: string): Promise<Article | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/articles/${slug}`,
      { next: { revalidate: 60 } },
    );

    if (res.status === 404) return null;

    if (!res.ok) {
      console.error(`Failed to fetch article "${slug}": ${res.status}`);
      return null;
    }

    return res.json() as Promise<Article>;
  } catch (err) {
    console.error(`Article fetch failed for slug "${slug}":`, err);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return { title: "Article not found" };
  }

  return {
    title: article.title,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      publishedTime: article.publishedAt ?? undefined,
      tags: article.tags,
    },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="container mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/articles"
        className="mb-6 inline-block text-sm text-muted-foreground hover:underline"
      >
        &larr; Back to articles
      </Link>

      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">{article.title}</h1>

          {article.publishedAt && (
            <time
              dateTime={article.publishedAt}
              className="mt-2 block text-sm text-muted-foreground"
            >
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}

          <p className="mt-4 text-lg text-muted-foreground">{article.summary}</p>

          {article.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-slate max-w-none">
          {/* Content is plain text for now; replace with MDX/rich-text renderer later */}
          {article.content.split("\n").map((paragraph, i) =>
            paragraph.trim() ? (
              <p key={i}>{paragraph}</p>
            ) : (
              <br key={i} />
            ),
          )}
        </div>
      </article>
    </main>
  );
}
