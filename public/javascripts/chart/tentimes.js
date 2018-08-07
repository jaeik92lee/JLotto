var tentimes = (function (window){

    const   START_LOTTO_NUM = 1,
            END_LOTTO_NUM = 45,
            COLOR_COUNT = 45,
            REMAIN_HEIGHT = 10; 

    /************************
    *       DRAW CHART      *
    *************************/
    drawLowHighChart = (legends, low_datas, high_datas) => {   
        new Chart(document.getElementById("low-high-chart"), {
            type: 'horizontalBar',
            data: {
                labels: legends,
                datasets: [{
                    label: "LOW",
                    backgroundColor: "rgba(255, 206, 86, 0.2)",
                    data: low_datas,
                }, {
                    label: "HIGH",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    data: high_datas
                }]
            },
            options: {
                title: {
                    display: false,
                    text: 'Remain Number Chart'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                responsive: true,
                scales: {
                    xAxes: [{
                        stacked: true,
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                }
            }
        });
    }

    drawOddEvenChart = (legends, odd_datas, even_datas) => {   
        new Chart(document.getElementById("odd-even-chart"), {
            type: 'horizontalBar',
            data: {
                labels: legends,
                datasets: [{
                    label: "ODD",
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    data: odd_datas,
                }, {
                    label: "EVEN",
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    data: even_datas
                }]
            },
            options: {
                title: {
                    display: false,
                    text: 'Chart.js Bar Chart - Stacked'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                responsive: true,
                scales: {
                    xAxes: [{
                        stacked: true,
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                }
            }
        });
    }
    
    drawRemainChart = (legends, remain_datas, colors) => {
        new Chart(document.getElementById("remain-chart"), {
            type: 'bar',
            data: {
                labels: legends,
                datasets: [{
                    data: remain_datas,
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1
                }]
            },
            options: {
                legend: { display: false },
                title: {
                    display: false,
                    text: 'Total Sum(Lotto Num) Count'
                }
            }
        });
    }




    /*****************************
    *       TENTMIES DATA        *
    ******************************/
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
    
    getTentimesLegends = () => {
        var result = [];
        
        $.ajax({ 
            type: "GET",
            dataType: "json",
            async: false,
            url: "/lotto/tentimes/legends",
            success: function(legends){ 
                legends.map(function(legend){ result.push(legend.legend); });
            }
        });
    
        return result;
    }
    




    /****************************
    *       REMAIN DATAS        *
    ****************************/
    getRemainLegend = () => {
        var result = [];
        
        for( var i=START_LOTTO_NUM ; i<=END_LOTTO_NUM ; i++ ) {
            result.push(i);
        }

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

    setBackgroundColor = (remain_datas) => {
        var result = [];

        for( var i=0 ; i<COLOR_COUNT ; i=i+5 ) {
            result.push("rgba(255, 99, 132, 0.2)");
            result.push("rgba(54, 162, 235, 0.2)");
            result.push("rgba(255, 206, 86, 0.2)");
            result.push("rgba(75, 192, 192, 0.2)");
            result.push("rgba(153, 102, 255, 0.2)");
        }
        
        for( var i=0 ; i<remain_datas.length ; i++ ) {            
            if( remain_datas[i] == REMAIN_HEIGHT ) {
                result[i] = "rgba(255, 0, 0, 0.6)";
            }
        }

        return result;
    }





    /***************************
    *       WINNER NUMS        *
    ****************************/
    drawWinnerTable = (winner_remain_datas) => {

    }

    drawWinnerCard = (winner_datas) => {

    }

    draw = () => {
        
        var tentimes_storage = localStorage.tentimes,
            legends     = getTentimesLegends(),
            datas       = tentimes_storage == null || tentimes_storage.length == 0 ? getTentimesDatas() : JSON.parse(tentimes_storage);

        if( tentimes_storage == null || tentimes_storage == undefined ) 
            localStorage.setItem("tentimes", JSON.stringify(datas));

        var remain_legends  = getRemainLegend(),
            remain_datas    = getRemainDatas(datas.nums),
            colors          = setBackgroundColor(remain_datas);    

        drawLowHighChart(legends, datas.low, datas.high);
        drawOddEvenChart(legends, datas.odd, datas.even);
        drawRemainChart(remain_legends, remain_datas, colors);
    }

    return { draw }
}(window));

tentimes.draw();