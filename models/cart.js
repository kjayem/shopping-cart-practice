module.exports = function Cart(oldCart) {
    // if items, totalQty, totalPrice is undefined, set them to 0
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(item, id) {
        //check if this product already exists in the cart and if so, just update the qty.
        var storedItem = this.items[id];
        // if item doesnt exist in the cart
        if (!storedItem) {  
            storedItem = this.items[id] = {item: item, qty: 0, price: 0};
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    }

    // outputs the list of the products in the cart
    this.generateArray = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};