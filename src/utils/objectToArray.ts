interface IToArrayOption {
  labelKey?: string;
  valueKey?: string;
}

export default function objectToArray<T = Object>(
  data: T,
  option: IToArrayOption = {},
) {
  const { labelKey = 'label', valueKey = 'value' } = option;
  return Object.entries(data).map(([key, value]) => {
    const data = {
      [labelKey]: key,
      [valueKey]: value,
    };
    if (value instanceof Object) {
      Object.assign(data, value);
    }
    return data;
  });
}
