const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "G@etano1",
  database: "bamazon_db"
});
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected");
  });

let idListArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

function inventory () {
  let query = "SELECT * FROM products";

  connection.query(query, function(err, res){
          if (err) throw err;
          for (let i = 0; i < res.length; i++){
            console.log("#" + res[i].item_id + " " + res[i].product_name + " $" + res[i].price);
          };
          shop();
    });
};

function start () {
    inventory(shop);
}


function shop (stock, inStock){
    inquirer.prompt([
        {
            name: "prodSel",
            type: "list",
            message: "Thank you for shopping at bamazon, please select your product ID",
            choices: idListArr
        },
        {
            name: "quantSel",
            type: "input",
            message: "How much would you like to buy?",
            validate: validateAmt
        }
    ]).then(function(selection){
        connection.query("SELECT stock_quantity FROM products WHERE item_id =" + selection.prodSel, function(err, res){
            if (err) throw err;
            if (selection.quantSel > res[0].stock_quantity){
                console.log("We only have "+res[0].stock_quantity+" in stock, please make another selection");
                start();
            }else{
                console.log("Your purchase was successful!");
                connection.query("UPDATE products SET? WHERE item_id=" + selection.prodSel,
                    {
                        stock_quantity: res[0].stock_quantity - selection.quantSel
                    }
                )
                start();
            };
            });
    });
};

function validateAmt (quantSel){
    var reg = /^\d+$/;
    return reg.test(quantSel) || "Amount should be a number!";
};

start();