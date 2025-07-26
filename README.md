# 🏠 StayVerse

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0%2B-green)](https://www.mongodb.com/)

A modern, full-stack vacation rental platform inspired by Airbnb. Built with Node.js, Express, and MongoDB, featuring property listings, user authentication, reviews, and an intuitive search system.

## 🎥 Project Demo

👉 [Watch StayVerse Demo Video](https://raw.githubusercontent.com/Praveen-koujalagi/StayVerse/main/assets/StayVerse%20(demo).mp4)


## ✨ Features

### 🏡 **Property Management**
- Browse vacation rental properties with beautiful card layouts
- Upload and manage property images via Cloudinary integration
- Detailed property pages with descriptions, pricing, and location info
- Property categorization with 10+ types (apartments, villas, cabins, etc.)

### 🔍 **Smart Search & Filtering**
- **Airbnb-style search bar** with location and price range filtering
- **Category filters** with Font Awesome icons for property types
- **Mobile-responsive** search interface with overlay design
- Real-time search results with visual feedback

### 👤 **User Authentication**
- Secure user registration and login with Passport.js
- Session management with Express sessions
- User ownership and authorization for property management
- Protected routes for authenticated actions

### ⭐ **Reviews & Ratings**
- 5-star rating system for properties
- User reviews with comments and ratings
- Review ownership and management
- Average rating display on property cards

### 📱 **Modern UI/UX**
- Responsive design that works on all devices
- Bootstrap-powered interface with custom styling
- Interactive elements with smooth animations
- Flash messages for user feedback

## 🏗 **Project Structure**

```
StayVerse/
├── 📁 controllers/          # Route logic and business operations
│   ├── listings.js          # Property CRUD operations
│   ├── reviews.js           # Review management
│   └── users.js             # User authentication
├── 📁 models/               # MongoDB data models
│   ├── listing.js           # Property model with categories
│   ├── review.js            # Review and rating model
│   └── user.js              # User authentication model
├── 📁 routes/               # Express route definitions
│   ├── listings.js          # Property routes (/listings)
│   ├── review.js            # Review routes
│   └── user.js              # Auth routes (/login, /signup)
├── 📁 views/                # EJS templates
│   ├── 📁 listings/         # Property-related views
│   ├── 📁 users/            # Authentication views
│   ├── 📁 layouts/          # Page layouts
│   └── 📁 includes/         # Reusable components
├── 📁 public/               # Static assets
│   ├── 📁 css/              # Custom stylesheets
│   └── 📁 js/               # Client-side JavaScript
├── 📁 scripts/              # Database utilities
│   ├── check-listings.js    # Database inspection
│   ├── update-categories.js # Category migration
│   └── README.md            # Scripts documentation
├── 📁 utils/                # Helper utilities
├── 📁 init/                 # Database initialization
├── app.js                   # Main Express application
├── schema.js                # Joi validation schemas
└── cloudConfig.js           # Cloudinary configuration
```

## 🚀 **Getting Started**

### Prerequisites

Before running StayVerse, ensure you have:

- **Node.js** (v18.0.0 or higher)
- **MongoDB** (v6.0 or higher) - running locally or MongoDB Atlas
- **Cloudinary account** - for image storage and management

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Praveen-koujalagi/StayVerse.git
   cd StayVerse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```env
   # Cloudinary Configuration (Required)
   CLOUDINARY_CLOUD_NAME=your_cloud_name_here
   CLOUDINARY_API_KEY=your_api_key_here
   CLOUDINARY_API_SECRET=your_api_secret_here
   
   # Optional: Database URL (defaults to local MongoDB)
   MONGODB_URL=mongodb://127.0.0.1:27017/stayverse
   
   # Optional: Server Port (defaults to 8080)
   PORT=8080
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   # For local MongoDB installation
   mongod
   
   # Or use MongoDB Compass for a GUI
   ```

5. **Initialize the database** (Optional)
   ```bash
   # Seed sample data
   npm run check-listings
   ```

6. **Start the application**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Or production mode
   npm start
   ```

7. **Access the application**
   
   Open your browser and navigate to: `http://localhost:8080`

## 🎯 **Usage**

### For Guests (Browsing)
1. **Browse Properties**: Visit the homepage to see all available listings
2. **Filter & Search**: Use category filters or the search bar to find specific properties
3. **View Details**: Click on any property to see detailed information, photos, and reviews
4. **Search by Location**: Use the search bar to find properties in specific cities or countries
5. **Filter by Price**: Set price ranges in the search interface

### For Hosts (Property Owners)
1. **Register/Login**: Create an account or sign in to manage properties
2. **Add Listings**: Click "Add New Listing" to create property listings
3. **Upload Photos**: Add property images through the integrated file upload
4. **Manage Properties**: Edit or delete your own listings
5. **Monitor Reviews**: See reviews and ratings from guests

### For All Users
1. **Leave Reviews**: Rate and review properties you've experienced
2. **User Profiles**: Manage your account and view your activity
3. **Responsive Design**: Use the platform on any device - desktop, tablet, or mobile

## 🛠 **Available Scripts**

```bash
# Development & Production
npm start              # Start the production server
npm run dev            # Start with nodemon for development

# Database Utilities
npm run check-listings      # Inspect current database state
npm run update-categories   # Migrate categories for filter system
npm run migrate-categories  # Setup categories for new installations

# Testing
npm test               # Run test suite (when implemented)
```

## 🏷 **Property Categories**

StayVerse supports 10 property categories, each with unique icons:

| Category | Icon | Description |
|----------|------|-------------|
| 🏢 **Apartment** | `fa-building` | Modern city apartments and flats |
| 🏠 **House** | `fa-home` | Traditional houses and homes |
| 🏖️ **Villa** | `fa-warehouse` | Luxury villas and vacation homes |
| 🌲 **Cabin** | `fa-tree` | Mountain cabins and forest retreats |
| 🏨 **Hotel** | `fa-bed` | Hotel rooms and suites |
| 🏝️ **Resort** | `fa-umbrella-beach` | Resort accommodations |
| 🏡 **Cottage** | `fa-campground` | Countryside cottages |
| 🏙️ **Loft** | `fa-city` | Urban lofts and converted spaces |
| 🎨 **Studio** | `fa-paint-brush` | Studio apartments |
| 👑 **Penthouse** | `fa-crown` | Luxury penthouses |

## 🔧 **Technology Stack**

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling library

### Authentication & Security
- **Passport.js** - Authentication middleware
- **Express Session** - Session management
- **Joi** - Data validation and sanitization
- **Method Override** - HTTP verb support

### File Upload & Storage
- **Multer** - File upload handling
- **Cloudinary** - Cloud-based image storage and optimization

### Frontend
- **EJS** - Embedded JavaScript templating
- **Bootstrap 5** - UI component framework
- **Font Awesome** - Icon library
- **Custom CSS** - Enhanced styling and animations

### Development Tools
- **Nodemon** - Development server with auto-restart
- **dotenv** - Environment variable management

## 🔑 **Environment Variables**

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `CLOUDINARY_CLOUD_NAME` | ✅ Yes | Your Cloudinary cloud name | - |
| `CLOUDINARY_API_KEY` | ✅ Yes | Your Cloudinary API key | - |
| `CLOUDINARY_API_SECRET` | ✅ Yes | Your Cloudinary API secret | - |
| `MONGODB_URL` | ❌ No | MongoDB connection string | `mongodb://127.0.0.1:27017/stayverse` |
| `PORT` | ❌ No | Server port number | `8080` |
| `NODE_ENV` | ❌ No | Environment mode | `development` |

## 📱 **API Endpoints**

### Listings
- `GET /listings` - Get all listings (with search/filter support)
- `GET /listings/new` - Show create listing form
- `POST /listings` - Create new listing
- `GET /listings/:id` - Show specific listing
- `GET /listings/:id/edit` - Show edit listing form
- `PUT /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing

### Reviews
- `POST /listings/:id/reviews` - Add review to listing
- `DELETE /listings/:id/reviews/:reviewId` - Delete review

### Authentication
- `GET /signup` - Show registration form
- `POST /signup` - Register new user
- `GET /login` - Show login form
- `POST /login` - Authenticate user
- `POST /logout` - Logout user

## 🤝 **Contributing**

We welcome contributions to StayVerse! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines
- Follow existing code style and conventions
- Write clear, descriptive commit messages
- Test your changes thoroughly
- Update documentation when necessary
- Ensure responsive design compatibility

## 🐛 **Troubleshooting**

### Common Issues

**MongoDB Connection Error**
```bash
Error: connect ECONNREFUSED 127.0.0.1:27017
```
- Solution: Ensure MongoDB is running locally or check your MongoDB Atlas connection string

**Cloudinary Upload Error**
```bash
Error: Must supply api_key
```
- Solution: Check your `.env` file has valid Cloudinary credentials

**Port Already in Use**
```bash
Error: listen EADDRINUSE: address already in use :::8080
```
- Solution: Kill the process using the port or change the PORT in `.env`

**Module Not Found**
```bash
Error: Cannot find module 'package-name'
```
- Solution: Run `npm install` to install all dependencies

## �‍💻 **Developer**

**Praveen Koujalagi** - *Full Stack Developer*

- 🌐 **GitHub**: [@Praveen-koujalagi](https://github.com/Praveen-koujalagi)
- 💼 **LinkedIn**: [Connect with Praveen](https://linkedin.com/in/praveen-koujalagi)
- 📧 **Email**: [Contact Developer](mailto:praveenkoujalagi@gmail.com)

*StayVerse represents a comprehensive full-stack web application demonstrating modern web development practices, user authentication, database design, cloud integration, and responsive UI/UX implementation.*

## �📄 **License**

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **Airbnb** - Design inspiration for the user interface
- **Bootstrap** - UI component framework
- **Font Awesome** - Beautiful icons
- **Cloudinary** - Image storage and optimization
- **MongoDB** - Flexible NoSQL database

## 📞 **Support & Contact**

### 🐛 **Project Support**
- **Issues**: [GitHub Issues](https://github.com/Praveen-koujalagi/StayVerse/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Praveen-koujalagi/StayVerse/discussions)
- **Feature Requests**: [Request Features](https://github.com/Praveen-koujalagi/StayVerse/issues/new)

### 👨‍💻 **Developer Contact**
- **Developer**: Praveen Koujalagi
- **GitHub**: [@Praveen-koujalagi](https://github.com/Praveen-koujalagi)
- **Email**: [praveenkoujalagi@gmail.com](mailto:praveenkoujalagi@gmail.com)

---

<div align="center">

**⭐ If you found this project helpful, please give it a star!**

[🏠 Homepage](http://localhost:8080) | [📚 Documentation](./scripts/README.md) | [🐛 Report Bug](https://github.com/Praveen-koujalagi/StayVerse/issues) | [💡 Request Feature](https://github.com/Praveen-koujalagi/StayVerse/issues)

</div>
