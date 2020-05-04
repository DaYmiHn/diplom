BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS `package` (
	`id`	INTEGER PRIMARY KEY AUTOINCREMENT,
	`name`	TEXT,
	`email`	TEXT,
	`address_A`	TEXT,
	`address_B`	TEXT,
	`cost`	INTEGER,
	`options`	TEXT,
	`startTime`	TEXT,
	`fast`	TEXT
);
INSERT INTO `package` (id,name,email,address_A,address_B,cost,options,startTime,fast) VALUES (1,'1','1','123','23',23,'kuj','324','234');
COMMIT;
