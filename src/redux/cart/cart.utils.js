export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id
    );

    if (existingCartItem) {
        return cartItems.map(cartItem => cartItem.id === cartItemToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
    }
    // if cartItem not found inside of an array then we want to return a new array 
    // with all of our existing cartItems that already there 
    // also want to add an object which is equal to our cartItem to add except 
    // we give it a base quantity of one.
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
}