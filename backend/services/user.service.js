import User from "../models/user.model.js";

export const getUser = async (id) => {
  return await User.findById(id);
};

export const createUser = async (data) => {
  return await User.create(data);
};