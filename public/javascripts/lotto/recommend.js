var recommend = (function(){
    const   COUNT           = 6,
            START_LOTTO_NUM = 1,
            END_LOTTO_NUM   = 45,
            LOW_HIGH_NUM    = 22,
            REMAIN_HEIGHT   = 10;
          
    setResult = (result) => {
        var newResult = [],
            sum, avg, low, high, odd, even;
        
        sum = avg = low = high = odd = even = 0;

        for( var i=0 ; i<result.length ; i++ ) {
            newResult.push(result[i]);

            if( result[i] %2 == 0 ) odd += 1;
            else even += 1;

            if( result[i] > LOW_HIGH_NUM ) high += 1;
            else low += 1;

            sum += result[i];
        }

        avg = parseFloat((sum/COUNT).toFixed(2));

        newResult.push(sum);
        newResult.push(avg);
        newResult.push(low);
        newResult.push(high);
        newResult.push(odd);
        newResult.push(even);

        return newResult;
    }            

    setAllCase = () => {
        var temp_nums = [],
            recommend_nums = [],
            i1, i2, i3, i4, i5, i6;
        
        const TEMP_RECOMMEND_NUM = 19;
        for( i1=START_LOTTO_NUM ; i1<=(END_LOTTO_NUM - (COUNT-1)) ; i1++ ) {
        // for( i1=TEMP_RECOMMEND_NUM ; i1<=TEMP_RECOMMEND_NUM ; i1++ ) {
            for( i2=i1+1 ; i2<=(END_LOTTO_NUM - (COUNT-2)) ; i2++ ) {
                for( i3=i2+1 ; i3<=(END_LOTTO_NUM - (COUNT-3)) ; i3++ ) {
                    for( i4=i3+1 ; i4<=(END_LOTTO_NUM - (COUNT-4)) ; i4++ ) {
                        for( i5=i4+1 ; i5<=(END_LOTTO_NUM - (COUNT-5)) ; i5++ ) {
                            for( i6=i5+1 ; i6<=END_LOTTO_NUM ; i6++ ) {
                                temp_nums = [];                                
                                temp_nums.push(i1);
                                temp_nums.push(i2);
                                temp_nums.push(i3);
                                temp_nums.push(i4);
                                temp_nums.push(i5);
                                temp_nums.push(i6);

                                recommend_nums.push(setResult(temp_nums));
                            }
                        }
                    }
                }                            
            }
        }

        return recommend_nums;
    }

    insertRecommend = () => {
        var recommend_result = setAllCase();

        $.ajax({ 
            type: "POST",
            data: JSON.stringify(recommend_result),
            contentType: "application/json",             
            dataType: "json",            
            url: "/recommend/insert",
            success: function(result){ }
        });
    }

    
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
        
        for( i=START_LOTTO_NUM ; i<=END_LOTTO_NUM ; i++ ) {
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

    run = () => {

        var result              = [],
            except_nums         = [],
            datas               = getTentimesDatas();
            temp_remain_datas   = getRemainDatas(datas.nums);

        for( var i=0 ; i<temp_remain_datas.length ; i++ ) {
            if(temp_remain_datas[i] == REMAIN_HEIGHT ) {
                except_nums.push(i + 1);
            }
        }

        var sum_start = 140,
            sum_end = 149,
            low = 2,
            high = 4,
            odd = 3,
            even = 3;

        var params = {
            sum_start,
            sum_end,
            low,
            high,
            odd,
            even
        }

        var nums = [];
        
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

var recommend_result = recommend.run();

console.log("[ RECOMMEND NUMS ]");
console.log(recommend_result);