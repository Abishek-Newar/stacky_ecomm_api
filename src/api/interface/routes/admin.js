import { AddProductValidate, adminSigninValidate, deleteProductValidate, getDashboardInsightsValidate, UpdateProductValidate } from "../../config/helpers/validators.js";
import { Auth } from "../../lib/jwt.js";
import validateRequest from "../../config/helpers/validateRequest.js";
import { addProduct, adminSignin, deleteProduct, getDashboardInsights, updateProduct } from "../controller/admin_controller.js"; // Include the .js extension
import { multiple } from "../models/users_model.js";


export const adminRoute = (router) => {

    router.post("/admin/signin", validateRequest(adminSigninValidate), adminSignin);

    router.post("/admin/addProduct", Auth, validateRequest(AddProductValidate), multiple, addProduct);

    router.post("/admin/updateProduct", Auth, validateRequest(UpdateProductValidate), multiple, updateProduct);

    router.post("/admin/deleteProduct", Auth, validateRequest(deleteProductValidate), deleteProduct);

    router.post("/admin/getDashboardInsights", Auth, validateRequest(getDashboardInsightsValidate), getDashboardInsights);

}
