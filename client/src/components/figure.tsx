import React from "react";
import Img from "gatsby-image";
import { getFluidGatsbyImage } from "gatsby-source-sanity";

import sanityConfig from "../../sanity-config";

interface FigureProps {
  node: any;
}
const Figure: React.FC<FigureProps> = props => {
  // TODO: type these props
  const { node } = props;

  if (!node || !node.asset || !node.asset._id) {
    return null;
  }
  const fluidProps = getFluidGatsbyImage(
    node.asset._id,
    { maxWidth: 675 },
    sanityConfig
  );
  return (
    <figure>
      <Img fluid={fluidProps} alt={node.alt} />
      <figcaption>{node.caption}</figcaption>
    </figure>
  );
};

export default Figure;
