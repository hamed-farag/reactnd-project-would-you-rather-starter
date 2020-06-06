export default function (collection) {
  const arr = [];
  for (const key in collection) {
    if (collection.hasOwnProperty(key)) {
      const el = collection[key];
      arr.push(el);
    }
  }
  return arr;
}
