import fs from 'node:fs/promises';

async function example(){
    try {    
        const content = 'Some content! \n';
        await fs.appendFile('./test.txt', content);
    } catch (err) {
        console.error(err);
    }
}

example()