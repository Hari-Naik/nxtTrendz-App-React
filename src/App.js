import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  incrementCartItemQuantity = id => {
    const {cartList} = this.state

    const updatedCartList = cartList.map(item => {
      if (item.id === id) {
        const updatedQuantity = item.quantity + 1
        return {...item, quantity: updatedQuantity}
      }
      return item
    })

    this.setState({cartList: updatedCartList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state

    const cartItem = cartList.find(item => item.id === id)
    if (cartItem.quantity > 1) {
      this.setState({
        cartList: cartList.map(item => {
          if (item.id === id) {
            const updatedQuantity = item.quantity - 1
            return {...item, quantity: updatedQuantity}
          }
          return item
        }),
      })
    } else {
      this.removeCartItem(id)
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCarList = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: updatedCarList})
  }

  addCartItem = product => {
    const {cartList} = this.state
    //   TODO: Update the code here to implement addCartItem
    const cartItem = cartList.find(item => item.id === product.id)
    if (cartItem !== undefined) {
      this.setState({
        cartList: cartList.map(item => {
          if (item.id === product.id) {
            const updateQuantity = item.quantity + 1
            return {...item, quantity: updateQuantity}
          }
          return item
        }),
      })
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  render() {
    const {cartList, quantity} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          quantity,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
