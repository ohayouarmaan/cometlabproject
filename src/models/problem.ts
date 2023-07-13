import mongoose, { Model } from "mongoose";

interface IProblem {
    sphere_id: string;
    name: string;
    description: string;
    masterJudgeId: string
};

const problemSchema = new mongoose.Schema<IProblem, Model<IProblem>>({
    sphere_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    masterJudgeId: {
        type: String,
        default: '1001'
    }
});

const Problem = mongoose.model("Problem", problemSchema);
export default Problem;
