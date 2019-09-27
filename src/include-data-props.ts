export default function(props: { [key: string]: any }) {
  const dataProps: { [key: string]: any } = {};

  Object.keys(props).forEach((key) => {
    if (/^data-/.test(key)) {
      dataProps[key] = props[key];
    }
  });

  return dataProps;
}
