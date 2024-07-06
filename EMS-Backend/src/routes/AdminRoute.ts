import express from "express";
import dbCon from "../utils/db";
import jwt from "jsonwebtoken";
import { RowDataPacket } from 'mysql2';

const router = express.Router();

router.post('/admin-login', (req, res) => {
  const sql = 'SELECT * FROM admin WHERE email = ? and password = ?';
  dbCon.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query Error" });

    // Type assertion for results as RowDataPacket[]
    const rows = result as RowDataPacket[];
    if (rows.length > 0) {
      const email = rows[0].email;
      const token = jwt.sign(
        { role: 'admin', email: email },
        'jwt_secret_key',
        { expiresIn: "1d" }
      );
      res.cookie('token', token)
      return res.json({ loginStatus: true })
    } else {
      return res.json({loginStatus: false, Error: 'Incorrect email or password' })
    }
  });
});

export { router as adminRouter };
