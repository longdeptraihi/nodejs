import Product from '../models/product'
import formidable from 'formidable';
import fs from 'fs';
import _ from 'lodash'

export const create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: " thêm sản phẩm không thành công"
            })
        }

        const { name, description, price,  } = fields;
        if (!name || !description || !price ) {
            return res.status(400).json({
                error: " bạn cần nhập đầy đủ thông tin"
            })
        }
        let product = new Product(fields);

        if (files.photo) {
            if (files.photo.size > 100000) {
                res.status(400).json({
                    error: "bạn nên up ảnh dưới 1 mb"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }
        console.log(product);
        product.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: " không thêm đươc sản phẩm"
                })
            }
            res.json(data)
        })
    })

}

export const productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            res.status(400).json({
                error: " không tìm thấy sp"
            })
        }
        req.product = product;
        next();
    })
}

export const read = (req, res) => {
    return res.json(req.product);
}

export const remove = (req, res) => {
    let product = req.product;
    product.remove((err, deleteProduct) => {
        if (err) {
            return res.status(400).json({
                error: "không xóa được sản phẩm "
            })
        }
        res.json({
            product: deleteProduct,
            message: " sản phẩm đã được xóa thành công"
        })
    })
}
export const list = (req, res) => {
    Product.find((err, data) => {
        if(err){
            error: "không tìm thấy sp"
        }
        res.json(data)
    })
}

export const update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: " sửa sản phẩm không thành công"
            })
        }

        const { name, description, price, category } = fields;
        if (!name || !description || !price || !category) {
            return res.status(400).json({
                error: " bạn cần nhập đầy đủ thông tin"
            })
        }
        //let product = new Product(fields);
        let product = req.product;
        product = _.assignIn(product, fields);

        if (files.photo) {
            if (files.photo.size > 100000) {
                res.status(400).json({
                    error: "bạn nên up ảnh dưới 1 mb"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }
        product.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: " không sửa đươc sản phẩm"
                })
            }
            res.json(data)
        })
    });

}
export const photo = (req, res, next) => {
    if(req.product.photo.data){
        res.set('Content-Type', req.product.photo.data.contentType);
        return res.send(req.product.photo.data)
    }
    next();
}