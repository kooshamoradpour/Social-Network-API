import { Schema, model } from 'mongoose';

const userSchema = new Schema (
    {
    username: {type: String, Unique: true, Required: true, trim: true },
    email: {type: String, Unique: true, Required: true, match: [/.+@.+\..+/, 'Must match an email address']},
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User'}],
},
{
    toJSON: { virtuals: true },
    id: false,
  }
);
userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  });

  const User = model('User', userSchema);
export default User;