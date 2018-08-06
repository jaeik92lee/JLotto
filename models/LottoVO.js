var db = require('./../config/conn_db');

const TEN_TIMES_COUNT = 10;

var LottoVO = {
    
    insertLotto: function(params, callback) {
        return db.query(
            "insert into    \
                lotto_nums(      \
                    lorder,  \
                    num1,  \
                    num2,  \
                    num3,  \
                    num4,  \
                    num5,  \
                    num6,  \
                    sum,    \
                    lavg,    \
                    low,    \
                    high,   \
                    odd,    \
                    even)  \
                 values(?)", [params], callback);
    },

    getTotalDatas: function(params, callback) {
        return db.query(
            "select                 \
                num1,               \
                num2,               \
                num3,               \
                num4,               \
                num5,               \
                num6,               \
                lorder as legend,   \
                sum,                \
                lavg as avg         \
            from                    \
                lotto_nums          \
            order by                \
                lorder desc;", params, callback)
    },
 
    getLegend: function(params, callback) {
        return db.query(
            "select                 \
                lorder as legend    \
            from                    \
                lotto_nums;", params, callback);
    },

    getTentimesLegends: function(params, callback) {
        return db.query(
            "select                 \
                lorder as legend    \
            from                    \
                lotto_nums          \
            order by                \
                lorder desc         \
            limit " + TEN_TIMES_COUNT, params, callback);
    },

    getTentimesDatas: function(params, callback) {
        return db.query(
            "select     \
                num1,   \
                num2,   \
                num3,   \
                num4,   \
                num5,   \
                num6,   \
                sum,    \
                lavg,    \
                low,    \
                high,   \
                odd,    \
                even    \
            from        \
                lotto_nums  \
            order by        \
                lorder  desc    \
            limit " + TEN_TIMES_COUNT, params, callback);
    },
  


 };

 module.exports = LottoVO;