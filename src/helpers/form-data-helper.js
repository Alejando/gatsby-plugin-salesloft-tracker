
export function formDataFrom(values) {
  let formData = new FormData();
  buildFormData(formData, values)
  return formData;
}

function buildFormData(formData, data, previousKey) {
  if (data instanceof Object) {
    Object.keys(data).forEach(key => {
      const value = data[key];

      if (previousKey) {
        key = `${previousKey}[${key}]`;
      }

      if (
        value instanceof Object && 
        !Array.isArray(value) && 
        !(value instanceof File)
      ) {
        return buildFormData(formData, value, key);
      }

      if (Array.isArray(value)) {
        value.forEach(val => {
          formData.append(`${key}[]`, val);
        });
      } else {
        formData.append(key, value);
      }
      
    });
  }
}
