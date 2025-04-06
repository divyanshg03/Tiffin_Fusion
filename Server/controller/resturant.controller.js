import { Meal } from "../models/menu.model";
import { resturantModel } from "../models/restrurant.model";
import { upload_on_cloudinary } from "../utils/cloudinary.utils";



const registerResturant = async (req,res) => {
    const { username, email, password } = req.body;
    console.log(req.body)
  
    if (!username || !email || !password) {
      return res.status(400).send({error:"no data received from req.body"})
    }
  
    try {
      const userExists = await resturantModel.findOne({ email });
  
      if (userExists) {
        return res.status(400).send({ message: 'Resturant already exists' });
      }
  
      const user = new resturantModel({
        username,
        email,
        password,
      });
  
      await user.save();
      console.log('Resturant saved successfully');
  
      const token = jwt.sign({ id: user._id }, "THSI_IS_A_JWT_SECRET", {
        expiresIn: '1h',
      });
  
      res.send({
        message: 'resturant created successfully',
        token,
        user
      });
    } catch (error) {
      console.error('Error during resturant registration:', error);
      res.status(500).send({ message: 'Server error', error: error.message });
    }
}


const loginResturant = async (req,res) => {
    const { email, password } = req.body;
    console.log("login hit")
    try {
      const user = await resturantModel.findOne({ email });
      console.log(user)
      if (!user) {
        console.log("resturant does not exist");
        return res.status(400).send({ message: 'Invalid credentials user' });
      }
      console.log(password)
      const isPasswordMatch = await user.matchPassword(password);
      console.log(isPasswordMatch)
      if (!isPasswordMatch) {
        console.log("Password doesn't match");
        return res.status(400).send({ message: 'Invalid credentials password' });
      }
  
      const token = jwt.sign({ id: user._id }, "THSI_IS_A_JWT_SECRET", {
        expiresIn: '1h',
      });
  
      res.send({
        message: 'Login successful',
        token,
        user
      });
    } catch (error) {
      console.error('Error during user login:', error);
      res.status(500).send({ message: 'Server error', error: error.message });
    }
}

const add_remove_MealPlan = async (req, res) => {
    const { resturantId, mealId, name, price, size } = req.body;
    const filebuffer = req.file ? req.file.buffer : null; // Assuming file is available in req.file.buffer

    if (!resturantId) {
        return res.status(400).send({ message: "Restaurant ID is required" });
    }

    try {
        const restaurant = await resturantModel.findById(resturantId);
        if (!restaurant) {
            return res.status(404).send({ message: "Restaurant not found" });
        }

        let meal;
        if (mealId) {
            // If mealId is provided, check and add/remove
            const mealIndex = restaurant.mealItems.indexOf(mealId);
            if (mealIndex === -1) {
                restaurant.mealItems.push(mealId);
            } else {
                restaurant.mealItems.splice(mealIndex, 1);
            }
        } else if (name && price && size) {
            // If meal details are provided, create a new Meal
            if (filebuffer) {
                const uploadedurl = upload_on_cloudinary(filebuffer)
            }

            meal = new Meal({ name, image:filebuffer, price, size });
            await meal.save();
            restaurant.mealItems.push(meal._id); // Add new meal ID to restaurant
        } else {
            return res.status(400).send({ message: "Provide either mealId or meal details" });
        }

        await restaurant.save();
        res.send({ message: "Meal plan updated successfully", restaurant });
    } catch (error) {
        res.status(500).send({ message: "Server error", error: error.message });
    }
};