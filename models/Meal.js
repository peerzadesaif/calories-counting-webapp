var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MealSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User', index: true },

    mealName: String,
    mealDescription: String,
    mealText: String,
    calories: Number,
    date: Date,

    created_at: Date,
    updated_at: Date
});

MealSchema.plugin(require('./plugins/pagedFind'));

MealSchema.index({
    firstName: 1,
    lastName: 2,
    email: 3,
});

MealSchema.pre('save', function (next) {
    if (!this.created_at) this.created_at = new Date;
    this.updated_at = new Date;

    return next();
});

module.exports = mongoose.model('Meal', MealSchema);
