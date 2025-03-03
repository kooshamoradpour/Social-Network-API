import { Schema, model, Types } from 'mongoose';
import moment from 'moment';

const reactionSchema = new Schema(
  {
    reactionId: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
    reactionBody: { type: String, required: true, maxlength: 280 },
    username: { type: String, required: true },
    createdAt: {
      type: Date,
      default: () => new Date(),
      get: (timestamp: any) => moment(timestamp).format('MMM Do YYYY, h:mm:ss a'),
    },
  },
  { toJSON: { getters: true } }
);

const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
    createdAt: {
      type: Date,
      default: () => new Date(),
      get: (timestamp: any) => moment(timestamp).format('MMM Do YYYY, h:mm:ss a'),
    },
    username: { type: String, required: true },
    reactions: [reactionSchema],
  },
  {
    toJSON: { virtuals: true, getters: true },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions ? this.reactions.length : 0;
});

const Thought = model('Thought', thoughtSchema);
export default Thought;
