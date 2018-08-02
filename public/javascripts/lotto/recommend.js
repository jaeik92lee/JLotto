var recommend = (function(){
    const   COUNT = 6,
            END_NUM = 45,
            START_NUM = 1,
            LOW_HIGH_NUM = 22;
          
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
        for( i1=START_NUM ; i1<=(END_NUM - (COUNT-1)) ; i1++ ) {
        // for( i1=TEMP_RECOMMEND_NUM ; i1<=TEMP_RECOMMEND_NUM ; i1++ ) {
            for( i2=i1+1 ; i2<=(END_NUM - (COUNT-2)) ; i2++ ) {
                for( i3=i2+1 ; i3<=(END_NUM - (COUNT-3)) ; i3++ ) {
                    for( i4=i3+1 ; i4<=(END_NUM - (COUNT-4)) ; i4++ ) {
                        for( i5=i4+1 ; i5<=(END_NUM - (COUNT-5)) ; i5++ ) {
                            for( i6=i5+1 ; i6<=END_NUM ; i6++ ) {
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

    run = () => {

        var result = [],
            except_nums = [],
            temp_remain_datas = remain_chart.remain_datas;

        for( var i=0 ; i<temp_remain_datas.length ; i++ ) {
            if(temp_remain_datas[i] == remain_chart.REMAIN_HEIGHT ) {
                except_nums.push(i + 1);
            }
        }

        var sum_start = 130,
            sum_end = 139,
            low = 5,
            high = 1,
            odd = 2,
            even = 4;

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