// import { find, findById, create, findByIdAndUpdate, findByIdAndDelete } from '../models/Thought.js';
// import { findByIdAndUpdate as _findByIdAndUpdate } from '../models/User.js';
 import Thought from "../models/Thought.js";

export async function getThoughts(req, res) {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
}
export async function getThoughtById(req, res) {
    try {
        const thought = await Thought.findById(req.params.id);
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
}
export async function createThought(req, res) {
    try {
        const thought = await Thought.create(req.body);
        await _findByIdAndUpdate(
            req.body.userId,
            { $push: { thoughts: thought._id } },
            { new: true }
        );
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
}
export async function updateThought(req, res) {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
}
export async function deleteThought(req, res) {
    try {
        await Thought.findByIdAndDelete(req.params.id);
        res.json({ message: 'Thought deleted!' });
    } catch (err) {
        res.status(500).json(err);
    }
}
export async function addReaction(req, res) {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.id,
            { $push: { reactions: req.body } },
            { new: true }
        );
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
}
export async function removeReaction(req, res) {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.id,
            { $pull: { reactions: { reactionId: req.body.reactionId } } },
            { new: true }
        );
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
}
function _findByIdAndUpdate(userId: any, arg1: { $push: { thoughts: import("mongoose").Types.ObjectId; }; }, arg2: { new: boolean; }) {
    throw new Error("Function not implemented.");
}

