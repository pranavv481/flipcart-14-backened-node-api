const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require("cors"); 
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const path = require("path");
// environment variable
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => {
        console.log("connected")
    }).catch((err) => {
        console.log(err)
    })

app.use(cors())
app.use(express.json())
console.log(path.join(__dirname+'uploads'))
app.use('/public',express.static(path.join(__dirname+'/uploads')))
app.use('/api', adminRoutes)
app.use('/api', authRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)
app.use('/api', cartRoutes)

app.listen(process.env.PORT, () => {
    console.log(`server is runing ${process.env.PORT}`)
})