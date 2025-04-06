import { Meal, Menu } from "../models/menu.model.js"
import { upload_on_cloudinary } from "../utils/cloudinary.utils.js";


const addmenuItem = async (req,res) => {
    const user = req.adminUser
    const {name, price, size} = req.body
    const filebuffer = req.file ? req.file.buffer : null; // Assuming file is available in req.file.buffer

    if (!name || !price ) {
        return res.status(400).send({error:"name , price or other details not received from req.body"})
    }

    if (!filebuffer) {
        return res.status(400).json({error:"error receiveing image"})
    }

    const uploaded_url  = await upload_on_cloudinary(filebuffer)

    const newMenu = new Menu()
    newMenu.name = name
    newMenu.price = price
    newMenu.image = uploaded_url
    if (size) newMenu.size = size

    await newMenu.save()

    if (!newMenu) {
        return res.status(400).send({error:"error while creating menu item"})
    }
    return res.status(200).send({success:"menu item created successfully", newMenu})
}

const addmealplan =async (req,res) => {
    const {name, items, price} = req.body
    const filebuffer = req.file ? req.file.buffer : null

    if (!name || !price || !items ) {
        return res.status(400).send({error:"name , price or other details not received from req.body"})
    }

    if (!filebuffer) {
        return res.status(400).json({error:"error receiveing image"})
    }

    const uploaded_url  = await upload_on_cloudinary(filebuffer)

    const newMeal = new Meal()
    newMeal.name= name
    newMeal.price= price
    newMeal.items = items
    newMeal.image = uploaded_url

    await newMeal.save()

    if (!newMeal) {
        return res.status(400).send({error:"error while creating new mal plan"})
    }

    return res.status(200).send({success:"meal plan created successfully", createdPlan:newMeal})
}

const getmenuitem = async (req,res) => {
    const fetchedmenuitem = await Menu.find()
    return res.status(200).send({message:"fetched successfully", fetchedItems: fetchedmenuitem}) 
}

const getMealPlan = async (req,res) => {
    const fetchedMealItem = await Meal.find()
    return res.status(200).send({message:"fetched successfully", fetchedItem: fetchedMealItem})
}

//for editing and deleteing meal plan

//first
const editMealPlan = async (req,res) => {
    const { id, name, price, items } = req.body;
    const filebuffer = req.file ? req.file.buffer : null;
    
    let updatedData = { name, price, items };
    
    if (filebuffer) {
        const uploaded_url = await upload_on_cloudinary(filebuffer);
        updatedData.image = uploaded_url;
    }
    
    const updatedMealPlan = await Meal.findByIdAndUpdate(id, updatedData, { new: true });
    
    if (!updatedMealPlan) {
        return res.status(400).send({ error: "Error while updating meal plan" });
    }
    
    return res.status(200).send({ success: "Meal plan updated successfully", updatedMealPlan });
};

//sec
const deleteMealPlan = async (req,res) => {
    const { id } = req.body;
    
    const deletedMealPlan = await Meal.findByIdAndDelete(id);
    
    if (!deletedMealPlan) {
        return res.status(400).send({ error: "Error while deleting meal plan" });
    }
    
    return res.status(200).send({ success: "Meal plan deleted successfully" });
};

// editing and deleting menu item
const editMenuItem = async (req,res) => {
    const { id, name, price, size } = req.body;
    const filebuffer = req.file ? req.file.buffer : null;
    
    let updatedData = { name, price, size };
    
    if (filebuffer) {
        const uploaded_url = await upload_on_cloudinary(filebuffer);
        updatedData.image = uploaded_url;
    }
    
    const updatedMenuItem = await Menu.findByIdAndUpdate(id, updatedData, { new: true });
    
    if (!updatedMenuItem) {
        return res.status(400).send({ error: "Error while updating menu item" });
    }
    
    return res.status(200).send({ success: "Menu item updated successfully", updatedMenuItem });
};

const deleteMenuItem = async (req,res) => {
    const { id } = req.body;
    
    const deletedMenuItem = await Menu.findByIdAndDelete(id);
    
    if (!deletedMenuItem) {
        return res.status(400).send({ error: "Error while deleting menu item" });
    }
    
    return res.status(200).send({ success: "Menu item deleted successfully" });
};

export {addmenuItem, addmealplan, getmenuitem, getMealPlan, editMealPlan, deleteMealPlan, editMenuItem, deleteMenuItem}
