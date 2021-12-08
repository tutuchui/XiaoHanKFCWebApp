let chartStatics = undefined

$(document).ready(function () {
    getEmployeeData()
    loadChartStatics()
    employeeStatusChart()
    employeeTypeChart()
    employeeGenderChart()
    customerGenderChart()
    productCount()
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
            onclick: function (d, i) { console.log("onclick", d, i); },
            onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            onmouseout: function (d, i) { console.log("onmouseout", d, i); }
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
                ['顾客性别', chartStatics.employeeBoy, chartStatics.employeeGirl]
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





var chart6 = c3.generate({
    bindto: '#chart06',
    data: {
        columns: [
            ['data1', 30, 200, 100, 400, 150, 250]
        ],
        type: 'bar'
    },
    bar: {
        width: {
            ratio: 0.5
        }
    }
});
var chart7 = c3.generate({
    bindto: '#chart07',
    data: {
        columns: [
            ['data', 91.4]
        ],
        type: 'gauge',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    },

    color: {
        pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
        threshold: {
        }
    },
    size: {
        height: 180
    }
});

var chart8 = c3.generate({
    bindto: '#chart08',
    data: {
        columns: [
            ['data', 91.4]
        ],
        type: 'gauge',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    },
    size: {
        height: 180
    }
});


var chart09 = c3.generate({
    bindto: '#chart09',
    data: {
        // iris data from R
        columns: [
            ['data1', 30],
            ['data2', 120],
        ],
        type: 'pie',
        onclick: function (d, i) {
            console.log("onclick", d, i);
        },
        onmouseover: function (d, i) {
            console.log("onmouseover", d, i);
        },
        onmouseout: function (d, i) {
            console.log("onmouseout", d, i);
        }
    }
});

var chart10 = c3.generate({
    bindto: '#chart10',
    data: {
        // iris data from R
        columns: [
            ['data1', 30],
            ['data2', 120],
        ],
        type: 'pie',
        onclick: function (d, i) {
            console.log("onclick", d, i);
        },
        onmouseover: function (d, i) {
            console.log("onmouseover", d, i);
        },
        onmouseout: function (d, i) {
            console.log("onmouseout", d, i);
        }
    }
});

var chart11 = c3.generate({
    bindto: '#chart11',
    data: {
        columns: [
            ['数量', 30, 200, 100, 400, 150, 250]
        ]
    },
    grid: {
        y: {
            lines: [{value: 100, class: 'grid800', text: '最低标准'},{value: 150, class: 'grid800', text: '平均数量'},{value: 200, class: 'grid800', text: '最高目标'}]
        }
    },
    zoom: {
        enabled: true
    },
    subchart: {
        show: true
    }
});

var chart12 = c3.generate({
    bindto: '#chart12',
    data: {
        columns: [
            ['data1', 30],
            ['data2', 120],
        ],
        type : 'donut',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    },
    donut: {
        title: "Iris Petal Width"
    }
});

var chart13 = c3.generate({
    bindto: '#chart13',
    data: {
        columns: [
            ['data1', 30],
            ['data2', 120],
        ],
        type : 'donut',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    },
    donut: {
        title: "Iris Petal Width"
    }
});
