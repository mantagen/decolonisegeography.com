export default {
  name: "menu",
  title: "Menu",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "pages",
      title: "Pages",
      type: "array",
      of: [{ type: "reference", to: { type: "page" } }],
      validation: (Rule) => Rule.required(),
    },
  ],
};
