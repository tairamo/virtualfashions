import { FILE_TYPES } from "../constants";

export const imageValidation = (file) => {
  try {
    if (!FILE_TYPES.includes(file.type)) {
      throw new Error("Please select valid file!");
    }

    const fileSize = file.size / 1024;
    if (fileSize > 10240) {
      throw new Error("File is too big! Please select a file less then 10MB");
    }
  } catch (err) {
    throw err;
  }
};

export const fileValidation = (file) => {
  try {
    FILE_TYPES.push("video/mp4");

    if (!FILE_TYPES.includes(file.type)) {
      throw new Error("Please select valid file!");
    }

    const fileSize = file.size / 1024;
    if (fileSize > 20480) {
      throw new Error("File is too big! Please select a file less then 20MB");
    }
  } catch (err) {
    throw err;
  }
};
