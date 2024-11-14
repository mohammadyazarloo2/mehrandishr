"use client"
import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.title === product.title)
    
    if (!existingProduct) {
      setCart(prev => [...prev, { ...product, quantity: 1 }])
    } else {
      setCart(prev => prev.map(item => 
        item.title === product.title 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    }
  }

  const removeFromCart = (productTitle) => {
    setCart(prev => prev.filter(item => item.title !== productTitle))
  }

  const decreaseQuantity = (productTitle) => {
    setCart(prev => prev.map(item => {
      if (item.title === productTitle) {
        if (item.quantity === 1) {
          return null
        }
        return { ...item, quantity: item.quantity - 1 }
      }
      return item
    }).filter(Boolean))
  }

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart,
      decreaseQuantity 
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
