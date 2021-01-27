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
                        // sometimes cards have images, it looks for those
                        if(obj.worksheet.widgets[c].data.pairs[o].target.hasOwnProperty('media')) { returnString+=("\r\n  "+obj.worksheet.widgets[c].data.pairs[o].target.media.image); }
                        else { returnString+=("\r\n  "+obj.worksheet.widgets[c].data.pairs[o].target.value); }
                        // middle part of the line
                        returnString+=(" --- ");
                        // sometimes cards have images, it looks for those
                        if(obj.worksheet.widgets[c].data.pairs[o].match.hasOwnProperty('media')) { returnString+=(obj.worksheet.widgets[c].data.pairs[o].match.media.image); }
                        else { returnString+=(obj.worksheet.widgets[c].data.pairs[o].match.value); }
                    }
                    break;
                case "Sorting":
                    returnString+=("\r\n\r\nTask: "+obj.worksheet.widgets[c].data.title);
                    for(var o=0; o<Object.keys(obj.worksheet.widgets[c].data.groups).length; o++) {
                        returnString+=("\r\n  Category: "+obj.worksheet.widgets[c].data.groups[o].header.text);
                        for(var i=0; i<Object.keys(obj.worksheet.widgets[c].data.groups[o].items).length; i++) {
                            // sometimes cards have images, it looks for those
                            if(obj.worksheet.widgets[c].data.groups[o].items[i].hasOwnProperty('media')) { returnString+=("\r\n    > "+obj.worksheet.widgets[c].data.groups[o].items[i].media.image); }
                            else { returnString+=("\r\n    > "+obj.worksheet.widgets[c].data.groups[o].items[i].text); }
                        }
                    }

                    
                    break;
                case "Blanks":
                    returnString+=("\r\n\r\nTask: "+obj.worksheet.widgets[c].data.title);
                    /*for (const[key,value] of Object.entries(obj.worksheet.widgets[c].data.solution.blanks)) {
                        returnString+=(`  ✔ ${value}`);
                    }*/

                    var element = document.createElement("div");
                    element.innerHTML = obj.worksheet.widgets[c].data.blankText;
                    var x = element.getElementsByTagName("wmblank");
                    for(var o=0; o<x.length; o++) {
                        returnString+=("\r\n  "+x[o].innerText);
                    }
                    
                    //returnString+=(obj.worksheet.widgets[c].data.blankText).replaceAll("</wmblank>","]\r\n").replaceAll("<wmblank>","  [");

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

//"<p><br></p><p>What organelle is represented by A? <wmblank>Chloroplast&nbsp;</wmblank></p><p>What process is represented by B? &nbsp;<wmblank>Photosynthesis&nbsp;</wmblank></p><p>What product is represented by C? <wmblank>ATP&nbsp;</wmblank></p><p>What organelle is represented by D? <wmblank>Mitochondria&nbsp;</wmblank></p><p>What process is represented by E? <wmblank>Cellular Respiration</wmblank></p><p><br></p>"
// select only <wmblank></wmblank> inside text by going through every tag after assigned to a createelement