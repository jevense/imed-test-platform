CREATE TABLE `ca_t_human` (
  `caId` varchar(36) NOT NULL,
  `roles` varchar(500) DEFAULT NULL,
  `instituteNumber` varchar(1000) DEFAULT NULL,
  `account` varchar(50) DEFAULT NULL,
  `pwd` varchar(100) DEFAULT NULL,
  `pwd2` varchar(100) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `identificationNumber` varchar(50) DEFAULT NULL,
  `cellphone` varchar(20) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `genderCode` varchar(50) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `comments` varchar(2000) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `frozen` tinyint(4) DEFAULT '0',
  `deletedByInstitute` tinyint(4) DEFAULT '0',
  `createTime` datetime DEFAULT NULL COMMENT '创建时间',
  `modifiedDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `lockedUntil` datetime DEFAULT NULL COMMENT '锁定截至时间',
  PRIMARY KEY (`caId`),
  UNIQUE KEY `human_unique_account` (`account`),
  UNIQUE KEY `human_unique_email` (`email`) USING BTREE,
  UNIQUE KEY `human_unique_idNum` (`identificationNumber`) USING BTREE,
  UNIQUE KEY `human_unique_cellphone` (`cellphone`) USING BTREE,
  KEY `FK_human_gender` (`genderCode`),
  CONSTRAINT `FK_human_gender` FOREIGN KEY (`genderCode`) REFERENCES `ca_t_gender` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `ca_t_human` (`caId`, `roles`, `instituteNumber`, `account`, `pwd`, `pwd2`, `email`, `identificationNumber`, `cellphone`, `name`, `genderCode`, `birthday`, `comments`, `deleted`, `frozen`, `deletedByInstitute`, `createTime`, `modifiedDate`, `lockedUntil`)
VALUES
	('00001f3aaf5b42f3a8fa0a3409dfl810', '00080', 'VO000000002', NULL, '670b14728ad9902aecba32e22fa4f6bd', NULL, NULL, NULL, '13614319996', '钱风华', NULL, NULL, '张振飞 申请试用', 0, 0, 0, NULL, '2018-03-22 14:51:57', NULL),
	('00001f3aaf5b42f3a8fa0a45gh28421', NULL, 'VO000000002', NULL, '670b14728ad9902aecba32e22fa4f6bd', NULL, NULL, NULL, '18600035107', NULL, NULL, NULL, '张振飞 申请试用', 0, 0, 0, NULL, '2017-11-20 16:10:18', NULL),
	('00001f3aaf5b42f3a8fa0a4692sd98l3', NULL, 'WTB120104001', NULL, '670b14728ad9902aecba32e22fa4f6bd', NULL, NULL, NULL, '18630965613', '韩晶', NULL, NULL, '唐良 申请试用', 0, 0, 0, NULL, '2017-11-09 20:25:39', NULL),
	('00001f3aaf5b42f3a8fa0a7694hh816', NULL, 'WTB371702001', NULL, '670b14728ad9902aecba32e22fa4f6bd', NULL, NULL, NULL, '18653015636', '张全忠', NULL, NULL, '白海淘 申请长期有效', 0, 0, 0, NULL, '2017-11-14 11:01:16', NULL),
	('00001f3aaf5b42f3a8fa0ac34kdf78b2', NULL, 'VO000000002', NULL, '670b14728ad9902aecba32e22fa4f6bd', NULL, NULL, NULL, '13818518517', '张菲菲', NULL, NULL, '骆汉 上海复旦大学附属妇产科医院 试用', 0, 0, 0, NULL, '2017-11-20 16:10:18', NULL),
	('00001f3aaf5b42f3a8fa0ac53fgl98f42', NULL, 'VO000000002', NULL, '670b14728ad9902aecba32e22fa4f6bd', NULL, NULL, NULL, '13817880677', '陆烨敏', NULL, NULL, '骆汉 上海复旦大学附属妇产科医院 试用', 0, 0, 0, NULL, '2017-11-20 16:10:18', NULL),
	('00001f3aaf5b42f3a8fa0ac575kjf40f1', NULL, 'VO000000002', NULL, '670b14728ad9902aecba32e22fa4f6bd', NULL, NULL, NULL, '18610609711', '刘晓玲', NULL, NULL, '推动电子教材在清华医学院落地', 0, 0, 0, NULL, '2017-11-20 16:10:18', NULL),
	('00001f3aaf5b42f3a8fa0ac5f6d837ab', NULL, 'VO000000002', NULL, '670b14728ad9902aecba32e22fa4f6bd', NULL, NULL, NULL, '18642581565', NULL, NULL, NULL, NULL, 0, 0, 0, NULL, '2017-11-20 16:10:18', NULL),
	('00001f3aaf5b42f3a8fa0b5932dp928', NULL, 'WTB371702001', NULL, '670b14728ad9902aecba32e22fa4f6bd', NULL, NULL, NULL, '15668228565', '田桂荣 ', NULL, NULL, '白海淘 申请长期有效', 0, 0, 0, NULL, '2017-11-14 11:57:17', NULL),
	('000039c08a3e4f2b84b9ac6151eab2aa', '00080', 'VO000000002', '538505622', '670b14728ad9902aecba32e22fa4f6bd', '8171d3acac7ce84300fec0d6c13ed445', NULL, NULL, '18049548955', NULL, '9', NULL, NULL, 0, 0, 0, NULL, '2017-11-20 16:10:18', NULL),
	('00005cbcb27c4a26ad6161730a4724e4', '00080', 'WTB460106003', '978192700', '670b14728ad9902aecba32e22fa4f6bd', '390e736d464c3a98c58931ed54f49a89', NULL, '452124199303052127', '13876155900', '韦滋程', '9', NULL, NULL, 0, 0, 0, NULL, '2017-11-20 16:10:18', NULL),
	('00006e42283848feb723613988645b4f', '00080', 'WTB440104003', '852463843', '670b14728ad9902aecba32e22fa4f6bd', 'b5be2e29a9f0c643450343d482994d0f', NULL, '441283199008183995', '18211425966', '赵浚乐', '9', NULL, NULL, 0, 0, 0, NULL, '2017-11-20 16:10:18', NULL),
	('0000a8ef2bb14bf692320de4c2ae7f8b', NULL, 'MC410202002', NULL, '670b14728ad9902aecba32e22fa4f6bd', NULL, NULL, '412825199708302837', '18737816331', '刘彬彬', NULL, NULL, '20170926导入账户试用书包', 0, 0, 0, NULL, '2017-11-20 16:10:18', NULL),
	('0000e0eb670842b49148f0b61b22b51d', '00080', 'OTHER110105005', '18789163706', '670b14728ad9902aecba32e22fa4f6bd', '28f6302b9746277052de90a524253f71', NULL, NULL, '18789163706', '其他1', '9', NULL, NULL, 0, 0, 0, NULL, '2017-12-28 14:27:54', '2017-12-28 18:37:16'),
	('000104d87fd243bb994b48f02a999678', '00080', 'CTB530102004', '554039005', '670b14728ad9902aecba32e22fa4f6bd', '446e00f0a42f62c3dcc05a7268cb80d4', NULL, NULL, '13638868406', NULL, '9', NULL, NULL, 0, 0, 0, NULL, '2017-11-20 16:10:18', NULL),
	('0001409d08434eb8a0bfa7da6e608ae2', '00080', 'WTB440105001', '627541219', '670b14728ad9902aecba32e22fa4f6bd', '1cdd0aaf7ece2277ccd0001cfe606d26', NULL, NULL, '15202066010', NULL, '9', NULL, NULL, 0, 0, 0, NULL, '2017-11-20 16:10:18', NULL),
	('000193fe77ea4662ab35e3d9e50c85a0', '00080', 'WTB230101001', '911268400', '670b14728ad9902aecba32e22fa4f6bd', '05f6c201a772ddfd818a620a3780a4a7', NULL, NULL, '15945888408', NULL, '9', NULL, NULL, 0, 0, 0, NULL, '2017-11-20 16:10:18', NULL),
	('00019ef1d82f4799b9fa9aab7d98783f', '00080', 'VO000000002', '411084254', '670b14728ad9902aecba32e22fa4f6bd', '3d42744f016fc74196fcd33ba18fa5af', '2282700506@qq.com', NULL, NULL, NULL, '9', NULL, NULL, 0, 0, 0, NULL, '2017-11-20 16:10:18', NULL),
	('000251afa41b4d639e2f5f4199ffaccd', '00080', 'MC210113001', '846323015', '670b14728ad9902aecba32e22fa4f6bd', 'fa99bba97f975c79fddb2e188519eae8', NULL, NULL, '13998896385', '陈玉双', '2', NULL, NULL, 0, 0, 0, NULL, '2017-11-20 16:10:18', NULL),
	('0002969e61ba47fa9834f3633a3f5155', '00080', 'WTB620102003', '208356682', '670b14728ad9902aecba32e22fa4f6bd', 'abe52db21d77c2c5e6a88203a461a483', NULL, '622726199211160021', '15337038031', '柳乐乐', '2', NULL, NULL, 0, 0, 0, NULL, '2017-11-20 16:10:18', NULL),
	('0002a9020840424c8edf4b7f7500d767', '00080', 'VO000000002', '848255845', '670b14728ad9902aecba32e22fa4f6bd', NULL, NULL, NULL, NULL, NULL, '9', NULL, NULL, 0, 0, 0, NULL, '2017-11-20 16:10:18', NULL),
	('0002c04e66e349069b7cb7de027eeb14', NULL, 'VO000000002', NULL, '670b14728ad9902aecba32e22fa4f6bd', NULL, NULL, NULL, '18990512779', NULL, NULL, NULL, NULL, 0, 0, 0, NULL, '2017-11-20 16:10:18', NULL),
	('0002e181c8ac4fa797fd12e7fedf8473', '00080', 'MC210113001', '946420125', '670b14728ad9902aecba32e22fa4f6bd', 'e48bd9740cf3f5d5e20258412a3b81b4', NULL, NULL, '18842418106', '家峥', '2', NULL, NULL, 0, 0, 0, NULL, '2017-11-20 16:10:18', NULL),
	('0002f96f45e943beb699f39d45816139', '00080', 'CTB440112005', '169456784', '670b14728ad9902aecba32e22fa4f6bd', '518f78f5ba568ef70e861e9effb5245d', NULL, '310114199106163842', '13120753527', '张婷婷', '9', NULL, NULL, 0, 0, 0, NULL, '2017-11-20 16:10:18', NULL),
	('00031e8abac14b638a9a1f6adf7f4041', '00080', 'CTB320902002', '045620786', '670b14728ad9902aecba32e22fa4f6bd', '6b932d31f83e1d57aa797f48c26005ea', NULL, NULL, '15751480178', NULL, '9', NULL, NULL, 0, 0, 0, NULL, '2017-11-20 16:10:18', NULL),
	('00032e405723417292c743bad5d59440', '00080', 'VO000000002', '304110343', '670b14728ad9902aecba32e22fa4f6bd', NULL, NULL, NULL, NULL, NULL, '9', NULL, NULL, 0, 0, 0, NULL, '2017-11-20 16:10:18', NULL);
