
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');


Product.Category = Product.belongsTo(Category);

Category.Product = Category.hasMany(Product);


// Products belongToMany Tags (through ProductTag)
Product.ProductTag = Product.belongsToMany(ProductTag);
// Tags belongToMany Products (through ProductTag)
const ProductTag = Tag.belongsToMany(Product,{ as: 'ProductTag'});


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
