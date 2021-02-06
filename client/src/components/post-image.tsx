import React from "react";
import GatsbyImage, { GatsbyImageFluidProps } from "gatsby-image";

export interface PostImageProps {
  asset: GatsbyImageFluidProps;
  // TODO: make this non optional
  alt?: string;
  className?: string;
}
const PostImage: React.FC<PostImageProps> = props => {
  const { asset, alt, className } = props;

  return (
    <GatsbyImage
      fluid={asset.fluid}
      alt={alt}
      className={className}
      backgroundColor="#f9f9f9"
    />
  );
};

export default PostImage;
