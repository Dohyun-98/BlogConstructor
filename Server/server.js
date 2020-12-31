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

app.get('/intro/introduce', (req, res) => {
    if(req.session.displayName){
        res.render(path.join(ClientPath, 'intro/lg-introduce.ejs'),{user:req.session.userName , pri:req.session.userPri });
    }else{
     res.render(path.join(ClientPath, 'intro/introduce.ejs'));
    }
});

app.get('/member/myinfo', (req, res) => {
    if(req.session.displayName){
        res.render(path.join(ClientPath, 'member/lg-myinfo.ejs'),{user:req.session.userName , pri:req.session.userPri });
    }else{
     res.render(path.join(ClientPath, 'member/myinfo.ejs'));
    }
});
app.get('/member/sign-up-info', (req, res) => {
    if(req.session.displayName){
        res.render(path.join(ClientPath, 'member/lg-sign-up-info.ejs'),{user:req.session.userName , pri:req.session.userPri });
    }else{
        res.render(path.join(ClientPath, 'member/sign-up-info.ejs'));
    }
});
app.get('/notice/detail', (req, res) => {
    if(req.session.displayName){
        res.render(path.join(ClientPath, 'notice/lg-detail.ejs'),{user:req.session.userName , pri:req.session.userPri });
    }else{
        res.render(path.join(ClientPath, 'notice/detail.ejs'));
    }
});
app.get('/notice/list', (req, res) => {
    if(req.session.displayName){
        res.render(path.join(ClientPath, 'notice/lg-list.ejs'),{user:req.session.userName , pri:req.session.userPri });
    }else{
        res.render(path.join(ClientPath, 'notice/list.ejs'));
    }
    
});
app.get('/document/detail', (req, res) => {
    if(req.session.displayName){
        res.render(path.join(ClientPath, 'document/lg-detail.ejs'),{user:req.session.userName , pri:req.session.userPri });
    }else{
        res.render(path.join(ClientPath, 'document/detail.ejs'));
    }
   
});
app.get('/document/list', (req, res) => {
    if(req.session.displayName){
        res.render(path.join(ClientPath, 'document/lg-list.ejs'),{user:req.session.userName , pri:req.session.userPri });
    }else{
        res.render(path.join(ClientPath, 'document/list.ejs'));
    }
    
});
app.get('/admin/notice-writer',(req,res)=>{
    let Pri=req.session.userPri;
    if(Pri=='admin'){
    res.render(path.join(ClientPath, 'admin/notice-writer.ejs'),{user:req.session.userName , pri:req.session.userPri });
    }else{
        res.send('<script type="text/javascript">alert("권한이 없습니다.");history.back();</script>');
        
    }
})
app.post('/auth/login', (req, res) => {
    
    let useremail = req.body.useremail;
    let password = req.body.password;
    let sql = 'select * from login where email=?';
    

    connection.query(sql, [useremail], function(error, results,fields){
        if (error) {
           //console.log(error);
           res.send({
            "code" : 400,
            "failed": "error ocurred"
        });
        return;
        } else {
            if (!results[0]) {
                res.send('<script type="text/javascript">alert("아이디가 없습니다.");history.back();</script>');
                return;
            }
            if (results[0].password === password) {
                req.session.displayName = useremail;
                req.session.userName = results[0].name;
                req.session.userPri = results[0].pri;
                res.send('<script type="text/javascript">location.href = document.referrer;</script>');
                return;
            } else {
                res.send('<script type="text/javascript">alert("패스워드 불일치");history.back();</script>');
                return;
            }
        }

    });
});

app.get("/logout",(req,res)=>{
    delete req.session.displayName;
    delete req.session.userPri;
    res.send('<script type="text/javascript">location.href = document.referrer;</script>');
});

app.listen(port, function (err) {
    if (err) console.log(err);
    console.log(`listening on ${port}`);
})


