export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
    },
    {
      type: 'markdown',
      description: 'A Github flavored markdown field with image uploading',
      name: 'bio',
    },
  ],
}
