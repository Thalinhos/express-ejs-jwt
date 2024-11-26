// deno-lint-ignore-file no-unused-vars
//imports
import express from 'npm:express';
export const loginRouter = express.Router()

import { verifyToken } from "../jwt-middleware/verifyToken.js";
import { users } from "../db/db.ts";
import { setToken } from "../jwt-middleware/setToken.js";

//routes
loginRouter.get('/', (req, res) => {
    return res.redirect('/login')
});
  
loginRouter.get('/login', (req, res) => {
    return res.render('login', {errorMessage: null})
})

loginRouter.post('/handleLogin', (req, res) => {
    const { usuario, senha } = req.body;

    const user = users.find(u => u.nome === usuario);

    if (!user) {
        return res.render('login', {errorMessage: 'usuario não encontrado'})
    }

    if (senha !== user.senha) {
        return res.render('login', {errorMessage: 'Senha incorreta - não use em produção'});
    }

    setToken(user.nome, user.role, res)

    return res.redirect('/perfil');
});

loginRouter.get('/perfil', verifyToken,(req, res) => {
    console.log(req.user)
    return res.render('perfil', {username: req.user.username})
})