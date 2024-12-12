const express = require('express');
const tokenMiddleware = require('./middleware/token.middleware');

const app = express();

app.get('/test', tokenMiddleware, (req, res) => {
    res.json({ message: 'Middleware executed successfully!', user: req.user });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
