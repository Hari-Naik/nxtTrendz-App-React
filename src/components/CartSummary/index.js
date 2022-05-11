import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let orderTotal = 0
      cartList.forEach(item => {
        orderTotal += item.quantity * item.price
      })

      return (
        <div className="cart-summary-container">
          <h2 className="order-total-value">
            <span>Order Total: </span>
            RS {orderTotal}/-
          </h2>
          <p>{cartList.length} items in cart</p>
          <button type="button" className="checkout-btn">
            checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
