# API Documentation

## Base URL
```
http://localhost:4000/api
```

## Authentication

### Register User
```http
POST /auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890"
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Google OAuth Login
```http
POST /auth/google
Content-Type: application/json

{
  "idToken": "google_id_token_here",
  "accessToken": "google_access_token_here"
}
```

### Apple Sign-In
```http
POST /auth/apple
Content-Type: application/json

{
  "identityToken": "apple_identity_token_here"
}
```

## Protected Routes

All protected routes require the `Authorization` header:
```http
Authorization: Bearer <jwt_token>
```

## Requests & Responses

### Create Request
```http
POST /req/requests
Authorization: Bearer <token>
Content-Type: application/json

{
  "itemName": "Drill",
  "itemCategory": "Tools",
  "rentalStart": "2024-01-15T10:00:00Z",
  "rentalEnd": "2024-01-15T18:00:00Z",
  "location": {
    "type": "Point",
    "coordinates": [-73.935242, 40.730610]
  },
  "notes": "Need for home renovation project"
}
```

### Get Nearby Requests
```http
GET /req/requests/lender?lat=40.730610&lng=-73.935242&radius=5
Authorization: Bearer <token>
```

### Respond to Request
```http
POST /req/requests/:requestId/respond
Authorization: Bearer <token>
Content-Type: application/json

{
  "itemName": "Professional Drill",
  "photos": ["photo1.jpg", "photo2.jpg"],
  "conditionDesc": "Excellent condition, barely used",
  "rentalAmountPerHour": 15,
  "notes": "Available for pickup or delivery"
}
```

## Chat

### Start Chat Thread
```http
POST /chat/threads
Authorization: Bearer <token>
Content-Type: application/json

{
  "participantIds": ["user_id_1", "user_id_2"]
}
```

### Send Message
```http
POST /chat/threads/:threadId/messages
Authorization: Bearer <token>
Content-Type: application/json

{
  "message": "Hello! I'm interested in your item."
}
```

### Get Thread Messages
```http
GET /chat/threads/:threadId?page=1&limit=20
Authorization: Bearer <token>
```

## Payments

### Initiate Payment
```http
POST /payment/initiate
Authorization: Bearer <token>
Content-Type: application/json

{
  "requestId": "request_id_here",
  "amount": 1500,
  "paymentMethod": "razorpay"
}
```

### Get Payment History
```http
GET /payment/history
Authorization: Bearer <token>
```

## Ratings

### Submit Rating
```http
POST /ratings
Authorization: Bearer <token>
Content-Type: application/json

{
  "requestId": "request_id_here",
  "toUserId": "user_id_here",
  "rating": 5,
  "review": "Great experience, very reliable!"
}
```

### Get User Ratings
```http
GET /ratings/:userId
Authorization: Bearer <token>
```

## Location

### Find Nearby Requests
```http
GET /location/nearby-requests?lat=40.730610&lng=-73.935242&radius=5
Authorization: Bearer <token>
```

### Get Popular Locations
```http
GET /location/popular-locations
```

## Preferences

### Get User Preferences
```http
GET /pref/preferences
Authorization: Bearer <token>
```

### Update Preferences
```http
PUT /pref/preferences
Authorization: Bearer <token>
Content-Type: application/json

{
  "categories": ["Tools", "Electronics"],
  "notifyFrequency": "daily"
}
```

### Get Available Categories
```http
GET /pref/categories
```

## Error Responses

All error responses follow this format:
```json
{
  "error": "Error message description"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## WebSocket Events (Chat)

### Connection
```javascript
const socket = io('http://localhost:4000');

socket.on('connect', () => {
  console.log('Connected to chat server');
});
```

### Join Thread
```javascript
socket.emit('joinThread', 'thread_id_here');
```

### Send Message
```javascript
socket.emit('sendMessage', {
  threadId: 'thread_id_here',
  senderId: 'user_id_here',
  message: 'Hello!'
});
```

### Receive Message
```javascript
socket.on('newMessage', (data) => {
  console.log('New message:', data.message);
});
```

## File Upload

### Profile Picture Upload
```http
PUT /auth/me
Authorization: Bearer <token>
Content-Type: multipart/form-data

profilePic: <file>
name: "John Doe"
phone: "+1234567890"
```

## Rate Limiting

Currently no rate limiting implemented, but can be added using:
- `express-rate-limit`
- `express-slow-down`

## CORS

CORS is configured to allow:
- Origin: `http://localhost:3000` (client)
- Credentials: `true`
- Methods: All standard HTTP methods
