import styled from "styled-components";
import { TEXT_MAX_WIDTH_PX } from "../theme";
import { articleContentCss } from "./typography";

const PostContent = styled.div`
  max-width: ${TEXT_MAX_WIDTH_PX}px;

  ${articleContentCss}
`;

export default PostContent;
