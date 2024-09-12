import { UpdateQuery } from 'mongoose';
import updateUserProfileModel, { IupdateUserData } from '../models/updateUserModel';
import jwt, { JwtPayload } from 'jsonwebtoken';

export async function updateUserProfile(body: any) {
    // Decode the token to get user information
    const decoded = jwt.decode(body.token);
    let userId: string | undefined;

    // Ensure the token contains valid data and access the user ID from the token
    if (decoded && typeof decoded !== 'string') {
        userId = (decoded as JwtPayload)?.user?._id; // Accessing the user's ID from the token
    }

    if (!userId) {
        throw new Error('User ID not found in token');
    }

    try {
        const { fname, lname, email, phone, skill } = body;
      

        // Ensure skill is included in the update
        const updatedUser = await updateUserProfileModel.findByIdAndUpdate(
            userId,
            {fname, lname, email, phone, skill}, // Include skill in the update
            { new: true, runValidators: true } // Return the updated document and run schema validators
        );
       // console.log(updatedUser)

        // If the user was not found, handle it
        if (!updatedUser) {
            throw new Error('User not found');
        }

        // Optionally, return the updated user or token as needed
        const token = jwt.sign({ user: updatedUser }, process.env.JWT_SECRET as string, {
            expiresIn: "1h",
        });
        return { token };
    } catch (error: any) {
        // Log the error and rethrow it
        console.error('Error updating user profile:', error.message);
        throw new Error(error.message);
    }
}
