import { createContext, useContext, useState } from "react";

const CarritoContext = createContext();

export function useCarrito() {
  return useContext(CarritoContext);
}

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const addToCarrito=(producto) =>{
    setCarrito(prev => {
      const existente = prev.find(item => item._id === producto._id);
      if (existente) {
        return prev.map(item =>
          item._id === producto._id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  }

  function removeFromCarrito(id) {
    setCarrito(prev =>
      prev
        .map(item =>
          item._id === id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter(item => item.cantidad > 0)
    );
  }

 const clearCarrito=()=> {
    setCarrito([]);
  }

  return (
    <CarritoContext.Provider value={{ carrito, addToCarrito, removeFromCarrito, clearCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
}
