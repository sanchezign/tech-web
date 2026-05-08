export interface Article {
  /** MongoDB ObjectId as string */
  _id: string;
  title: string;
  /** URL-safe slug, unique */
  slug: string;
  summary: string;
  content: string;
  tags: string[];
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
