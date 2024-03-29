var Nodes  = (function(){
    var CATEGORY = {
        "Source":"Source",
        "Transformation":"Transformation",
        "Destination":"Destination"
    }

    var SHAPE = {
        "Rectangle":"Rectangle"
    }

    /**
     * Basic component class
     * @param category
     * @constructor
     */
    var Component = function(category,shape){
        // component specific properties
        this.properties = {
            category : category,
            name: null,
            shape : shape,
            image : null,
            color:null,
            x:null,
            y:null,
            height:null,
            width:null,
            fields : []
        }
        this.data = {}
        this.schema = {}
        this.options = {}
    }


    var FileSource = new Component(CATEGORY.Source,SHAPE.Rectangle);
    FileSource.properties.name = 'FileSource';
    FileSource.properties.image = './file.png';
    FileSource.properties.color = "#1696d3";
    FileSource.properties.height = 60;
    FileSource.properties.width = 60;
    FileSource.schema = {
        "type": "object",
        "properties": {
            "selectFile": {
                "type": "string",
                "format": "uri"
            },
            "type": {
                "type":"string",
                "title":"FileType",
                "enum":['csv','tab']
            }
        }
    }
    FileSource.data = {

    }
    FileSource.options = {
        "fields":{
            "selectFile": {
                "type": "file"

            },
            "type":{
                "removeDefaultNone":true
            }
        },
        "form": {
            "attributes": {
                "method": "POST",
                "action": "http://localhost:3001/upload"
            },
            "buttons": {
                "submit": {
                    "value": "Submit the Form",
                    "click": function(){
                        // this has all the values, use this to update data object or any other object on save.
                        var val = this.getValue();
                        var form = $('#alpaca2')
                        form.ajaxSubmit({
                            error: function(xhr) {
                                status('Error: ' + xhr.status);
                            },
                            success: function(response) {
                                $("#status").empty().text(response);
                                alert(JSON.stringify(response));
                                var selected = $("#diagram").getKendoDiagram().select();
                                var nodeById = getNodeById(selected);
                                alert(nodeById)
                                $("#dialog").data("kendoWindow").close();
                            }
                        });
                        return false;

                    }
                }


            }
        }

    }

    var Google = new Component(CATEGORY.Destination,SHAPE.Rectangle);
    Google.properties.name = 'Google';
    Google.properties.image = './google.png';
    Google.properties.height = 60;
    Google.properties.width = 60;
    Google.properties.color = "#ef6944";
    Google.properties.fields = ['Product Id','Name','Desc']

    var Replace = new Component(CATEGORY.Transformation,SHAPE.Rectangle);
    Replace.properties.name = 'Replace';
    Replace.properties.image = './google.png';
    Replace.properties.height = 60;
    Replace.properties.width = 60;
    Replace.properties.color= "#75be16";

    return  {
        FileSource:FileSource,
        Google:Google,
        Replace:Replace
    }


})()