export default (classes: { [key: string]: boolean }) => {
  return Object
    .keys(classes)
    .filter((key) => classes[key] === true)
    .join(' ');
};