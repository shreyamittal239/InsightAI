import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      trim: true,
      default: "New Chat",
    },
    type: {
      type: String,
      enum: ["assistant", "research", "browse"],
      default: "assistant",
    },
    status: {
      type: String,
      enum: ["active", "archived", "deleted"],
      default: "active",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    messageCount: {
      type: Number,
      default: 0,
    },
    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

chatSchema.index({ user: 1, updatedAt: -1 });

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
