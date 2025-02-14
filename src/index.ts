import app from './app';
import authController from './controllers/auth.controller';

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
   console.log(`listening on port ${PORT}`);
})