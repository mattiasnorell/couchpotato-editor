const DateTimeFilter = (input: Date) => {
  return input.toString().slice(0, 10).replace(/-/g, "-").replace("T", " ");
};

const $dateTimeFilter = DateTimeFilter;
export default $dateTimeFilter;
