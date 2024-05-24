const mongo = require("mongoose") 
const orderSchema = new mongo.Schema({
    user_id:{
        type : mongo.Types.ObjectId,
        ref: "Users",
        required: true
    },
    email: {
        type: String,
    },
    pass: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    full_name: {
        type: String
    },
    avatar: {
        type:String
    },
    total_price:{
        type: Number
    },
    items:[
        {
            pr_id : {
            type : mongo.Types.ObjectId,
            ref: "Product",
            required: true
            },
            qty:{
                type : Number
            },
            price:{
                type: Number
            },
            name:{
                type : String
            }
        }
    ],
    payment :{
        type : String
    }
})
const Order = mongo.model("Orders", orderSchema, 'orders')
module.exports = Order