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
    }    
 };

 module.exports = RecommendVO;