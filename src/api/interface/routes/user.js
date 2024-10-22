import {
  addToCart,
  buyNow,
  getCartItems,
  getProductData,
  placeCartOrder,
  removeFromCart,
  UpdatePassword,
  UserLogout,
  UserOtpForPass,
  UserOtpGenerate,
  UserSignin,
  UserSignup,
  UserVerifyOtp,
} from "../controller/users_controller.js";
import validateRequest from "../../config/helpers/validateRequest.js";
import { addToCartValidate,
    buyNowValidate,
    getCartItemsValidate,
    placeCartOrderValidate,
    removeFromCartValidate,
    UpdatePasswordValidate,
    UserLogoutValidate, 
    UserOtpForPassValidate, 
    UserOtpGenerateValidate, 
    UserSigninValidate, 
    UserSignupValidate, 
    UserVerifyOtpValidate
} from "../../config/helpers/validators.js";
import { Auth } from "../../lib/jwt.js";

export const UserRoute = (router) => {
  // for user to signup generate otp
  router.post("/user/generateOtp", validateRequest(UserOtpGenerateValidate), UserOtpGenerate);

  router.post("/user/signup", validateRequest(UserSignupValidate),  UserSignup);

  router.post("/user/signin", validateRequest(UserSigninValidate), UserSignin);

  router.post("/user/logout", validateRequest(UserLogoutValidate), UserLogout);

  // for user to reset password generate otp
  router.post("/user/OTPforPass", validateRequest(UserOtpForPassValidate), UserOtpForPass);

  router.post("/user/verifyOtp", validateRequest(UserVerifyOtpValidate), UserVerifyOtp);

  router.post("/user/updatePass", validateRequest(UpdatePasswordValidate), UpdatePassword);

  router.post("/user/getProducts", getProductData);

  router.post("/user/getCartItems", validateRequest(getCartItemsValidate), getCartItems);

  router.post("/user/addToCart", validateRequest(addToCartValidate), addToCart);

  router.post("/user/removeFromCart", validateRequest(removeFromCartValidate), removeFromCart);

  router.post("/user/placeCartOrder", Auth, validateRequest(placeCartOrderValidate), placeCartOrder);

  router.post("/user/buynow", Auth, validateRequest(buyNowValidate), buyNow);

 
};
