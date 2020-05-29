const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
   res.render("index");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
   if (err) {
      console.log(err);
   } else {
      console.log("Server start...");
   }
});
