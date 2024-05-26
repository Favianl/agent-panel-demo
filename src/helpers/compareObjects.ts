type Obj = {
  [key: string]: any;
};

export function compareObjects(a: Obj, b: Obj) {
  if (typeof a !== 'object' || typeof b !== 'object') {
    return false;
  }

  const propsA = Object.keys(a);
  const propsB = Object.keys(b);

  if (propsA.length !== propsB.length) {
    return false;
  }

  for (const prop in a) {
    if (a[prop] !== b[prop]) {
      return false;
    }
  }

  return true;
}
