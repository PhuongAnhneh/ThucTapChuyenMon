const mongo = require("mongoose") 
const userSchema = new mongo.Schema({
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
    }
})
const Users = mongo.model("Users", userSchema)
module.exports = Users