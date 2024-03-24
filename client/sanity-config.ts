const projectId = process.env.GATSBY_SANITY_PROJECT_ID;
const dataset = process.env.GATSBY_SANITY_DATASET;
if (!projectId) {
  throw new Error("Missing GATSBY_SANITY_PROJECT_ID");
}

if (!dataset) {
  throw new Error("Missing GATSBY_SANITY_DATASET");
}
const sanityConfig = {
  projectId,
  dataset,
};

export default sanityConfig;
