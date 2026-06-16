import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "1337",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.
  const result = await db.query("SELECT country_code FROM visited_countries");
  const queryError = req.query.error || null;
  let dbCountries = [];
  result.rows.forEach(country => {
    dbCountries.push(country.country_code);
  });
  console.log(result.rows);
  res.render("index.ejs", { countries: dbCountries, total: dbCountries.length, error: queryError });
});

app.post("/add", async (req, res) => {
  var newCountry = req.body.country;
  const result = await db.query("SELECT * FROM countries");
  const match = result.rows.find(c => c.country_name.toLowerCase() === newCountry.toLowerCase());
  if (match) {
    await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [match.country_code]);
    res.redirect("/");
  } else {
    console.error("No valid Country");
    res.redirect("/?error=Invalid%20Country");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
