import validator from "validator";
export const isTitle = (title) => {
  if (!title) {
    return "Title is required";
  }
  if (typeof title !== "string") {
    return "Title must be a string";
  }
  if (title.trim().length === 0) {
    return "Title cannot be empty or just spaces";
  }
  if (!validator.isLength(title, { min: 3, max: 100 })) {
    return "Title must be between 3 and 100 characters";
  }
  return true;
};
export const isDes = (des) => {
  if (!des) {
    return "Description is required";
  }
  if (typeof des !== "string") {
    return "Description must be a string";
  }
  if (des.trim().length === 0) {
    return "Description cannot be empty or just spaces";
  }
  if (!validator.isLength(des, { min: 10, max: 500 })) {
    return "Description must be between 10 and 500 characters";
  }
  return true;
};
export const isDate = (startDate, endDate, update = false) => {
  if (!startDate) {
    return "Start Date is required";
  }
  if (!endDate) {
    return "End Date is required";
  }
  if (typeof startDate !== "string" || typeof endDate !== "string") {
    return "Start date and end date must be a string";
  }
  if (!validator.isDate(startDate) || !validator.isDate(endDate)) {
    return "Start date and end date must be valid dates";
  }
  let start = new Date(startDate);
  let end = new Date(endDate);
  let now = new Date();
  now.setHours(0, 0, 0, 0);
  if (start > end) {
    return "End date cannot be before start date";
  }
  if (!update) {
    if (start < now) {
      return "Start date cannot be before today's date";
    }
  }
  return true;
};
export const isCompleted = (iscompleted) => {
  if (iscompleted == null || iscompleted == undefined) {
    return "isCompleted is required";
  }
  if (typeof iscompleted !== "boolean") {
    return "isCompleted must be a Boolean";
  }
  return true;
};
const taskValidator = {
  isTitle,
  isDes,
  isDate,
  isCompleted,
};
export default taskValidator;
