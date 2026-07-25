const {Schema, model} = require('mongoose')

const productShcema = new Schema({
    title: {
        type: String,
        required: true,
        trim:true
    },
    description:{
        type: String,
        maxLength:500
    },
    category:{
        type: String,
        required: true,
        // enum:  ["electronics", "food", "clothing", "furniture", "other"],
    },
    price: {
        type: Number,
        min: 0.1
    },
    quantity:{
        type:Number,
        required:true,
        min:0
    }
}, {timestamps:true})

const Product = model('Mailbox',productShcema)

module.exports = Product