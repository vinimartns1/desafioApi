const cypress = require("cypress");

cypress
.run({
spec: "./cypress/e2e/**",
})
.then((results) => {
console.log(results);
})
.catch((err) => {
console.error(err);
});