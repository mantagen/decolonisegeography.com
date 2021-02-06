import styled from "styled-components";
import { MAX_IMAGE_WIDTH_PX } from "../helpers/constants";

const PostArticle = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: auto;
  align-self: center;
  width: 100%;
  max-width: ${MAX_IMAGE_WIDTH_PX}px;
`;

export default PostArticle;
