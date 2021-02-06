import format from "date-fns/format";

export default function getBlogPostPath({
  publishedAt,
  slug,
}: {
  publishedAt: string;
  slug: { current?: string };
}) {
  const dateSegment = format(new Date(publishedAt), "yyyy/MM");

  return `/blog/${dateSegment}/${slug.current}/`;
}
