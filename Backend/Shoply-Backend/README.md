# 🛒 Shoply Backend

A powerful RESTful backend for the **Shoply E-Commerce Application** built using **Spring Boot**, **Spring Security (JWT)**, **Spring Data JPA**, and **MySQL**.

The backend handles authentication, product management, orders, payments, reviews, wishlist, user management, and email notifications through secure REST APIs.



# 🚀 Features:-

## 🔐 Authentication:-

- JWT Authentication
- User Registration
- User Login
- Forgot Password
- OTP Verification
- Reset Password
- Change Password



## 🛍️ Product Management:-

- Add Product
- Update Product
- Delete Product
- View Products
- Product Details



## 📦 Order Management:-

- Place Order
- View Orders
- Order Tracking
- Order Status Updates



## ❤️ Wishlist:-

- Add to Wishlist
- Remove from Wishlist
- View Wishlist



## ⭐ Product Reviews:-

- Add Review
- View Reviews
- Product Ratings



## 💳 Payment:-

- Razorpay Payment Integration
- Payment Verification
- Payment Records

:-

## 👤 User Management:-

- User Profile
- Update Profile
- Change Password



## 📧 Email Service:-

- OTP Email
- Password Reset Email
- Order Notification Support



# 🛠️ Technologies Used:-

- Java 17
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- Maven
- JWT
- Razorpay SDK
- MySQL



# 📂 Project Structure:-

Shoply-Backend
│
├── src
│   ├── main
│   │
│   ├── java
│   │   └── com.shoply
│   │       │
│   │       ├── ShoplyBackendApplication.java
│   │       │
│   │       ├── config
│   │       │   ├── RazorpayConfig.java
│   │       │   └── SecurityConfig.java
│   │       │
│   │       ├── controller
│   │       │   ├── AuthController.java
│   │       │   ├── OrderController.java
│   │       │   ├── PaymentController.java
│   │       │   ├── ProductController.java
│   │       │   ├── ReviewController.java
│   │       │   ├── UserController.java
│   │       │   └── WishlistController.java
│   │       │
│   │       ├── dto
│   │       │   ├── AuthResponse.java
│   │       │   ├── ChangePasswordRequest.java
│   │       │   ├── ForgotPasswordRequest.java
│   │       │   ├── LoginRequest.java
│   │       │   ├── PaymentVerificationRequest.java
│   │       │   ├── ResetPasswordRequest.java
│   │       │   ├── SignupRequest.java
│   │       │   └── VerifyOtpRequest.java
│   │       │
│   │       ├── entity
│   │       │   ├── Order.java
│   │       │   ├── Payment.java
│   │       │   ├── Product.java
│   │       │   ├── Review.java
│   │       │   ├── Role.java
│   │       │   ├── User.java
│   │       │   └── Wishlist.java
│   │       │
│   │       ├── repository
│   │       │   ├── OrderRepository.java
│   │       │   ├── PaymentRepository.java
│   │       │   ├── ProductRepository.java
│   │       │   ├── ReviewRepository.java
│   │       │   ├── UserRepository.java
│   │       │   └── WishlistRepository.java
│   │       │
│   │       ├── security
│   │       │   ├── CustomUserDetailsService.java
│   │       │   ├── JwtAuthenticationFilter.java
│   │       │   └── JwtService.java
│   │       │
│   │       ├── service
│   │       │   ├── AuthService.java
│   │       │   ├── EmailService.java
│   │       │   ├── OrderService.java
│   │       │   ├── PaymentService.java
│   │       │   ├── ProductService.java
│   │       │   ├── ReviewService.java
│   │       │   ├── UserService.java
│   │       │   └── WishlistService.java
│   │       │
│   │       └── util
│   │           └── RazorpaySignatureUtil.java
│   │
│   └── resources
│       ├── static
│       │   └── images
│       │       └── Shoply-logo.png
│       │
│       ├── templates
│       └── application.properties
│
├── src/test
├── pom.xml
├── mvnw
├── mvnw.cmd
└── README.md




# ⚙️ Configuration:-

Configure MySQL database inside:-

src/main/resources/application.properties:-

Example

  properties:-
  
spring.datasource.url=jdbc:mysql://localhost:3306/Shoply
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

server.port=8080



# ▶️ Running the Backend:-

Clone Repository:-

git clone https://github.com/samarth8698/Shoply.git


Navigate:-

cd Backend/Shoply-Backend


Run:-
mvn spring-boot:run

or run:-
ShoplyBackendApplication.java


from Eclipse / STS. :-

Backend URL :-
http://localhost:8080




# 🔗 REST APIs:-

- Authentication APIs
- User APIs
- Product APIs
- Order APIs
- Payment APIs
- Review APIs
- Wishlist APIs



# 🏗️ Backend Architecture:-

Client
   │
REST API
   │
Controller
   │
Service
   │
Repository
   │
MySQL Database


# 📈 Future Enhancements:-

- Coupon & Promo Code APIs
- Address Management
- Invoice PDF APIs
- Return & Refund APIs
- Cloud Deployment



# 👨‍💻 Developer:-

**Samarth Adhao**

GitHub:-
https://github.com/samarth8698
