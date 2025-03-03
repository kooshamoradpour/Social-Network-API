import { Request, Response } from 'express';
import { User } from '../models/index.js';

export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find().populate('friends').populate('thoughts');
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
}
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId).populate('friends').populate('thoughts');
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}
export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.json({ message: 'User deleted!' });
    } catch (err) {
        res.status(500).json(err);
    }
}
export const addFriend = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $addToSet: { friends: req.params.friendId } }, // Use param instead of body
            { runValidators: true, new: true }
        );
        if (!user) {
            res.status(404).json({ message: "User not found!" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const removeFriend = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $pull: { friends: req.params.friendId } }, // Remove directly
            { runValidators: true, new: true }
        );
        if (!user) {
            res.status(404).json({ message: "User not found!" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};
