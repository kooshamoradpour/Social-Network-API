import { Request, Response } from "express";
import { Thought } from "../models/index.js";

export const getThoughts = async (req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json({ err });
    }
};
export const getThoughtById = async (req: Request, res: Response) => {
    const { thoughId } = req.params;
    try {
        const User = await Thought.findById(thoughId);
        res.json(User);
    } catch (err) {
        res.status(500).json(err);
    }
};

/**
* POST Thought /Thoughs
* @param object username
* @returns a single Thought object
*/

export const createThought = async (req: Request, res: Response) => {
    try {
        const { thoughtText, username, reactions } = req.body
        const newthought = await Thought.create({
            thoughtText,
            username,
            reactions
        });
        res.json(newthought);
    } catch (err) {
        res.status(500).json(err);
    }
}

/**
 * PUT Thought based on id /Thoughts/:id
 * @param object 
 * @returns
*/
export const updateThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            { _id: req.params.thoughId },
            { $set: req.body },
            { runValidators: true, new: true }
        );
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};
/**
* DELETE Thought based on id /thoughts/:id
* @param string id
* @returns string 
*/
export const deleteThought = async (req: Request, res: Response) => {
    try {
        await Thought.findByIdAndDelete(req.params.id);
        res.json({ message: 'Thought deleted!' });
    } catch (err) {
        res.status(500).json(err);
    }
}
export const addReaction = async (req: Request, res: Response) => {
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
export const removeReaction = async (req: Request, res: Response) => {
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
// function _findByIdAndUpdate(userId: any, arg1: { $push: { thoughts: import("mongoose").Types.ObjectId; }; }, arg2: { new: boolean; }) {
//     throw new Error("Function not implemented.");
// }

