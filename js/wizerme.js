function printAnswers() {
var returnString = "";
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if(this.readyState==4 && this.status==200) {
        var obj = JSON.parse(this.responseText);
        for(var c=0; c<Object.keys(obj.worksheet.widgets).length; c++) {
            switch(obj.worksheet.widgets[c].name) {
                case "Multiple Choice":
                    returnString+=("\r\n\r\nTask: "+obj.worksheet.widgets[c].data.title);
                    for(var o=0; o<Object.keys(obj.worksheet.widgets[c].data.options).length; o++) {
                        if(obj.worksheet.widgets[c].data.options[o].hasOwnProperty('checked') && obj.worksheet.widgets[c].data.options[o].checked) {
                            returnString+=("\r\n  ✔ "+obj.worksheet.widgets[c].data.options[o].text);
                        }
                    }
                    break;
                case "Matching":
                    returnString+=("\r\n\r\nTask: "+obj.worksheet.widgets[c].data.title);
                    for(var o=0; o<Object.keys(obj.worksheet.widgets[c].data.pairs).length; o++) {
                        if(obj.worksheet.widgets[c].data.pairs[o].target.hasOwnProperty('media')) { returnString+=("\r\n  "+obj.worksheet.widgets[c].data.pairs[o].target.media.image); }
                        else { returnString+=("\r\n  "+obj.worksheet.widgets[c].data.pairs[o].target.value); }
                        returnString+=(" --- ");
                        if(obj.worksheet.widgets[c].data.pairs[o].match.hasOwnProperty('media')) { returnString+=(obj.worksheet.widgets[c].data.pairs[o].match.media.image); }
                        else { returnString+=(obj.worksheet.widgets[c].data.pairs[o].match.value); }
                    }
                    break;
                case "Sorting":
                    returnString+=("\r\n\r\nTask: "+obj.worksheet.widgets[c].data.title);
                    for(var o=0; o<Object.keys(obj.worksheet.widgets[c].data.groups).length; o++) {
                        returnString+=("\r\n  Category: "+obj.worksheet.widgets[c].data.groups[o].header.text);
                        for(var i=0; i<Object.keys(obj.worksheet.widgets[c].data.groups[o].items).length; i++) {
                            if(obj.worksheet.widgets[c].data.groups[o].items[i].hasOwnProperty('media')) { returnString+=("\r\n    > "+obj.worksheet.widgets[c].data.groups[o].items[i].media.image); }
                            else { returnString+=("\r\n    > "+obj.worksheet.widgets[c].data.groups[o].items[i].text); }
                        }
                    }
                    break;
                case "Blanks":
                    returnString+=("\r\n\r\nTask: "+obj.worksheet.widgets[c].data.title);
                    var element = document.createElement("div");
                    element.innerHTML = obj.worksheet.widgets[c].data.blankText;
                    var x = element.getElementsByTagName("wmblank");
                    for(var o=0; o<x.length; o++) {
                        returnString+=("\r\n  "+x[o].innerText);
                    }
                    break;
            }
        }
        var div = document.createElement("div");
        div.innerHTML = returnString;
        console.log(div.innerText);
    }
}
xhr.open("GET","https://app.wizer.me/learn/worksheet/"+window.location.href.split("/")[4]+"?nc=1");
xhr.send();
}