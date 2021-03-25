export default {
  name: "topic",
  title: "Topic",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description: "eg. Glacial environments",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      description: "eg. glacial-environments",
      validation: (Rule) => Rule.required(),
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
