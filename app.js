//app.js 服务器端程序
//1:下载三个模块 
//  cors            完成跨域处理
//  express-session session对象
//  mysql           数据库驱动
//  express         web服务器
//下载命令在线  
//npm i cors express-session express  mysql
//2:将以上四个模块引入到当程序
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const session = require("express-session");
//3:创建数据库连接池(池 提高效率)
var pool = mysql.createPool({
    host: "w.rdc.sae.sina.com.cn", //数据库地址
    user: "l13o1jwn30", //数据库用户名
    password: "1xlmw0l01m4wmllhhhwylxii5yijl0j34kzj124l", //数据库密码
    port: 3306, //数据库端口
    database: "app_guigui", //库名
    connectionLimit: 15 //15连接
})
// var pool = mysql.createPool({
//     host: "127.0.0.1", //数据库地址
//     user: "root", //数据库用户名
//     password: "", //数据库密码
//     port: 3306, //数据库端口
//     database: "guike", //库名
//     connectionLimit: 15 //15连接
// })
//4:配置跨域模块
//  允许哪个程序跨域访问服务器
//  脚手架:5050 允许5050访问我
//  服务器:4000 你
var server = express();
server.use(cors({
    //允许程序列表
    origin: ["http://127.0.0.1:5050", "http://localhost:5050",],
    credentials: true //每次请求需要验证
}))
//5:配置session模块?????????
server.use(session({
    secret: "128位字符串", //安全字符串
    resave: true, //请求时更新数据
    saveUninitialized: true //保存初始数据
}))
//6:配置项目静态目录 public
server.use(express.static("public"))
//7:创建express对象绑定4000端口
server.listen(4000);
server.get("/login", (req, res) => {
    var uid;
    //(1)获取脚手架参数 uname upwd
    var uname = req.query.uname;
    var upwd = req.query.upwd;
    //(2)创建sql语句查询
    var sql = "SELECT uid FROM guike_user WHERE user_name = ? AND user_pwd = md5(?)";
    //(3)执行sql语句
    pool.query(sql, [uname, upwd], (err, result) => {
        if (err) throw err;
        //(4)获取执行结果
        //(5)判断查询是否成功 result.length
        if (result.length == 0) {
            res.send({
                code: -1,
                msg: "用户名或密码有误"
            })
        } else {
            uid = req.session.uid = result[0].uid;
            res.send({
                code: 1,
                msg: "登录成功",
                uid
            })
        }
        //(6)将结果返回脚手架
    })
})
//   http://127.0.0.1:4000/login?uname=yaya&upwd=222222
//   http://127.0.0.1:4000/login?uname=tom&upwd=123456 

//功能二：用户注册
server.get("/reg", (req, res) => {
    var uname = req.query.uname;
    var upwd = req.query.upwd;
    var phone = req.query.phone;
    var gender = req.query.gender;
    console.log(uname, upwd, phone, gender)
    var sql = "insert into guike_user values (null,?,md5(?),?,?)";
    pool.query(sql, [uname, upwd, phone, gender], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({ code: 1, msg: "注册成功！" })
        } else {
            res.send({ code: -1, msg: "注册失败" })
        }
    })
})

//获取用户信息
server.get("/getuser",(req,res)=>{
    var uid=req.query.uid;
    // var uid =req.session.uid;
    // if(!uid){
    //     return;
    // }
    var sql="select * from guike_user where uid=?";
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,msg:"查询成功",result});
        }else{
            res.send({code:-1,msg:"查无此人"});
        }
    })
})



//   http://127.0.0.1:4000/reg?uname=ssss&upwd=123456&phone=15512357678&gender=1 
server.get("/check", (req, res) => {
    var u = req.query.uname;
    console.log(u)
    var sql = "select uid from guike_user where user_name=?";
    pool.query(sql, [u], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({ code: 1, msg: "用户名已存在" })
            return;
        } else {
            res.send({ code: -1, msg: "用户名可用" })
        }
    })
})
//   http://127.0.0.1:4000/check?uname=tom

//功能三:分页显示商品列表
//1:接收GET /product 
server.get("/gongyu", (req, res) => {
    //2:接收二个参数 
    //  pno 页码 pagePageSize 页大小
    var pno = req.query.pno;
    var ps = req.query.pageSize;
    //3:设置默认值 pno=1 pageSize=6
    if (!pno) { pno = 1 }
    if (!ps) { ps = 4 }
    //4:计算第一问号值
    var off = (pno - 1) * ps;
    //5:对pageSize转int
    ps = parseInt(ps);
    //6:创建sql语句
    //自己写:库名;表名;列名 小写
    var sql = "SELECT hid,img,title,address,price FROM guike_house LIMIT ?,?";
    //7:执行sql语句
    pool.query(sql, [off, ps], (err, result) => {
        if (err) throw err;
        res.send({ code: 1, msg: "查询成功", data: result })
    })
    //8:将返回结果发送脚手架 
})
    //检测 83~104 复制 你app.js重新
    //启动 node app.js
    //http://127.0.0.1:4000/gongyu
    //http://127.0.0.1:4000/gongyu?pno=2


// 功能四:详情列表
// 1:接收GET /detail 
server.get("/detail",(req,res)=>{
        var obj={
            detail:"",
            hImg:""
        }
        var hid=req.query.hid;
        console.log(hid);
        Promise.all([
            new Promise((reslove,reject)=>{
                var sql1 ="SELECT title,address,price,leixing,huxing,louceng,mianji,chaoxiang FROM guike_house where hid=?";
                pool.query(sql1,[hid],(err,result)=>{
                    if(err) throw err;
                    obj.detail=result;
                    reslove();
                })
            }),
            new Promise((reslove,reject)=>{
                var sql2="SELECT hid,imgurl from guike_detail_pic where hid=?";
                pool.query(sql2,[hid],(err,result)=>{
                    if(err) throw err;
                    obj.hImg=result;
                    reslove();
                })
            })
        ]).then(()=>{
            res.send({code:1,msg:"查询成功",data:obj});
        })
    })

// 功能五:收藏功能
server.get("/addcart",(req,res)=>{
    //2.获取当前用户登录凭证 uid
    var uid=req.session.uid;
    //3.如果用户没有登录返回错误信息
    if(!uid){
        res.send({
            code:-1,
            msg:"请登录"
        });
        return;
    }
    //4.获取房屋编号/标题/地址/价格
    var uid=req.query.uid;
    var hid=req.query.hid;
    var img=req.query.img;
    var title=req.query.title;
    var address=req.query.address;
    var price=req.query.price;
    var sql1="select hid from guike_cart where uid=? and hid=?";
    var sql2 = "INSERT INTO guike_cart VALUES(?,1,?,?,?,?,?)";
    pool.query(sql1,[uid,hid],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:0,msg:"收藏夹里已有此商品"});
            return;
        }else{
            pool.query(sql2,[hid,img,title,address,price,uid],(err,result)=>{
                if(err) throw err;
                console.log(result);
                if(result.affectedRows>0){
                    res.send({code:1,msg:"添加成功"});
                    return;
                }else{
                    res.send({code:-1,msg:"添加失败"});
                    return;
                } 
            })
        }
    })
    
})

server.get("/showcart",(req,res)=>{
    var uid=req.session.uid;
    if(!uid){
        return;
    }
    var sql="select * from guike_cart where uid=?";
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,msg:"查询成功",result});
        }else{
            res.send({code:-1,msg:"查询失败"});
        }
    })
})



//功能五:删除一个指定购物车中商品
server.get("/del",(req,res)=>{
    //1:获取当前用户uid
    var uid = req.session.uid;
    var hid = req.query.hid;
    //2:如果没有uid提示
    if(!uid){return;}  
      //2:创建sql
      var sql = "DELETE FROM guike_cart WHERE uid = ? and hid=?";
      //3:执行
      pool.query(sql,[uid,hid],(err,result)=>{
        if(err)throw err; // affectedRows受影响的行
        if(result.affectedRows>0){
          res.send({code:1,msg:"取消成功"})
        }else{
          res.send({code:-1,msg:"取消失败"});
        }
      })
    });
