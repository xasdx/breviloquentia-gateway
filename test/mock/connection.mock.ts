export default ({ services, onSave }) => {

  let repositoryMock = {
    save: (item) => {
      if (onSave) { onSave(item) }
      return item
    },
    find: () => services || []
  }

  let connectionMock = {
    getRepository: () => repositoryMock
  }

  return connectionMock
}
