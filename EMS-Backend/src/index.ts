import express from 'express';
import cors from 'cors';
import { adminRouter } from './routes/AdminRoute';
import { employeeRouter } from './routes/EmployeeRoute';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use('/auth', adminRouter);
app.use('/employee', employeeRouter);
app.use(express.static('public'));

app.listen(3000, () => {
  console.log('Server is running')
})

//heroku deployment
// import path from 'path';

// app.use(express.static(path.join(__dirname, 'client')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'index.html'));
// });
