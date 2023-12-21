import Product from "../models/product/product";

export const allProduct = async (req, res) => {
  try {
    const allProduct = await Product.find();
    res.status(200).json({
      products: allProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "No se encontraron Productos",
    });
  }
};

export const newProduct = async (req, res) => {
  try {
    const {
      name,
      imageOne,
      imageTwo,
      imageThree,
      price,
      description,
      stock,
      category,
      sizes,
    } = req.body;

    const productNew = new Product({
      name,
      imageOne,
      imageTwo,
      imageThree,
      price,
      description,
      stock,
      category,
      sizes,
    });

    const product = await productNew.save();
    res.status(200).json({
      message: "Producto agregado correctamente",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "no se pudo agregar el producto" });
  }
};

export const productId = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "Error al buscar producto",
    });
  }
};

export const editProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    const {
      name,
      imageOne,
      imageTwo,
      imageThree,
      price,
      description,
      stock,
      category,
      sizes,
    } = req.body;

    product.name = name;
    product.imageOne = imageOne;
    product.imageTwo = imageTwo;
    product.imageThree = imageThree;
    product.price = price;
    product.description = description;
    product.stock = stock;
    product.category = category;
    product.sizes = sizes;

    await product.save();

    res.status(200).json({
      message: "Producto editado correctamente",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error al editar producto",
    });
  }
};

export const deletProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Producto borrado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error al borrar producto",
    });
  }
};
