import mongoose from "mongoose";
import {IUser} from "../utils/interface";
import encrypt from "../utils/encrypt";

const schema = mongoose.Schema

const UserSchema = new schema < IUser > ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: "user.png"
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
}, {
   timestamps: true
})

UserSchema.pre("save", function (next) {
   const user = this;
   user.password = encrypt(user.password)
   next();
})

UserSchema.methods.toJSON = function () {
   const user = this.toObject();
   delete user.password;
   return user;
}

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel