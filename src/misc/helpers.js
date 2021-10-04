export function transformToArrWithId(snapVal) {
  return snapVal
    ? Object.keys(snapVal).map(authorId => {
        return { ...snapVal[authorId], id: authorId };
      })
    : [];
}
