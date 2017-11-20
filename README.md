# form-Linkage
The form linkage bases on jQuery


It can deal with any length of select linkage by input specific format json


Calling function in index.js 

multiLinkage("select1","select2","select3","select4",data4,"class");

Arguments:
/**
 * @param : The first to penultimate args: selector id;
 * @param : last but one arg: Json
 * @param : last arg: className (CSS) of option;
 */
 
 details see in demo folder
 
For example: 
 var data3 = [
        {
            "A": "AU",
            "B": [
                {
                    "B": "VIC1",
                    "C":[
                       "Melbourne1","PointCook1"
                    ]
                },
                {
                    "B": "VIC2",
                    "C":[
                        "Melbourne2","PointCook2"
                    ]
                }
            ]
        },
        {
            "A": "EU",
            "state": [
                {
                    "B": "NWS1",
                    "C":[
                        "Melbourne3","PointCook3"
                    ]
                },
                {
                    "B": "NWS2",
                    "C":[
                        "Melbourne4","PointCook4"
                    ]
                }
            ]
        }
    ];
    
    
    
