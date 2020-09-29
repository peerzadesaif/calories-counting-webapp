var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    company: String,
    role: String,
    loginType: String,
    phoneNumber: String,

    // NOT USE
    lastLoginAt: { type: Date, default: null },
    lastLoginIp: { type: String, default: "" },
    note: { type: String, default: "" },
    token: String,
    bio: String,
    // permissions: [{ type: Schema.Types.ObjectId, ref: 'Role' }],

    created_at: Date,
    updated_at: Date
});

UserSchema.plugin(require('./plugins/pagedFind'));

UserSchema.index({
    firstName: 1,
    lastName: 2,
    email: 3,
});

UserSchema.pre('save', function (next) {
    if (!this.created_at) this.created_at = new Date;
    this.updated_at = new Date;

    if (!this.isModified('password'))
        return next();

    this.password = crypto.createHash('md5').update(this.password).digest('hex');
    return next();
});

UserSchema.methods.comparePassword = function (candidatePassword) {
    var hash = crypto.createHash('md5').update(candidatePassword).digest('hex');
    return (hash === this.password);
};

module.exports = mongoose.model('User', UserSchema);
