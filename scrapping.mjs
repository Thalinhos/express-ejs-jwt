
import fetch from 'npm:node-fetch';  
// import { load } from 'npm:cheerio'; 

import https from 'node:https'

let data = []

fetch('https://exemplo.com',)
  .then(response => response.text())
  .then(res => console.log(res))
  .catch(error => console.error('Erro na requisição:', error));

console.log(data)