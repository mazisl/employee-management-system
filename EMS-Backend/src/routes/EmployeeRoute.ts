import express from "express";
import dbCon from "../utils/db";
import jwt from "jsonwebtoken";
import { RowDataPacket } from 'mysql2';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/employee-login', (req, res) => {
  const sql = 'SELECT * FROM employee WHERE email = ?';
  dbCon.query(sql, [req.body.email], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query Error" });

    // Type assertion for results as RowDataPacket[]
    const rows = result as RowDataPacket[];
    if (rows.length > 0) {
      bcrypt.compare(req.body.password, rows[0].password, (err, response) => {
        if (err) return res.json({loginStatus: false, Error: 'Wrong Password'});
        if (response) {
          const email = rows[0].email;
          const token = jwt.sign(
            { role: 'admin', email: email, id: rows[0].id },
            'jwt_secret_key',
            { expiresIn: "1d" }
          );
          res.cookie('token', token)
          return res.json({ loginStatus: true, id: rows[0].id })
        }
      })
    } else {
      return res.json({loginStatus: false, Error: 'Incorrect email or password' })
    }
  });
});

router.get('/detail/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM employee WHERE id = ?';
  dbCon.query(sql, [id], (err, result) => {
    if (err) return res.json({Status: false});
    return res.json(result);
  })
})

router.get('/logout', (req, res) => {
  res.clearCookie('token')
  return res.json({Status: true})
})

export {router as employeeRouter};