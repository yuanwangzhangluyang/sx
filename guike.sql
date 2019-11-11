#设置客户端连接服务器端编码
SET NAMES UTF8;
#丢弃数据库，如果存在的话
DROP DATABASE IF EXISTS guike;
#创建数据库，设置编码
CREATE DATABASE guike CHARSET=UTF8;
#进入创建的数据库
USE guike;


/**用户信息**/
CREATE TABLE guike_user(
  uid INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(32),#用户名，如王小明
  user_pwd VARCHAR(32),
  phone VARCHAR(16) NOT NULL UNIQUE,
  gender INT #性别 0-女 1-男
);


/**房屋**/
CREATE TABLE guike_house(
  hid INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  img VARCHAR(128),
  title VARCHAR(50) NOT null,
  address VARCHAR(50) NOT null,
  price DECIMAL(8,2),
  leixing VARCHAR(10),
  huxing VARCHAR(10),
  louceng VARCHAR(10),
  mianji VARCHAR(10),
  chaoxiang VARCHAR(10)
);

/**收藏详情**/
CREATE TABLE guike_cart(
  hid INT PRIMARY KEY,
  count INT,
  img VARCHAR(128),
  title VARCHAR(50) NOT null,
  address VARCHAR(50) NOT null,
  price DECIMAL(8,2),
  uid int
 );
ALTER TABLE guike_cart ADD uid INT;

/**房间详情照片**/
CREATE TABLE guike_detail_pic(
  hid INT NOT NULL,
  imgurl VARCHAR(128)
);


/*******************/
/******数据导入******/
/*******************/
/**用户信息**/
INSERT INTO guike_user VALUES(1,'tom',md5('123456'),'13800000000',1);
INSERT INTO guike_user VALUES(2,'dingding',md5('111111'),'13811111111',0);
INSERT INTO guike_user VALUES(3,'yaya',md5('222222'),'13822222222',1);
INSERT INTO guike_user VALUES(4,'lingling',md5('333333'),'13833333333',0);
INSERT INTO guike_user VALUES(5,'dandan',md5('444444'),'13855555555',0);


/**房屋信息**/
INSERT INTO guike_house VALUES(1,'gongyu/1.jpg','别树一阁','第八大街与京北路东400米路东',1800,'整租','标间',5,50,'南');
INSERT INTO guike_house VALUES(2,'gongyu/2.jpg','藏宝海湾','十里铺街南113号',2080,'整租','两室一厅',19,88,'南');
INSERT INTO guike_house VALUES(3,'gongyu/3.jpg','东窗思雨','平安大道西大街南10号',1660,'整租','标间',7,50,'南');
INSERT INTO guike_house VALUES(4,'gongyu/4.jpg','伐木累','西湖大道城东路往南100米',2500,'整租','两室一厅',16,100,'南');
INSERT INTO guike_house VALUES(5,'gongyu/5.jpg','旮沓小屋','东湖大道湖西路往南100米',1900,'整租','标间',9,60,'南');
INSERT INTO guike_house VALUES(6,'gongyu/6.jpg','及时雨','来宾路建设路156号',1880,'整租','标间',10,50,'南');
INSERT INTO guike_house VALUES(7,'gongyu/7.jpg','蓝色海岸','迎宾大道湖西路往南100米',1700,'整租','标间',12,50,'南');
INSERT INTO guike_house VALUES(8,'gongyu/8.jpg','莱茵小驻','桐柏路农业路往南100米',1500,'整租','标间',15,50,'南');
INSERT INTO guike_house VALUES(9,'gongyu/9.jpg','苏格拉底','文化路金水路99号',1580,'整租','标间',20,50,'南');
INSERT INTO guike_house VALUES(10,'gongyu/1.jpg','别树一阁','第八大街与京北路东400米路东',1800);
INSERT INTO guike_house VALUES(11,'gongyu/2.jpg','藏宝海湾','十里铺街南113号',2080,'整租','标间',5,50,'南');
INSERT INTO guike_house VALUES(12,'gongyu/3.jpg','东窗思雨','平安大道西大街南10号',1660,'整租','标间',5,50,'南');
INSERT INTO guike_house VALUES(13,'gongyu/4.jpg','伐木累','西湖大道城东路往南100米',2500,'整租','标间',5,50,'南');
INSERT INTO guike_house VALUES(14,'gongyu/5.jpg','旮沓小屋','东湖大道湖西路往南100米',1900,'整租','标间',5,50,'南');
INSERT INTO guike_house VALUES(15,'gongyu/6.jpg','及时雨','来宾路建设路156号',1880,'整租','标间',5,50,'南');
INSERT INTO guike_house VALUES(16,'gongyu/7.jpg','蓝色海岸','迎宾大道湖西路往南100米',1700,'整租','标间',5,50,'南');
INSERT INTO guike_house VALUES(17,'gongyu/8.jpg','莱茵小驻','桐柏路农业路往南100米',1500,'整租','标间',5,50,'南');
INSERT INTO guike_house VALUES(18,'gongyu/9.jpg','苏格拉底','文化路金水路99号',1580,'整租','标间',5,50,'南');



/**房间详情照片**/
INSERT INTO guike_detail_pic VALUES(1,'detail/lunbo1/1.jpg');
INSERT INTO guike_detail_pic VALUES(1,'detail/lunbo1/2.jpg');
INSERT INTO guike_detail_pic VALUES(1,'detail/lunbo1/3.jpg');
INSERT INTO guike_detail_pic VALUES(1,'detail/lunbo1/4.jpg');
INSERT INTO guike_detail_pic VALUES(2,'detail/lunbo2/1.jpg');
INSERT INTO guike_detail_pic VALUES(2,'detail/lunbo2/2.jpg');
INSERT INTO guike_detail_pic VALUES(2,'detail/lunbo2/3.jpg');
INSERT INTO guike_detail_pic VALUES(2,'detail/lunbo2/4.jpg');
INSERT INTO guike_detail_pic VALUES(3,'detail/lunbo3/1.jpg');
INSERT INTO guike_detail_pic VALUES(3,'detail/lunbo3/2.jpg');
INSERT INTO guike_detail_pic VALUES(3,'detail/lunbo3/3.jpg');
INSERT INTO guike_detail_pic VALUES(3,'detail/lunbo3/4.jpg');
INSERT INTO guike_detail_pic VALUES(4,'detail/lunbo4/1.jpg');
INSERT INTO guike_detail_pic VALUES(4,'detail/lunbo4/2.jpg');
INSERT INTO guike_detail_pic VALUES(4,'detail/lunbo4/3.jpg');
INSERT INTO guike_detail_pic VALUES(4,'detail/lunbo4/4.jpg');
INSERT INTO guike_detail_pic VALUES(5,'detail/lunbo5/1.jpg');
INSERT INTO guike_detail_pic VALUES(5,'detail/lunbo5/2.jpg');
INSERT INTO guike_detail_pic VALUES(5,'detail/lunbo5/3.jpg');
INSERT INTO guike_detail_pic VALUES(5,'detail/lunbo5/4.jpg');
