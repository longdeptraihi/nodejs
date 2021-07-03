import Category from '../models/category';
import formidable from 'formidable';
import _ from 'lodash'

export const create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: " thêm danh mục không thành công"
            })
        }

        const { name } = fields;
        if (!name ) {
            return res.status(400).json({
                error: " bạn cần nhập đầy đủ thông tin"
            })
        }
        let category = new Category(fields);
       
        console.log(category)
        category.save((err, data)  => {
            if(err){
                console.log(err.message);
                return res.status(400).json({
                    error: " không thêm được danh mục"
                })
            }
            res.json(data)
        })
    })   
}
export const list = (req, res) =>{
    Category.find((err, categories) => {
        if(err){
            return res.status(400).json({
                error: " không có danh mục"
            })
        }
        res.json(categories)
    })
}
export const categoryById = (req, res, next, id) =>{
    Category.findById(id).exec((err, category) => {
        if(err || !category){
            res.status(400).json({
                error:"Không tìm thấy danh mục"
            })
        }
        req.category = category;
        next()
    })
}
export const read = (req, res) => {
    return res.json(req.category);
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

        const { name } = fields;
        if (!name) {
            return res.status(400).json({
                error: " bạn cần nhập đầy đủ thông tin"
            })
        }
        //let product = new Product(fields);
        let category = req.category;
        category = _.assignIn(category, fields);

        category.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: " không sửa đươc sản phẩm"
                })
            }
            res.json(data)
        })
    });

}
export const remove = (req, res) => {
    const category = req.category;
    category.remove((err, deletedCategory) => {
        if(err || !category) {
            res.status(400).json({
                error: "danh mục này không tồn tại"
            })
        }
        res.json({
            deletedCategory,
            message: "xóa danh mục thành công"
        })
        
    })

}