import React from "react";
import Layout from "../components/layout";
import PortableText from "../components/portable-text";
import PostArticle from "../components/post-article";
import PostContent from "../components/post-content";
import Seo from "../components/seo";

interface PageTemplateProps {
  pageContext: GatsbyTypes.SanityPage;
}
const PageTemplate: React.FC<PageTemplateProps> = ({ pageContext }) => {
  const { _rawBody } = pageContext;

  return (
    <Layout>
      <PostArticle>
        <PostContent>
          <PortableText blocks={_rawBody} />
        </PostContent>
      </PostArticle>
    </Layout>
  );
};

export default PageTemplate;

export const Head = props => <Seo title={props.pageContext.title} />;
