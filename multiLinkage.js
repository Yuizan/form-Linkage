
/**
 * @param : The first to penultimate args: selector id;
 * @param : last but one arg: Json
 * @param : last arg: className (CSS) of option;
 */
function multiLinkage(){
    if(argValidation(arguments)){
        var array = arguments[arguments.length-2];        //json array
        var className = arguments[arguments.length-1];    //className (CSS) of option
        var titleSelector = [];                           //title value of each disable selector
        var selectorId = [];                              //Selectors

        /**
         * retrieve json. Push title value of each disable selector into array
         */
        loopJson(array,titleSelector);

        /**
         * push selectID into array. According to length of titles.
         */
        for (var i = 0;i < titleSelector.length;i++){
            selectorId.push("#" + arguments[i]);
        }

        /**
         * init selects
         * add option into the first select
         */
        init(selectorId,titleSelector,className);
        fillSelector(array,selectorId,0,className);
        linkage(selectorId,array,titleSelector,className);
    }
}

/**
 * initialize all of selects
 * @param selectId  : select ID
 * @param title     : title of each selector
 * @param className : className (CSS) of option
 */
function init(selectId,title,className){
    for (var i = 0; i < selectId.length;i++){
        /**
         * Add title option into select
         */
        $(selectId[i]).append($('<option>', {
            class: className,
            value: -1,
            text: title[i],
            disabled:"disabled",
            selected:"selected"
        }));
        /**
         * Add transverse line under title
         */
        $(selectId[i]).append($('<option>', {
            class: className,
            value: -1,
            text: "---",
            disabled:"disabled"
        }));
    }
}
/**
 * reset specific select
 * @param selectorId  : array of select ID
 * @param index       : which of select need to be reset.
 */
function resetSelector(selectorId,index){
    for(var i = index; i < selectorId.length;i++){
        /**
         * remove all of enable option
         * set all of options as unselected
         * set the first disable option as default selected option
         */
        $(selectorId[i]).children('[value!="-1"]').remove();
        $(selectorId[i]).children('*').removeAttr("selected","");
        $(selectorId[i]).children('option:first').attr("selected","selected");
    }
}

/**
 * fill specific select
 * @param json       : data that need to be fill into select
 * @param selectorId : array of select ID
 * @param index      : which of select need to be reset.
 * @param className  : className (CSS) of option;
 */
function fillSelector(json,selectorId,index,className){
    /**
     *  reset all of selects that follow up changed select
     */
    for(var i = index;i < selectorId.length;i++){
        resetSelector(selectorId,i);
    }
    /**
     *  if data is not the deepest of json
     *  data type: object except array
     */
    if (typeof json[0] === 'object'){
        $.each(json,function(key,value){
            $.each(value,function(key,value){
                /**
                 * value is string not object.
                 * For example: "country": "AU",
                 */
                if (typeof value === "string"){
                    $(selectorId[index]).append($('<option>', {
                        class: className,
                        value: value,
                        text: value
                    }));
                }
            })
        });
    }
    /**
     *  if data is array
     *  For example: "city":["a","b","c"]
     */
    else if(typeof json[0] === 'string' && typeof json === "object"){
        for(var i = 0; i < json.length;i++){
            $(selectorId[index]).append($('<option>', {
                class: className,
                value: json[i],
                text: json[i]
            }));
        }
    }
    /**
     *  if data is not the deepest of json
     *  data type: string in array
     *  For example: "a" in "city":["a","b","c"]
     */
    else if(typeof json[0] === 'string' && typeof json === "string"){
        /**
         * if filled select is not the last select
         * fill rest of select as selected option
         */
        for(var i = index;i < selectorId.length;i++){
            $(selectorId[i]).append($('<option>', {
                class: className,
                value: json,
                text: json,
                selected:"selected"
            }));
        }
    }
}

/**
 *  linkage main logic
 * @param selectorId : array of select ID
 * @param json       : data that need to be fill into select
 * @param title      : title of each selector
 * @param className  : className (CSS) of option;
 */
function linkage(selectorId,json,title,className){
    for (var i = 0; i < selectorId.length ; i++){
        /**
         * add change Listener on each select
         */
        $(selectorId[i]).change(function() {
            var id = "#" + $(this).attr("id");          // select id
            var currIndex = selectorId.indexOf(id);      // current index of select
            var nextIndex = currIndex + 1;               // next index of select
            var val = [];                                // array: value of  selects

            /**
             * push value of each select into array
             * value data structure: QUEUE
             */
            for (var i = currIndex; i >=0 ; i--){
                var temp = $(selectorId[i]).val();
                val.push(temp);
            }

            var targetJson = [];                          //array: data that would be fill into select
            if (currIndex < selectorId.length){
                /**
                 * retrieve each the first node of json
                 */
                $.each(json,function(name,value){
                    var prevObject = [];                  //previous key and value of json object
                    var depth = [];                       //current retrieve depth
                    depth.push(0);                        //init depth = 0;
                    /**
                     * if data have not be retrieved
                     * keep going to retrieve
                     */
                    if (targetJson.length === 0){
                        retrieve(value,prevObject,title,currIndex,val,depth,targetJson);
                    }
                });
                /**
                 * if data have be retrieved
                 * fill select
                 */
                if(targetJson.length !== 0){
                    var data = targetJson.pop();
                    fillSelector(data,selectorId,nextIndex,className);
                }
            }
        });
    }
}

/**
 *
 * @param array       : data that need to be fill into select
 * @param prevObject  : previous key and value of json object
 * @param title       : title of each selector
 * @param currIndex   : current index of select
 * @param val         : array: value of  selects
 * @param depth       : current retrieve depth
 * @param targetJson  : array: data that would be fill into select
 */
function retrieve(array,prevObject,title,currIndex,val,depth,targetJson){

    /**
     *  if data have been retrieved
     */
    if (targetJson.length === 1){
        return;
    }
    /**
     * if data is title (string) For example: "state": "VIC-2",
     * the first time to retrieve json
     */
    else if (typeof prevObject[1] !== 'object' && prevObject[1] !== undefined){
        return;
    }
    /**
     * avoid retrieve deeper than actual requirement
     * if key is string
     * retrieved depth > changed select index
     */
    else if(typeof prevObject[0] === 'string' && title.indexOf(prevObject[0]) > currIndex){

        return;
    }

    $.each(array,function(name,value){

        /**
         * previous key equals current depth title
         * previous value equals selected value
         * value data structure: QUEUE
         * * val[val.length-1]: get FIFO, first in value
         */
        if (prevObject[0] === title[depth[0]] &&
            prevObject[1] === val[val.length-1]){

            /**
             * first value out
             */
            val.pop();
            /**
             * in value in the value array
             * which means retrieve data
             */
            if (val.length === 0){
                targetJson.push(value);
            }
            /**
             * there still is data in value array
             * retrieve deeper
             */
            else{
                depth.push(depth.pop()+1);
                retrieve(value,prevObject,title,currIndex,val,depth,targetJson);
            }
        }
        /**
         * changed option is the deepest node of current node.
         * For example. select a in [a,b,c]
         */
        else if (typeof array[0] === 'string'&& val.length === 1 && array.includes(val[0])){
            targetJson.push(val[0]);
        }
        /**
         * assign name and value into preObject
         */
        if (prevObject.length === 2){
            prevObject.length = 0;
        }
        prevObject.push(name);
        prevObject.push(value);

        /**
         * keep to recursion
         */
        if (val.length !== 0){
            retrieve(value,prevObject,title,currIndex,val,depth,targetJson);
        }
    });

}