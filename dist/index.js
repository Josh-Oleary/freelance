import express from 'express';
import bp from 'body-parser';
import users from './routes/users.js';
import auth from './routes/auth.js';
const port = process.env.PORT || 3000;
const app = express();
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use('/', auth);
app.use('/users', users);
app.listen(port, () => {
    console.log(`App running on port: ${port}`);
});
