import updateUserProfile from '../models/updateUserModel'; // Use existing user model
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';

export async function updateUserPass(body: any) {
    const decoded = jwt.decode(body.token);
    let userId: string | undefined;

    if (decoded && typeof decoded !== 'string') {
        userId = (decoded as JwtPayload)?.user?._id;
    }
    if (!userId) {
        throw new Error('User ID not found in token');
    }

    try {
        const { currentpassword, newpassword, repassword } = body;

        if (newpassword !== repassword) {
            throw new Error('New password and confirm password do not match');
        }

        // Find the user by ID
        const user = await updateUserProfile.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Compare current password with the stored hashed password
        const isMatch = await bcrypt.compare(currentpassword, user.password);
        if (!isMatch) {
            throw new Error('Current password is incorrect');
        }

        // Hash the new password before updating
        const hashedNewPassword = await bcrypt.hash(newpassword, 10);

        // Update the password in the database
        user.password = hashedNewPassword;
        await user.save();

        // Generate a new token after password update
        const token = jwt.sign({ user: { _id: user._id, email: user.email } }, process.env.JWT_SECRET as string, {
            expiresIn: '1h',
        });

        return { token };
    } catch (error: any) {
        console.error('Error updating user password:', error.message);
        throw new Error(error.message);
    }
}
