import moment from "moment";

export const objectToFormData: (
  values?: any,
  image?: any,
  imageKey?: string
) => FormData = (values, image, imageKey) => {
  const formData = new FormData();
  Object.keys(values).forEach((element) => {
    if ((values[element] !== undefined || null) && values[element] !== "") {
      if (
        typeof values[element] === "object" &&
        moment(values[element]).isValid()
      ) {
        formData.append(element, moment(values[element]).format("YYYY-MM-DD"));
      } else {
        formData.append(element, values[element]);
      }
    }
  });

  /************************* Handle Images & Videos *************************/
  image?.forEach((img: any) => {
    if (image.length > 0) {
      formData.append(imageKey!, img);
    }
  });

  return formData;
};
