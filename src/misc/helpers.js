export function transformToArrWithId(snapVal) {
  return snapVal
    ? Object.keys(snapVal).map(objId => {
        return { ...snapVal[objId], id: objId };
      })
    : [];
}
export function getBookByOwner(books, ownerId) {
  const userExist = books.find(el => (el.owner === ownerId ? true : {}));
  let data;
  if (userExist) {
    data = books.filter(el => (el.owner === ownerId ? [el] : []));
    return data;
  } else {
    return null;
  }
}
export function getUserById(authors, userId) {
  const userExist = authors.find(el => (userId === el.id ? true : false));
  let data;
  if (userExist) {
    data = authors.find(el => (userId === el.id ? { el } : {}));
    return data;
  } else {
    return null;
  }
}
export function getPages(maxSlices) {
  let data = [];
  if (maxSlices === 1) {
    console.log('there is only one page');
    data = [1];
  } else {
    for (let index = 0; index < maxSlices; index++) {
      data = [...data, index + 1];
    }
  }
  return data;
}
export function getSlice(sliceNo, inArr) {
  let sliceLB = 0;
  let sliceUB = 9;
  if (sliceNo === 1) {
    return inArr.slice(sliceLB, sliceUB);
  } else {
    sliceUB = 10 * sliceNo;
    sliceUB = sliceUB - 1;
    sliceLB = sliceUB - 9;
    return inArr.slice(sliceLB, sliceUB);
  }
}
