/**
author edwin
date  2015 07 08
*/
var fs = require('fs');

var jp = require('jsonpath');

var Enum = require('enum');
// 由于FHIR中decimal可能会对应到Avro的float和double两种类型，暂时用string来代替

var FHIRdataTypesToAvro = new Enum({
    'xs:int': 'int',
    'id': 'id',
    'xs:xs:gYear, xs:gYearMonth, xs:date, xs:dateTime': 'string',
    'xs:integer': 'int',
    'xs:string': 'string',
    'xs:xs:gYear, xs:gYearMonth, xs:date': 'string',
    'xs:decimal': 'string',
    'xs:anyURI': 'string',
    'xs:base64Binary': 'string',
    'xs:time': 'string',
    'xs:uri': 'string',
    'xs:boolean': 'boolean',
    'xs:dateTime': 'string',
    'dateTime': 'dateTime',
    'uri': 'uri',
    'string': 'string',
    'code': 'string',
    'boolean': 'boolean',
    'instant': 'string',
    'unsignedInt': 'int',
    'integer': 'int',
    'Extension': 'Extension',
    'Quantity': 'Quantity',
    'decimal': 'decimal',
    'base64Binary': 'base64Binary',
    'Reference': 'Reference',
    'positiveInt': 'positiveInt',
    'Coding': 'Coding',
    'Period': 'Period',
    'CodeableConcept': 'CodeableConcept',

    // '*','*',
    'xhtml': 'xhtml',
    'Element': 'Element',
    'Duration': 'Duration'
});
//读取数据类型的文件
fs.readFile('profiles-types.json', 'utf8', function(err, data) {
    if (err) throw err;
    var json = JSON.parse(data);
    var resources = jp.query(json, '$.entry[*].resource');
    var dataTypefileContent = "/**\n" + " *本文件的更新日期为:" + jp.query(json, '$.meta.lastUpdated') + "\n" + " *参考资料为: wget http://hl7-fhir.github.io/profiles-types.json\n" + "*/\n";
    dataTypefileContent = dataTypefileContent + "@namespace(\"org.fhir.messages.datatypes\")\n\r\rprotocol Datatype {\n\r\r";

    for (var j = 0; j < resources.length; j++) {
        var resource_abstract = jp.query(resources[j], '$.abstract');
        var resource_shortName = jp.query(resources[j], '$.id');

        //读取字段定义
        var resource_elements = jp.query(resources[j], '$.snapshot.element[*]');
        var resource_longName = jp.query(resource_elements[0], '$.short');
        var resource_definition = jp.query(resource_elements[0], '$.definition');
        var resource_comment = jp.query(resource_elements[0], '$.comments');
        dataTypefileContent = dataTypefileContent + "\r\r/**\n" + " *该数据类型的父类型为:" + jp.query(resources[j], '$.base') + "\n" + " *该数据类型的名称为:" + jp.query(resource_elements[0], '$.path') + "\n" + " *该数据类型的全称为:" + jp.query(resource_elements[0], '$.short') + "\n" + " *该数据类型的定义为:" + jp.query(resource_elements[0], '$.definition') + "\n" + " *该数据类型的描述为:" + jp.query(resource_elements[0], '$.comments') + "\n" + "*/\n";

        dataTypefileContent = dataTypefileContent + "  record " + resource_shortName + " {\n"

        for (var i = 1; i < resource_elements.length; i++) {
            var element_longName = jp.query(resource_elements[i], '$.short');
            var element_definition = jp.query(resource_elements[i], '$.definition');
            var element_comment = jp.query(resource_elements[i], '$.comments');
            var element_minimum_card = jp.query(resource_elements[i], '$.min').toString();
            var element_maximum_card = jp.query(resource_elements[i], '$.max').toString();
            var element_datatype = jp.query(resource_elements[i], '$.type[0].code').toString();
            var element_name = jp.query(resource_elements[i], '$.path');
            var element_isModifier = jp.query(resource_elements[i], '$.isModifier');

            dataTypefileContent = dataTypefileContent + "\r\r/**\n" + " *该字段的父类型为:" + jp.query(resource_elements[i], '$.base') + "\n" + " *该字段的路径为:" + element_name + "\n" + " *该字段的全称为:" + element_longName + "\n" + " *该字段的定义为:" + element_definition + "\n" + " *该字段的描述为:" + element_comment + "\n" + " *该字段的出现次数为:" + element_minimum_card + ".." + element_maximum_card + "\n" + " *该字段的存在是否会改变对整个资源的解释:" + element_isModifier + "\n" + " *该字段的数据类型是:" + element_datatype + "\n" + "*/\n";
            // 数据类型从fhir到avro基本类型
            if (FHIRdataTypesToAvro.get(element_datatype)) {
                element_datatype = FHIRdataTypesToAvro.get(element_datatype);
                element_name = element_name.toString().replace(jp.query(resource_elements[0], '$.path') + '.', '');
                if (element_minimum_card === '0' && element_maximum_card === '1') {
                    dataTypefileContent = dataTypefileContent + " union { null, " + element_datatype + "} " + element_name + " = null;\n";
                } else if (element_minimum_card === '0' && element_maximum_card === '*') {
                    dataTypefileContent = dataTypefileContent + " union { null,  array<" + element_datatype + ">} " + element_name + " = null;\n";

                }
            } else {
                element_datatype = element_datatype;
                element_name = element_name.toString().replace(jp.query(resource_elements[0], '$.path') + '.', '');
                if (element_minimum_card === '0' && element_maximum_card === '1') {
                    FHIRdataTypesToAvro.enums.forEach(function(element) {
                        dataTypefileContent = dataTypefileContent + " union { null, " + element + "} " + element_name.replace('[x]', element) + " = null;\n";

                    });

                } else if (element_minimum_card === '0' && element_maximum_card === '*') {
                    FHIRdataTypesToAvro.enums.forEach(function(element) {
                        dataTypefileContent = dataTypefileContent + " union { null,  array<" + element + ">} " + element_name.replace('[x]', element) + " = null;\n";

                    });


                }
            }



        }
        dataTypefileContent = dataTypefileContent + "}\n";
        dataTypefileContent = dataTypefileContent + "\r\r";
    }
    dataTypefileContent = dataTypefileContent + "}\n";

    //写入文件
    fs.writeFile('avdl/datatypes.avdl', dataTypefileContent, 'utf8', function(err) {
        if (err) throw err;
    });
});
