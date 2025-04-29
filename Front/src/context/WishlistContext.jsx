import { createContext, useContext, useState,useEffect } from "react";

const WishlistContext = createContext();

export function useWishlist() {
  return useContext(WishlistContext);
}

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

 const toggleWishlist=(producto) =>{
    const existe = wishlist.find(item => item._id === producto._id);
    if (existe) {
      setWishlist(wishlist.filter(item => item._id !== producto._id));
    } else {
      setWishlist([...wishlist, producto]);
    }
  }
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist"));
    if (stored) setWishlist(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist=(producto)=>{
    if (!wishlist.find(p => p._id === producto._id)) {
      setWishlist(prev => [...prev, producto]);
    }
  }

  const removeFromWishlist=(id)=> {
    setWishlist(prev => prev.filter(p => p._id !== id));
  }
  const isInWishlist=(id)=>{
    return wishlist.some(item => item._id === id);
  }

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist, addToWishlist,removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}
