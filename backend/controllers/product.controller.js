// get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.status(200).json(products);
    } catch (error) {
        console.log('Error in getAllProducts controller', error);
        res.status(500).json({
            success: false,
            message: 'Error in getAllProducts controller',
        });
    }
};

// get product by id (using params)
export const getProductById = async (req, res) => {};
