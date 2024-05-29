const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    attributes: ['id', 'category_name']
  })
    .then((result) => {
      return res.json(result)
    })
    .catch((err) => {
      console.error(err);
      return res.json({
        message: "Cannot fetch records!"
      })
    })
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  const id = req.params.id
  const findPK = Category.findByPk(id)
    .then((result) => {
      if (findPK === null) {
        console.log('Not found!')
        return res.json({
          message: "ID not found (null)"
        })
      }
      return res.json(result)
    })
    .catch((err) => {
      console.error(err);
      return res.json({
        message: "Cannot fetch record by ID!"
      })
    })
});

router.post('/', (req, res) => {
  const { category_name } = req.body;
  Category.create({
    category_name: category_name
  })
    .then((result) => {
      return res.json({
        message: "Record successfully created!"
      })
    })
    .catch((err) => {
      console.error(err);
      return res.json({
        message: "Unable to create new record!"
      })
    })
});

router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then((result) => {
      return res.json({
        message: "Record updated successfully!"
      })
    })
    .catch((err) => {
      console.error(err);
      return res.json({
        message: "Unable to update the record!"
      })
    })
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    },
  })
    .then((result) => {
      return res.json({
        message: "Record deleted successfully!"
      })
    })
    .catch((err) => {
      console.error(err);
      return res.json({
        message: "Unable to delete record!"
      })
    })
});

module.exports = router;
