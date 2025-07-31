import DiscountCode from "../models/DiscountCode.js";
import UserDiscount from "../models/UserDiscount.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const applyDiscount = async (req, res, next) => {
  try {
    const { code } = req.body;
    const userId = req.userId;

    //console.log("Applying discount code:", code, "for user ID:", userId);

    const discount = await DiscountCode.findOne({ where: { code } });

    if (!discount) {
      throw new ErrorResponse("Invalid discount code", 400);
    }

    // Check if user has already used this code
    const alreadyUsed = await UserDiscount.findOne({
      where: {
        userId,
        discountCodeId: discount.id,
      },
    });

    if (alreadyUsed) {
      throw new ErrorResponse("You have already used this discount code", 400);
    }

    // Mark the discount as used for this user
    await UserDiscount.create({
      userId,
      discountCodeId: discount.id,
    });

    res.json({
      message: "Discount applied successfully",
      discount: {
        amount: discount.amount,
        type: discount.type, // "percentage" or "fixed"
        code: discount.code,
        percentage: discount.percentage, // Only if type is "percentage"
      },
    });
  } catch (err) {
    next(err);
  }
};
