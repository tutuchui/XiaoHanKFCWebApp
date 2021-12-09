let chartStatics = undefined

$(document).ready(function () {
    getEmployeeData()
    loadChartStatics()
    employeeStatusChart()
    employeeTypeChart()
    employeeGenderChart()
    customerGenderChart()
    productCount()
    ingredientsChart()
    suggestionChart()
    productStatusChart()
    productPriceChart()
    productCategoryChart()
    orderChart()
    orderPriceChart()
    fakeChart()
})

function getEmployeeData() {
    $.ajax({
        url: 'http://localhost:8080/admin/getStatics',
        type: 'GET',
        dataType: 'json',
        success: function (data){
            $("#employee-count").html(data.curEmployee)
            $("#employee-recruit-month").html(data.recruitEmployeeCurMonth)
            $("#employee-fire-month").html(data.fireEmployeeCurMonth)
            $("#order-count").html(data.orderCount)
            $("#customer-count").html(data.customerCount)
            $("#suggestion-count").html(data.suggestionCount)

        }
    })
}

function loadChartStatics(){
    $.ajax({
        url: 'http://localhost:8080/admin/getChartStatics',
        type: 'GET',
        dataType: 'json',
        success: function (data){
            chartStatics = data
        },
        async: false
    })
}

function employeeStatusChart(){
    console.log(chartStatics)
    var chart01 = c3.generate({
            bindto: '#chart-employee-status',
            data: {
                // iris data from R
                columns: [
                    ['在职', chartStatics.activeEmployee],
                    ['离职', chartStatics.inactiveEmployee],
                ],
                type: 'pie'
            }
        }
    );
}

function employeeTypeChart(){
    var chart2 = c3.generate({
        bindto: '#chart02',
        data: {
            columns: [
                ['前台员工', chartStatics.employeeType0Count],
                ['配送员', chartStatics.employeeType1Count],
                ['厨房员工',chartStatics.employeeType2Count],
                ['卫生员', chartStatics.employeeType3Count]
            ],
            type : 'donut',
        },
        donut: {
            title: "员工类别"
        }
    });
}

function employeeGenderChart(){
    var chart3 = c3.generate({
        bindto: '#chart03',
        data: {
            columns: [
                ['员工性别', chartStatics.employeeBoy, chartStatics.employeeGirl]
            ],
            type: 'bar'
        },
        axis: {
            x: {
                type: 'category',
                categories: ['男', '女']
            }
        },
        bar: {
            width: 100,
        }

    });

}

function customerGenderChart(){
    var chart3 = c3.generate({
        bindto: '#chart04',
        data: {
            columns: [
                ['顾客性别', chartStatics.customerBoy, chartStatics.customerGirl]
            ],
            type: 'bar',
            colors:{
                顾客性别: '#fffb00'
            },
        },
        axis: {
            x: {
                type: 'category',
                categories: ['男', '女']
            }
        },
        bar: {
            width: 100,
        }

    });
}

function productCount(){

    let productStatics = chartStatics.productStaticsList
    let salesArray = ['销售数量']
    let crateArray = ['生产数量']
    let productNameArray = []
    for(var i = 0; i <productStatics.length; i++){
        salesArray.push(productStatics[i].saleCount)
        crateArray.push(productStatics[i].createCount)
        productNameArray.push(productStatics[i].productName)
    }

    var chart5 = c3.generate({
        bindto: '#chart05',
        data: {
            columns: [
                salesArray,
                crateArray
            ]
        },
        axis: {
            x: {
                type: 'category',
                categories: productNameArray
            }
        },
        zoom: {
            enabled: true
        },
        subchart: {
            show: true
        },
    });
}

function ingredientsChart(){
    let ingredientsStatic = chartStatics.ingredientsStaticsList
    let importArray = ['进货数量']
    let ingredientsNameArray = []
    for(var i = 0; i <ingredientsStatic.length; i++){
        importArray.push(ingredientsStatic[i].count)
        ingredientsNameArray.push(ingredientsStatic[i].name)
    }
    var chart6 = c3.generate({
        bindto: '#chart06',
        data: {
            columns: [
                importArray
            ],
            type: 'bar'
        },
        bar: {
            width: {
                ratio: 0.5
            }
        },
        axis: {
            x: {
                type: 'category',
                categories: ingredientsNameArray
            }
        },
        zoom: {
            enabled: true
        },
        subchart: {
            show: false
        },
    });
}


function suggestionChart(){
    var chart7 = c3.generate({
        bindto: '#chart07',
        data: {
            columns: [
                ['已反馈', chartStatics.suggestionStatics.feedbackCount]
            ],
            type: 'gauge',
            onclick: function (d, i) { console.log("onclick", d, i); },
            onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        },
        gauge: {
            label: {
                format: function(value, ratio) {
                    ratio = ratio * 100
                    ratio = ratio.toFixed(1)
                    return ratio;
                },
                show: true // to turn off the min/max labels.
            },
//    min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
        max: chartStatics.suggestionStatics.suggestionCount, // 100 is default
        units: '%',
//    width: 39 // for adjusting arc thickness
        },
        color: {
            pattern: ['#FF0000'], // the three color levels for the percentage values.
        },
        size: {
            height: 180
        }
    });
}


function productStatusChart(){
    var chart8 = c3.generate({
        bindto: '#chart08',
        data: {
            columns: [
                ['已上架', chartStatics.activeProductCount]
            ],
            type: 'gauge',
        },
        gauge: {
            label: {
                format: function(value, ratio) {
                    return value;
                },
                show: true // to turn off the min/max labels.
            },
//    min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
   max: chartStatics.allProductCount, // 100 is default
//    units: ' %',
//    width: 39 // for adjusting arc thickness
        },
        size: {
            height: 180
        }
    });
}

function productPriceChart(){
    var chart09 = c3.generate({
        bindto: '#chart09',
        data: {
            // iris data from R
            columns: [
                ['0-10元', chartStatics.productCountPriceInterval1],
                ['10-20元', chartStatics.productCountPriceInterval2],
                ['20-50元', chartStatics.productCountPriceInterval3],
                ['50元以上', chartStatics.productCountPriceInterval4],

            ],
            type: 'pie',
        }
    });
}

function productCategoryChart(){
    var chart09 = c3.generate({
        bindto: '#chart10',
        data: {
            // iris data from R
            columns: [
                ['主食', chartStatics.mainMealCount],
                ['甜点', chartStatics.dessertCount],
                ['小食', chartStatics.snackCount],
                ['炸鸡', chartStatics.friesChickenCount],

            ],
            type: 'pie',
        }
    });
}

function orderChart(){
    let orderStaticsList = chartStatics.orderStaticsList
    let orderArray = ['订单数量']
    let dateArray = []
    let totalCount = 0
    for(var i = 0; i <orderStaticsList.length; i++){
        orderArray.push(orderStaticsList[i].count)
        dateArray.push(orderStaticsList[i].date)
        totalCount += orderStaticsList[i].count;
    }
    let averageCount = totalCount/7;
    averageCount.toFixed(0)

    var chart11 = c3.generate({
        bindto: '#chart11',
        data: {
            columns: [
                orderArray,
            ]
        },
        axis: {
            x: {
                type: 'category',
                categories: dateArray
            },
            y:{
                max: 12,
                min: 0,
                padding: {top:0, bottom:0}
            }
        },
        grid: {
            y: {
                lines: [
                    {value: 2, text: '最低订单数量'},
                    {value: 10, text: '目标订单数量'},
                    {value: averageCount, text:'七天平均订单数量'}
                ]
            }
        },
        zoom: {
            enabled: true
        },
        subchart: {
            show: false
        },
    });
}

function fakeChart(){
    let orderStaticsList = chartStatics.orderStaticsList
    let dateArray = []
    for(var i = 0; i <orderStaticsList.length; i++){
        dateArray.push(orderStaticsList[i].date)
    }
    var chart11 = c3.generate({
        bindto: '#chart12',
        data: {
            columns: [
                ['当日利润','100','520','380','620','300','210','230'],
            ]
        },
        axis: {
            x: {
                type: 'category',
                categories: dateArray
            },
            y:{
                max: 1000,
                min: 0,
                padding: {top:0, bottom:0}
            }
        },

        zoom: {
            enabled: true
        },
        subchart: {
            show: false
        },
    });
}



function orderPriceChart() {

    var chart13 = c3.generate({
        bindto: '#chart13',
        data: {
            columns: [
                ['0-50元', chartStatics.orderCountInterval1],
                ['50-100元', chartStatics.orderCountInterval2],
                ['100-200元', chartStatics.orderCountInterval3],
                ['200元以上', chartStatics.orderCountInterval4],
            ],
            type: 'donut',
        },
        donut: {
            title: "订单价格"
        }
    });
}
