const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const adminRoutes = require('./routerAdmin');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Mount the admin router
app.use('/service2', adminRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Admin server is running on port ${PORT}`);
});
