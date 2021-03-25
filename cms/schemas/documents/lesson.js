export default {
  name: "lesson",
  title: "Lesson",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "resources",
      title: "Resources",
      type: "array",
      of: [{ type: "reference", to: { type: "resource" } }],
    },
    {
      name: "keyStage",
      title: "Key Stage",
      type: "array",
      of: [{ type: "reference", to: { type: "keyStage" } }],
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
