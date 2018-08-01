var db = require('./../config/conn_db');

var RecommendVO = {
    
    insertRecommend: function(params, callback) {
        return db.query(
            "insert into            \
                recommend_nums(     \
                    num_1,          \
                    num_2,          \
                    num_3,          \
                    num_4,          \
                    num_5,          \
                    num_6,          \
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
                num_1,          \
                num_2,          \
                num_3,          \
                num_4,          \
                num_5,          \
                num_6           \
            from                \
                recommend_nums  \
            where               \
                sum >= ?        \
            and                 \
                sum <= ?        \
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