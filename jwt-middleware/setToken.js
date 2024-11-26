import jwt from 'npm:jsonwebtoken';

const SECRET = Deno.env.get("SECRET")

export const setToken = ((user, role, res) => {
    const token = jwt.sign({ username: user, role: role }, SECRET, { expiresIn: '1min' });

    res.cookie('token', token, {
      sameSite: 'strict',
      httpOnly: true
    });

});
