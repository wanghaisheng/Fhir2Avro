# Fhir2Avro
Try to use Avro instead of json or xml defined in the FHIR spec

## structuredefinition to avro schema
在github上以avro为关键词进行搜索，发现如下4个使用avro作为数据格式的项目，
```
https://github.com/ga4gh/schemas

https://github.com/bigdatagenomics/bdg-formats

https://github.com/StackTach/notification-avro

https://github.com/StackTach/notification-schemas

https://github.com/ottomata/EventAvro
```
他们都是使用 .avdl 来定义数据结构的。.avsc Avro schema文件可以利用Avro .avdl 来生成。这种 .avdl 文件语法上更为准确，而且能够更加容易的导入和复用自定义的类型。
使用http://www.gtlib.gatech.edu/pub/apache/avro/avro-1.7.7/java/avro-tools-1.7.7.jar 键入命令：
```
java -jar ./avro-tools-1.7.7.jar idl2schemata avro/idl/EditEvent.idl avro/schema
```
即可得到avsc schema文件

### structuredefinition json to avro avdl
参考fhir2avdl
### structuredefinition json to avro avpr
参考fhir2avpr
### structuredefinition json to avro avsc
参考fhir2avsc

## FHIR in Avro to FHIR in Parquet
