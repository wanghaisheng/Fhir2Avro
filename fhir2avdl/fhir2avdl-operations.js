/**
author edwin
date  2015 07 08
*/
var fs = require('fs');

var jp = require('jsonpath');

var Enum = require('enum');

var resourceTypes = new Enum(['ValueSet', 'ConceptMap', 'Patient', 'Questionnaire', 'StructureDefinition', 'Composition', 'QuestionnaireAnswers', 'Meta', 'Bundle', 'OperationOutcome', 'Resource']);
var dataTypes = new Enum({
    'uri': 'Uri',
    'string': 'String',
    'identifier': 'Identifier',
    'dateTime': 'DateTime',
    'code': 'Code',
    'boolean': 'Boolean',
    'id': 'Id',
    'token': 'Token',
    'Coding': 'Coding',
    'CodeableConcept': 'CodeableConcept',
    'Any': 'Any',
    'date': 'Date'
});
//读取资源类型的文件
fs.readFile('profiles-resources.json', 'utf8', function(err, data) {
    if (err) throw err;
    var json = JSON.parse(data);
    var resources = jp.query(json, '$.entry[*].resource');
    var output_no = 0;
    var operationDefinition_fileContent = "";
    var input_content = "";
    var output_content = "";
    var parameter_content = "";
    var parameter_parts_content = "";
    var output_parameter_content = "";
    var intput_parameter_parts_content = "";
    var output_parameter_parts_content = "";
    var operationDefinition_header = "/**\n" + "*本文件的更新日期为:" + jp.query(json, '$.meta.lastUpdated') +
        "\n" + " *参考资料为: wget http://hl7-fhir.github.io/profiles-resources.json\n" + "*/\n" +
        "@namespace(\"org.fhir.messages.Operation\")\n\r\rprotocol Operation {\n\n\n\r\r import idl \"datatypes.avdl\";\r\r" + "\n\r\r import idl \"resources.avdl\";\r\r\n\n\n";
    var operationDefinition_method = "";
    var operationDefinition_L1_input = "";
    var operationDefinition_L1_output = "";
    var operationDefinition_L2_input = "";
    var operationDefinition_L2_output = "";
    var operationDefinition_L3_input = "";
    var operationDefinition_L3_output = "";
    var operationDefinition_L4_input = "";
    var operationDefinition_L4_output = "";
    var operationDefinition_L5_input = "";
    var operationDefinition_L5_output = "";
    var OperationDefinitionShortName = "";
    var OperationDefinitionInvokeMethodResourceType = "";
    var OperationDefinitionInvokeMethodOnInstance = "";
    var OperationDefinitionFullName = "";
    for (var j = 0; j < resources.length; j++) {
        var resource_abstract = jp.query(resources[j], '$.abstract');
        var resource_shortName = jp.query(resources[j], '$.id');
        var resourceType = jp.query(resources[j], '$.resourceType').toString();
        var OperationDefinitionType = jp.query(resources[j], '$.kind').toString();

        if (resourceType === "StructureDefinition") {

        } else if (resourceType === "OperationDefinition") {
            //接口定义
            // 判断"kind": "operation"还是query
            OperationDefinitionShortName = jp.query(resources[j], '$.code').toString();
            OperationDefinitionInvokeMethodResourceType = jp.query(resources[j], '$.type').toString();
            OperationDefinitionInvokeMethodOnInstance = jp.query(resources[j], '$.instance').toString();
            OperationDefinitionFullName = jp.query(resources[j], '$.id').toString();
            var operation_params = jp.query(resources[j], '$.parameter[*]');
            // console.log("该定义中涉及的参数个数为:"+operation_params.length);
            operationDefinition_method = "  " + OperationDefinitionFullName + "-Response  " + OperationDefinitionFullName + "(" + OperationDefinitionFullName + "-Request  request);\n\n";

            var operation_params_name = "";
            var operation_params_InOrOut = "";
            var operation_params_min = "";
            var operation_params_max = "";
            var operation_params_doc = "";
            var operation_params_datatype = "";
            var operation_params_parts;
            for (var k = 0; k < operation_params.length; k++) {

                operation_params_name = jp.query(operation_params[k], '$.name').toString();
                operation_params_InOrOut = jp.query(operation_params[k], '$.use').toString();
                operation_params_min = jp.query(operation_params[k], '$.min').toString();
                operation_params_max = jp.query(operation_params[k], '$.max').toString();
                operation_params_doc = jp.query(operation_params[k], '$.documentation').toString();
                operation_params_datatype = jp.query(operation_params[k], '$.type').toString();
                operation_params_parts = jp.query(operation_params[k], '$.part[*]');
                // 根据param.out的取值判断 是否只有一个out参数
                // if(operation_params_InOrOut == "out"){
                //     output_no++;
                // }
                // 判断是否存在子参数
                // 如果不存在，则只有三层结构，存在有4层结构

                if (operation_params_parts.length == 0) {
                    if (operation_params_InOrOut === 'in') {
                        operationDefinition_L1_input = "  record " + OperationDefinitionFullName + "-Request {\n" + "    union { null," + OperationDefinitionFullName + "-Request-Parameters } Parameters	 = null;\n}\n";
                        operationDefinition_L2_input = "  record " + OperationDefinitionFullName + "-Request-Parameters {\n";
                        if (operation_params_min === '0' && operation_params_max === '1') {
                            operationDefinition_L2_input = operationDefinition_L2_input + "    union { null, " + OperationDefinitionFullName + "-Request-Parameters-" + operation_params_name + "} " + "parameter = null;\n";

                        } else if (operation_params_min === '0' && operation_params_max === '*') {

                            operationDefinition_L2_input = operationDefinition_L2_input + "    union { null,  array<" + OperationDefinitionFullName + "-Request-Parameters-" + operation_params_name + "} " + "parameter = null;\n";

                        } else if (operation_params_min === '1' && operation_params_max === '1') {

                            operationDefinition_L2_input = operationDefinition_L2_input + "    " + OperationDefinitionFullName + "-Request-Parameters-" + operation_params_name + " " + "parameter;\n";

                        } else if (operation_params_min === '1' && operation_params_max === '*') {

                            operationDefinition_L2_input = operationDefinition_L2_input + "    array<" + OperationDefinitionFullName + "-Request-Parameters-" + operation_params_name + " " + "parameter = null;\n";

                        }

                        if (resourceTypes.get(operation_params_datatype)) {
                            operationDefinition_L4_input = operationDefinition_L4_input + "  record " + OperationDefinitionFullName + "-Request-Parameters-" + operation_params_name + " {\n" + "    string name;\n    " + operation_params_datatype + " resource" + ";\n}\n";
                        } else {
                            operationDefinition_L4_input = operationDefinition_L4_input + "  record " + OperationDefinitionFullName + "-Request-Parameters-" + operation_params_name + " {\n" + "    string name;\n    " + operation_params_datatype + " value" + dataTypes.get(operation_params_datatype) + ";\n}\n";;
                        }
                        operationDefinition_L2_input = operationDefinition_L2_input + "\n}\n";
                    } else if (operation_params_InOrOut === 'out') {
                        operationDefinition_L2_output = "  record " + OperationDefinitionFullName + "-Response-Parameters" + "{\n";
                        // console.log(output_no);
                        if (output_no === 1) {
                            // 有且仅有一个输出参数，且数据类型为某个资源，则输出响应直接吐资源，不适用Parameter对象来封装

                            if (resourceTypes.get(operation_params_datatype) || operation_params_name == 'return') {
                                operationDefinition_L1_output = "  record " + OperationDefinitionFullName + "-Response" + " {\n" + "    " + operation_params_datatype + "  " + operation_params_datatype + ";\n}\n";
                            } else {
                                console.log("输出参数只有一个，并且类型不是资源类型，参数名称不是return");
                            }
                        } else {

                            if (operation_params_min === '0' && operation_params_max === '1') {

                                operationDefinition_L1_output = "  record " + OperationDefinitionFullName + "-Response" + " {\n" + "    union { null," + OperationDefinitionFullName + "-Response-Parameters } Parameters	 = null;\n}\n";
                                operationDefinition_L2_output = operationDefinition_L2_output + "  record " + OperationDefinitionFullName + "-Response-Parameters" + " {\n";

                                operationDefinition_L2_output = operationDefinition_L2_output + "    union { null, " + OperationDefinitionFullName + "-Response-Parameters-" + operation_params_name + "} " + "parameter = null;\n";
                                if (resourceTypes.get(operation_params_datatype)) {
                                    operationDefinition_L4_output = operationDefinition_L4_output + "  record " + OperationDefinitionFullName + "-Response-Parameters-" + operation_params_name + " {\n" + "    string name;\n    " + operation_params_datatype + " resource" + ";\n}\n";
                                } else {
                                    operationDefinition_L4_output = operationDefinition_L4_output + "  record " + OperationDefinitionFullName + "-Response-Parameters-" + operation_params_name + " {\n" + "    string name;\n    " + operation_params_datatype + " value" + dataTypes.get(operation_params_datatype) + ";\n}\n";;
                                }
                            } else if (operation_params_min === '0' && operation_params_max === '*') {

                                operationDefinition_L1_output = operationDefinition_L1_output + "  record " + OperationDefinitionFullName + "-Response" + " {\n" + "    union { null," + OperationDefinitionFullName + "-Response-Parameters } Parameters	 = null;\n}\n";
                                operationDefinition_L2_output = operationDefinition_L2_output + "  record " + OperationDefinitionFullName + "-Response-Parameters" + " {\n";

                                operationDefinition_L2_output = operationDefinition_L2_output + "    union { null,  array<" + OperationDefinitionFullName + "-Response-Parameters-" + operation_params_name + "} " + "parameter = null;\n";
                                if (resourceTypes.get(operation_params_datatype)) {
                                    operationDefinition_L4_output = output_parameter_content + "  record " + OperationDefinitionFullName + "-Response-Parameters-" + operation_params_name + " {\n" + "    string name;\n    " + operation_params_datatype + " resource" + ";\n}\n";
                                } else {
                                    operationDefinition_L4_output = operationDefinition_L4_output + "  record " + OperationDefinitionFullName + "-Response-Parameters-" + operation_params_name + " {\n" + "    string name;\n    " + operation_params_datatype + " value" + dataTypes.get(operation_params_datatype) + ";\n}\n";;
                                }
                            } else if (operation_params_min === '1' && operation_params_max === '1') {

                                operationDefinition_L1_output = operationDefinition_L1_output + "  record " + OperationDefinitionFullName + "-Response" + " {\n" + "    union { null," + OperationDefinitionFullName + "-Response-Parameters } Parameters	 = null;\n}\n";
                                operationDefinition_L2_output = "  record " + OperationDefinitionFullName + "-Response-Parameters" + " {\n";
                                operationDefinition_L2_output = operationDefinition_L2_output + "    " + OperationDefinitionFullName + "-Response-Parameters-" + operation_params_name + " " + "parameter;\n";
                                if (resourceTypes.get(operation_params_datatype)) {
                                    operationDefinition_L4_output = operationDefinition_L4_output + "  record " + OperationDefinitionFullName + "-Response-Parameters-" + operation_params_name + " {\n" + "    string name;\n    " + operation_params_datatype + " resource" + ";\n}\n";

                                } else {

                                    operationDefinition_L4_output = operationDefinition_L4_output + "  record " + OperationDefinitionFullName + "-Response-Parameters-" + operation_params_name + " {\n" + "    string name;\n    " + operation_params_datatype + " value" + dataTypes.get(operation_params_datatype) + ";\n}\n";;
                                }


                            } else if (operation_params_min === '1' && operation_params_max === '*') {

                                operationDefinition_L1_output = operationDefinition_L1_output + "  record " + OperationDefinitionFullName + "-Response" + " {\n" + "    union { null," + OperationDefinitionFullName + "-Response-Parameters } Parameters	 = null;\n}\n";
                                operationDefinition_L2_output = operationDefinition_L2_output + "  record " + OperationDefinitionFullName + "-Response-Parameters" + " {\n";

                                operationDefinition_L2_output = operationDefinition_L2_output + "    array<" + OperationDefinitionFullName + "-Response-Parameters-" + operation_params_name + " " + "parameter = null;\n";
                                if (resourceTypes.get(operation_params_datatype)) {
                                    operationDefinition_L4_output = operationDefinition_L4_output + "  record " + OperationDefinitionFullName + "-Response-Parameters-" + operation_params_name + " {\n" + "    string name;\n    " + operation_params_datatype + " resource" + ";\n}\n";
                                } else {
                                    operationDefinition_L4_output = operationDefinition_L4_output + "  record " + OperationDefinitionFullName + "-Response-Parameters-" + operation_params_name + " {\n" + "    string name;\n    " + operation_params_datatype + " value" + dataTypes.get(operation_params_datatype) + ";\n}\n";;
                                }
                            }
                            operationDefinition_L2_output = operationDefinition_L2_output + "}\n";

                        }

                    }

                } else if (operation_params_parts.length > 0) {
                    // 如果不存在，则只有三层结构，存在有4层结构
                    if (operation_params_InOrOut === 'in') {
                        operationDefinition_L1_input = "  record " + OperationDefinitionFullName + "-Request {\n" + "    union { null," + OperationDefinitionFullName + "-Request-Parameters } Parameters	 = null;\n}\n";
                        operationDefinition_L2_input = "  record " + OperationDefinitionFullName + "-Request-Parameters {\n";
                        if (operation_params_min === '0' && operation_params_max === '1') {
                            operationDefinition_L2_input = operationDefinition_L2_input + "    union { null, " + OperationDefinitionFullName + "-Request-Parameters-" + operation_params_name + "} " + "parameter = null;\n";

                        } else if (operation_params_min === '0' && operation_params_max === '*') {

                            operationDefinition_L2_input = operationDefinition_L2_input + "    union { null,  array<" + OperationDefinitionFullName + "-Request-Parameters-" + operation_params_name + "} " + "parameter = null;\n";

                        } else if (operation_params_min === '1' && operation_params_max === '1') {

                            operationDefinition_L2_input = operationDefinition_L2_input + "    " + OperationDefinitionFullName + "-Request-Parameters-" + operation_params_name + " " + "parameter;\n";

                        } else if (operation_params_min === '1' && operation_params_max === '*') {

                            operationDefinition_L2_input = operationDefinition_L2_input + "    array<" + OperationDefinitionFullName + "-Request-Parameters-" + operation_params_name + " " + "parameter = null;\n";

                        }

                        if (resourceTypes.get(operation_params_datatype)) {
                            operationDefinition_L3_input = operationDefinition_L3_input + "  record " + OperationDefinitionFullName + "-Request-Parameters-" + operation_params_name + " {\n" + "    string name;\n    " + operation_params_datatype + " resource" + ";\n}\n";
                        } else {
                            operationDefinition_L3_input = operationDefinition_L3_input + "  record " + OperationDefinitionFullName + "-Request-Parameters-" + operation_params_name + " {\n" + "    string name;\n    " + operation_params_datatype + " value" + dataTypes.get(operation_params_datatype) + ";\n}\n";;
                        }
                        operationDefinition_L2_input = operationDefinition_L2_input + "\n}\n";

                        // 和parts相关的3级数据结构
                        operationDefinition_L3_input = "    record  " + OperationDefinitionFullName + "-Request-Parameters-" + operation_params_name + " {\n"
                        for (var m = 0; m < operation_params_parts.length; m++) {
                            var operation_params_parts_name = jp.query(operation_params_parts[m], '$.name').toString();
                            var operation_params_parts_type = jp.query(operation_params_parts[m], '$.type').toString();
                            var operation_params_parts_min = jp.query(operation_params_parts[m], '$.min').toString();
                            var operation_params_parts_max = jp.query(operation_params_parts[m], '$.max').toString();
                            var operation_params_parts_parts = jp.query(operation_params_parts[m], '$.part[*]');

                            if (operation_params_parts_min === '0' && operation_params_parts_max === '1') {
                                operationDefinition_L3_input = operationDefinition_L3_input + "    union { null, " + OperationDefinitionFullName + "-Request-Parameters-" + operation_params_name + "-" + operation_params_parts_name + "} " + "part = null;\n";

                            } else if (operation_params_parts_min === '0' && operation_params_parts_max === '*') {

                                operationDefinition_L3_input = operationDefinition_L3_input + "    union { null,  array<" + OperationDefinitionFullName + "-Request-Parameters-" + operation_params_name + "-" + operation_params_parts_name + "} " + "part = null;\n";

                            } else if (operation_params_parts_min === '1' && operation_params_parts_max === '1') {

                                operationDefinition_L3_input = operationDefinition_L3_input + "    " + OperationDefinitionFullName + "-Request-Parameters-" + operation_params_name + "-" + operation_params_parts_name + " " + "part;\n";

                            } else if (operation_params_parts_min === '1' && operation_params_parts_max === '*') {

                                operationDefinition_L3_input = operationDefinition_L3_input + "    array<" + OperationDefinitionFullName + "-Request-Parameters-" + operation_params_name + "-" + operation_params_parts_name + " " + "part = null;\n";

                            }



                            /**
                            和parts相关的4级数据结构


                            */
                            if (operation_params_parts_parts.length === 0) {
                                operationDefinition_L4_input = "  record " + OperationDefinitionFullName + "-Request-Parameters-" + operation_params_name + "-" + operation_params_parts_name + " {\n"
                                if (resourceTypes.get(operation_params_parts_type)) {
                                    operationDefinition_L4_input = operationDefinition_L4_input + "    string name;\n    " + operation_params_parts_type + " resource" + ";\n\n";
                                } else {
                                    operationDefinition_L4_input = operationDefinition_L4_input + "    string name;\n    " + operation_params_parts_type + " value" + dataTypes.get(operation_params_parts_type) + ";\n\n";
                                }
                            } else {
                                console.log("out三级parts："+OperationDefinitionFullName+operation_params_name+operation_params_parts_name);

                                operationDefinition_L4_input = "  record " + OperationDefinitionFullName + "-Request-Parameters-" + operation_params_name + "-" + operation_params_parts_name + " {\n"

                                for (var n = 0; n < operation_params_parts_parts.length; n++) {
                                    var operation_params_parts_parts_name = jp.query(operation_params_parts_parts[n], '$.name').toString();
                                    var operation_params_parts_parts_type = jp.query(operation_params_parts_parts[n], '$.type').toString();
                                    var operation_params_parts_parts_min = jp.query(operation_params_parts_parts[n], '$.min').toString();
                                    var operation_params_parts_parts_max = jp.query(operation_params_parts_parts[n], '$.max').toString();
                                    var operation_params_parts_parts_parts = jp.query(operation_params_parts_parts[n], '$.part[*]');
                                    if (operation_params_parts_parts_min === '0' && operation_params_parts_parts_max === '1') {
                                        operationDefinition_L4_input = operationDefinition_L4_input + "    union { null, " + OperationDefinitionFullName + "-Request-Parameters-" + operation_params_name + "-" + operation_params_parts_name + "-" + operation_params_parts_parts_name + "} " + "parameter = null;\n";

                                    } else if (operation_params_parts_parts_min === '0' && operation_params_parts_parts_max === '*') {

                                        operationDefinition_L4_input = operationDefinition_L4_input + "    union { null,  array<" + OperationDefinitionFullName + "-Request-Parameters-" + operation_params_name + "-" + operation_params_parts_name + "-" + operation_params_parts_parts_name + "} " + "parameter = null;\n";

                                    } else if (operation_params_parts_parts_min === '1' && operation_params_parts_parts_max === '1') {

                                        operationDefinition_L4_input = operationDefinition_L4_input + "    " + OperationDefinitionFullName + "-Request-Parameters-" + operation_params_name + "-" + operation_params_parts_name + "-" + operation_params_parts_parts_name + " " + "parameter;\n";

                                    } else if (operation_params_parts_parts_min === '1' && operation_params_parts_parts_max === '*') {

                                        operationDefinition_L4_input = operationDefinition_L4_input + "    array<" + OperationDefinitionFullName + "-Request-Parameters-" + operation_params_name + "-" + operation_params_parts_name + "-" + operation_params_parts_parts_name + " " + "parameter = null;\n";

                                    }
                                    //     /**
                                    //     和parts相关的5级数据结构
                                    //
                                    //
                                    //     */
                                    operationDefinition_L5_intput = "  record " + OperationDefinitionFullName + "-Request-Parameters-" + operation_params_name + "-" + operation_params_parts_name  + "-" + operation_params_parts_parts_name + " {\n"

                                        if (resourceTypes.get(operation_params_parts_parts_type)) {
                                            operationDefinition_L5_intput = operationDefinition_L5_intput + "    string name;\n    " + operation_params_parts_parts_type + " resource" + ";\n\n";
                                        } else {
                                            operationDefinition_L5_intput = operationDefinition_L5_intput + "    string name;\n    " + operation_params_parts_parts_type + " value" + dataTypes.get(operation_params_parts_parts_type) + ";\n\n";
                                        }
                                        operationDefinition_L5_input = operationDefinition_L5_input + "\n}\n";

                                }
                                operationDefinition_L4_input = operationDefinition_L4_input + "\n}\n";

                            }

                        }
                        operationDefinition_L3_input = operationDefinition_L3_input + "\n}\n";



                    } else if (operation_params_InOrOut === 'out') {

                        operationDefinition_L1_output = "  record " + OperationDefinitionFullName + "-Response {\n" + "    union { null," + OperationDefinitionFullName + "-Response-Parameters } Parameters	 = null;\n}\n";
                        operationDefinition_L2_output = "  record " + OperationDefinitionFullName + "-Response-Parameters {\n";

                        // console.log(output_no);
                        if (output_no === 1) {
                            // 有且仅有一个输出参数，且数据类型为某个资源，则输出响应直接吐资源，不适用Parameter对象来封装

                            if (resourceTypes.get(operation_params_datatype) || operation_params_name == 'return') {
                                console.log("输出参数只有一个，并且类型是资源类型，参数名称是return");

                                operationDefinition_L1_output = "  record " + OperationDefinitionFullName + "-Response" + " {\n" + "    " + operation_params_datatype + "  " + operation_params_datatype + ";\n}\n";
                            } else {
                                console.log("输出参数只有一个，并且类型不是资源类型，参数名称不是return");
                            }
                        } else {
                            if (operation_params_min === '0' && operation_params_max === '1') {
                                operationDefinition_L2_output = operationDefinition_L2_output + "    union { null, " + OperationDefinitionFullName + "-Response-Parameters-" + operation_params_name + "} " + "parameter = null;\n";

                            } else if (operation_params_min === '0' && operation_params_max === '*') {

                                operationDefinition_L2_output = operationDefinition_L2_output + "    union { null,  array<" + OperationDefinitionFullName + "-Response-Parameters-" + operation_params_name + "} " + "parameter = null;\n";

                            } else if (operation_params_min === '1' && operation_params_max === '1') {

                                operationDefinition_L2_output = operationDefinition_L2_output + "    " + OperationDefinitionFullName + "-Response-Parameters-" + operation_params_name + " " + "parameter;\n";

                            } else if (operation_params_min === '1' && operation_params_max === '*') {

                                operationDefinition_L2_output = operationDefinition_L2_output + "    array<" + OperationDefinitionFullName + "-Response-Parameters-" + operation_params_name + " " + "parameter = null;\n";

                            }

                            if (resourceTypes.get(operation_params_datatype)) {
                                operationDefinition_L3_output = operationDefinition_L3_output + "  record " + OperationDefinitionFullName + "-Response-Parameters-" + operation_params_name + " {\n" + "    string name;\n    " + operation_params_datatype + " resource" + ";\n}\n";
                            } else {
                                operationDefinition_L3_output = operationDefinition_L3_output + "  record " + OperationDefinitionFullName + "-Response-Parameters-" + operation_params_name + " {\n" + "    string name;\n    " + operation_params_datatype + " value" + dataTypes.get(operation_params_datatype) + ";\n}\n";;
                            }
                            operationDefinition_L2_output = operationDefinition_L2_output + "\n}\n";

                            // 和parts相关的3级数据结构
                            operationDefinition_L3_output = "    record  " + OperationDefinitionFullName + "-Response-Parameters-" + operation_params_name + " {\n"
                            for (var m = 0; m < operation_params_parts.length; m++) {
                                var operation_params_parts_name = jp.query(operation_params_parts[m], '$.name').toString();
                                var operation_params_parts_type = jp.query(operation_params_parts[m], '$.type').toString();
                                var operation_params_parts_min = jp.query(operation_params_parts[m], '$.min').toString();
                                var operation_params_parts_max = jp.query(operation_params_parts[m], '$.max').toString();
                                var operation_params_parts_parts = jp.query(operation_params_parts[m], '$.part[*]');
                                // console.log("出参-此处有二级parts：" + operation_params_parts_parts.length);
                                if (operation_params_parts_min === '0' && operation_params_parts_max === '1') {
                                    operationDefinition_L3_output = operationDefinition_L3_output + "    union { null, " + OperationDefinitionFullName + "-Response-Parameters-" + operation_params_name + "-" + operation_params_parts_name + "} " + "part = null;\n";

                                } else if (operation_params_parts_min === '0' && operation_params_parts_max === '*') {

                                    operationDefinition_L3_output = operationDefinition_L3_output + "    union { null,  array<" + OperationDefinitionFullName + "-Response-Parameters-" + operation_params_name + "-" + operation_params_parts_name + "} " + "part = null;\n";

                                } else if (operation_params_parts_min === '1' && operation_params_parts_max === '1') {

                                    operationDefinition_L3_output = operationDefinition_L3_output + "    " + OperationDefinitionFullName + "-Response-Parameters-" + operation_params_name + "-" + operation_params_parts_name + " " + "part;\n";

                                } else if (operation_params_parts_min === '1' && operation_params_parts_max === '*') {

                                    operationDefinition_L3_output = operationDefinition_L3_output + "    array<" + OperationDefinitionFullName + "-Response-Parameters-" + operation_params_name + "-" + operation_params_parts_name + " " + "part = null;\n";

                                }



                                /**
                                和parts相关的4级数据结构


                                */
                                if (operation_params_parts_parts.length === 0) {
                                    operationDefinition_L4_output = "  record " + OperationDefinitionFullName + "-Response-Parameters-" + operation_params_name + "-" + operation_params_parts_name + " {\n"
                                    if (resourceTypes.get(operation_params_parts_type)) {
                                        operationDefinition_L4_output = operationDefinition_L4_output + "    string name;\n    " + operation_params_parts_type + " resource" + ";\n\n";
                                    } else {
                                        operationDefinition_L4_output = operationDefinition_L4_output + "    string name;\n    " + operation_params_parts_type + " value" + dataTypes.get(operation_params_parts_type) + ";\n\n";
                                    }
                                } else {
                                    console.log("out三级parts："+OperationDefinitionFullName+operation_params_name+operation_params_parts_name);
                                    operationDefinition_L4_output = "  record " + OperationDefinitionFullName + "-Response-Parameters-" + operation_params_name + "-" + operation_params_parts_name + " {\n"
                                    for (var n = 0; n < operation_params_parts_parts.length; n++) {
                                        var operation_params_parts_parts_name = jp.query(operation_params_parts_parts[n], '$.name').toString();
                                        var operation_params_parts_parts_type = jp.query(operation_params_parts_parts[n], '$.type').toString();
                                        var operation_params_parts_parts_min = jp.query(operation_params_parts_parts[n], '$.min').toString();
                                        var operation_params_parts_parts_max = jp.query(operation_params_parts_parts[n], '$.max').toString();
                                        var operation_params_parts_parts_parts = jp.query(operation_params_parts_parts[n], '$.part[*]');
                                        if (operation_params_parts_parts_min === '0' && operation_params_parts_parts_max === '1') {
                                            operationDefinition_L4_output = operationDefinition_L4_output + "    union { null, " + OperationDefinitionFullName + "-Response-Parameters-" + operation_params_name + "-" + operation_params_parts_name + "-" + operation_params_parts_parts_name + "} " + "parameter = null;\n";

                                        } else if (operation_params_parts_parts_min === '0' && operation_params_parts_parts_max === '*') {

                                            operationDefinition_L4_output = operationDefinition_L4_output + "    union { null,  array<" + OperationDefinitionFullName + "-Response-Parameters-" + operation_params_name + "-" + operation_params_parts_name + "-" + operation_params_parts_parts_name + "} " + "parameter = null;\n";

                                        } else if (operation_params_parts_parts_min === '1' && operation_params_parts_parts_max === '1') {

                                            operationDefinition_L4_output = operationDefinition_L4_output + "    " + OperationDefinitionFullName + "-Response-Parameters-" + operation_params_name + "-" + operation_params_parts_name + "-" + operation_params_parts_parts_name + " " + "parameter;\n";

                                        } else if (operation_params_parts_parts_min === '1' && operation_params_parts_parts_max === '*') {

                                            operationDefinition_L4_output = operationDefinition_L4_output + "    array<" + OperationDefinitionFullName + "-Response-Parameters-" + operation_params_name + "-" + operation_params_parts_name + "-" + operation_params_parts_parts_name + " " + "parameter = null;\n";

                                        }
                                        /**
                                        和parts相关的5级数据结构


                                        */
                                        operationDefinition_L5_output = operationDefinition_L5_output + "  record " + OperationDefinitionFullName + "-Response-Parameters-" + operation_params_name + "-" + operation_params_parts_name  + "-" + operation_params_parts_parts_name + " {\n"
                                        if (resourceTypes.get(operation_params_parts_parts_type)) {
                                            operationDefinition_L5_output = operationDefinition_L5_output + "    string name;\n    " + operation_params_parts_parts_type + " resource" + ";\n\n";
                                        } else {
                                            operationDefinition_L5_output = operationDefinition_L5_output + "    string name;\n    " + operation_params_parts_parts_type + " value" + dataTypes.get(operation_params_parts_parts_type) + ";\n\n";
                                        }
                                        operationDefinition_L5_output = operationDefinition_L5_output + "\n}\n";

                                    }
                                    operationDefinition_L4_output = operationDefinition_L4_output + "\n}\n";

                                 }


                            }




                        }
                    }
                }
                operationDefinition_L3_output = operationDefinition_L3_output + "\n}\n";

            }
            operationDefinition_fileContent = operationDefinition_fileContent + operationDefinition_method +
                operationDefinition_L1_input + operationDefinition_L1_output +
                operationDefinition_L2_input + operationDefinition_L2_output +
                operationDefinition_L3_input + operationDefinition_L3_output +
                operationDefinition_L4_input + operationDefinition_L4_output +
                operationDefinition_L5_input + operationDefinition_L5_output ;

        }

    }
    operationDefinition_fileContent = operationDefinition_header + operationDefinition_fileContent;

    fs.writeFile('avdl/operation.avdl', operationDefinition_fileContent, 'utf8', function(err) {
        if (err) throw err;
    });
});
