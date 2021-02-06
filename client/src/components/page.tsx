import React from "react";
import styled from "styled-components";

import Layout from "./layout";
import PortableText from "./portable-text";
import PostArticle from "./post-article";
import PostContent from "./post-content";

const PageArticle = styled(PostArticle)`
  justify-content: center;
`;

interface PageProps {
  blocks: GatsbyTypes.SanityBlock[];
}
const Page: React.FC<PageProps> = props => {
  const { blocks } = props;

  return (
    <Layout>
      <PageArticle>
        <PostContent>
          <PortableText blocks={blocks} />
        </PostContent>
      </PageArticle>
    </Layout>
  );
};

export default Page;
