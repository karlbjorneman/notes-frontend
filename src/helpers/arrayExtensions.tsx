
  const arrayToObject = (array:[], keyField:string) =>
  array.reduce((obj, item) => {
    obj[item[keyField]] = item
    return obj
  }, {})

  const groupBy = function(xs:any, key:any) {
   return xs.reduce(function(rv: any, x:any) {
     (rv[x[key]] = rv[x[key]] || []).push(x);
     return rv;
   }, {});
 };

 const move = (arr:[], from:number, to:number) => {
  const clone = [...arr];
  Array.prototype.splice.call(clone, to, 0,
    Array.prototype.splice.call(clone, from, 1)[0]
  );
  return clone;
};

export { arrayToObject, groupBy, move }