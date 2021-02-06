import styled from "styled-components";
import { IMAGE_MAX_WIDTH_PX } from "../theme";

const PostArticle = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: auto;
  align-self: center;
  width: 100%;
  max-width: ${IMAGE_MAX_WIDTH_PX}px;
`;

export default PostArticle;
