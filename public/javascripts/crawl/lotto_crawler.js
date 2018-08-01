
var crawler = (function () {

    //  crawler : get orders
    //  rest api { orders } --> get other orders
    //  insert remains

    getLegends = () => {
        var result = [];
        
        $.ajax({ 
            type: "GET",
            dataType: "json",
            async: false,
            url: "/lotto/legends",
            success: function(lottos){ 
                lottos.map(function(legend) { result.push(legend.legend); });
            }
        });
    
        return result;
    }

    callCrawler = (orders) => {    
        console.log("[ LOTTO ]");
        console.log(orders);    
        var params = {
            "Abc" : "Abc",
            "order" : orders,
        }

        $.ajax({
            type: "POST",
            data: params,
            url: "/crawler/lotto/num",
            success: function(result) {}
        });
    }

    run = () => {
        var orders = getLegends();
        callCrawler(orders);
    }
    
    return { run }
}());


crawler.run();