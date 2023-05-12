
const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODOCTNAME%}/g, product.title);
    output = output.replace(/{%IMAGE%}/g, product.thumbnail);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%STOCK%}/g, product.stock);
    output = output.replace(/{%RATING%}/g, product.rating);
    output = output.replace(/{%BRAND%}/g, product.brand);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    output = output.replace(/{%CATEGORY%}/g, product.category);
    return output;
  };
  
  module.exports = replaceTemplate;