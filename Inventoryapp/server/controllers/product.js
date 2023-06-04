const Product = require("../models/productModel");
const crypto = require("crypto");
const AWS = require("aws-sdk");

const BUCKET_NAME = process.env.BUCKET_NAME;
const BUCKET_REGION = process.env.BUCKET_REGION;
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;

const s3 = new AWS.S3({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
});

//@desc   Create a product
//@route  POST /api/v1/products
//@access Private
const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json({ status: "success", data: savedProduct });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error: "Something went wrong" });
  }
};

//@desc   Get all products
//@route  GET /api/v1/products
//@access Private
const getAllProducts = async (req, res) => {
  try {
    const { category, sort, minPrice, maxPrice, gender } = req.query;

    let queryObject = {};

    if (gender) {
      queryObject.gender = gender;
    }

    if (category) {
      const categories = category.split(",");
      queryObject.category = { $in: categories };
    }

    if (minPrice && maxPrice) {
      queryObject.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
    }
    //Filtering the result with given queries
    let result = Product.find(queryObject);

    //total results count
    const totalResultsCount = await Product.countDocuments(queryObject);
    console.log("totalResultsCount", totalResultsCount);

    /* checks if the users wants to sort the results
      and sorting the results  */
    if ((sort && sort === "-1") || sort === "1") {
      // const sortList = sort.split(",").join(" ");
      result = result.sort({ price: sort });
    } else {
      result = result.sort({ createdAt: 1 });
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const allProducts = await result;

    res.status(200).json({
      status: "success",
      data: allProducts,
      productsCount: totalResultsCount,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error: "Something went wrong" });
  }
};

//@desc   Search for a product
//@route  GET /api/v1/products
//@access Private
const searchProducts = async (req, res) => {
  try {
    const { name } = req.query;
    let queryObject = {};
    if (name) {
      queryObject.name = { $regex: name, $options: "i" };
    }
    const products = await Product.find(queryObject).sort({ price: 1 });
    res.status(200).json({ status: "success", data: products });
  } catch (error) {
    res.status(500).json({ status: "error", error: "Something went wrong" });
  }
};

//@desc   Get one product
//@route  GET /api/v1/products
//@access Private
const getSingleProduct = async (req, res) => {
  try {
    const productID = req.params.id;
    const product = await Product.findById(productID);
    res.status(200).json({ status: "success", data: product });
  } catch (error) {
    res.status(500).json(error);
  }
};

//@desc   Update a product
//@route  PUT /api/v1/products
//@access Private
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedProduct) {
      res
        .status(400)
        .json({ status: "error", error: "Product doesn't exists!" });
    }

    res.status(200).json({ status: "success", data: updatedProduct });
  } catch (error) {
    res.status(500).json({ status: "error", error: "Something went wrong" });
  }
};

//@desc   Delete a product
//@route  DELETE /api/v1/products
//@access Private
const deleteProduct = async (req, res) => {
  const { id: productID } = req.params;
  try {
    const deletedProduct = await Product.findOneAndDelete({ _id: productID });
    console.log("deleted product", deletedProduct);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ status: "error", error: `No Product with id ${productID}` });
    }

    //Deleting the file from S3 bucket
    const imageUrl = deletedProduct.imageUrl;
    const fileKey = imageUrl.replace("https://mern-ecom.s3.amazonaws.com/", "");
    
    deleteImage(fileKey);

    res.status(200).json({ status: "success", message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ status: "error", error: "Something went wrong" });
  }
};


const uploadImage = async (req, res) => {
  try {
    console.log("req.body", req.body);
    console.log("req.file", req.file);
    req.file.buffer;

    const randomKeyName = (bytes = 16) =>
      crypto.randomBytes(bytes).toString("hex");

    const params = {
      Bucket: BUCKET_NAME,
      Key: randomKeyName(),
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.log("Error occurred while trying to upload to S3 bucket", err);
        return res.status(500).json({ message: "upload failed" });
      }
      const imageURL = `${process.env.CLOUDFRONT_DOMAIN}${data.key}`;
      return res
        .status(200)
        .json({ message: "success", imageURL: imageURL });
    });
  } catch (error) {
    console.log(error);
    return res.send(400).json({ status: "error", error: error });
  }
};

const deleteImage = (fileKey) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileKey,
  };
  s3.deleteObject(params, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    }
    console.log("data", data);
    console.log("FIle deleted");
  });
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  getSingleProduct,
  deleteProduct,
  searchProducts,
  uploadImage,
};
