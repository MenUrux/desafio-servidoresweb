const ProductManager = require('./ProductManager.js');
const express = require('express');

const app = express();


app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hola desde servidor express')
});

app.get('/products', async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await manager.getProducts();
        let result;

        if (limit) {
            const numLimit = parseInt(limit, 10);
            if (!isNaN(numLimit)) {
                result = products.slice(0, numLimit);
            } else {
                return res.status(400).json({ message: "El valor de 'limit' debe ser un número." });
            }
        } else {
            result = products;
        }

        // Verificar si el resultado está vacío
        if (result.length === 0) {
            res.status(404).json({ message: "No se encontraron productos." });
        } else {
            res.json(result);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos', error: error.message });
    }
});


app.get('/products/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const products = await manager.getProducts();
        const product = products.find((p) => p.id === parseInt(pid));

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'No se ha encontrado el producto' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
    }
});




app.listen(8080, () => {
    console.log('Escuchando desde puerto 8080')
})


//Se creará una instancia de la clase “ProductManager”
const manager = new ProductManager();

console.log('addProduct(Manzana) =>', manager.addProduct('Manzana', 'Manzana roja', 70.00, './img/manzanaroja.png', 'F1020', 50));
console.log('addProduct(Frutillas) =>', manager.addProduct('Frutillas', 'Frutilla', 70.00, './img/frutilla.png', 'F1021', 50));
console.log('addProduct(Banana) =>', manager.addProduct('Banana', 'Banana amarilla', 50.00, './img/banana.png', 'F1022', 70));
console.log('addProduct(Naranja) =>', manager.addProduct('Naranja', 'Naranja dulce', 60.00, './img/naranja.png', 'F1023', 60));
console.log('addProduct(Uva) =>', manager.addProduct('Uva', 'Uva morada', 80.00, './img/uva.png', 'F1024', 40));
console.log('addProduct(Piña) =>', manager.addProduct('Piña', 'Piña tropical', 90.00, './img/pina.png', 'F1025', 30));
console.log('addProduct(Mango) =>', manager.addProduct('Mango', 'Mango delicioso', 95.00, './img/mango.png', 'F1026', 35));
console.log('addProduct(Pera) =>', manager.addProduct('Pera', 'Pera verde', 65.00, './img/pera.png', 'F1027', 45));
console.log('addProduct(Kiwi) =>', manager.addProduct('Kiwi', 'Kiwi verde', 85.00, './img/kiwi.png', 'F1028', 40));
console.log('addProduct(Cereza) =>', manager.addProduct('Cereza', 'Cereza roja', 110.00, './img/cereza.png', 'F1029', 35));
console.log('addProduct(Mora) =>', manager.addProduct('Mora', 'Mora negra', 90.00, './img/mora.png', 'F1030', 45));
console.log('addProduct(Frambuesa) =>', manager.addProduct('Frambuesa', 'Frambuesa roja', 115.00, './img/frambuesa.png', 'F1031', 38));
console.log('addProduct(Durazno) =>', manager.addProduct('Durazno', 'Durazno jugoso', 75.00, './img/durazno.png', 'F1032', 50));
console.log('addProduct(Sandía) =>', manager.addProduct('Sandía', 'Sandía refrescante', 130.00, './img/sandia.png', 'F1033', 25));
console.log('addProduct(Melón) =>', manager.addProduct('Melón', 'Melón dulce', 120.00, './img/melon.png', 'F1034', 28));
console.log('addProduct(Coco) =>', manager.addProduct('Coco', 'Coco tropical', 140.00, './img/coco.png', 'F1035', 20));
console.log('addProduct(Granada) =>', manager.addProduct('Granada', 'Granada roja', 100.00, './img/granada.png', 'F1036', 30));
console.log('addProduct(Papaya) =>', manager.addProduct('Papaya', 'Papaya naranja', 95.00, './img/papaya.png', 'F1037', 32));
console.log('addProduct(Higo) =>', manager.addProduct('Higo', 'Higo morado', 105.00, './img/higo.png', 'F1038', 33));


manager.load()
console.log(`------------------------------`)






