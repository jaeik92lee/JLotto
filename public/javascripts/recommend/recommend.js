var recommend = (function(){
    const   COUNT           = 6,
            START_LOTTO_NUM = 1,
            END_LOTTO_NUM   = 45,
            LOW_HIGH_NUM    = 22,
            REMAIN_HEIGHT   = 10;
 
    getTentimesDatas = () => {
        var result = {
            sum: [],
            nums: [],
            low: [],
            high: [],
            odd: [],
            even: []
        };
        
        var tmp_nums = [];

        $.ajax({ 
            type: "GET",
            dataType: "json",
            async: false,
            url: "/lotto/tentimes/datas",
            success: function(datas){ 
                if( datas.legnth == 0 ) return;
                datas.map(function(item) {

                    tmp_nums = [];
                    tmp_nums.push(item.num1);
                    tmp_nums.push(item.num2);
                    tmp_nums.push(item.num3);
                    tmp_nums.push(item.num4);
                    tmp_nums.push(item.num5);
                    tmp_nums.push(item.num6);

                    result.nums.push(tmp_nums);
                    result.sum.push(item.sum);

                    result.low.push(0 - item.low);
                    result.high.push(item.high);

                    result.odd.push(0 - item.odd);
                    result.even.push(item.even);

                });
            }
        });
    
        return result;
    }

    getRemainDatas = (tentimes_data) => {

        var i, j,
            result = [],
            num_count = [];
        
        for( i=START_LOTTO_NUM ; i<=END_LOTTO_NUM + 1 ; i++ ) {
            num_count.push(0);
        }
 
        for( i=0 ; i<tentimes_data.length ; i++ ) {
            for( j=0 ; j<tentimes_data[i].length ; j++ ) {
                num_count[tentimes_data[i][j]]++;
            }
        }

        for( i=START_LOTTO_NUM ; i<=END_LOTTO_NUM ; i++ ) {
            if( num_count[i] == 0 ) result.push(REMAIN_HEIGHT);
            else result.push(num_count[i]);
        }

        return result;
    }

    run = (params) => {

        var result              = [],
            except_nums         = [],
            nums                = [],
            datas               = getTentimesDatas();
            temp_remain_datas   = getRemainDatas(datas.nums);

        for( var i=0 ; i<temp_remain_datas.length ; i++ ) {
            if(temp_remain_datas[i] == REMAIN_HEIGHT ) {
                except_nums.push(i + 1);
            }
        }
 
        $.ajax({ 
            type: "POST",
            url: "/recommend/getall",
            data: JSON.stringify(params),
            contentType: "application/json",             
            async: false,
            dataType: "json",                    
            success: function(result){ 
                nums = result;        
            }
        });

        var isException = false;
        for( var i=0 ; i<nums.length ; i++ ) {
            isException = false;
            for( var j=0 ; j<except_nums.length ; j++ ) {
                if( nums[i].num_1 == except_nums[j] ) isException = true;
                else if( nums[i].num_2 == except_nums[j] ) isException = true;
                else if( nums[i].num_3 == except_nums[j] ) isException = true;
                else if( nums[i].num_4 == except_nums[j] ) isException = true;
                else if( nums[i].num_5 == except_nums[j] ) isException = true;
                else if( nums[i].num_6 == except_nums[j] ) isException = true;

                if( isException ) break;
            }

            if( !isException ) result.push(nums[i]);
        }

        return result;
    }

    return { run }
}());

// var recommend_result = recommend.run([]);

// console.log("[ RECOMMEND NUMS ]");
// console.log(recommend_result);