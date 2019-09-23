const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });

const flowerSchema = new mongoose.Schema(
    {
        name: String,
        definiton: String,
        appearance: String,
        meaning: String,
        picture: String,
        userpick: Array
    }
);

const Flower = mongoose.model('flower', flowerSchema);

module.exports = Flower;