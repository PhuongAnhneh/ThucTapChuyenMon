const mongo = require("mongoose")
const express = require("express") 
const app = express()
const port = 8000
const urldb = "mongodb+srv://phuonganhhh2711:leleshop@phuonganh.0swtqos.mongodb.net/test"
const productRoute = require("./Routes/productRoute")
const useRoute = require("./Routes/userRoute")
const orderRoute = require("./Routes/orderRoute")
const bodyParser = require('body-parser')
const cors = require('cors')
mongo.connect(urldb).then(function(){
    console.log("connect db success");
})
.catch(function(err){
    console.log(err);
})
app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(bodyParser.json())
app.use("/api/product",productRoute)

app.use("/api/users",useRoute)
app.use("/api/orders",orderRoute)

app.get('/', (req, res)=> {
    res.send("Api is running...")
})
app.listen(port, function(){
    console.log("sever đang chạy trên port" + port);
})
