const db = require("../models/index.js");

const insertLessons = async (data) => {
  try {
    return await db.lesson.create(data);
  } catch (e) {
   throw new Error(e.message);
  }
};

const updateLessons = async (id, data) => {
  try {
    const filter = { _id: id };
    const updateData = {
      $set: data
    };
    return await db.lesson.updateOne(filter, updateData);
  } catch (e) {
   throw new Error(e.message);
  }
};

const findLessons = async (query) => {
  try {
    if(query.id) {
      return await db.lesson.findById(query.id);
    }

    if(query.type) {
      return await db.lesson.find({ type: query.type });
    }

    if(query.all) {
      return await db.lesson.find({});
    }
    
  } catch (e) {
   throw new Error(e.message);
  }
};
module.exports = {
  insertLessons,
  updateLessons,
  findLessons
};
