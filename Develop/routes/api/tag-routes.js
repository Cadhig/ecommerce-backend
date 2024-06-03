const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    attributes: ['id', "tag_name"],
    include: [{
      model: Product,
    }]
  })
    .then((result) => {
      return res.json(result)
    })
    .catch((err) => {
      console.error(err)
      return res.json({
        message: "Cannot fetch records!"
      })
    })
});

router.get('/:id', (req, res) => {
  const id = req.params.id
  const findPK = Tag.findByPk(id)
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
      console.error(err)
      return res.json({
        message: "Cannot fetch record by ID!"
      })
    })
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  const { tag_name } = req.body
  Tag.create({
    tag_name: tag_name
  })
    .then(() => {
      return res.json({
        message: "Record successfully created!"
      })
    })
    .catch((err) => {
      console.error(err)
      return res.json({
        message: "Could not create record!"
      })
    })
});

router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(() => {
      return res.json({
        message: "Record updated successfully!"
      })
    })
    .catch((err) => {
      console.error(err)
      return res.json({
        message: "Could not update record!"
      })
    })
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      return res.json({
        message: "Record deleted successfully!"
      })
    })
    .catch((err) => {
      console.error(err)
      return res.json({
        message: "Could not delete record!"
      })
    })
});

module.exports = router;
