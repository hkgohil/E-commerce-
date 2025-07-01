const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "Ae3NbprxTQflJnyE1iqxhgNfMEk0AH5Rl1eAuhzFQ2ntUTmrLqSWUHbzYh_sQTh_uxaz_NiPnLFpcFVk",
  client_secret: "EAhJrD5DDwDl-O89MdBuplo5UBjo8cz65tKS-4iGBIv0t75rwles3Vq_fEeIATRy_B4_BZ1fqlYWaHi-",
});

module.exports = paypal;