const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { Schema } = mongoose;

const orderItemSchema = new Schema({
    product: { type: mongoose.Schema.Types.ObjectId, 
                ref: 'products', 
                required: true
            },
    quantity: { type: Number, required: true },
    itemTotal: { type: Number, required: true },
});

const orderSchema = new Schema({
    order_id: { type: Number, unique: true },
    buyerName: { type: String, required: true },
    items: [orderItemSchema],
    totalPrice: { type: Number, required: true },
}, { timestamps: true });

orderSchema.plugin(AutoIncrement, { inc_field: 'order_id' });

module.exports = mongoose.model('Order', orderSchema);
