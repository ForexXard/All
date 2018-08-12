var faker = require("faker");

var price = faker.commerce.price();
var product = faker.commerce.productName();
console.log("===================\nWelcome To My Shop\n===================")
for (var i = 0; i < 10; i++){
    console.log(faker.fake("{{commerce.productName}} - ${{commerce.price}}"));
}