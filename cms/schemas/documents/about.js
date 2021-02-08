export default {
  type: "document",
  name: "about",
  title: "About",
  __experimental_actions: ["update", "create", "publish"],
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    },
  ],
};
