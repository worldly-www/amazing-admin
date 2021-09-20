export function setRules(message: string, required = true) {
  return [
    {
      required,
      message,
    },
  ];
}
