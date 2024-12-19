// $roots keeps previous parent properties as they will be added as a prefix for each prop.
// $sep is just a preference if you want to seperate nested paths other than dot.
// @ts-ignore
export const flattenObject = (obj: any, roots = [], sep = '.') => {
  return (
    Object
      // find props of given object
      .keys(obj)
      // return an object by iterating props
      // @ts-ignore
      .reduce((memo: any, prop: any) => {
        return Object.assign(
          // create a new object
          {},
          // include previously returned object
          memo,
          Object.prototype.toString.call(obj[prop]) === '[object Object]'
            ? // keep working if value is an object
              // @ts-ignore
              flattenObject(obj[prop], roots.concat([prop]), sep)
            : // include current prop and value and prefix prop with the roots
              // @ts-ignore
              { [roots.concat([prop]).join(sep)]: obj[prop] }
        )
      }, {})
  )
}
