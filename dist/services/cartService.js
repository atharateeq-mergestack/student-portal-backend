"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCartByUserId = exports.deleteCart = exports.updateCart = exports.getCartByProductId = exports.getCartById = exports.getCartForUser = exports.getCarts = exports.createCart = void 0;
const Cart_1 = __importDefault(require("@models/Cart"));
// Create cart with multiple productIds
const createCart = (userId, addInCart, productIdToDelete) => __awaiter(void 0, void 0, void 0, function* () {
    // If neither addInCart nor productIdToDelete is provided, return null
    if (!addInCart && !productIdToDelete) {
        return null;
    }
    // Find the user's existing cart
    let existingCart = yield Cart_1.default.findOne({ userId });
    // If the user has no existing cart and addInCart is provided, create a new cart
    if (!existingCart && addInCart) {
        const newCart = new Cart_1.default({
            userId,
            cartItems: [{ productId: addInCart.productId, itemAmount: addInCart.itemAmount }],
        });
        const a = yield newCart.save();
        return yield (0, exports.getCartById)(newCart.id);
    }
    // If the user has an existing cart
    if (existingCart) {
        // If productIdToDelete is provided, remove the product from the cart
        if (productIdToDelete) {
            existingCart.cartItems = existingCart.cartItems.filter((item) => item.productId.toString() !== productIdToDelete.toString());
            yield existingCart.save();
            return yield (0, exports.getCartById)(existingCart.id);
        }
        // If addInCart is provided, update or add the product to the cart
        if (addInCart) {
            const existingItem = existingCart.cartItems.find((item) => item.productId.toString() === addInCart.productId.toString());
            if (existingItem) {
                // Update the itemAmount if the product is already in the cart
                existingItem.itemAmount = addInCart.itemAmount;
            }
            else {
                // Add the new item to the cart
                existingCart.cartItems.push(addInCart);
            }
            yield existingCart.save();
            return yield (0, exports.getCartById)(existingCart.id);
        }
    }
    // If we reach here, the logic is not expected to handle anything else
    return null;
});
exports.createCart = createCart;
// Fetch all carts with populated productIds
const getCarts = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Cart_1.default.find({}).populate('cartItems.productId').exec(); // Changed to productIds
});
exports.getCarts = getCarts;
const getCartForUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Cart_1.default.find({ userId }).populate('cartItems.productId').exec(); // Changed to productIds
});
exports.getCartForUser = getCartForUser;
const getCartById = (cartId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Cart_1.default.findById(cartId).populate('cartItems.productId').exec(); // Changed to productIds
});
exports.getCartById = getCartById;
const getCartByProductId = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Cart_1.default.find({ 'cartItems.productId': productId }).populate('cartItems.productId').exec(); // Changed to productIds
});
exports.getCartByProductId = getCartByProductId;
const updateCart = (cartId, cartData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Cart_1.default.findByIdAndUpdate(cartId, cartData, { new: true, runValidators: true }).exec();
});
exports.updateCart = updateCart;
// Delete cart by ID
const deleteCart = (cartId) => __awaiter(void 0, void 0, void 0, function* () {
    yield Cart_1.default.findByIdAndDelete(cartId).exec();
});
exports.deleteCart = deleteCart;
// Delete cart by user ID
const deleteCartByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield Cart_1.default.findOneAndDelete({ userId }).exec();
});
exports.deleteCartByUserId = deleteCartByUserId;
