var client = require('cheerio-httpcli');
var LottoVO = require('./../models/LottoVO');

var params = [],
    url = "http://nlotto.co.kr/gameResult.do";

var nums = [ 0, 0, 0, 0, 0, 0 ],
    sum, avg, low, high, odd, even,
    i, get_num, win_numbers;

const   MAX_COUNT = 6,
        CONST_START_ORDER = 1,
        CONST_FINISH_ORDER = 817;

let printHttpResponse = (keyword) => client.fetch (url, { 
    "method": "byWin",
    "drwNo": keyword 
}, (err, $, res, body ) => {
    if(err) {
        console.log(err);
    } else {
        win_numbers= $("div.lotto_win_number")
                        .find("p.number")
                        .find("img");

        sum = avg = low = high = odd = even = 0;

        for ( i=0 ; i<MAX_COUNT ; i++ ) {
            get_num = parseInt(win_numbers[i].attribs.alt);
            nums[i] = get_num;

            if( get_num%2 == 0 ) even += 1;
            else odd += 1;

            if( get_num > 22 ) high += 1;
            else low += 1;

            sum += get_num;
            avg = parseFloat((sum/MAX_COUNT).toFixed(2));
        }

        
        params = [
            keyword,
            nums[0], 
            nums[1],
            nums[2], 
            nums[3], 
            nums[4], 
            nums[5],
            sum,
            avg,
            low,
            high,
            odd,
            even
        ];

        console.log(params);
        LottoVO.insertLotto(params, function(err, rows) { });
    }
})

var lotto_crawler = {
    run: (order) => {
        printHttpResponse(order);
    }
}

module.exports = lotto_crawler;