// const B = [];
// const { json } = require("body-parser");
// const fs = require("fs");
// const path = require("path");
// // const express = require("express");
// // const app = express();
// module.exports = class A {
//   constructor(t) {
//     this.title = t;
//   }

//   save() {
//     // B.push(this);
//     var mypath = path.join(
//       path.dirname(process.mainModule.filename),
//       "data",
//       "product.json"
//     );
//     fs.readFile(mypath, (err, data) => {
//       let temp = [];
//       if (!err) {
//         temp = JSON.parse(data);
//       }
//       temp.push(this);
//       fs.writeFile(mypath, JSON.stringify(temp), (err) => {
//         console.log("save file err", err);
//       });
//     });
//   }

//   static fetchAll(cb) {
//     var mypath = path.join(
//       path.dirname(process.mainModule.filename),
//       "data",
//       "product.json"
//     );
//     fs.readFile(mypath, (err, data) => {
//       if (err) {
//         cb([]);
//       }
//       cb(JSON.stringify(data));
//     });
//   }
// };

const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    getProductsFromFile((products) => {
      //this products variable come from json file its a array form
      let newproducts = products;
      newproducts.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
