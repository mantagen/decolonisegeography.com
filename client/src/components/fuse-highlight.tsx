// components/FuseHighlight.jsx
import Fuse from "fuse.js";
import React, { Fragment, PropsWithChildren } from "react";

// Recursively builds JSX output adding `<mark>` tags around matches
interface HighlightProps {
  value: string;
  indices?: readonly Fuse.RangeTuple[];
}
const Highlight: React.FC<HighlightProps> = props => {
  const { value, indices = [] } = props;
  const [pair, ...nextIndices] = indices;
  return !pair ? (
    <Fragment>{value}</Fragment>
  ) : (
    <Fragment>
      <Highlight value={value.substring(0, pair[0])} indices={nextIndices} />
      <mark>{value.substring(pair[0], pair[1] + 1)}</mark>
      {value.substring(pair[1] + 1)}
    </Fragment>
  );
};

interface FuseHighlightProps<T> {
  hit: Fuse.FuseResult<T>;
  fallback: string | undefined;
  isMatch: (match: Fuse.FuseResultMatch) => boolean;
}
const FuseHighlight = <T extends unknown>(
  props: PropsWithChildren<FuseHighlightProps<T>>
) => {
  const { hit, isMatch, fallback } = props;

  const match = Array.isArray(hit.matches)
    ? hit.matches.find(isMatch)
    : undefined;

  const value = match ? match.value : fallback;
  const indices = match?.indices;

  if (!value) {
    // This shouldn't happen!
    return null;
  }
  return <Highlight value={value} indices={indices} />;
};

export default FuseHighlight;
