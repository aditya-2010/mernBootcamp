const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "Category not found in DB",
      });
    }
    res.category = category;
    next();
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      res.status(400).json({
        error: "No categories found",
      });
    }
    res.json(categories);
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      res.status(400).json({
        error: "Unable to save category in DB",
      });
    }
    res.json(category);
  });
};

exports.updateCategory = (req, res) => {
  let category = res.category;
  console.log(req.body);
  category.name = req.body.name;
  category.save((err, updatedCategory) => {
    if (err) {
      res.status(400).json({
        error: "Failed to update category",
      });
    }
    res.json(updatedCategory);
  });
};

exports.removeCategory = (req, res) => {
  const category = res.category;
  category.remove((err, category) => {
    if (err) {
      res.status(400).json({
        error: `Failed to delete category ${category.name}`,
      });
    }
    res.json({
      message: `Successfully deleted the category ${category.name}`,
    });
  });
};
