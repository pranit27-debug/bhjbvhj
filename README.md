# 🏠 RentEase - Peer-to-Peer Rental Platform

A modern, full-stack web application that enables users to rent and lend items in their community. Built with Next.js, Node.js, and MongoDB, featuring real-time chat, payment integration, and comprehensive analytics.

## ✨ Features

### 🎯 Core Functionality
- **Item Listings**: Create and manage rental listings with photos and descriptions
- **Browse & Search**: Find items by category, location, and availability
- **Rental Requests**: Send and manage rental requests with approval workflow
- **Real-time Chat**: Built-in messaging system for renters and lenders
- **Payment Integration**: Secure payment processing with Razorpay
- **User Authentication**: OAuth support (Google, Apple) and email verification
- **Location Services**: Map integration for item discovery and delivery

### 📊 Dashboard & Analytics
- **Interactive Charts**: Earnings trends, rental activity, and category distribution
- **Statistics Overview**: Total items, active rentals, earnings, and ratings
- **Recent Activities**: Real-time feed of rental activities and payments
- **Quick Actions**: Easy access to common tasks and navigation
- **Responsive Design**: Mobile-first approach with modern UI/UX

### 🔐 Security & User Management
- **JWT Authentication**: Secure token-based authentication
- **Role-based Access**: Different permissions for renters and lenders
- **File Upload**: Secure image handling with Cloudinary
- **Email Verification**: Account verification and password recovery
- **Rate Limiting**: API protection against abuse

## 🏗️ Architecture

### Frontend (Client)
- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS 4 with custom components
- **State Management**: React hooks and context
- **Charts**: Chart.js with react-chartjs-2
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Heroicons and React Icons
- **Maps**: Leaflet with react-leaflet

### Backend (Server)
- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with bcrypt
- **File Storage**: Cloudinary for image management
- **Payment**: Razorpay integration
- **Email**: Nodemailer with SMTP
- **Validation**: Joi for request validation

### Database Schema
- **Users**: Profile, preferences, ratings, and verification
- **Items**: Categories, descriptions, pricing, and availability
- **Rentals**: Request management, status tracking, and payments
- **Chats**: Message threads and conversation history
- **Payments**: Transaction records and payment status

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB database
- Cloudinary account
- Razorpay account (for payments)
- SMTP email service

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project1
   ```

2. **Install dependencies**
   ```bash
   # Install client dependencies
   cd Client
   npm install
   
   # Install server dependencies
   cd ../Server
   npm install
   ```

3. **Environment Configuration**

   **Client (.env.local)**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   ```

   **Server (.env)**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/rentease
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   ```

4. **Database Setup**
   ```bash
   # Start MongoDB (if running locally)
   mongod
   
   # Or use MongoDB Atlas cloud service
   ```

5. **Run the application**
   ```bash
   # Start the server (from Server directory)
   npm run dev
   
   # Start the client (from Client directory)
   npm run dev
   ```

## 📱 Available Routes

### Public Routes
- `/` - Landing page with hero section and features
- `/about` - Company information and mission
- `/browse` - Browse available rental items
- `/how-it-works` - Platform explanation
- `/pricing` - Subscription plans and pricing
- `/contact-us` - Contact form and information
- `/help-center` - FAQ and support resources
- `/careers` - Job opportunities
- `/press` - Media resources and press kit
- `/legal` - Terms of service and privacy policy
- `/safety` - Safety guidelines and tips

### Authentication Routes
- `/login` - User login with OAuth options
- `/signup` - User registration
- `/verify-email` - Email verification
- `/check-email` - Email verification status

### Protected Routes
- `/dashboard` - User dashboard with analytics
- `/list-item` - Create new rental listing
- `/requests` - Manage rental requests
- `/chats` - Messaging system
- `/community` - Community features

## 🎨 UI Components

### Reusable Components
- **Navbar**: Responsive navigation with user menu
- **HeroSection**: Landing page hero with call-to-action
- **FeaturesSection**: Platform features showcase
- **PopularCategories**: Item category browsing
- **CTASection**: Call-to-action sections
- **Footer**: Site footer with links and information
- **InputField**: Styled form inputs
- **GradientButton**: Modern gradient buttons
- **PageTransition**: Smooth page transitions
- **ServerStatusIndicator**: API status display

### Dashboard Components
- **Statistics Cards**: Key metrics display
- **Quick Actions**: Common task shortcuts
- **Recent Activities**: Activity feed
- **Chart Components**: Interactive data visualization
- **Activity Items**: Individual activity display

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-email` - Email verification
- `POST /api/auth/forgot-password` - Password recovery
- `POST /api/auth/reset-password` - Password reset

### Items
- `GET /api/items` - List all items
- `POST /api/items` - Create new item
- `GET /api/items/:id` - Get item details
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item

### Rentals
- `POST /api/rentals/request` - Create rental request
- `GET /api/rentals/user` - Get user's rentals
- `PUT /api/rentals/:id/status` - Update rental status
- `GET /api/rentals/:id` - Get rental details

### Payments
- `POST /api/payments/create-order` - Create payment order
- `POST /api/payments/verify` - Verify payment
- `GET /api/payments/history` - Payment history

### Chat
- `GET /api/chats` - Get user's chat threads
- `POST /api/chats` - Create new chat
- `GET /api/chats/:id/messages` - Get chat messages
- `POST /api/chats/:id/messages` - Send message

## 📊 Dashboard Analytics

### Chart Types
1. **Earnings Trend (Line Chart)**
   - Shows earnings over time
   - Interactive tooltips
   - Smooth curved lines with area fill

2. **Rental Activity (Bar Chart)**
   - Displays rental counts
   - Modern rounded bars
   - Hover animations

3. **Category Distribution (Doughnut Chart)**
   - Item category breakdown
   - Color-coded segments
   - Interactive legend

### Time Ranges
- **7 Days**: Daily breakdown (Mon-Sun)
- **30 Days**: Weekly breakdown (Week 1-4)
- **3 Months**: Monthly breakdown (Jan-Mar)

## 🚀 Deployment

### Client Deployment (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Server Deployment
1. **Environment Setup**
   - Set production environment variables
   - Configure MongoDB connection string
   - Set up SSL certificates

2. **Process Management**
   - Use PM2 for process management
   - Set up reverse proxy with Nginx
   - Configure domain and DNS

3. **Monitoring**
   - Set up logging with Winston
   - Monitor API performance
   - Set up error tracking

## 🧪 Testing

### Client Testing
```bash
cd Client
npm run test
```

### Server Testing
```bash
cd Server
npm run test
```

## 📈 Performance Optimization

### Frontend
- **Code Splitting**: Dynamic imports for routes
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: Webpack bundle analyzer
- **Lazy Loading**: Component lazy loading

### Backend
- **Database Indexing**: Optimized MongoDB queries
- **Caching**: Redis for session storage
- **Compression**: Gzip compression middleware
- **Rate Limiting**: API request throttling

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: Bcrypt with salt rounds
- **CORS Protection**: Cross-origin request handling
- **Input Validation**: Joi schema validation
- **File Upload Security**: File type and size validation
- **Rate Limiting**: API abuse prevention
- **HTTPS Enforcement**: Secure communication

## 🌟 Future Enhancements

### Planned Features
- **Mobile App**: React Native mobile application
- **AI Recommendations**: Smart item suggestions
- **Video Calls**: Built-in video chat for item inspection
- **Insurance Integration**: Rental insurance options
- **Social Features**: User reviews and ratings
- **Analytics Dashboard**: Advanced business insights
- **Multi-language Support**: Internationalization
- **Dark Mode**: Theme customization

### Technical Improvements
- **Microservices**: Service-oriented architecture
- **GraphQL**: Advanced API querying
- **Real-time Updates**: WebSocket integration
- **PWA Support**: Progressive web app features
- **Performance Monitoring**: Advanced analytics
- **Automated Testing**: CI/CD pipeline

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Email**: support@rentease.com
- **Documentation**: [docs.rentease.com](https://docs.rentease.com)
- **Community**: [community.rentease.com](https://community.rentease.com)
- **Issues**: [GitHub Issues](https://github.com/your-org/rentease/issues)

## 🙏 Acknowledgments

- **Next.js Team** for the amazing React framework
- **Tailwind CSS** for the utility-first CSS framework
- **Chart.js** for the powerful charting library
- **MongoDB** for the flexible NoSQL database
- **Express.js** for the minimal web framework
- **Framer Motion** for the smooth animations

---

**Built with ❤️ by the RentEase Team**

*Making sharing and renting simple, secure, and sustainable.*
