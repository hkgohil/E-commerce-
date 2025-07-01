const express =require('express')
const mongoose =require ('mongoose')
const cookieParser = require('cookie-parser');
const cors =require('cors')
const authRouter = require("./Routes/auth/auth-routes");
const adminProductsRouter = require("./Routes/admin/products-routes");
const adminOrderRouter = require("./Routes/admin/order-routes");

const shopProductsRouter = require("./Routes/shop/products-routes");
const shopCartRouter = require("./Routes/shop/cart-routes");
const shopAddressRouter = require("./Routes/shop/address-routes");
const shopOrderRouter = require("./Routes/shop/order-routes");
const shopSearchRouter = require("./Routes/shop/search-routes");
const shopReviewRouter = require("./Routes/shop/review-routes");

const commonFeatureRouter = require("./Routes/common/feature-routes");

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