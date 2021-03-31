interface IFormDataPayload {
  [index: string]: string | File[];
}

function createFormDataWithObject(payload: IFormDataPayload) {
  const formData = new FormData();

  for (const [key, value] of Object.entries(payload)) {
    if (Array.isArray(value)) {
      for (const file of value) {
        formData.append('images', file);
      }
    } else {
      formData.set(key, value);
    }
  }

  return formData;
}

export { createFormDataWithObject };
