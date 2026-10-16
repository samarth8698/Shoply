# 🛍️ Shoply — E-Commerce Frontend

Shoply is a modern and responsive e-commerce web application frontend developed using React.js and Vite. It provides a user-friendly shopping experience with product browsing, search and filtering, shopping cart management, user authentication, checkout, online payments, order tracking, and an admin dashboard.

🌐 Live Demo :-

🚀 Live Website:- https://shoply-zeta-two.vercel.app

💻 **GitHub Repository:** https://github.com/samarth8698/Shoply


✨ Features :-

🏠 1. Home Page :-

* Modern and attractive user interface
* Featured products and categories
* New arrivals section
* Easy navigation across the website
  

🔐 2. User Authentication :-

* User registration
* User login
* JWT authentication integration
* Forgot password functionality
* OTP verification
* Password reset functionality
* Change password functionality
  

🛍️ 3. Product Management and Shopping :-

* Browse available products
* View detailed product information
* Browse product categories
* Search products
* Filter products
* View product details and pricing
* Responsive product listings
  

🛒 4. Shopping Cart :-

* Add products to the cart
* Manage cart items
* View cart details
* Calculate order totals
* Preserve cart data using Local Storage
  

💳 5. Checkout and Payment :-

* Checkout page
* Order summary
* Razorpay payment gateway integration
* Payment status handling
* Order success page
  

📦 6. Order Management :-

* View personal orders
* Access order details
* Track order status
* Cancel orders
  

👤 7. User Profile :-

* View user profile
* Edit profile information
* Manage account details
* Access order history
  

⭐ 8. Product Reviews and Ratings :-

* Submit product reviews
* Display customer reviews
* Show product ratings
* Star rating component
  

❤️ 9. Wishlist :-

* Add products to the wishlist
* View saved products
* Manage wishlist items
  

📊 10. Admin Dashboard :-

* Dashboard with statistics and charts
* Product management interface
* User management interface
* Order management interface
* Payment information
  

📱 11. Responsive Design :-

* Responsive page layouts
* Mobile-friendly user interface
* Consistent navigation
* Improved shopping experience across screen sizes


🧰 Technologies Used :-

| Technology    | Purpose                             |
| ------------- | ----------------------------------- |
| React.js      | Building reusable UI components     |
| Vite          | Frontend development and build tool |
| JavaScript    | Application logic                   |
| Tailwind CSS  | Styling and responsive design       |
| React Router  | Client-side navigation              |
| Axios         | HTTP requests and API communication |
| Lucide React  | Icons                               |
| Recharts      | Dashboard charts                    |
| Local Storage | Persistent cart data                |
| Razorpay      | Payment gateway integration         |
| HTML5         | Website structure                   |
| CSS3          | Additional styling                  |
| ESLint        | Code quality and linting            |
| Vercel        | Frontend deployment                 |



📂 Project Structure :-

shopping/
│
├── public/
│   └── images/
│       ├── backpack.jpg
│       ├── headphones.jpg
│       ├── keyboard.jpg
│       ├── laptop.jpg
│       ├── monitor.jpg
│       ├── smartwatch.jpg
│       └── sneakers.jpg
│
├── src/
│   │
│   ├── components/
│   │   │
│   │   ├── admin/
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── Payments.jsx
│   │   │   ├── Products.jsx
│   │   │   └── Users.jsx
│   │   │
│   │   ├── Cart.jsx
│   │   ├── Categories.jsx
│   │   ├── ChangePassword.jsx
│   │   ├── Checkout.jsx
│   │   ├── Contact.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── Home.jsx
│   │   ├── Layout.jsx
│   │   ├── Login.jsx
│   │   ├── Logo.jsx
│   │   ├── MyOrders.jsx
│   │   ├── NewArrivals.jsx
│   │   ├── OrderSuccess.jsx
│   │   ├── OrderTracking.jsx
│   │   ├── Profile.jsx
│   │   ├── ResetPassword.jsx
│   │   ├── ReviewForm.jsx
│   │   ├── ReviewList.jsx
│   │   ├── Shop.jsx
│   │   ├── ShopDetails.jsx
│   │   ├── Signup.jsx
│   │   ├── StarRating.jsx
│   │   ├── VerifyOtp.jsx
│   │   └── Wishlist.jsx
│   │
│   ├── services/
│   │   ├── authService.js
│   │   ├── orderService.js
│   │   ├── paymentService.js
│   │   ├── productService.js
│   │   ├── reviewService.js
│   │   ├── userService.js
│   │   └── wishlistService.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   └── index.css
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md


📁 Folder Description :-

* public/images/ :— Contains product images used in the application.
* src/components/ :— Contains reusable UI components and application pages.
* src/components/admin/ :— Contains admin dashboard and management components.
* src/services/ :— Contains JavaScript service modules for API communication.
* App.jsx :— Main application component.
* main.jsx :— Frontend application entry point.
* App.css :— Application-specific styles.
* index.css :— Global styles.
* index.html :— Main HTML entry point.
* package.json :— Project dependencies and npm scripts.
* vite.config.js :— Vite configuration.
* eslint.config.js :— ESLint configuration.


⚙️ Installation and Setup :-
Prerequisites:-

Make sure the following tools are installed:

* Node.js
* npm
* Git


Step 1: Clone the Repository :-
                                git clone https://github.com/samarth8698/Shoply.git



Step 2: Navigate to the Frontend Directory :-
  If your frontend is inside `Frontend/shopping`, run: -
                                                        cd Shoply/Frontend/shopping


Otherwise, navigate to the directory containing the frontend's `package.json` file.
  Step 3: Install Dependencies :-
                                    npm install


Step 4: Start the Development Server :-
                                        npm run dev
                                            

The terminal will display the local development URL. By default, Vite commonly uses :-
                                        http://localhost:5173


Open this address in your browser to access the application.


🏗️ Build for Production :-
  Generate an optimized production build :-
                                            npm run build

The production files are generated in the `dist/` directory by default.
  Preview the Production Build :-
                                          npm run preview


🚀 Deployment :-
  The Shoply frontend is deployed on Vercel.

  Live Application:- https://shoply-zeta-two.vercel.app


Deployment Steps :-

1. Import the GitHub repository into Vercel.
2. Select the directory containing the frontend `package.json`.
3. Configure any required frontend environment variables.
4. Set the build command to `npm run build`.
5. Set the output directory to `dist`.
6. Deploy the application.


🔒 Security Considerations :-

* Never commit secret credentials or private API keys to GitHub.
* Store configuration values in environment variables when appropriate.
* Do not expose sensitive payment credentials in frontend code.
* Payment verification should be performed securely by the server.
* Use HTTPS for production deployments.



🔮 Future Enhancements :-

* Improve loading indicators and error handling.
* Optimize product images and frontend performance.
* Enhance accessibility.
* Improve responsive layouts.
* Add additional product filtering options.
* Complete and verify email notification functionality.
* Improve the overall shopping experience.


👨‍💻 Author :-
          *Samarth Subhash Adhao*
