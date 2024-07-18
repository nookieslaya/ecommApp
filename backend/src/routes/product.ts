import { Router, Request, Response } from "express";
import {ProductErrors, UserErrors} from "../errors";

const router = Router();
import { ProductModel } from "../models/product";
import { UserModel } from "../models/user";
import {verifyToken} from "./userRoute";

router.get("/", async (_, res: Response) => {
    const products = await ProductModel.find({});

    res.json({ products });
});

router.post("/checkout", verifyToken, async (req: Request, res: Response) => {
    const { customerID, cartItems } = req.body;
    try {
        const user = await UserModel.findById(customerID);

        const productIDs = Object.keys(cartItems);
        const products = await ProductModel.find({ _id: { $in: productIDs } });

        if (!user) {
            return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
        }
        if (products.length !== productIDs.length) {
            return res.status(400).json({ type: ProductErrors.NO_PRODUCT_FOUND });
        }

        let totalPrice = 0;
        for (const item in cartItems) {
             const product = products.find((product) => String(product._id) === item);
            if (!product) {
                return res.status(400).json({ type: ProductErrors.NO_PRODUCT_FOUND });
            }

            if (product.stockQuantity < cartItems[item]) {
                return res.status(400).json({ type: ProductErrors.NOT_ENOUGH_STOCK });
            }

            totalPrice += product.price * cartItems[item];
        }

        if (user.availableMoney < totalPrice) {
            return res.status(400).json({ type: ProductErrors.NO_AVAILABLE_MONEY });
        }

        user.availableMoney -= totalPrice;
        user.purchaseItems.push(...productIDs);

        await user.save();
        await ProductModel.updateMany(
            { _id: { $in: productIDs } },
            { $inc: { stockQuantity: -1 } }
        );

        res.json({ purchasedItems: user.purchaseItems });
    } catch (error) {
        console.log(error);
    }
});
router.get(
    "/purchased-items/:customerID",
    verifyToken,
    async (req: Request, res: Response) => {
        const { customerID } = req.params;
        try {
            const user = await UserModel.findById(customerID);

            if (!user) {
                return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
            }

            const products = await ProductModel.find({
                _id: { $in: user.purchaseItems },
            });

            res.json({ purchasedItems: products });
        } catch (error) {
            res.status(400).json({ type: UserErrors.NO_USER_FOUND });
        }
    }
);



export {router as productRouter}