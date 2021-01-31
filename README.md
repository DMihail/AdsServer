# AdsServer

# Install

Download from repository using git or archive

# Presetting


1. Install npm packages using command:

     `npm install`

2. Create a new local mysql database called "Ads Server".
3. Create table "users" using command 

    `CREATE TABLE IF NOT EXISTS users (
    id int primary key auto_increment,
    name varchar(255) not null,
    email nvarchar(255) not null unique,
    password nvarchar(255) not null,
    phone nvarchar(255) not null
    );`

4. Create table "items" using command
       `CREATE TABLE IF NOT EXISTS items (
       id int primary key auto_increment,
       created_at timestamp not null,
       title varchar(255) not null,
       price float not null,
       image nvarchar(255) not null,
       user_id int not null,
       FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE );`
   
5. Create "images" folder in "public" folder if it is not available.


# Server start

Start the server with the command:

`npm run start` or
     
`node app.js`
