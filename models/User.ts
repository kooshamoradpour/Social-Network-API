import { Schema, Types, model } from 'mongoose';

const friendSchema = new Schema(
  {
    friendId: { type: Types.ObjectId, ref: 'User', required: true },
    addedAt: { type: Date, default: Date.now },
  },
  { _id: false } // Prevents automatic `_id` creation for subdocuments
);

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true, trim: true },
    email: { type: String, unique: true, required: true, match: /.+@.+\..+/ },
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
    friends: [friendSchema],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);


userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

export const User = model('User', userSchema);
export default User;