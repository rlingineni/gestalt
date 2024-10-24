export const customStructure = (S) =>
  S.list()
    .title('Base')
    .items([...S.documentTypeListItems().reverse()])
