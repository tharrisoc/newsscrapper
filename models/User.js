const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Create a new UserSchema object
const UserSchema = new Schema({
    // `username` must be of type String
    // `username` will trim leading and railing whitespace before it's saved
    // `username` is a required field and throws a custom error message if not supplied
    username: {
        type: String,
        trim: true,
        required: "Username is Required"
    },
    // `password` must be of type String
    // `password` will trim leading and trailng whiespace before it's saved
    // `password` is a required field and throws a custom error message if not supplied
    // `password` uses a custom validation function to only accept values of 6 characters
    //            or more, and that includes at least one uppercase character,
    //            at least one lowercase character, at least one digit and
    //            at least one punctuation character
    password: {
        type: String,
        trim: true,
        required: "Password is Required",
        validate: [
            function(input) {
                return (input.length >= 6)
                    && /[A-Z]/.test(input)
                    && /[a-z]/.test(input)
                    && /[0-9]/.test(input)
                    && /[`~!@#$%\^&*()\-_=+[\]{}\\|,.<>?;:'"]/.test(input);
            },
            "Password must contain at least one uppercase, lowercase, digit, and punctuation symbol."
        ]
    },
    // `email` must be of type String
    // `email` must be unique
    // `email' must match the regex pattern below and throws a custom error
    //         message if it does not
    email: {
        type: String,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    }
});

// Create the model from the above schema
const User = mongoose.model("User", UserSchema);

// Export the User model
module.exports = User;
