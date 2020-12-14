'use strict';
const express = require('express');
const path = require('path');
const app = express();
const ejs = require('ejs');
const mysql = require('mysql');
const session = require('express-session');


const port = process.env.port || 5000;
const ClientPath = path.join(__dirname, '../Client');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'BlogManagement'
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(ClientPath, '/public')));
app.set('view engine', 'ejs');
app.use(session({
    secret: "212jh12#!@adlk",
    resave: false,
    saveUninitialized: true
}));



app.get('/', (req, res) => {

    connection.query('select * from mydocument', (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            if (req.session.displayName) {
                res.render(path.join(ClientPath, 'lg-index.ejs'), { data: rows , user:req.session.userName , pri:req.session.userPri })
            }else{
                res.render(path.join(ClientPath, 'index.ejs'), { data: rows })
            }
        }
    });
});

app.get('/member/myinfo', (req, res) => {
    res.render(path.join(ClientPath, 'member/myinfo.ejs'))
});
app.get('/member/sign-up-info', (req, res) => {
    res.render(path.join(ClientPath, 'member/sign-up-info.ejs'))
});
app.get('/notice/detail', (req, res) => {
    res.render(path.join(ClientPath, 'notice/detail.ejs'))
});
app.get('/notice/list', (req, res) => {
    res.render(path.join(ClientPath, 'notice/list.ejs'))
});
app.get('/document/detail', (req, res) => {
    res.render(path.join(ClientPath, 'document/detail.ejs'))
});
app.get('/document/list', (req, res) => {
    res.render(path.join(ClientPath, 'document/list.ejs'))
});
app.post('/auth/login', (req, res) => {
    
    const useremail = req.body.useremail;
    const password = req.body.password;
    const sql = 'select * from login where email=?';
    const post = [useremail];

    connection.query(sql, post, (err, results, fields) => {
        if (err) {
            res.send('<script type="text/javascript">alert("아이디가 없습니다.");history.back();</script>');
            console.log(err);
        } else {
            if (fields.length===0) {
                res.send('<script type="text/javascript">alert("아이디가 없습니다.");history.back();</script>');
            }
            if (results[0].password === password) {
                req.session.displayName = useremail;
                req.session.userName = results[0].name;
                req.session.userPri = results[0].pri;
                res.redirect('/');
            } else {
                res.send('<script type="text/javascript">alert("패스워드 불일치");history.back();</script>');
            }
        }

    });
});

app.get("/logout",(req,res)=>{
    delete req.session.displayName;
    res.redirect('/');
});

app.listen(port, function (err) {
    if (err) console.log(err);
    console.log(`listening on ${port}`);
})


