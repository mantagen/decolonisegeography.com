// components/FuseHighlight.jsx
import React from "react";

// Finds `obj[path][to][key]` from `path.to.key`
const resolveAttribute = (obj, key) =>
  key.split(".").reduce((prev, curr) => prev?.[curr], obj);

// Recursively builds JSX output adding `<mark>` tags around matches
const highlight = (value, indices = []) => {
  const pair = indices.pop();
  return !pair ? (
    value
  ) : (
    <>
      {highlight(value.substring(0, pair[0]), indices)}
      <mark>{value.substring(pair[0], pair[1] + 1)}</mark>
      {value.substring(pair[1] + 1)}
    </>
  );
};

// FuseHighlight component
const FuseHighlight = ({ hit, attribute }) => {
  const matches =
    typeof hit.item === "string"
      ? hit.matches?.[0]
      : hit.matches?.find(m => m.key === attribute);
  const fallback =
    typeof hit.item === "string"
      ? hit.item
      : resolveAttribute(hit.item, attribute);
  return highlight(matches?.value || fallback, matches?.indices);
};

export default FuseHighlight;
