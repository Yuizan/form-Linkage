/*  Arguments validation   */
/**
 * Checking args validation
 * @param arg
 * @returns {boolean}
 */

function argValidation(args){
    var errs = [];                          //errors array
    var array = args[args.length-2];        //json array
    var className = args[args.length-1];    //class of option
    var numberOfSelector = args.length-2;   //numbers of selectors in args
    var selectorTitle = [];                 //length depth of json

    /**
     * check json in args
     */
    if (typeof array !== "object"){
        var err = "json is missing\n";
        console.log(err);
        errs.push(err);
        return false;
    }

    /**
     * check className is valued or null
     */
    if (typeof className !== "string" && className !== null){
        var err = "class of option is not correct\n";
        errs.push(err);
    }
    /**
     * check selected have been delcare in the html file
     */
    for(var i = 0; i < args.length-2; i++){
        var selector = '#' + args[i];
        if (selector !== '#' && $(selector).length ===  0){
            var err = "Selector "+ i + " "+ selector + " is not correct\n";
            errs.push(err);
        }
    }

    /**
     * check depth of json
     * error: if number of select not equals depth of json
     */
    loopJson(array,selectorTitle);
    if (numberOfSelector !== selectorTitle.length){
        console.log(selectorTitle);
        var err = "number of selector is not correct. Should have " + selectorTitle.length + " selectors";
        errs.push(err);
    }
    /**
     * print error is have any
     * return false
     */
    if (errs.length !== 0){
        for(var errsIndex = 0;errsIndex < errs.length;errsIndex++){
            console.log(errs[errsIndex]);
        }
        return false;
    }
    return true;
}

/**
 * Computing the depth of Json
 * @param json: Json data
 * @param selectorTitle: length equals depth of json
 */
function loopJson(json,selectorTitle){
    $.each(json,function(name,value){
        var isRootNode = true;         // first node
        var title = [];                 // temp selectorTitle
        retrieveNode(value,isRootNode,title,selectorTitle);
    });
}

/**
 * Retrieve child array
 * @param array: value of node
 * @param depth: depth of current node.
 * @param deepestDepth: array[0] store the depth of Json
 */
function retrieveNode(array,isRootNode,title,selectorTitle){
    /**
     * if value not object, stop recursion
     */
    if (typeof array !== "object"){
        return;
    }

    $.each(array,function(name,value){
        /**
        * run at the first node
         * For example:  "country": "EU",
        */
        if (isRootNode){
            title.push(name);
            isRootNode = false;
        }
        /**
         * key is string and value is object
         *
         * For example: "city":["a","b","c"]
         * push city
         */
        else if ( typeof name !== "number" && typeof value === "object"){
            if(title.includes(name) === false){
                title.push(name);
            }
        }

        /**
         * if length of temp title > length of selectorTile
         * update selectorTitle
         */
        if (selectorTitle !== undefined && title.length > selectorTitle.length){
            selectorTitle.length = 0;
            for(var i = 0; i < title.length;i++){
                selectorTitle.push(title[i])
            }
        }
        retrieveNode(value,isRootNode,title,selectorTitle);
    });
}
