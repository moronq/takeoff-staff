export function compareObjInArray<T>(arr: Array<T>, obj: T): boolean {
  let result = false
  arr.forEach((el) => {
    if (JSON.stringify(el) == JSON.stringify(obj)) {
      result = true
    }
  })
  return result
}
