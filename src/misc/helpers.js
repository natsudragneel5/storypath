export function transformToArrWithId(snapVal) {
  return snapVal
    ? Object.keys(snapVal).map(objId => {
        return { ...snapVal[objId], id: objId };
      })
    : [];
}
export function getBookByOwner(books, ownerId) {
  return books ? books.filter(el => (el.owner === ownerId ? [el] : [])) : [];
}
export function getUserById(authors, userId) {
  return authors ? authors.filter(el => (el.id === userId ? [el] : [])) : [];
}
