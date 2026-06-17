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

let users = [
  { id: 1, name: "Angela", color: "teal" },
  { id: 2, name: "Jack", color: "powderblue" },
];

let currentUserId = 1;
let currentUserColor = "teal";

async function checkVisited(userId) {
  const result = await db.query(
    "SELECT country_code FROM visited_countries WHERE user_id = $1", 
    [userId]
  );
  
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

app.get("/", async (req, res) => {
  const countries = await checkVisited(currentUserId);
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      color: currentUserColor,
    });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    console.log(data);
    
    const countryCode = data.country_code;
    console.log(countryCode);
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/user", async (req, res) => {
  if (req.body.add === "new") {
    return res.render("new.ejs");
  }
  
  const clickedUser = req.body.user;
  const userId = parseInt(clickedUser);

  currentUserId = userId;

  const wantedUser = users.find((user) => user.id === userId);
  currentUserColor = wantedUser.color;
  const visited = await checkVisited(userId);

  res.render("index.ejs", {
    countries: visited,
    total: visited.length,
    users: users,
    color: currentUserColor,
  });
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  const newUserName = req.body.name;
  const newUserColor = req.body.color;

  try {
    const result = await db.query(
      "INSERT INTO users (name, color) VALUES ($1, $2) RETURNING id;",
      [newUserName, newUserColor]
    );
    const newUserId = result.rows[0].id;
    users.push({ id: newUserId, name: newUserName, color: newUserColor });
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
