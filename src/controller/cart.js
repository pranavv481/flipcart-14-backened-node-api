const Cart = require("../models/cart");

exports.addItemTocart = (req, res) => {

     console.log(req.body.cartItems)

    Cart.findOne({ user: req.user._id })
        .exec((error, cart) => {
            if (error) {
                return res.status(400).json({ error })
            }
            if (cart) {
                
                /// If cart exist then update the cart
                //    res.status(200).json({message:cart})

              const items = cart.cartItems.find(c=>c.product == req.body.cartItems.product )
              

               if(items){
                Cart.findOneAndUpdate({ user: req.user._id, "cartItems.product":req.body.cartItems.product  }, {
                    "$set": {
                        "cartItems.$": {
                            ...req.body.cartItems,
                            quantity:parseInt(items.quantity) + parseInt(req.body.cartItems.quantity)  
                        }
                    }
                }).exec((error, cart) => {
                    if (error) {
                        return res.status(400).json({ error })
                    }
                    if (cart) {
                        return res.status(201).json({ cart })
                    }
                })
               }else{
                Cart.findOneAndUpdate({ user: req.user._id }, {
                    "$push": {
                        "cartItems": req.body.cartItems
                    }
                }).exec((error, cart) => {
                    if (error) {
                        return res.status(400).json({ error })
                    }
                    if (cart) {
                        return res.status(201).json({ cart })
                    }
                })
               }



                
            } else {
                /// if cart is not exist create a new cart
                const cart = new Cart({
                    user: req.user._id,
                    cartItems: [req.body.cartItems]
                })

                cart.save((error, cart) => {
                    if (error) {
                        return res.status(400).json({ error })
                    }
                    if (cart) {
                        return res.status(201).json({ cart })
                    }
                })
            }
        })



}