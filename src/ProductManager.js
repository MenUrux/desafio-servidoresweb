
const fs = require("fs");

class Product {
    constructor(id, title, description, price, thumbnail, code, stock) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

class ProductManager {
    constructor() {
        //Tuve que cambiar el constructor dado a que si lo seguia inicializando como antes, me borraba todo el json
        this.products = [];
        this.path = './products-data.json';
        this.nextId = 1;
        this.load();  // Cargar datos al iniciar
        console.log('[ProductManager]\tSe creo una instancia')
    }

    async save() {
        const content = JSON.stringify(this.products, null, "\t");
        try {
            console.log('[save]\tEscribiendo contenido en el path', this.path)
            await fs.promises.writeFile(this.path, content, "utf-8");
        } catch (error) {
            console.log('[save]\tHa ocurrido un error: ', error)
        }
    }


    async load() {
        try {
            if (fs.existsSync(this.path)) {
                const jsonToArray = await fs.promises.readFile(this.path, "utf-8");
                this.products = JSON.parse(jsonToArray);
                console.log("[load]\tDatos cargados:", this.products);


                // Esta parte de abajo tuve que hacerla con chat gpt porque no entendia por qué se me creaba un producto con id 1 cada vez que lo ejecutaba
                if (this.products.length > 0) {
                    const maxId = Math.max(...this.products.map(product => product.id));
                    this.nextId = maxId + 1;
                }
                //
                else {
                    console.log("[load]\tEl archivo no existe.");
                }
            }
        } catch (error) {
            console.log("[load]\tError al cargar los datos:", error);
        }
    }



    addProduct(title, description, price, thumbnail, code, stock) {
        return new Promise((resolve, reject) => {
            // Verificación de campos requeridos
            if (!title || !description || !price || !thumbnail || !code || !stock) {
                reject('[addProduct]\tTodos los campos son requeridos, no se agregó ningún producto.');
                return;
            }

            // Verificación de código
            if (this.getProductByCode(code)) {
                reject(`[addProduct]\tNo se puede agregar porque ya existe un producto con el mismo 'code'. Codigo: ${code}`);
                return;
            }

            // Verificación de ID (esto parece redundante si estás usando un ID incremental)
            if (this.getProductById(this.nextId)) {
                reject(`[addProduct]\tNo se puede agregar porque ya existe un producto con el mismo 'id'. Codigo: ${this.nextId}`);
                return;
            }

            // Creación y almacenamiento del producto
            const product = new Product(this.nextId, title, description, price, thumbnail, code, stock);
            this.products.push(product);
            this.nextId++;
            console.log(`[addProduct]\tSe agrego el producto id: ${product.id} ${product.title} ${product.code}`);

            // Guardar producto (asumo que la función save() guarda los productos en algún almacenamiento)
            this.save(); // Nota: Si save es una operación asincrónica, deberías refactorizarla para usar promesas también y llamarla con await.

            resolve(product);
        });
    }

    // Nota: Deberías tener las funciones getProductByCode y getProductById definidas en alguna parte de tu clase.



    getProductByCode(code) {
        return this.products.find(product => product.code === code) || null;
    }

    getProductById(id) {
        const foundProduct = this.products.find(product => product.id === id);
        if (foundProduct) {

            return console.log("[getProductById]\tProducto encontrado:", foundProduct);
        } else {

            return console.log("[getProductById]\tNo se encontró el producto con ID:", id);
        }
    }


    updateProduct(id, title, description, price, thumbnail, code, stock) {
        const product = this.products.find(p => p.id === id);

        if (this.getProductByCode(code)) {
            return console.log(`[updateProduct]\tNo se puede modificar porque ya existe un producto con el mismo 'code'. Codigo: ${code}`);
        }

        if (product) {
            product.title = title || product.title;
            product.description = description || product.description;
            product.price = price || product.price;
            product.thumbnail = thumbnail || product.thumbnail;
            product.code = code || product.code;
            product.stock = stock || product.stock;

            this.save();

            console.log(`[updateProduct]\tSe modifico el producto id ${id}, con los siguientes campos: ${product.title}, ${product.description}, ${product.price}, ${product.thumbnail}, ${product.code}, ${product.stock} `);
            return product;
        }


        return console.log(`[updateProduct]\tNo se encontró el producto con el ID ${id}`);;
    }


    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {

            this.products.splice(index, 1)[0];
            this.save();
            return console.log(`[deleteProduct]\tSe ha eliminado el producto con ID ${id}`);
        }
        return console.log(`[deleteProduct]\tNo existe producto con el ID ${id}, por lo cual no se ha eliminado ningún elemento.`);
    }




    getProducts() {
        if (this.products.length === 0) {
            // return this.products;
            // Si quisiera mostrar un mensaje podría utilizar lo siguiente:
            console.log(this.products)
            return `[getProducts]\tNo existen productos`, this.products;
        } else {
            return this.products;
            // Para obtener los codigos y los nombres de cada producto, se podria utilizar algo asi:
            //return 'Obtener todos los elementos: ' + this.products.map(product => `${product.code} - ${product.title}`).join(', '); //Viejo
            // return this.products.map(product => `${product.code} - ${product.title}`);
        }
    }

}


module.exports = ProductManager;
