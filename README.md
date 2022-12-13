# ACS TIME TABLE

## Topic

- [Installation](#installation)
- [Frontend](#frontend)
- [Backend](#backend)
- [How to use](#how-to-use)
- [OOP Concept](#oop-concept)

# Installation

```
git clone https://github.com/tententgc/acs-timetable.git

cd acs-timetable

```

# Frontend

- Tool
  - React
  - MobX
  - Tailwind
  - and more...

## Frontend Setup

`Installation`

```bash
cd client
npm install
```

`Run`

```bash
npm start
```

will running on port 3000

<br/>
<br/>
<br/>
<br/>

# Backend

- Tool
  - Spring Boot JPA
  - Postgresql
  - JWT
  - Bcrypt

## Backend Setup

- สร้าง schema ใน database ชื่อ acs
  เปลี่ยนค่าต่าง ๆ ใน file application.properties ในไฟล์ `application.properties` ใน folder `server/src/main/resources` ให้เปลี่ยนค่าต่าง ๆ ให้ตรงกับค่าของ database ที่ใช้ โดยค่า default จะเป็น Schema ชื่อ Test ใน database postgres

```sql
create schema YOUR_SCHEMA_NAME;
```

- `สร้าง folder secret ใน path ต่อไปนี้`

```bash
cd server/src/main/java/com/oop/server
mkdir secret
cd secret
touch SecretKeyENV.java
```

- `ใน file SecretKeyENV.java ประกอบด้วย secretKey และ adminKey`

```java
package com.oop.server.secret;

public class SecretKeyENV {
public static String secretKey = "your custom";
public static String adminKey = "your custom";
}
```

### Folder Structure

```bash
src/
|____test
| |____java
| | |____com
| | | |____oop
| | | | |____server
| | | | | |____ServerApplicationTests.java
|____main
| |____resources
| | |____static
| | |____templates
| | |____application.properties
| |____java
| | |____com
| | | |____oop
| | | | |____server
| | | | | |____middleware
| | | | | | |____TokenHandler.java
| | | | | |____ServerApplication.java
| | | | | |____repository
| | | | | |____controller
| | | | | |____model
| | | | | |____secret
```

- Folder `Middleware` จะเก็บ middleware ต่างๆเอาไว้จัดการกับ request เช่น Token Handle.

- Folder `Repository` จะเก็บการ Connection กับ database เช่น คำสั่งที่ใช้ในการ query.

- Folder `Controller` จะเก็บการจัดการกับ request ที่เข้ามาจาก client และส่ง response กลับไป.

  - สามารถดู API ต่าง ๆ ได้ผ่าน file API.txt

- Folder `Model` จะเก็บ model entity ต่างๆที่ใช้ในการเก็บข้อมูล.

- Folder `Secret` จะเก็บ secret key ต่างๆที่ใช้ในการเข้าถึงข้อมูล.

<br/>
<br/>
<br/>
<br/>

# How to use

- สามารถดูวิธีการใช้งานได้ที่ [Click here](youtube...)

<br/>
<br/>
<br/>
<br/>

# OOP Concept
