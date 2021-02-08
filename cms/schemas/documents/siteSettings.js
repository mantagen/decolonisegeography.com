export default {
  type: "document",
  name: "siteSettings",
  title: "Site Settings",
  __experimental_actions: ["update", "create", "publish"],
  fields: [
    {
      name: "siteUrl",
      type: "string",
      title: "Site Url",
    },
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "description",
      type: "text",
      title: "Description",
      description: "Describe your website for search engines and social media.",
    },
    {
      name: "keywords",
      type: "array",
      title: "Keywords",
      description: "Add keywords that describes your website.",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      name: "author",
      type: "reference",
      description: "Add a new author to the site.",
      title: "Author",
      to: [{ type: "author" }],
    },
  ],
};
