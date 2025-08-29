import { configureStore }  from "@reduxjs/toolkit";
import authreducer from "./auth-slice"
import adminProductsReducer from "./admin/product-slice";
import shopProductsReducer from "./shop/products-slice";
import shopCartReducer from "./shop/cart-slice";
import shopReviewReducer from "./shop/review-slice";
import shopSearchReducer from "./shop/search-slice";
import shopAddressReducer from "./shop/address-slice";
import commonFeature from "./common-slice";
import shopOrders from "./shop/order-slice";

const store =configureStore({
    reducer : {
        auth : authreducer ,
        adminProducts: adminProductsReducer,
        shopProducts: shopProductsReducer,
        shopCart: shopCartReducer,
        shopReview: shopReviewReducer,
        shopSearch: shopSearchReducer,
        shopAddress: shopAddressReducer,
        commonFeature: commonFeature,
        shopOrders: shopOrders,
    },
});
export default store;

