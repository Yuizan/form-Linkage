/**
 * Created by yifan wang on 2017/11/11.
 */

$.getScript("./validation.js");
$.getScript("./multiLinkage.js");
$(document).ready(function(){

    var data3 = [
        {
            "country": "AU",
            "state": [
                {
                    "state": "VIC1",
                    "city":[
                       "Melbourne1","PointCook1"
                    ]
                },
                {
                    "state": "VIC2",
                    "city":[
                        "Melbourne2","PointCook2"
                    ]
                }
            ]
        },
        {
            "country": "EU",
            "state": [
                {
                    "state": "NWS1",
                    "city":[
                        "Melbourne3","PointCook3"
                    ]
                },
                {
                    "state": "NWS2",
                    "city":[
                        "Melbourne4","PointCook4"
                    ]
                }
            ]
        }
    ];
    var data4 = [
        {
            "country": "AU",
            "state": [
                {
                    "state": "VIC-2",
                    "city":["a","b","c"]
                },
                {
                    "state": "VIC-1",
                    "city":["a","b","c"]
                }
            ]
        },
        {
            "country": "US",
            "state": ["LA"]
        },
        {
            "country": "EU",
            "state": [
                {
                    "state": "VIC0",
                    "city":[
                        {
                            "city": "Melbourne3",
                            "sub":[
                                "sub1","sub1"
                            ]
                        },
                        {
                            "city": "PointCook4",
                            "sub":[
                                "sub2","sub2"
                            ]
                        }
                    ]
                },
                {
                    "state": "VIC1",
                    "city":[
                        "Melbourne1","PointCook1"
                    ]
                },
                {
                    "state": "VIC2",
                    "city":[
                        {
                            "city": "Melbourne3",
                            "sub":[
                                "sub1","sub1"
                            ]
                        },
                        {
                            "city": "PointCook4",
                            "sub":[
                                "sub2","sub2"
                            ]
                        }
                    ]
                },
                {
                    "state": "VIC3",
                    "city":[
                        "Melbourne1","PointCook1"
                    ]
                },
            ]
        }
    ];
    multiLinkage("select1","select2","select3","select4",data4,"class");
});



