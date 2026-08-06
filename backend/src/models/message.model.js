import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
      index: true,
    },
    role: {
      type: String,
      enum: ["user", "ai"],
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
   
  },
  { timestamps: true }
);

messageSchema.index({ chat: 1, createdAt: 1 });

const Message = mongoose.model("Message", messageSchema);

export default Message;
