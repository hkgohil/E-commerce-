import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from "./Routes/auth/auth-routes.js";
import adminProductsRouter from "./Routes/admin/products-routes.js";
import adminOrderRouter from "./Routes/admin/order-routes.js";
import shopProductsRouter from "./Routes/shop/products-routes.js";
import shopCartRouter from "./Routes/shop/cart-routes.js";
import shopAddressRouter from "./Routes/shop/address-routes.js";
import shopOrderRouter from "./Routes/shop/order-routes.js";
import shopSearchRouter from "./Routes/shop/search-routes.js";
import shopReviewRouter from "./Routes/shop/review-routes.js";
import commonFeatureRouter from "./Routes/common/feature-routes.js";

console.log("All routes imported successfully");

mongoose.connect('mongodb+srv://hkgohil:hkgohil2025@cluster0.8vitreu.mongodb.net/').then(()=>console.log('MongoDB connected ')).catch((error)=>console.log(error));
const app=express()
const PORT =process.env.PORT || 5000

console.log('Starting server on port:', PORT);

app.use(
    cors ({
        origin : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
        methods : ['GET','POST','DELETE','PUT'],
        allowedHeaders : [
            'content-type',
            'authorization',
            'cache-control',
            'expires',
            'pragma'
        ],
        credentials : true
    })
);
app.use(cookieParser());
app.use(express.json());

// Add a test route to verify server is working
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Add a test route for order creation
app.post('/api/test-order', (req, res) => {
  console.log('Test order endpoint hit:', req.body);
  res.json({ 
    success: true, 
    message: 'Test order endpoint working',
    receivedData: req.body 
  });
});

// Add a PayPal test endpoint
app.get('/api/test-paypal', async (req, res) => {
  try {
    const paypal = await import('./helper/paypal.js');
    console.log('PayPal module loaded successfully');
    
    // Test PayPal configuration
    paypal.default.payment.get('test', (error, payment) => {
      if (error) {
        console.log("PayPal test failed (this is normal):", error.message);
        res.json({ 
          success: false, 
          message: 'PayPal test failed (this is normal for invalid payment ID)',
          error: error.message 
        });
      } else {
        console.log("PayPal test successful");
        res.json({ 
          success: true, 
          message: 'PayPal configuration is working' 
        });
      }
    });
  } catch (error) {
    console.log('PayPal test error:', error);
    res.json({ 
      success: false, 
      message: 'PayPal module failed to load',
      error: error.message 
    });
  }
});

app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.use("/api/common/feature", commonFeatureRouter);
app.listen(PORT , ()=>console.log(`Server is now running on port ${PORT}`));