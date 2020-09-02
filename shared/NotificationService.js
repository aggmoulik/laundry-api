const OneSignal = require('onesignal-node'); // One signal library

const APP_ID = "85bf4c9a-8d9d-464c-9727-9377ed0061b7";
const API_KEY = "OTc0Zjc2NDItN2I2My00MzJlLThjYTgtNjQ0NWJkODQ2Y2Vi";

// One signal client setup with appId and API Key
const client = new OneSignal.Client(APP_ID, API_KEY);

// User model
const User = require('../models/usersModel');

exports.sendToAll = async function(text, title, payload = null) {
    var notification = {
        contents: {
            'en': text,
        },
        headings: {
            'en': title
        },
        included_segments: ['Subscribed Users']
    };

    if (payload !== null) {
        notification.data = payload;
    }

    // using async/await
    try {
        const response = await client.createNotification(notification);
        return { status: true, content: response };
    } catch (e) {
        return { status: false, content: e };
    }
}

exports.sendToSegments = async function(text, title, segments, payload = null) {
    var notification = {
        contents: {
            'en': text,
        },
        headings: {
            'en': title
        },
        included_segments: segments
    };

    if (payload !== null) {
        notification.data = payload;
    }

    // using async/await
    try {
        const response = await client.createNotification(notification);
        return { status: true, content: response };
    } catch (e) {
        return { status: false, content: e };
    }
}

exports.sendToUserList = async function(text, title, users, payload = null) {
    var notification = {
        contents: {
            'en': text,
        },
        headings: {
            'en': title
        },
        include_player_ids: users
    };

    if (payload !== null) {
        notification.data = payload;
    }

    // using async/await
    try {
        const response = await client.createNotification(notification);
        return { status: true, content: response };
    } catch (e) {
        return { status: false, content: e };
    }
}

exports.sendByUserId = async function(text, title, uid, payload = null) {
    const user = await User.findById(uid);
    if (!user) {
        return { status: false, content: "No user" };
    } else if (user.notification_ids && user.notification_ids.length > 0) {
        var notification = {
            contents: {
                'en': text,
            },
            headings: {
                'en': title
            },
            include_player_ids: user.notification_ids
        };
        if (payload !== null) {
            notification.data = payload;
        }

        // using async/await
        try {
            const response = await client.createNotification(notification);
            return { status: true, content: response };
        } catch (e) {
            return { status: false, content: e };
        }
    }
}