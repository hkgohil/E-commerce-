import paypal from "paypal-rest-sdk";

console.log("PayPal SDK loaded successfully");

paypal.configure({
  mode: "sandbox",
  client_id: "Ae3NbprxTQflJnyE1iqxhgNfMEk0AH5Rl1eAuhzFQ2ntUTmrLqSWUHbzYh_sQTh_uxaz_NiPnLFpcFVk",
  client_secret: "EAhJrD5DDwDl-O89MdBuplo5UBjo8cz65tKS-4iGBIv0t75rwles3Vq_fEeIATRy_B4_BZ1fqlYWaHi-",
});

console.log("PayPal configuration completed");

// Test PayPal configuration with a simple payment creation
const testPayment = {
  intent: "sale",
  payer: {
    payment_method: "paypal",
  },
  redirect_urls: {
    return_url: "http://localhost:5173/shop/paypal-return",
    cancel_url: "http://localhost:5173/shop/paypal-cancel",
  },
  transactions: [
    {
      item_list: {
        items: [
          {
            name: "Test Item",
            sku: "test-item",
            price: "1.00",
            currency: "USD",
            quantity: 1,
          },
        ],
      },
      amount: {
        currency: "USD",
        total: "1.00",
      },
      description: "Test payment",
    },
  ],
};

// Test the PayPal configuration
paypal.payment.create(testPayment, (error, payment) => {
  if (error) {
    console.log("PayPal test failed:", error);
    console.log("Error details:", JSON.stringify(error, null, 2));
  } else {
    console.log("PayPal test successful - payment created");
    console.log("Payment ID:", payment.id);
    console.log("Approval URL:", payment.links.find(link => link.rel === "approval_url")?.href);
  }
});

export default paypal;