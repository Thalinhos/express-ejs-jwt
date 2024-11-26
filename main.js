// deno-lint-ignore-file
import express from 'npm:express';
import ejs from "npm:ejs"
import { loginRouter } from "./routes/loginRoutes.js";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(loginRouter)

app.listen(port,() => {
  console.log(`Servidor rodando na porta http://localhost:${port}/`);
});

//deno --watch --env-file -A .\main.js
//--watch == hotReload; --env-file = ler .env file; -A = dar acesso ao Deno.