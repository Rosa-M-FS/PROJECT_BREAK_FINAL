
const mongoose = require("mongoose");
const Product = require("./src/models/material");
require("dotenv").config(); 

const productos = [
  {
    "tipo": "hilo",
    "nombre": "Algodón natural",
    "colores": [
      "Crudo",
      "Beige",
      "Terracota",
      "Verde musgo"
    ]
  },
  {
    "tipo": "hilo",
    "nombre": "Hilo de lino",
    "colores": [
      "Arena",
      "Marrón claro",
      "Mostaza"
    ]
  },
  {
    "tipo": "tela",
    "nombre": "Lino estampado floral",
    "colores": [
      "Rosa viejo",
      "Verde oliva",
      "Celeste"
    ]
  },
  {
    "tipo": "tela",
    "nombre": "Tela de algodón lisa",
    "colores": [
      "Marfil",
      "Lavanda",
      "Azul marino"
    ]
  },
  {
    "tipo": "hilo",
    "nombre": "Hilo metálico decorativo",
    "colores": [
      "Oro",
      "Cobre",
      "Plata"
    ]
  }
];


(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://rmlopezrobles:qEjTTJGyhFgQ5PHW@projectbreak.rf3s5.mongodb.net/?retryWrites=true&w=majority&appName=PROJECTBREAK");
    await Product.deleteMany({});
    await Product.insertMany(productos);
    console.log("Productos importados con éxito!");
    process.exit(0);
  } catch (err) {
    console.error("Error al importar productos:", err);
    process.exit(1);
  }

})();

