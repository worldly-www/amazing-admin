type pickReturnType = Record<string, any>;

export function pick(data: pickReturnType, keys: Array<string>) {
  if (Array.isArray(keys)) {
    return keys.reduce((values: pickReturnType, key) => {
      values[key] = data[key];
      return values;
    }, {});
  }
  return data;
}
