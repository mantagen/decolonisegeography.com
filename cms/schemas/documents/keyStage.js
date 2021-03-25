export default {
  name: "keyStage",
  title: "Key Stage",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description: "eg. KS5 (16-19 yrs)",
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
      description: "ks5",
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
