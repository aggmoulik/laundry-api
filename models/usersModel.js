const mongoose = require('mongoose'),
    shortid = require('shortid').seed(1000),
    Schema = mongoose.Schema;

const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

/**
 * @property {String} referral_code unique referral code of user
 * @property {Boolean} referral_used it determines whether the referral is converted to coupon
 * @property {Number} referral_count total no of referrals
 * @property {ObjectId} referred_by user id of referrer
 * @property {Number} referral_claimed total no of referral claims
 */

let userSchema = new Schema({
    firstname: String,
    lastname: String,
    username: String,
    role: String,
    email: String,
    image: String,
    mobile_no: {
        type: String,
        default: null
    },
    password: String,
    refresh_token: String,
    access_token: String,
    location: {
        type: pointSchema,
        default: null
    },
    last_login: Date,
    google_id: String,
    facebook_id: String,
    referral_code: {
        type: String,
        default: shortid.generate(),
        unique: true
    },
    referral_used: {
        type: Boolean,
        default: false
    },
    referral_count: {
        type: Number,
        default: 0
    },
    referred_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        default: null
    },
    referral_claimed: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        default: 1
    },
    address: {
        type: Object,
        default: {}
    },
    source: {
        type: String,
        enum: ['WAP', 'WEB', 'IOS', 'ANDROID'],
        default: 'WEB'
    },
    login_method: {
        type: String,
        default: ''
    }
});

userSchema.set('toJSON', {
    transform: (doc, ret) => {
        return ret;
    }
});

module.exports = mongoose.model('users', userSchema, 'users');