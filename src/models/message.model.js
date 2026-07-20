import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
      index: true,
    },
    sender: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      default: "gpt-4o-mini",
    },
    attachments: [
      {
        type: {
          type: String,
          enum: ["image", "file", "link"],
          default: "file",
        },
        url: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          trim: true,
          default: "attachment",
        },
      },
    ],
    citations: [
      {
        type: String,
        trim: true,
      },
    ],
    feedback: {
      type: String,
      enum: ["up", "down"],
      default: null,
    },
    metadata: {
      tokensUsed: {
        type: Number,
        default: 0,
      },
      latencyMs: {
        type: Number,
        default: 0,
      },
      sourceCount: {
        type: Number,
        default: 0,
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

messageSchema.index({ chat: 1, createdAt: 1 });

const Message = mongoose.model("Message", messageSchema);

export default Message;
