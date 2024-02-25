const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    message: {
        type: String
    },
    time: {
        type: Date,
        default: Date.now
    }
});

const chatSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    messages: [messageSchema],
    isGroupChat: {
        type: Boolean,
        default: false
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    groupName: {
        type: String
    }
});

export default mongoose.models.chat || mongoose.model("chat", chatSchema);