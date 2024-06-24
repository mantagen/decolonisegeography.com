import React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { ResourceResult } from "../components/resource-result";

// id
// title
// description
// resourceUrl
// keyStage
// resourceType
// examBoard
// topics {
//   slug {
//     current
//   }
//   name
// }
// tags
// image {
//   asset {
//     gatsbyImageData(width: 1192, layout: CONSTRAINED)
//   }
//   # alt
// }
// # _rawExcerpt
// slug {
//   current
// }

interface PageTemplateProps {
  pageContext: GatsbyTypes.SanityPage;
}
const PageTemplate: React.FC<PageTemplateProps> = ({ pageContext }) => {
  return (
    <Layout>
      <Seo
        title={pageContext.title}
        description={pageContext.description}
        image={pageContext.image.asset.gatsbyImageData.images.fallback.src}
      />
      <ResourceResult
        linkMode={"asset"}
        hit={{
          item: pageContext,
        }}
      />
    </Layout>
  );
};

export default PageTemplate;
