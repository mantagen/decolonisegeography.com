export default function getResourcePagePath({
  slug,
}: {
  slug: { current?: string };
}) {
  return `/resources/${slug.current}/`;
}
