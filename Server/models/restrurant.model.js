import { resturantModel } from "../models/restrurant.model";
import jwt from "jsonwebtoken";

const registerResturant = async (req, res) => {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
        return res.status(400).send({ error: "Missing required fields" });
    }
    
    try {
        const userExists = await resturantModel.findOne({ email });
        if (userExists) {
            return res.status(400).send({ message: "Restaurant already exists" });
        }

        const user = new resturantModel({ username, email, password });
        await user.save();

        const token = jwt.sign({ id: user._id }, "THSI_IS_A_JWT_SECRET", { expiresIn: "1h" });

        res.send({ message: "Restaurant created successfully", token, user });
    } catch (error) {
        res.status(500).send({ message: "Server error", error: error.message });
    }
};

const loginResturant = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await resturantModel.findOne({ email });
        if (!user) {
            return res.status(400).send({ message: "Invalid credentials" });
        }

        const isPasswordMatch = await user.matchPassword(password);
        if (!isPasswordMatch) {
            return res.status(400).send({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, "THSI_IS_A_JWT_SECRET", { expiresIn: "1h" });

        res.send({ message: "Login successful", token, user });
    } catch (error) {
        res.status(500).send({ message: "Server error", error: error.message });
    }
};

const add_remove_MealPlan = async (req, res) => {
    const { resturantId, mealId } = req.body;

    if (!resturantId || !mealId) {
        return res.status(400).send({ message: "Missing required fields" });
    }

    try {
        const restaurant = await resturantModel.findById(resturantId);
        if (!restaurant) {
            return res.status(404).send({ message: "Restaurant not found" });
        }

        const mealIndex = restaurant.mealItems.indexOf(mealId);
        if (mealIndex === -1) {
            restaurant.mealItems.push(mealId);
        } else {
            restaurant.mealItems.splice(mealIndex, 1);
        }

        await restaurant.save();
        res.send({ message: "Meal plan updated successfully", restaurant });
    } catch (error) {
        res.status(500).send({ message: "Server error", error: error.message });
    }
};

export { registerResturant, loginResturant, add_remove_MealPlan };
