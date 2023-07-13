import mongoose, { Model } from "mongoose";
import * as bcrypt from "bcrypt";

interface IUser {
    name: string;
    email: string;
    password: string;
    role: boolean;
}

const UserSchema = new mongoose.Schema<IUser, Model<IUser>>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Boolean,
        default: false
    }
});


UserSchema.pre<IUser>("save", async function (this: IUser, next) {
    const foundEmail = await User.findOne({ email: this.email });
    if(foundEmail) {
        throw new Error("A User with the same details already exists.")
    } else {
        const salt = await bcrypt.genSalt(9);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
});

const User = mongoose.model("User", UserSchema);
export default User;
