exports.uniqElementsBy = (elements, props) => {
  const uniqueKeysMap = {};
  return elements.filter(el => {
    const elementKey = props.reduce((composed, prop) => `${composed}:${el[prop]}` , '')
    if (uniqueKeysMap[elementKey]) return false;
    uniqueKeysMap[elementKey] = true;
    return true;
  })
};
