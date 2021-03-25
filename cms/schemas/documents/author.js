export default {
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
        validation: (Rule) => Rule.required(),
      },
    },
    {
      name: "twitterHandle",
      title: "Twitter Handle",
      description:
        "So that we can link to your twitter account on posts. Should start with '@'.",
      type: "string",
      validation: (Rule) =>
        Rule.optional().custom((handle) =>
          handle[0] === "@" ? true : "Should start with '@'"
        ),
    },
    {
      name: "websiteUrl",
      title: "Website Address",
      description: "Author's personal website.",
      type: "url",
    },
    {
      name: "bio",
      title: "Bio",
      type: "array",
      of: [
        {
          title: "Block",
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
        },
      ],
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
};
