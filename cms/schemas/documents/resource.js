export const resourceTypes = [
  { title: "Lesson", value: "lesson" },
  { title: "Scheme of Work", value: "schemeOfWork" },
];
export const keyStages = [
  { title: "KS1", value: "ks1" },
  { title: "KS2", value: "ks2" },
  { title: "KS3", value: "ks3" },
  { title: "KS4", value: "ks4" },
  { title: "KS5", value: "ks5" },
];
export const examBoards = [
  { title: "AQA", value: "aqa" },
  { title: "Edexcel", value: "edexcel" },
  { title: "Edexcel A", value: "edexcel-a" },
  { title: "Edexcel B", value: "edexcel-b" },
  { title: "OCR", value: "ocr" },
  { title: "OCR A", value: "ocr-a" },
  { title: "OCR B", value: "ocr-b" },
];

export default {
  name: "resource",
  title: "Resource",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
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
      title: "Resource Url",
      description:
        "A link to the Google Drive (or similar) folder for this resource",
      name: "resourceUrl",
      type: "url",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "keyStage",
      title: "Key Stage",
      type: "string",
      options: {
        list: keyStages,
        layout: "dropdown",
      },
    },
    {
      name: "examBoard",
      title: "Exam Board",
      type: "string",
      options: {
        list: examBoards,
        layout: "dropdown",
      },
    },
    {
      name: "resourceType",
      title: "Resource Type",
      type: "string",
      options: {
        list: resourceTypes,
        layout: "radio",
      },
    },
    {
      name: "topics",
      title: "Topics",
      type: "array",
      of: [{ type: "reference", to: { type: "topic" } }],
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
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
      title: "title",
      media: "image",
    },
  },
};
