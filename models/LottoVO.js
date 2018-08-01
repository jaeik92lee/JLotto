var db = require('./../config/conn_db');

const TEN_TIMES_COUNT = 10;

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

    getTentimesOddEven: function(params, callback) {
        return db.query(
            "select         \
                odd,        \
                even        \
            from            \
                lotto_nums  \
            order by        \
                lorder desc \
            limit " + TEN_TIMES_COUNT, params, callback);
    },

    getTenTimesLowHigh: function(params, callback) {
        return db.query(
            "select         \
                low,        \
                high        \
            from            \
                lotto_nums  \
            order by        \
                lorder desc \
            limit " + TEN_TIMES_COUNT, params, callback);
    },

    getTenTimesRemain: function(params, callback) {
        return db.query(
            "select         \
                num_1,      \
                num_2,      \
                num_3,      \
                num_4,      \
                num_5,      \
                num_6       \
            from            \
                lotto_nums  \
            order by        \
                lorder desc \
            limit " + TEN_TIMES_COUNT, params, callback);
    },

    getNoOrder: function(params, callback) {
        return db.query(
            "select     \
                lorder  \
            from        \
                lotto_nums", params, callback);
    }
 };

 module.exports = LottoVO;