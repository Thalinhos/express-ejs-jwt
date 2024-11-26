import { Database } from "jsr:@db/sqlite@0.12";
const db = new Database("./db/test.db");
db.prepare(
  `
	CREATE TABLE IF NOT EXISTS people (
	  id INTEGER PRIMARY KEY AUTOINCREMENT,
	  name TEXT,
	  age INTEGER
	);
  `,
).run();

db.prepare(
  `
	INSERT INTO people (name, age) VALUES (?, ?);
  `,
).run("Bob", 40);

const rows = db.prepare("SELECT id, name, age FROM people").all();
console.log("People:");
for (const row of rows) {
  console.log(row);
}
db.close();


//APENAS TESTANDO O SQLITE