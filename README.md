# Style-Store — Full-Stack E-Commerce Platform

A MERN-stack e-commerce application with separate customer and admin experiences. Users can browse products, search and filter listings, manage a cart and wishlist, checkout with PayPal, and track orders. Admins can manage products, orders, and homepage features.

## Features

### Customer
- User registration and login (JWT in HTTP-only cookies)
- Product listing with search, filters, and sorting
- Shopping cart and wishlist
- Address management
- PayPal checkout and order history
- Product reviews and ratings

### Admin
- Product CRUD with Cloudinary image uploads
- Order management and status updates
- Homepage feature/banner management
- Dashboard overview

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| Frontend | React 19, Vite, Redux Toolkit, React Router, Tailwind CSS, Radix UI, Axios |
| Backend | Node.js, Express 5, Mongoose |
| Database | MongoDB |
| Integrations | PayPal REST SDK, Cloudinary |

## Project Structure

```
E-Commerce/
├── client/          # React frontend (Vite)
│   └── src/
│       ├── components/   # UI, admin-view, shopping-view, auth
│       ├── pages/        # Route pages
│       └── store/        # Redux slices (auth, shop, admin)
├── server/          # Express API
│   ├── controllers/
│   ├── models/
│   ├── Routes/
│   ├── helper/      # PayPal & Cloudinary config
│   └── server.js
└── package.json
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [PayPal Developer](https://developer.paypal.com/) sandbox credentials
- [Cloudinary](https://cloudinary.com/) account

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd E-Commerce
```

### 2. Install dependencies

```bash
# Server
cd server
npm install

# Client
cd ../client
npm install
```

### 3. Configure environment variables

Create `server/.env`:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/style-store
PORT=5000
CORS_ORIGINS=http://localhost:5173
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000
```

> **Note:** PayPal and Cloudinary credentials are currently configured in `server/helper/paypal.js` and `server/helper/cloudinary.js`. For production, move these to environment variables and never commit secrets.

### 4. Run the application

Start the backend (from `server/`):

```bash
npm run dev
```

Start the frontend (from `client/`):

```bash
npm run dev
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:5000 |
| Health check | http://localhost:5000/api/test |

## Application Routes

### Frontend

| Path | Description |
|------|-------------|
| `/auth/login` | User login |
| `/auth/register` | User registration |
| `/shop/home` | Store homepage |
| `/shop/listing` | Product catalog |
| `/shop/search` | Search results |
| `/shop/checkout` | Checkout |
| `/shop/account` | User account & orders |
| `/shop/wishlist` | Saved products |
| `/admin/dashboard` | Admin dashboard |
| `/admin/products` | Manage products |
| `/admin/orders` | Manage orders |
| `/admin/features` | Manage homepage features |

### Backend API

| Prefix | Purpose |
|--------|---------|
| `/api/auth` | Register, login, logout, check-auth |
| `/api/shop/products` | Public product listing & filters |
| `/api/shop/cart` | Cart operations |
| `/api/shop/address` | User addresses |
| `/api/shop/order` | Order creation & PayPal capture |
| `/api/shop/search` | Keyword search |
| `/api/shop/review` | Product reviews |
| `/api/admin/products` | Admin product CRUD & image upload |
| `/api/admin/orders` | Admin order management |
| `/api/common/feature` | Homepage features |

## PayPal Checkout Flow

1. User submits checkout → `POST /api/shop/order/create`
2. Backend creates a PayPal payment and returns an approval URL
3. User completes payment on PayPal
4. PayPal redirects to `/shop/paypal-return`
5. Frontend calls `POST /api/shop/order/capture` to finalize the order

## Scripts

### Client (`client/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

### Server (`server/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start with nodemon |
| `npm start` | Start production server |

## Security

- Passwords hashed with bcrypt
- JWT stored in HTTP-only cookies
- Role-based access for admin routes
- CORS restricted to configured origins

## Additional Documentation

See [PROJECT_DETAILS.md](./PROJECT_DETAILS.md) for in-depth architecture notes, integration details, and feature breakdown.

## Author

Harsh Gohil

## License

ISC
