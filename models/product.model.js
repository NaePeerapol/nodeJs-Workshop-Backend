const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const {Schema} = mongoose

const productSchema = Schema({
    productId: {type: Number, unique: true},
    productName: {type: String},
    productDetail: {type: String},
    price: {type: Number},
    amount: {type: Number},
    productImage: {type: String}
},{
    timestamps: true
})

productSchema.plugin(AutoIncrement, {inc_field: 'productId'})

module.exports = mongoose.model('products', productSchema)