var db = require('./../config/conn_db');

var RecommendVO = {
    
    insertRecommend: function(params, callback) {
        return db.query(
            "insert into            \
                recommend_nums(     \
                    num1,          \
                    num2,          \
                    num3,          \
                    num4,          \
                    num5,          \
                    num6,          \
                    sum,            \
                    lavg,           \
                    low,            \
                    high,           \
                    odd,            \
                    even)           \
                 values ?", [params], callback);
    },

    getAll: function(params, callback) {
        return db.query(
            "select             \
                num1,           \
                num2,           \
                num3,           \
                num4,           \
                num5,           \
                num6            \
            from                \
                recommend_nums  \
            where sum           \
                between ? and ? \
            and                 \
                low = ?         \
            and                 \
                high = ?        \
            and                 \
                odd = ?         \
            and                 \
                even = ?", params, callback);
    }
 };

 module.exports = RecommendVO;