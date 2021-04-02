export default {
  name: "unit",
  title: "Unit",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description: "eg. AQA General Development",
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
      description: "eg. aqa-general-development",
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
