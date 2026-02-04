# Rental App Server

A comprehensive Node.js/Express server for the rental application with authentication, real-time chat, payment processing, and location-based services.

## Features

### 🔐 Authentication & Authorization
- **JWT-based authentication** with token versioning
- **Email verification** with OTP support
- **Password reset** functionality
- **Google OAuth** integration
- **Apple Sign-In** integration
- **Profile management** with image uploads

### 📱 User Management
- User registration and login
- Profile updates with Cloudinary image storage
- User preferences and categories
- User statistics and ratings
- Account deletion with data cleanup

### 🏠 Request & Response System
- Create rental requests with location data
- Respond to requests with offers
- Location-based request discovery
- Request status management
- Offer management (create, update, delete)

### 💬 Real-time Chat
- WebSocket-based chat system
- Thread-based conversations
- Message read status tracking
- User search functionality
- Chat thread management

### 💳 Payment Processing
- Razorpay integration
- Payment initiation and webhook handling
- Payment history and details
- Refund functionality
- Transaction tracking

### ⭐ Rating & Review System
- User rating submission
- Review management
- Average rating calculations
- Rating history tracking

### 📍 Location Services
- Geospatial queries for nearby requests
- Popular location analytics
- Location search functionality
- 2D sphere indexing for performance

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, Google OAuth, Apple Sign-In
- **File Storage**: Cloudinary
- **Payment**: Razorpay
- **Real-time**: Socket.io
- **Email**: Nodemailer
- **Validation**: Built-in validation with error handling

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `env.example` to `.env`
   - Fill in your environment variables:
     ```env
     # Database
     MONGOURI=mongodb://localhost:27017/rental_app
     
     # JWT
     JWT_SECRET=your_jwt_secret_key
     
     # Email (Gmail)
     EMAIL_USER=your_email@gmail.com
     EMAIL_PASS=your_app_password
     
     # Google OAuth
     GOOGLE_CLIENT_ID=your_google_client_id
     GOOGLE_CLIENT_SECRET=your_google_client_secret
     
     # Apple Sign-In
     APPLE_CLIENT_ID=your_apple_client_id
     APPLE_TEAM_ID=your_apple_team_id
     APPLE_KEY_ID=your_apple_key_id
     APPLE_PRIVATE_KEY=your_apple_private_key
     
     # Cloudinary
     CLOUDINARY_CLOUD_NAME=your_cloud_name
     CLOUDINARY_API_KEY=your_api_key
     CLOUDINARY_API_SECRET=your_api_secret
     
     # Razorpay
     RAZORPAY_KEY_ID=your_key_id
     RAZORPAY_KEY_SECRET=your_key_secret
     ```

4. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## API Endpoints

### Authentication (`/api/auth`)
- `POST /signup` - User registration
- `POST /login` - User login
- `POST /google` - Google OAuth login
- `POST /apple` - Apple Sign-In login
- `POST /refresh-token` - Refresh JWT token
- `GET /me` - Get user profile
- `PUT /me` - Update user profile
- `POST /change-password` - Change password
- `GET /stats` - Get user statistics
- `DELETE /me` - Delete account
- `POST /logout` - User logout
- `POST /forgot-password` - Request password reset
- `POST /reset-password` - Reset password
- `GET /verify-email` - Verify email with token
- `POST /verify-email-otp` - Verify email with OTP
- `POST /resend-verification` - Resend verification

### Requests & Responses (`/api/req`)
- `POST /requests` - Create rental request
- `GET /requests/borrower` - Get borrower's requests
- `GET /requests/lender` - Get nearby requests for lenders
- `POST /requests/:requestId/respond` - Respond to request
- `GET /requests/:requestId/offers` - Get offers for request
- `POST /requests/:requestId/accept` - Accept offer
- `POST /requests/:requestId/cancel` - Cancel request
- `GET /requests/:requestId` - Get request details
- `GET /offers/my` - Get user's offers
- `PUT /offers/:offerId` - Update offer
- `DELETE /offers/:offerId` - Delete offer

### Chat (`/api/chat`)
- `GET /threads` - Get user's chat threads
- `POST /threads` - Start new chat thread
- `GET /threads/:threadId` - Get thread messages
- `POST /threads/:threadId/messages` - Send message
- `POST /threads/:threadId/read` - Mark messages as read
- `GET /users/search` - Search users
- `DELETE /threads/:threadId` - Delete thread

### Payments (`/api/payment`)
- `POST /initiate` - Initiate payment
- `GET /history` - Get payment history
- `POST /webhook` - Handle payment webhooks
- `GET /:paymentId` - Get payment details
- `POST /:paymentId/refund` - Refund payment

### Ratings (`/api/ratings`)
- `POST /` - Submit rating
- `GET /my-submitted` - Get user's submitted ratings
- `GET /:userId` - Get user's ratings
- `PUT /:ratingId` - Edit rating

### Location (`/api/location`)
- `GET /nearby-requests` - Find nearby requests
- `GET /popular-locations` - Get popular locations
- `GET /search-locations` - Search locations

### Preferences (`/api/pref`)
- `GET /preferences` - Get user preferences
- `PUT /preferences` - Update preferences
- `GET /categories` - Get available categories
- `POST /preferences/reset` - Reset preferences

## Database Models

### User
- Basic info (name, email, phone)
- Authentication (password, verification)
- Social login IDs (Google, Apple)
- Preferences and ratings
- Profile picture

### Request
- Item details and category
- Rental period (start/end)
- Location with geospatial indexing
- Status tracking
- Borrower and matched lender

### Offer
- Request reference
- Lender details
- Item information
- Pricing and conditions

### Chat
- Thread management
- Message storage
- Read status tracking

### Payment
- Transaction details
- Payment status
- Razorpay integration

### Rating
- User ratings and reviews
- Request association
- Rating calculations

## Security Features

- **JWT token versioning** for secure logout
- **Password hashing** with bcrypt
- **Input validation** and sanitization
- **CORS configuration** for client security
- **Authentication middleware** for protected routes
- **Rate limiting** (can be added)
- **Helmet.js** for security headers (can be added)

## Real-time Features

- **WebSocket connections** for instant messaging
- **Room-based chat** system
- **Message broadcasting** to thread participants
- **Connection management** and error handling

## Error Handling

- **Centralized error handling** with proper HTTP status codes
- **Validation errors** with descriptive messages
- **Database error handling** with fallbacks
- **Logging** for debugging and monitoring

## Performance Optimizations

- **Database indexing** for geospatial queries
- **Connection pooling** for MongoDB
- **Image optimization** with Cloudinary
- **Caching** for Apple public keys
- **Pagination** for large datasets

## Deployment

### Prerequisites
- Node.js 16+ 
- MongoDB 4.4+
- Redis (optional, for session storage)

### Environment Variables
Ensure all required environment variables are set in production.

### PM2 (Recommended)
```bash
npm install -g pm2
pm2 start app.js --name "rental-app-server"
pm2 startup
pm2 save
```

### Docker (Alternative)
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 4000
CMD ["npm", "start"]
```

## Monitoring & Logging

- **Console logging** for development
- **Error tracking** with try-catch blocks
- **Performance monitoring** can be added with tools like New Relic
- **Health check endpoints** can be added

## Testing

```bash
# Run tests (when implemented)
npm test

# Run with coverage
npm run test:coverage
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support and questions, please open an issue in the repository.
