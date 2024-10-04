import env from "../../../infrastructure/env.js";
import { ErrorResponse, SuccessResponse } from "../../config/helpers/apiResponse.js";
import addProducts from "../../config/schema/adminAddProduct.schema.js";
import cart from "../../config/schema/cart.schema.js";
import order from "../../config/schema/order.schema.js";
import userSignup from "../../config/schema/userSignup.schema.js";
import { sendPassResetEmail, sendSignupEmail } from "../../lib/mailer.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

export const UserOtpGenerate = async (req, res) => {
  try {
    const { email } = req.body;

    const otp = Math.floor(1000 + Math.random() * 9000);
   
    await Promise.all([
      sendSignupEmail({ email, OTP: otp }),
      userSignup.updateOne(
        { email },
        { otp, otpExpiration: Date.now() + 10 * 60 * 1000 },  
        { upsert: true }
      )
    ]);
    
    return SuccessResponse(res, 'OTP sent to your email. Please verify to complete registration.', { email });
  } catch (error) {
    console.error('Error during OTP generation:', error);
    return ErrorResponse(res, 'An error occurred while generating the OTP.');
  }
};

export const UserSignup = async (req, res) => {
  try {
    const { email, otp, username, password } = req.body;

    const user = await userSignup.findOne({ email });

    if (!user) {
      return ErrorResponse(res, "No such user found. Please initiate signup first.");
    }

    if (user.otp !== otp) {
      return ErrorResponse(res, "Invalid OTP.");
    }
    if (user.otpExpiration && Date.now() > user.otpExpiration) {
      return ErrorResponse(res, "OTP expired. Please request a new one.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.username = username;
    user.otp = undefined; 
    user.otpExpiration = undefined; 
    user.status = 1; 
    user.insert_date_time = moment().format("YYYY-MM-DD HH:mm:ss");

    const savedUser = await user.save();
    const token = jwt.sign({ id: savedUser._id.toHexString() }, env.JWT_SECRET, { expiresIn: '2d' });

    return SuccessResponse(res, "User registered successfully", { user: { ...savedUser._doc, password: undefined }, token });
  } catch (error) {
    console.error(error);
    return ErrorResponse(res, "An error occurred during OTP verification.");
  }
}

export const UserSignin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await userSignup.findOne({ email });
    if (!user) {
      return ErrorResponse(res, "User not found.");
    }
    if (!user.password) {
      return ErrorResponse(res, "Password is not set for this user.");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return ErrorResponse(res, "Invalid password.");
    }

    const token = jwt.sign({ id: user._id.toHexString() }, env.JWT_SECRET, { expiresIn: '2d' });

    await userSignup.updateOne(
      { _id: user._id }, 
      { $set: { status: 1 } } 
    );

    return SuccessResponse(res, "User logged in successfully", {user:{ ...user._doc, password: undefined }, token});
  } catch (error) {
    console.error(error);
    return ErrorResponse(res, "An error occurred while logging in.");
  }
};

export const UserLogout = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return ErrorResponse(res, "User ID is required.");
    }

    await userSignup.updateOne(
      { _id: userId },
      { $set: { status: 0 } }
    );

    return SuccessResponse(res, "User logged out successfully.", { userId });
  } catch (error) {
    console.error(error);
    return ErrorResponse(res, "An error occurred while logging out.");
  }
}

export const UserOtpForPass = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userSignup.findOne({ email });
    if (!user) {
      return ErrorResponse(res, "User not found.");
    }

    const otp = Math.floor(1000 + Math.random() * 9000);

    await sendPassResetEmail({ email, OTP: otp }),
    await userSignup.updateOne(
        { email }, 
        { otp, otpExpiration: Date.now() + 10 * 60 * 1000},  
        { upsert: true } 
    )

    return SuccessResponse(res, 'OTP sent to your email. Please verify to complete password reset.', { email });
    
  } catch (error) {
    console.error(error);
    return ErrorResponse(res, "An error occurred while generating the OTP.");
  }
}

export const UserVerifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await userSignup.findOne({ email });
    if (!user) {
      return ErrorResponse(res, "User not found.");
    }
    if (user.otp !== otp) {
      return ErrorResponse(res, "Invalid OTP.");
    }
    if (user.otpExpiration && Date.now() > user.otpExpiration) {
      return ErrorResponse(res, "OTP expired. Please request a new one.");
    }

    user.isOtpVerified = true;
    user.otp = undefined; 
    user.otpExpiration = undefined;
    await user.save();

    return SuccessResponse(res, "OTP verified successfully.", { email });
  }
  catch (error) {
    console.error(error);
    return ErrorResponse(res, "An error occurred while updating the password.");
  }
}

export const UpdatePassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userSignup.findOne({ email });
    if (!user) {
      return ErrorResponse(res, "User not found.");
    }
    if (!user.isOtpVerified) {
      return ErrorResponse(res, "OTP verification required before updating password.");
    }

    const hashedPassword = await bcrypt.hash(password, 10); 
    user.password = hashedPassword;

    user.isOtpVerified = false; 
    await user.save();

    return SuccessResponse(res, "Password updated successfully.", { email });
  } catch (error) {
    console.error(error);
    return ErrorResponse(res, "An error occurred while updating the password.");
  }
};


export const getProductData = async (req, res) => {
  try {
    const { page, limit, productName, category, priceRange } = req.body;

    const filter = {};
    if (productName) {
      filter.productName = { $regex: new RegExp(productName, 'i') }; 
    }
    if (category) {
      filter.category = { $regex: new RegExp(category, 'i') }; 
    }

    let sort = {};
    if (priceRange === "h2l") {
      sort.price = -1; 
    } else if (priceRange === "l2h") {
      sort.price = 1;  
    }

    const skip = (page - 1) * limit; 
    const product = await addProducts
      .find(filter) 
      .skip(skip)  
      .limit(limit)
      .sort(sort)
      .lean();     

    return SuccessResponse(res, "Products found successfully.", { product });
  } catch (error) {
    console.error(error);
    return ErrorResponse(res, "An error occurred while fetching the product data.");
  }
};



  export const addToCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        const productId = req.body.productId;

        const product = await addProducts.findById(productId);
        if (!product) {
            return ErrorResponse(res, "Product not found.");
        }
        const user = await userSignup.findById(userId);
        if (!user) {
            return ErrorResponse(res, "User not found.");
        }

        const cartItem = await cart.findOne({ userId, productId });
        if (cartItem) {
            cartItem.quantity += 1;
            await cartItem.save();
        } else {
            const newCartItem = {
              userId,
              productId,
              quantity: 1,
              status: 1,
              insert_date_time: moment().format("YYYY-MM-DD HH:mm:ss"),
              userDetail: {
                  username: user.username,
                  email: user.email,
              },
              productDetail: {
                  productName: product.productName,
                  price: product.price,
                  image: product.image,
                  description: product.description,
                  category: product.category,
                  quantity: product.quantity,
              }
          };
          await cart.create(newCartItem);
        }

        const updatedCart = await cart.find({ userId })
            .populate({
                path: 'productId',
                model: 'addProduct_admin',
                select: 'productName price image description category quantity',
            })
            .populate({
                path: 'userId',
                model: 'signup_user',
                select: 'username email'
            })
            .exec();

        return SuccessResponse(res, "Product added to cart successfully.", { cart: updatedCart });
    } catch (error) {
        console.error(error);
        return ErrorResponse(res, "An error occurred while adding the product to cart.");
    }
};

export const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    
    const cartItem = await cart.findOne({ userId, productId });
    if (!cartItem) {
      return ErrorResponse(res, "Cart item not found.");
    }

    cartItem.status = -9;
    cartItem.softDeleteDate = new Date(); 
    await cartItem.save();

    setTimeout(async () => {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

      try {
        const itemToDelete = await cart.findOne({
          _id: cartItem._id,
          status: -9,
          softDeleteDate: { $lte: twoDaysAgo },
        });

        if (itemToDelete) {
          await cart.deleteOne({ _id: itemToDelete._id });
          console.log(`Item with id ${cartItem._id} permanently deleted after 1 minute`);
        }
      } catch (deleteError) {
        console.error("Error during scheduled deletion:", deleteError);
      }
    }, 2 * 24 * 60 * 60 * 1000);

    return SuccessResponse(res, "Cart item marked for deletion (soft delete). It will be permanently removed after 2 days.", { cartItem });
  } catch (error) {
    console.error(error);
    return ErrorResponse(res, "An error occurred while removing the cart item.");
  }
};

export const buyNow = async (req, res) => {
  try {
    const { userId, productId, address, mobileno } = req.body;

    const product = await addProducts.findById(productId);
    if (!product) {
      return ErrorResponse(res, "Product not found.");
    }
    const user = await userSignup.findById(userId);
    if (!user) {
      return ErrorResponse(res, "User not found.");
    }
    const existingOrder = await order.findOne({ userId, productId });
    if (existingOrder) {
      return ErrorResponse(res, "Order for this product already exists.");
    }

    const orderData = {
      userId,
      productId,
      insert_date_time: moment().format("YYYY-MM-DD HH:mm:ss"),
      address,
      mobileno,
      userDetails: {
        username: user.username,
        email: user.email,
      },
      productDetails: {
        productName: product.productName,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: product.quantity,
      },
    };
    const newOrder = new order(orderData);
    await newOrder.save();

    return SuccessResponse(res, "Order placed successfully", { order: newOrder });
  } catch (error) {
    console.error(error);
    return ErrorResponse(res, "An error occurred while placing the order.");
  }
};

export const placeCartOrder = async (req, res) => {
  try {
    const { userId, mobileno, address } = req.body;

    const user = await userSignup.findById(userId);
    if (!user) {
      return ErrorResponse(res, "User not found.");
    }

    const cartItems = await cart
      .find({ userId })
      .populate({
        path: 'productId',  
        model: 'addProduct_admin',
        select: 'productName price image description category', 
      })
      .exec();
    if (cartItems.length === 0) {
      return ErrorResponse(res, "Cart is empty.");
    }

    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const categoryQuantities = {};

    
    cartItems.forEach(item => {
      const category = item.productId.category; 
      const quantity = item.quantity; 
      if (!category) {
        console.warn(`No category found for product ID: ${item.productId._id}`);
        return; 
      }
      if (!categoryQuantities[category]) {
        categoryQuantities[category] = 0; 
      }
      categoryQuantities[category] += quantity;
    });

    const orderData = {
      userId,
      mobileno,
      address,
      insert_date_time: moment().format("YYYY-MM-DD HH:mm:ss"),
      totalQuantity,
      userDetails: {
        username: user.username,
        email: user.email,
      },
      productDetails: cartItems.map(item => ({
        productId: item.productId._id,
        productName: item.productId.productName,
        description: item.productId.description,
        price: item.productId.price,
        image: item.productId.image,
        category: item.productId.category,
      })),
      categoryQuantities,
    };
    const newOrder = new order(orderData);
    await newOrder.save();
    await cart.deleteMany({ userId });
    
    return SuccessResponse(res, "Order placed successfully", { order: newOrder });
  } catch (error) {
    console.error(error);
    return ErrorResponse(res, "An error occurred while placing the order.");
  }
};



export const getCartItems = async (req, res) => {
  try {
    const userId = req.body.userId;

    const product = await cart
      .find({ userId })
      .lean();

    return SuccessResponse(res, "Products found successfully.", { product });
  } catch (error) {
    console.error(error);
    return ErrorResponse(res, "An error occurred while fetching products.");
  }
}


  
