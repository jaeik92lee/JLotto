var db = require('./../config/conn_db');

var LottoVO = {
    
    insertLotto: function(params, callback) {
        return db.query(
            "insert into    \
                lotto_nums(      \
                    lorder,  \
                    num_1,  \
                    num_2,  \
                    num_3,  \
                    num_4,  \
                    num_5,  \
                    num_6,  \
                    sum,    \
                    lavg,    \
                    low,    \
                    high,   \
                    odd,    \
                    even)  \
                 values(?)", [params], callback);
    },

    getSumTotal: function(params, callback) {
        return db.query(
            "select                 \
                lorder as legend,    \
                sum                 \
            from                    \
                lotto_nums;", params, callback)
    },

    getAvgTotal: function(params, callback) {
        return db.query(
            "select                 \
                lorder as legend,    \
                lavg as avg         \
            from                    \
                lotto_nums", params, callback);
    },

    getLegend: function(params, callback) {
        return db.query(
            "select                 \
                lorder as legend    \
            from                    \
                lotto_nums;", params, callback);
    },

    getAll: function(params, callback) {
        return db.query(
            "select     \
                num_1,  \
                num_2,  \
                num_3,  \
                num_4,  \
                num_5,  \
                num_6,  \
                sum,    \
                lavg,    \
                low,    \
                high,   \
                odd,    \
                even    \
            from        \
                lotto_nums;", params, callback);
    },

    getNoOrder: function(params, callback) {
        return db.query(
            "select     \
                lorder  \
            from        \
                lotto_nums", params, callback);
    },

    /*
        var sql = "INSERT INTO Test (name, email, n) VALUES ?";
        var values = [
            ['demian', 'demian@gmail.com', 1],
            ['john', 'john@gmail.com', 2],
            ['mark', 'mark@gmail.com', 3],
            ['pete', 'pete@gmail.com', 4]
        ];
    */

    getAllComments: function(callback){
        return db.query("select * from comments;", callback);
    },
 
    getCommentsByWriter: function(writer, callback) {
        return db.query("select * from comments where writer = ?", [writer], callback);
    },

    addComments: function(params, callback) {
        return db.query("insert into comments(writer, comment) values(?, ?);", params, callback);
    },
    
    deleteComments: function(id, callback) {
        return db.query("delete from comments where id = ?;",[id], callback);
    },
 
    updateComments: function(id, params, callback) {
        params.push(id);
        return db.query("update comments set writer = ?, comment = ? where id = ?;", params, callback);
    },
 };

 module.exports = LottoVO;