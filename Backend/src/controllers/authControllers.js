import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
    try {
        const { name, email, contact, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required"
            });
        }

     
        const existingUser = await User.findOne({
            email: email.trim().toLowerCase()
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }

       
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const user = await User.create({
            name,
            email,
            contact,
            password: hashedPassword,
            role: "student"
        });

        
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                contact: user.contact,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Registration Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
