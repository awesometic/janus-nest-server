# Janus Nest Server

## Janus project

A smart time and attendance management system that uses BLE beacons and a mobile phone.

If a detecting device enters a location that the beacons are placed at least three, the device reads how far each beacon is and calculates where the device is in place.

The detecting device, a mobile phone generally, sends every entrance and exit log to the server and the server gathers all of the data and can provide them the useable information via its website or the mobile app.

## How to run this project

Simply, with the modern Node.js environment you can run and test this project.

### Install the dependencies

```bash
yarn install && npm install --no-package-lock --no-save @adminjs/express
```

### Run it

```bash
yarn start:dev
```

## Contributing

If you want to make a commit, you have to do preparing the husky scripts by using the following command.

```bash
yarn prepare
```

## Database Entity Relationship Diagram

> This ERD figure is needed to be edit, by the TypeORM generates

Click here to see: [Current database ERD](docs/resources/janus_project_erd.png)

The generated tables by the TypeORM entities.

```none
MariaDB [janus]> show tables;
+------------------+
| Tables_in_janus  |
+------------------+
| beacon           |
| department       |
| entrance         |
| permission       |
| place            |
| user             |
| user_place_place |
+------------------+
7 rows in set (0.003 sec)

MariaDB [janus]> desc beacon;
+------------+------------------+------+-----+---------+----------------+
| Field      | Type             | Null | Key | Default | Extra          |
+------------+------------------+------+-----+---------+----------------+
| id         | int(10) unsigned | NO   | PRI | NULL    | auto_increment |
| macAddress | varchar(17)      | NO   |     | NULL    |                |
| uuid       | varchar(32)      | NO   |     | NULL    |                |
| major      | varchar(4)       | NO   |     | NULL    |                |
| minor      | varchar(4)       | NO   |     | NULL    |                |
| threshold  | int(10) unsigned | NO   |     | NULL    |                |
+------------+------------------+------+-----+---------+----------------+
6 rows in set (0.009 sec)

MariaDB [janus]> desc department;
+-------+------------------+------+-----+---------+----------------+
| Field | Type             | Null | Key | Default | Extra          |
+-------+------------------+------+-----+---------+----------------+
| id    | int(10) unsigned | NO   | PRI | NULL    | auto_increment |
| name  | varchar(20)      | NO   | UNI | NULL    |                |
+-------+------------------+------+-----+---------+----------------+
2 rows in set (0.008 sec)

MariaDB [janus]> desc entrance;
+------------+------------------+------+-----+---------------------+----------------+
| Field      | Type             | Null | Key | Default             | Extra          |
+------------+------------------+------+-----+---------------------+----------------+
| id         | int(10) unsigned | NO   | PRI | NULL                | auto_increment |
| accessTime | datetime         | NO   |     | current_timestamp() |                |
| userId     | int(10) unsigned | YES  | MUL | NULL                |                |
+------------+------------------+------+-----+---------------------+----------------+
3 rows in set (0.012 sec)

MariaDB [janus]> desc permission;
+--------------+------------------+------+-----+---------+----------------+
| Field        | Type             | Null | Key | Default | Extra          |
+--------------+------------------+------+-----+---------+----------------+
| id           | int(10) unsigned | NO   | PRI | NULL    | auto_increment |
| name         | varchar(20)      | NO   |     | NULL    |                |
| level        | int(2) unsigned  | NO   |     | NULL    |                |
| departmentId | int(10) unsigned | YES  | MUL | NULL    |                |
+--------------+------------------+------+-----+---------+----------------+
4 rows in set (0.004 sec)

MariaDB [janus]> desc place;
+----------+------------------+------+-----+---------+----------------+
| Field    | Type             | Null | Key | Default | Extra          |
+----------+------------------+------+-----+---------+----------------+
| id       | int(10) unsigned | NO   | PRI | NULL    | auto_increment |
| name     | varchar(20)      | NO   |     | NULL    |                |
| location | point            | NO   |     | NULL    |                |
| beaconId | int(10) unsigned | YES  | MUL | NULL    |                |
+----------+------------------+------+-----+---------+----------------+
4 rows in set (0.003 sec)

MariaDB [janus]> desc user;
+---------------+------------------+------+-----+---------------------+----------------+
| Field         | Type             | Null | Key | Default             | Extra          |
+---------------+------------------+------+-----+---------------------+----------------+
| id            | int(10) unsigned | NO   | PRI | NULL                | auto_increment |
| email         | varchar(64)      | NO   | UNI | NULL                |                |
| name          | varchar(32)      | NO   |     | NULL                |                |
| password      | varchar(32)      | NO   |     | NULL                |                |
| createTime    | datetime         | NO   |     | current_timestamp() |                |
| lastLoginTime | datetime         | NO   |     | current_timestamp() |                |
| departmentId  | int(10) unsigned | YES  | MUL | NULL                |                |
| permissionId  | int(10) unsigned | YES  | MUL | NULL                |                |
| verifyToken   | varchar(36)      | NO   |     | NULL                |                |
| status        | tinyint(4)       | NO   |     | 1                   |                |
+---------------+------------------+------+-----+---------------------+----------------+
10 rows in set (0.021 sec)

MariaDB [janus]> desc user_place_place;
+---------+------------------+------+-----+---------+-------+
| Field   | Type             | Null | Key | Default | Extra |
+---------+------------------+------+-----+---------+-------+
| userId  | int(10) unsigned | NO   | PRI | NULL    |       |
| placeId | int(10) unsigned | NO   | PRI | NULL    |       |
+---------+------------------+------+-----+---------+-------+
2 rows in set (0.003 sec)
```

## Todos

### Environment

- [ ] NestJS API server
- [x] MariaDB RDBMS on my development device
- [x] BLE beacons, at least three
- [ ] A mobile app that detects BLE beacons and communicates to the API server
- [ ] Place the API server and the database on my personal server and connect my domain address

### Features

- [ ] As much as the previous project could do
- TBD

### Plan

- [x] Write an entity relationship diagram for the database
- [x] Connection between the API server and the database
- [ ] Open some simple Restful API endpoints
  - [x] Implement CRUD for each component
  - [x] Implement email verifying process
  - [ ] Implement sign-in, sign-out using passport
  - [x] Apply CQRS
  - [x] Apply Jest, partly :sweat_smile:
- [ ] Create a simple mobile app that can send a message to the API server
- [ ] Detect all the three beacons using the mobile app and send a message to the API server
- [ ] Implement set a location for the entry point of a place
- [ ] Implement interfaces for managing places, beacons, accounts, permissions, departments on the mobile app
- [ ] Data visualization
- TBD

## Successor of the old gradutaion project

This project is a successor of [my old graduation project](https://github.com/awesometic/207lab_iot_project).

It was working very well as our team expected and I thought that it'd be so interesting if I can work on this project again. But with my 5-years-later eyes, the old code is really spaghettied so I gave up maintaining the existing codes. It led me to start a new project. :sweat_smile:

I believe it can be a really good chance to study modern **Node.js** with **NestJS**, **Typescript (ES6+)** and **TypeORM**. :smile:

This project is made just **for fun**. Hope I would finish this big project again.

## License

This project is licensed under the [MIT license](/LICENSE).
