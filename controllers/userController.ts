// import { find, findById, create, findByIdAndUpdate, findByIdAndDelete } from '../models/User.js';
import User from '../models/User.js';

export async function getUsers(req, res) {
    try {
        const users = await User.find().populate('friends').populate('thoughts');
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
}
export async function getUserById(req, res) {
    try {
        const user = await User.findById(req.params.id).populate('friends').populate('thoughts');
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}
export async function createUser(req, res) {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}
export async function updateUser(req, res) {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}
export async function deleteUser(req, res) {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted!' });
    } catch (err) {
        res.status(500).json(err);
    }
}
export async function addFriend(req, res) {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $push: { friends: req.params.friendId } },
            { new: true }
        );
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}
export async function removeFriend(req, res) {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}
