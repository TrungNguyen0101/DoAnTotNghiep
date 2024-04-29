const { Lessonservice } = require("../services/index.js");

const insertLessons = async (req, res) => {
  try {
    const { text_image, image, color, type } = req.body;
    if (!text_image || !image || !color || !type) {
      return res.status(400).json({
        status: 400,
        message: "Missing inputs parameter.",
      });
    }
    const LessonsData = {
      text_image,
      image,
      color,
      type,
    };
    console.log("Lessons Data Insert: ", LessonsData);
    const result = await Lessonservice.insertLessons(LessonsData);
    console.log("Result Insert: ", result);
    if (result) {
      return res.status(200).json({
        status: 200,
        message: "Add data for Lessons successfully.",
      });
    }
    return res.status(400).json({
      status: 400,
      message: "Added data for failed Lessons.",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const updateLessons = async (req, res) => {
  try {
    const { id, data } = req.body;
    if (!id || !data) {
      return res.status(400).json({
        status: 400,
        message: "Missing inputs parameter.",
      });
    }
    console.log("Lessons Data Update: ", { id, ...data });
    const result = await Lessonservice.updateLessons(id, data);
    console.log("Result Update: ", result);
    if (result && result.acknowledged && result.matchedCount == 1) {
      return res.status(200).json({
        status: 200,
        message: "Update data for Lessons successfully.",
      });
    }
    return res.status(400).json({
      status: 400,
      message: "Update data for failed Lessons.",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const findLessons = async (req, res) => {
  try {
    const { id, type, all } = req.query;
    if (id) {
      console.log("Lessons Data Find By Id: ", id);
      const result = await Lessonservice.findLessons({id});
      console.log("Result Find By Id: ", result);
      if (result) {
        return res.status(200).json({
          status: 200,
          message: "Find By Id data for Lessons successfully.",
          result 
        });
      }
      return res.status(400).json({
        status: 400,
        message: "Find By Id data for failed Lessons.",
      });
    }

    if (type) {
      console.log("Lessons Data Find By Type: ", type);
      const result = await Lessonservice.findLessons({type});
      console.log("Result Find By Type: ", result);
      if (result) {
        return res.status(200).json({
          status: 200,
          message: "Find By Type data for Lessons successfully.",
          result
        });
      }
      return res.status(400).json({
        status: 400,
        message: "Find By Type data for failed Lessons.",
      });
    }

    if (all) {
      console.log("Lessons Data Find All: ", all);
      const result = await Lessonservice.findLessons({all});
      console.log("Result Find All: ", result);
      if (result) {
        return res.status(200).json({
          status: 200,
          message: "Find All data for Lessons successfully.",
          result
        });
      }
      return res.status(400).json({
        status: 400,
        message: "Find All data for failed Lessons.",
      });
    }

    return res.status(400).json({
      status: 400,
      message: "Find data for failed Lessons.",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

module.exports = {
  insertLessons,
  updateLessons,
  findLessons
};
