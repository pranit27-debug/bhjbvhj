const ChatThread = require('./chatThread');
const ChatMessage = require('./message.model');
const User = require('../Auth/auth.model');

const startThread = async (user1Id, participantIds) => {
  console.log(user1Id);
  
    
    const allParticipantIds = [user1Id, ...participantIds];

    const user1 = await User.findById(user1Id);
    console.log(user1);
    if (!user1) throw new Error('User not found');

    const users = await User.find({ _id: { $in: participantIds } });
    if (users.length !== participantIds.length) {
        throw new Error('One or more participantIds are invalid');
    }

    const thread = await ChatThread.create({
        participants: allParticipantIds,
        lastMessage: '',
    });

    return thread;
};

const getUserThreads = async (userId) => {
    const threads = await ChatThread.find({ participants: userId })
        .populate('participants', 'name email')
        .sort({ updatedAt: -1 });

    return threads;
};

const getThreadMessages = async (threadId, userId, page = 1, limit = 20) => {
    // Optional: Check user is part of thread
    const thread = await ChatThread.findOne({ _id: threadId, participants: userId });
    if (!thread) throw new Error('Thread not found or access denied');

    const messages = await ChatMessage.find({ thread: threadId })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

    return messages.reverse(); // return in oldest → newest order
};

const sendMessage = async (threadId, senderId, messageContent) => {
    const thread = await ChatThread.findOne({ _id: threadId, participants: senderId });
    if (!thread) throw new Error('Thread not found or access denied');

    const message = await ChatMessage.create({
        thread: threadId,
        sender: senderId,
        message: messageContent,
        readBy: [senderId],
    });

    thread.lastMessage = messageContent;
    thread.updatedAt = new Date();
    await thread.save();

    return message;
};

const markMessagesAsRead = async (threadId, userId) => {
    await ChatMessage.updateMany(
        { thread: threadId, readBy: { $ne: userId } },
        { $addToSet: { readBy: userId } }
    );
};

const searchUsers = async (query, currentUserId) => {
    const regex = new RegExp(query, 'i');
    return User.find({
        _id: { $ne: currentUserId },
        $or: [
            { name: regex },
            { email: regex }
        ]
    })
    .select('name email profilePic')
    .limit(10);
};

const deleteThread = async (threadId, userId) => {
    const thread = await ChatThread.findOne({ _id: threadId, participants: userId });
    if (!thread) throw new Error('Thread not found or access denied');
    
    // Delete all messages in the thread
    await ChatMessage.deleteMany({ thread: threadId });
    
    // Delete the thread
    await ChatThread.findByIdAndDelete(threadId);
    
    return true;
};

module.exports = {
    startThread,
    getUserThreads,
    getThreadMessages,
    sendMessage,
    markMessagesAsRead,
    searchUsers,
    deleteThread,
};
