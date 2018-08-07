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

    setLoadingCSS = () => {
        console.log("[ SET LOADING ]");
        $(".loading").css("display", "block");
    }

    removeLoadingCSS = () => {
        console.log("[ REMOVE LOADING ]");
        $(".loading").css("display", "none");
    }

    run = (params) => {
        
        var tentimes_storage    = localStorage.tentimes,
            result              = [],
            except_nums         = [],
            nums                = [],
            datas               = tentimes_storage == null || tentimes_storage.length == 0 ? getTentimesDatas() : JSON.parse(tentimes_storage);
            temp_remain_datas   = getRemainDatas(datas.nums);

        if( tentimes_storage == null || tentimes_storage == undefined ) 
            localStorage.setItem("tentimes", JSON.stringify(datas));

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
            },
            complete: function() {
                console.log("[ Complete ]");
                removeLoadingCSS();
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

var select = (function (){   

    const   START_SUM       = 0,
            END_SUM         = 300,
            LOTTO_NUM_COUNT = 6;

    initSumOptions = () => {
        var idx = 0,
            result = [];

        result.push({ value: idx++, title: "RANDOM" });
        for( var i=START_SUM ; i<END_SUM ; i += 10 ) {
            result.push({ value: idx++, title: i + " ~ " + (i+9), start: i, end: (i+9) });
        }
        return result;
    }

    initLowHighOddEvenOptions = () => {
        var idx = 0,
            result = [];

        result.push({ value: idx++, title: "RANDOM" });
        for( var i=0 ; i<=LOTTO_NUM_COUNT ; i++ ) {
            result.push({ value: idx++, title: i + " : " + (LOTTO_NUM_COUNT - i), low: i, high: (LOTTO_NUM_COUNT - i) });
        }
        return result;
    }

    setSumOptions = (tmp_sum_options) => {
        var result = "";
        tmp_sum_options.map(function(item) {
            result += "<option value=" + item.value + ">" + item.title + "</option>";
        });
        $("#select-sum").append(result);
    }

    setLowHighOptions = (low_high_options) => {
        var result = "";
        low_high_options.map(function(item) {
            result += "<option value=" + item.value + ">" + item.title + "</option>";
        });
        $("#select-low-high").append(result);
    }

    setOddEvenOptions = (odd_even_options) => {
        var result = "";
        odd_even_options.map(function(item) {
            result += "<option value=" + item.value + ">" + item.title + "</option>";
        });
        $("#select-odd-even").append(result);
    }

    getParameter = () => {        

        var sum     = $("#select-sum").val(),
            lowhigh = $("#select-low-high").val(),
            oddeven = $("#select-odd-even").val();

        var sum_idx, lowhigh_idx, oddeven_idx,
            sum_length = sum_options.length - 2,
            lowhigh_length = lowhigh_options.length - 2;
            
        if( sum == 0 ) sum_idx = Math.round(Math.random() * sum_length + 1);
        else sum_idx = sum;

        if( lowhigh == 0 ) lowhigh_idx = Math.round(Math.random() * lowhigh_length + 1);
        else lowhigh_idx = lowhigh;

        if( oddeven == 0 ) oddeven_idx = Math.round(Math.random() * lowhigh_length + 1);
        else oddeven_idx = oddeven;
        

        var sum_start   = sum_options[sum_idx].start,
            sum_end     = sum_options[sum_idx].end,
            low         = lowhigh_options[lowhigh_idx].low,
            high        = lowhigh_options[lowhigh_idx].high,
            odd         = lowhigh_options[oddeven_idx].low,
            even        = lowhigh_options[oddeven_idx].high;
        

        var params = {
            sum_start,
            sum_end,
            low,
            high,
            odd,
            even
        };

        var recommend_result = recommend.run(params);
        console.log("[ RECOMMEND NUMS ]");
        console.log(recommend_result);
    }

    setEvenListener = () => {
        $("#btn-recommend").on("click", function(){
            setLoadingCSS();
            getParameter();
        });
    }

    var sum_options     = initSumOptions(),
        lowhigh_options   = initLowHighOddEvenOptions();

    run = () => {
        
        setSumOptions(sum_options);
        setLowHighOptions(lowhigh_options);
        setOddEvenOptions(lowhigh_options);

        setEvenListener();
    }

    return { run }
}());

select.run();