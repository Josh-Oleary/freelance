import express from 'express';
import bp from 'body-parser';
import users from './routes/users.js';
import auth from './routes/auth.js';
import profilesAPI from './routes/profiles.js';
const port = process.env.PORT || 3000;
const app = express();
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use('/api/', auth);
app.use('/api/users', users);
app.use('/api/profiles', profilesAPI);
app.listen(port, () => {
    console.log(`App running on port: ${port}`);
});
