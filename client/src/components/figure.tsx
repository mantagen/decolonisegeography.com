import React from "react";
import { getGatsbyImageData } from "gatsby-source-sanity";
import sanityConfig from "../../sanity-config";
import { GatsbyImage } from "gatsby-plugin-image";

interface FigureProps {
  node: any;
}
const Figure: React.FC<FigureProps> = props => {
  // TODO: type these props
  const { node } = props;

  if (!node || !node.asset || !node.asset._id) {
    return null;
  }
  const image = getGatsbyImageData(
    node.asset._id,
    {},
    // { maxWidth: 675 },
    sanityConfig
  );
  if (!image) {
    console.log("No image found for asset", node.asset);

    return null;
  }
  return (
    <figure>
      <GatsbyImage image={image} alt={node.alt} />
      <figcaption>{node.caption}</figcaption>
    </figure>
  );
};

export default Figure;
