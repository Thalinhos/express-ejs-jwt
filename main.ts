import express from 'npm:express';
import ejs from "npm:ejs"
import jwt from 'npm:jsonwebtoken';

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './views');

const SECRET = 'sheeeeeeeeeeeeeeeeesh'

const users = [{ id: 1, nome: 'thalisson', senha: 'peganobreu' },
              { id: 2, nome: 'carol', senha: 'peganobreu'}]

const verifyToken = ((req, res, next) => {
      const rawToken = req.headers.cookie
      const token = rawToken?.split('=')[1]
  
      if(!token){ return res.status(401).send('Token inválido ou expirado'); }

      jwt.verify(token, SECRET, (err, decoded) => {
          if (err) {
            return res.status(401).send('Token inválido ou expirado');        }
            req.user = decoded;
            next()
      });
  })


app.get('/', (req, res) => {
  const numbers = ['joao','maria',3,4,5]
  res.render('home', {numbers: numbers});
});

app.get('/login', (req, res) => {
  res.render('login')
})

app.post('/handleLogin', (req, res) => {

  console.log(req)

  const { usuario, senha } = req.body;

  const user = users.find(u => u.nome === usuario);
  
  if (!user) {
    return res.send('Usuário não encontrado');
  }

  if (senha !== user.senha) {
    return res.send('Senha incorreta - não use em produção');
  }

  const token = jwt.sign({ username: usuario }, SECRET, { expiresIn: '1min' });

  res.cookie('token', token, {
    sameSite: 'strict',
    httpOnly: true
  });

  res.redirect('/perfil');
});

app.get('/perfil', verifyToken,(req, res) => {
  console.log(req.user)
  res.render('perfil', {username: req.user.username})
})


app.listen(port,() => {
    console.log(`Servidor rodando na porta ${port}`);
});
