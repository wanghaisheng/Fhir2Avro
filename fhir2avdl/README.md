cd  fhir2avdl;
npm install -g jsonpath;
npm install -g enum;

node fhir2avdl-datatypes.js ;


1 https://github.com/adrai/enum
2 https://github.com/dchester/jsonpath
wget http://hl7-fhir.github.io/profiles-resources.json


array<string> derivedFrom = [];
和
union { null,array<ValueSet-batch-Request-Parameters-item-uri> } part	 = null;
的区别


enum的遍历
cameraType.enums.forEach(function(element) {
  console.log("element is ",element); // EnumItem
  console.log(element.key); // HIKVISION, DAHUA, FOSCAM
});
