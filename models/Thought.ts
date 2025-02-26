import { Schema, model, Types } from 'mongoose';

const reactionSchema = new Schema(
  {
    reactionId: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
    reactionBody: { type: String, required: true, maxlength: 280 },
    username: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
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
      default: Date.now,
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


thoughtSchema
.virtual('reactionCount')
.get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);
export default Thought;
function moment(timestamp: any) {
  throw new Error('Function not implemented.');
}

