const Item = require('../item');
const express = require('express');

const router = express.Router();

// Get item from shopping list

router.get('', (req, res, next) => {
  try {
    return res.json({ items: Item.findAll() });
  } catch (err) {
    return next(err)
  }
});

// Post item to shopping list

router.post('', (req, res, next) => {
  try {
    let newItem = new Item(req.body.name, req.body.price);
    return res.json({ item: newItem });
  } catch (err) {
    return next(err)
  }
});

//  Get name of item from shopping list

router.get('/:name', (req, res, next) => {
  try {
    let foundItem = Item.find(req.params.name);
    return res.json({ item: foundItem });
  } catch (err) {
    return next(err)
  }
});

// Update name of item on shopping list

router.patch('/:name', (req, res, next) => {
  try {
    let foundItem = Item.update(req.params.name, req.body);
    return res.json({ item: foundItem });
  } catch (err) {
    return next(err)
  }
});

// Delete item from shopping list

router.delete('/:name', (req, res, next) => {
  try {
    Item.remove(req.params.name);
    return res.json({ message: 'Deleted' });
  } catch (err) {
    return next(err)
  }
});

module.exports = router;
