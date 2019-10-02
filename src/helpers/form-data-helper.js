
export function formDataFrom(values) {
  let formData = new FormData();
  for (var key in values) {
    formData.append(key,values[key]);
  }
  return formData
}
