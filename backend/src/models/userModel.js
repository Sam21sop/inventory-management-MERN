import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Username Required !"]
        },

        email: {
            type: String,
            required: [true, "Email Required !"],
            unique: true,
        },

        password: {
            type: String,
            required: [true, "Password Required !"],
            minLength: [6, "Password length must be 6 character."],
            maxLength: [16, "Password length should be less than 16 character"]
        },

        photo: {
            type: String,
            default: "https://i.ibb.co/4pDNDk1/avatar.png"
        }
    },
    {
        timestamp: true
    }
);


// Encrypt password bofore saving to the database
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    };

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
    next();
});


// store the user in db
const userModel = mongoose.model("User", userSchema);
export default userModel;