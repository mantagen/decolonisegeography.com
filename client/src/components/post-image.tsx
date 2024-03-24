import React from "react";
import { GatsbyImage, ImageDataLike, getImage } from "gatsby-plugin-image";
import { colours } from "../theme";

export interface PostImageProps {
  asset: ImageDataLike;
  // TODO: make this non optional
  alt?: string;
  className?: string;
}
const PostImage: React.FC<PostImageProps> = props => {
  const { asset, alt = "", className } = props;

  const image = getImage(asset);

  if (!image) {
    console.log("No image found for asset", asset);

    return null;
  }

  return (
    <GatsbyImage
      image={image}
      alt={alt}
      className={className}
      backgroundColor={colours.backgroundGrey}
    />
  );
};

export default PostImage;
