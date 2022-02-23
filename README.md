# Janus Nest Server

## Janus project

A smart time and attendance management system that uses BLE beacons and a mobile phone.

If a detecting device enters a location that the beacons are placed at least three, the device reads how far each beacon is and calculates where the device is in place.

The detecting device, a mobile phone generally, sends every entrance and exit log to the server and the server gathers all of the data and can provide them the useable information via its website or the mobile app.

## Database Entity Relationship Diagram

Click here to see: [Current database ERD](docs/resources/janus_project_erd.png)

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
