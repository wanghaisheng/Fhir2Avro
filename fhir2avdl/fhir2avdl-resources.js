var fs = require('fs');

var jp = require('jsonpath');


var Enum = require('enum');

var resourceTypes = new Enum(['ValueSet', 'ConceptMap', 'Patient', 'Questionnaire', 'StructureDefinition', 'Composition','QuestionnaireAnswers','Meta','Bundle','OperationOutcome']);
var dataTypes = new Enum({
    'uri': 'Uri',
    'string': 'String',
    'identifier': 'Identifier',
    'dateTime': 'DateTime',
    'code': 'Code',
    'boolean': 'Boolean',
    'id': 'Id',
    'token':'Token',
    'Coding':'Coding',
    'CodeableConcept':'CodeableConcept'
});
//读取资源类型的文件
fs.readFile('profiles-resources.json', 'utf8', function(err, data) {
    if (err) throw err;
    var json = JSON.parse(data);
    var resources = jp.query(json, '$.entry[*].resource');

    for (var j = 0; j < resources.length; j++) {
        var resource_abstract = jp.query(resources[j], '$.abstract');
        var resource_shortName = jp.query(resources[j], '$.id');
        var resourceType = jp.query(resources[j], '$.resourceType').toString();
        var StructureDefinitionType = jp.query(resources[j], '$.kind').toString();
        var output_no = 0;
        var StructureDefinition_fileContent = "";
        var input_content = "";
        var output_content = "";
        var parameter_content = "";
        var parameter_parts_content = "";
        var output_parameter_content = "";
        var intput_parameter_parts_content = "";
        var output_parameter_parts_content = "";
        var StructureDefinition_header = "/**\n" + "*本文件的更新日期为:" + jp.query(json, '$.meta.lastUpdated') +
         "\n" + " *参考资料为: wget http://hl7-fhir.github.io/profiles-resources.json\n" + "*/\n"+
         "@namespace(\"org.fhir.messages.Operation\")\n\r\rprotocol Operation {\n\n\n\r\r import idl \"datatypes.avdl\";\r\r" + "\n\r\r import idl \"resources.avdl\";\r\r\n\n\n";
        var StructureDefinition_method = "";
        var StructureDefinition_L1_input = "";
        var StructureDefinition_L1_output = "";
        var StructureDefinition_L2_input = "";
        var StructureDefinition_L2_output = "";
        var StructureDefinition_L3_input = "";
        var StructureDefinition_L3_output = "";
        var StructureDefinition_L4_input = "";
        var StructureDefinition_L4_output = "";

        if (resourceType === "StructureDefinition") {
            //接口定义
            // 判断"kind": "operation"还是query
            var StructureDefinitionShortName = jp.query(resources[j], '$.code').toString();
            var StructureDefinitionInvokeMethodResourceType = jp.query(resources[j], '$.type').toString();
            var StructureDefinitionInvokeMethodOnInstance = jp.query(resources[j], '$.instance').toString();
            var StructureDefinitionFullName = jp.query(resources[j], '$.id').toString();

            var operation_params = jp.query(resources[j], '$.parameter[*]');
            // console.log("该定义中涉及的参数个数为:"+operation_params.length);



            for (var k = 0; k < operation_params.length; k++) {

                var operation_params_name = jp.query(operation_params[k], '$.name').toString();
                var operation_params_InOrOut = jp.query(operation_params[k], '$.use').toString();
                var operation_params_min = jp.query(operation_params[k], '$.min').toString();
                var operation_params_max = jp.query(operation_params[k], '$.max').toString();
                var operation_params_doc = jp.query(operation_params[k], '$.documentation').toString();
                var operation_params_datatype = jp.query(operation_params[k], '$.type').toString();
                var operation_params_parts = jp.query(operation_params[k], '$.part[*]');
                StructureDefinition_method = StructureDefinitionFullName + "-Response  " + StructureDefinitionFullName + "(" +StructureDefinitionFullName + "-Request  request);\n\n"



        }
        // StructureDefinition_fileContent = StructureDefinition_fileContent +StructureDefinition_input_content + input_content + "}\n" + output_content + "}\n" + parameter_content + "}\n" + parameter_parts_content;

        StructureDefinition_fileContent = StructureDefinition_header + StructureDefinition_method
                                       + StructureDefinition_L1_input + StructureDefinition_L1_output
                                       + StructureDefinition_L2_input  + StructureDefinition_L2_output
                                       + StructureDefinition_L3_input + "}\n" + StructureDefinition_L3_output
                                       + StructureDefinition_L4_input + "}\n" + StructureDefinition_L4_output;
                    console.log(StructureDefinition_fileContent);
        } else if (resourceType === "OperationDefinition") {

    }
    StructureDefinition_fileContent = StructureDefinition_fileContent
    fs.writeFile('avdl/resources-copy.avdl', StructureDefinition_fileContent, 'utf8', function(err) {
        if (err) throw err;
    });
}
});
