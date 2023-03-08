const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
    .then(categoryData => {
      if (!categoryData) {
        res.status(404).json({ message: 'None Found' });

        return;
      }
      res.json(categoryData);

    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });


});



router.get('/:id', (req, res) => {

  Category.findOne({
    where: {
      id: req.params.id
    },
    include:{
      model:Product,
      attributes: ['id','product_name','price', 'stock','category_id']
    }
  })
  .then(categoryData => {
    if(!categoryData){
      res.status(404).json({message: 'No categories found'});
      return;
    }
    res.json(categoryData);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});

router.post('/', (req, res) => {
  Category.create(req.body)
    .then((newCategory) => {
      res.json(newCategory);
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
 
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(categoryData => {
      if (!categoryData) {
        res.status(404).json({message:'No category found'});
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
 
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(categoryData => {
      if (!categoryData){
        res.status(404).json({message: 'No category found'});
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
