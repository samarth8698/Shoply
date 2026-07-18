# 🗄️ Shoply Database

This folder contains the **MySQL database** used by the **Shoply Full Stack E-Commerce Application**.

The database stores all application data including users, products, orders, payments, reviews, and wishlists.



# 📁 Database File:-

Database
│
├── shoply.sql
└── README.md




# 🗃️ Database Overview:-

The database is built using **MySQL** and is used by the Spring Boot backend through **Spring Data JPA**.



# 📦 Main Database Modules:-

- Users
- Products
- Orders
- Payments
- Reviews
- Wishlist



# ⚙️ Requirements:-

- MySQL 8.x
- MySQL Workbench (Optional)
- Spring Boot Backend



# 🚀 Database Setup:-

## 1. Create Database:-

    sql:-
CREATE DATABASE Shoply;



## 2. Select Database:

   sql:-
USE Shoply;



## 3. Import SQL File:-

  Using MySQL Command Line:-
mysql -u root -p Shoply < shoply.sql

Or import **shoply.sql** using **MySQL Workbench**.



# ⚙️ Spring Boot Configuration:-

   Update the database configuration inside:-
Backend/Shoply-Backend/src/main/resources/application.properties


Example:-

   properties:-
spring.datasource.url=jdbc:mysql://localhost:3306/Shoply
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true




# 📊 Database Architecture:-

React Frontend
       │
REST APIs
       │
Spring Boot Backend
       │
Spring Data JPA
       │
MySQL Database




# 📌 Database Features:-

- User Information
- Product Records
- Order Management
- Payment Records
- Wishlist Data
- Product Reviews
- Secure Data Storage
- Relational Database Design



# 🔄 Backup:-

   To export the database:-
mysqldump -u root -p Shoply > shoply.sql


  To restore the database:-
mysql -u root -p Shoply < shoply.sql


  # 👨‍💻 Developer:-
**Samarth Adhao**

  GitHub:-
https://github.com/samarth8698

