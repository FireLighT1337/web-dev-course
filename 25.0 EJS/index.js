import express from "express";

const app = express();
const port = 3000;

const d = new Date();
let day = d.getDay();

if (day > 0 && day < 6) {
  day = "weekday";
} else {
  day = "weekend";
}

app.get("/", (req, res) => {
  res.render("index.ejs", { weekday: day });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
