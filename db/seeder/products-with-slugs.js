const products = require('./products');

const sluggedProducts = products.map((product)=>{
  let slug = product.brand.toLowerCase()+"-"+product.name.toLowerCase().replaceAll(" ","-").replaceAll(".","-")

  product.slug=slug
  console.log(product)
})

module.export = sluggedProducts