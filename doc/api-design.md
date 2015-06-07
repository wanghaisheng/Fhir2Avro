## FHIR接口简化策略
基本数据类型与AVRO 的基本数据类型直接映射  复杂数据类型拆散成字段后，找到每个字段的简单数据类型与avro的映射关系，再考虑将
使用avro的复杂数据类型来表达FHIR的复杂数据类型
注：
```
code=====string
oid=uri=string
```
对于特殊的如code uri oid 分别处理，考虑配合使用正则表达式来约束其格式，如仍不足以约束则做出特殊说明
### Avro的数据类型

| 简单数据类型名称 | 数据类型含义                                             | 说明                  | 对应的JSON类型 | 示例值                                                                         | binary表示中的形式                                                                                                                                                           |
|:-----------------|:---------------------------------------------------------|:----------------------|:---------------|:-------------------------------------------------------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| null             | no value                                                 | 该字段不存在 不予赋值 | null           | null                                                                           | zero bytes                                                                                                                                                                   |
| boolean          | a binary value                                           | true/false 0/1        | boolean        | true                                                                           | a single byte whose value is either 0 (false) or 1 (true).                                                                                                                   |
| int              | 32-bit signed integer                                    | 4字节                 | integer        | 1                                                                              | using variable-length zig-zag coding. Some examples:                                                                                                                         |
| long             | 64-bit signed integer                                    | -----------           | integer        | 1                                                                              | using variable-length zig-zag coding. Some examples:                                                                                                                         |
| float            | single precision (32-bit) IEEE 754 floating-point number | -----------           | number         | 1.1                                                                            | 4 bytes. The float is converted into a 32-bit integer using a method equivalent to Java's floatToIntBits and then encoded in little-endian format.                           |
| double           | double precision (64-bit) IEEE 754 floating-point number | -----------           | number         | 1.1                                                                            | a double is written as 8 bytes. The double is converted into a 64-bit integer using a method equivalent to Java's doubleToLongBits and then encoded in little-endian format. |
| bytes            | sequence of 8-bit unsigned bytes                         | -----------           | string         | "\u00FF"                                                                       | encoded as a long followed by that many bytes of data.                                                                                                                       |
| string           | unicode character sequence                               | string                | "foo"          | encoded as a long followed by that many bytes of UTF-8 encoded character data. |                                                                                                                                                                              |

************************

| 复杂数据类型名称 | 数据类型含义 | 说明        | 对应的JSON类型 | 示例值   | binary表示中的形式 |
|:-----------------|:-------------|:------------|:---------------|:---------|:-------------------|
| record           | -----------  | ----------- | object         | {"a": 1} | -----------        |
| enum             | -----------  | ----------- | string         | "FOO"    | -----------        |
| array            | -----------  | ----------- | array          | [1]      | -----------        |
| map              | -----------  | ----------- | object         | {"a": 1} | -----------        |
| fixed            | -----------  | ----------- | string         | "\u00ff" | -----------        |


variable-length zig-zag coding. Some examples:
value	hex
0	00
-1	01
1	02
-2	03
2	04
...
-64	7f
64	 80
...

For example, the three-character string "foo" would be encoded as the long value 3 (encoded as hex 06) followed by the UTF-8 encoding of 'f', 'o', and 'o' (the hex bytes 66 6f 6f):

06 66 6f 6f


### FHIR 基本类型

boolean
integer
string
decimal
uri
base64Binary
instant
date
dateTime
time

code string  regex: [^\s]+([\s]+[^\s]+)*
oid  uri  represented as a URI (RFC 3001). e.g. urn:oid:1.2.3.4.5
id   string  regex: [A-Za-z0-9\-\.]{1,64}
unsignedInt int regex: [0-9]+
positiveInt  int  regex: [1-9][0-9]+


<table class="list">
 <tr>
   <td colspan="3">**Primitive Types**</td>
 </tr>
 <tr>
   <th>FHIR Name</th>
   <th>Value Domain</th>
   <th>XML Representation</th>
   <th>JSON representation</th>
 </tr>
 <tr>
   <td>boolean</td>
   <td>true | false</td>
   <td>xs:boolean, 值可以为true或者false（0和1是无效的值）</td>
   <td>JSON boolean (true or false)</td>
 </tr>
 <tr>
   <td>integer</td>
   <td>32位整数（对于更大的值，使用decimal）</td>
   <td>xs:int</td>
   <td>JSON number</td>
 </tr>
 <tr>
   <td>string</td>
   <td>Unicode编码的字符序列</td>
   <td>xs:string</td>
   <td>JSON String</td>
 </tr>
 <tr>
   <td style="border-top: 0px silver solid"/>
   <td colspan="3" style="border-top: 0px silver solid">字符串大小不超过1MB</td>
 </tr>
 <tr>
   <td>decimal</td>
   <td>带小数点的有理数。
</td>
   <td>xs:decimal, except that **decimals may not use exponents**</td>
   <td>A JSON number, but without exponents</td>
 </tr>
 <tr>
   <td>uri</td>
   <td>统一资源标识符([RFC 3986](http://tools.ietf.org/html/rfc3986))</td>
    <td>xs:anyURI</td>
   <td>A JSON string - a URI</td>
 </tr>
 <tr>
   <td style="border-top: 0px silver solid"/>
   <td colspan="3" style="border-top: 0px silver solid">它可以是绝对的或相对的，也可能是一个可选的片段标识符（R </td>
 </tr>
 <tr>
   <td>base64Binary</td>
   <td>base64(([RFC 4648](http://tools.ietf.org/html/rfc4648)))编码的字节流 </td>
   <td>xs:base64Binary</td>
   <td>A JSON string - base64 content</td>
 </tr>
 <tr>
   <td style="border-top: 0px silver solid"/>
   <td colspan="3" style="border-top: 0px silver solid">_Todo: is it possible to impose an upper absolute limit on a base64Binary (for denial of service reasons, like on string)_</td>
 </tr>
 <tr>
   <td>instant</td>
   <td>一个时间的瞬间 - **至少要到秒，总是会包括一个时区**</td>
   <td>xs:dateTime</td>
   <td>A JSON string - an xs:dateTime</td>
 </tr>
 <tr>
   <td style="border-top: 0px silver solid"/>
   <td colspan="3" style="border-top: 0px silver solid">备注: 该类型作系统时间之用，非人用时间(参考下面的 date and dateTime ).</td>
 </tr>
 <tr>
   <td>date</td>
   <td>在人们交流时时使用的日期，日期时间或部分日期（比如年或年+月）。**不能存在时区**。日期应该是有效日期</td>
   <td>union of xs:date, xs:gYearMonth, xs:gYear</td>
   <td>A JSON string - a union of xs:date, xs:gYearMonth, xs:gYear</td>
  </tr>
 <tr>
   <td style="border-top: 0px silver solid"/>
   <td colspan="3" style="border-top: 0px silver solid">Regex: -?[0-9]{4}(-(0[1-9]|1[0-2])(-(0[0-9]|[1-2][0-9]|3[0-1]))?)?</td>
 </tr>
 <tr>
   <td>dateTime</td>
   <td>在人们交流时时使用的日期，日期时间或部分日期（比如年或年+月）。如果指定小时和分钟，通常应该加上时区。可以加上秒，也可以不加。日期应该是有效日期. **不允许如&quot;24:00&quot;的出现**</td>
   <td>union of xs:dateTime, xs:date, xs:gYearMonth, xs:gYear</td>
   <td>A JSON string - a union of xs:dateTime, xs:date, xs:gYearMonth, xs:gYear</td>
  </tr>
 <tr>
   <td style="border-top: 0px silver solid"/>
   <td colspan="3" style="border-top: 0px silver solid">Regex: -?[0-9]{4}(-(0[1-9]|1[0-2])(-(0[0-9]|[1-2][0-9]|3[0-1])(T([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9](\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))?)?)?)?</td>
 </tr>
 <tr>
   <td>time</td>
   <td>一天内的某个时间，没有指定日期（可以转化成自午夜算起的Duration数据类型）。秒可以加上也可以不加上。**不允许出现如“24:00”或是包含时区**</td>
   <td>xs:time</td>
   <td>A JSON string - an xs:time</td>
  </tr>
 <tr>
   <td style="border-top: 0px silver solid"/>
   <td colspan="3" style="border-top: 0px silver solid">Regex: ([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9](\.[0-9]+)?</td>
 </tr>
</table>

扩展
| extension | ---------- | 否0..* | ---------- |
| extension.url | uri | 是1..1 | ---------- |
| extension.value[x] | ---------- | 否0..1 | x可以是Integer、Decimal、DateTime、Date、Instant、String、Uri、Boolean、Code、Base64Binary、Coding、CodeableConcept、Attachment、Identifier、Quantity、Range、Period、Ratio、HumanName、Address、ContactPoint、Timing、Signature、Reference |

| modifierExtension | ---------- | 否0..* | ---------- |
| modifierExtension.url | uri | 是1..1 | ---------- |
| modifierExtension.value[x] | ---------- | 否0..1 | x可以是Integer、Decimal、DateTime、Date、Instant、String、Uri、Boolean、Code、Base64Binary、Coding、CodeableConcept、Attachment、Identifier、Quantity、Range、Period、Ratio、HumanName、Address、ContactPoint、Timing、Signature、Reference |



coding 类型
| ResourceType.coding | |----------| 否0..* | ---------- |
| ResourceType.coding.system | string | 否0..1 | xs:anyURI |
| ResourceType.coding.version | string | 否0..1 | ---------- |
| ResourceType.coding.code | code | 否0..1 | ---------- |
| ResourceType.coding.display | string| 否0..1 | ---------- |

Narrative 类型
| ResourceType.Narrative | |----------| 否0..* | ---------- |
| ResourceType.Narrative.status | string | 是1..1 | code |
| ResourceType.Narrative.div | string | 是1..1 | xhtml |

Identifier 类型

| Identifier.use | code | 否0..1 | ---------- |
| Identifier.type | CodeableConcept | 否0..1 |  |
| Identifier.type.coding | ----------| 否0..* | ---------- |
| Identifier.type.coding.system | string | 否0..1 | xs:anyURI |
| Identifier.type.coding.version | string | 否0..1 | ---------- |
| Identifier.type.coding.code | code | 否0..1 | ---------- |
| Identifier.type.coding.display | string| 否0..1 | ---------- |
| Identifier.type.text | string | 否0..1 | ---------- |
| Identifier.system | string  | 否0..1 | uri |
| Identifier.value | string | 否0..1 |  |
| Identifier.period | ---------- | 否0..1 | ---------- |
| Identifier.period.start | dateTime | 否0..1 | ---------- |
| Identifier.period.end | dateTime | 否0..1 |  |
| Identifier.assigner | ---------- | 否0..1 | Organization引用 |
| Identifier.assigner.reference | string | 否0..1 | ---------- |
| Identifier.assigner.display | string | 否0..1 |  |

period 类型
|  Period.start | dateTime | 否0..1 | ---------- |
|  Period.end | dateTime | 否0..1 |  |

CodeableConcept 类型

| ResourceType.CodeableConcept.coding |----------| |----------| 否0..* | ---------- |
| ResourceType.CodeableConcept.coding.system | string | 否0..1 | xs:anyURI |
| ResourceType.CodeableConcept.coding.version | string | 否0..1 | ---------- |
| ResourceType.CodeableConcept.coding.code | code | 否0..1 | ---------- |
| ResourceType.CodeableConcept.coding.display | string| 否0..1 | ---------- |
| ResourceType.CodeableConcept.text | string | 否0..1 | ---------- |

Reference 类型
| Reference.reference | string | 否0..1 | ---------- |
| Reference.display | string | 否0..1 |  |


基本resource和domainResource的字段整合
| 字段名称 | 数据类型 | 必须存在 | 说明 |
| ResourceType | ---------- | ---------- | ---------- |
| ResourceType.id | string | 否0..1 | ---------- |
| ResourceType.meta | ---------- | 否0..1 | ---------- |
| ResourceType.meta.versionId | string | 否0..1 | ---------- |
| ResourceType.meta.lastUpdated | instant | 否0..1 | ---------- |
| ResourceType.meta.profile | uri | 否0..* | ---------- |
| ResourceType.meta.security |----------  | 否0..* | ---------- |
| ResourceType.meta.security.system | uri | 否0..1 | ---------- |
| ResourceType.meta.security.version | string | 否0..1 | ---------- |
| ResourceType.meta.security.code | code | 否0..1 | ---------- |
| ResourceType.meta.security.display | string| 否0..1 | ---------- |
| ResourceType.meta.security.primary | boolean | 否0..1 | ---------- |
| ResourceType.meta.tag | |----------| 否0..* | ---------- |
| ResourceType.meta.tag.system | uri | 否0..1 | ---------- |
| ResourceType.meta.tag.version | string | 否0..1 | ---------- |
| ResourceType.meta.tag.code | code | 否0..1 | ---------- |
| ResourceType.meta.tag.display | string| 否0..1 | ---------- |
| ResourceType.meta.tag.primary | boolean | 否0..1 | ---------- |
| ResourceType.implicitRules | uri | 否0..1 | ---------- |
| ResourceType.language | string | 否0..1 |  默认为zh |
| ResourceType.text | ---------- | 否0..1 | ---------- |
| ResourceType.text.status | string | 是1..1 | code |
| ResourceType.text.div | string | 是1..1 | xhtml |
| ResourceType.contained | ResourceType | 否0..* | ---------- |
| ResourceType.extension | ---------- | 否0..* | ---------- |
| ResourceType.extension.url 	 | ---------- | 是1..1 | ---------- |
| ResourceType.extension.value[x] 	 | ---------- | 否0..1 | x可以是Integer、Decimal、DateTime、Date、Instant、String、Uri、Boolean、Code、Base64Binary、Coding、CodeableConcept、Attachment、Identifier、Quantity、Range、Period、Ratio、HumanName、Address、ContactPoint、Timing、Signature、Reference |
| ResourceType.modifierExtension | ---------- | 否0..* | ---------- |
| ResourceType.modifierExtension.url 	 | ---------- | 是1..1 | ---------- |
| ResourceType.modifierExtension.value[x] 	 | ---------- | 否0..1 | x可以是Integer、Decimal、DateTime、Date、Instant、String、Uri、Boolean、Code、Base64Binary、Coding、CodeableConcept、Attachment、Identifier、Quantity、Range、Period、Ratio、HumanName、Address、ContactPoint、Timing、Signature、Reference |



## 查询参数
一个查询参数多次出现可以使用 and or逻辑运算符 and用&表示 or用,表示，例如
/patient?language=FR&language=NL 表示同时能说法语和荷兰语的人
/patient?language=FR,NL 表示能说法语或荷兰语其中之一的人
/patient?language=FR,NL&language=EN 表示可以说英语，又可以说法语和荷兰语任何一种的人

### 1、token 类型的简化
对于原来的数据类型是Coding的
格式有三种：
1、[parameter]=[code],不论ResourceType.meta.security.system值是什么，只匹配ResourceType.meta.security.code的值
2、[parameter]=[system]|[code]:根据ResourceType.meta.security.system和ResourceType.meta.security.code的值进行匹配
3、[parameter]=|[code]: ResourceType.meta.security.system字段不存在，只匹配ResourceType.meta.security.code的值
支持如下限定符：
:text——Coding.display
:not——
:above——
:below——
:in——
:not-in——

对于原来的数据类型是 CodeableConcept 的
格式有三种：
1、[parameter]=[code],不论 CodeableConcept.coding.system值是什么，只匹配CodeableConcept.coding.code的值
2、[parameter]=[system]|[code]:根据CodeableConcept.coding.system和CodeableConcept.coding.code的值进行匹配
3、[parameter]=|[code]: CodeableConcept.coding.system字段不存在，只匹配CodeableConcept.coding.code的值
支持如下限定符：
:text——CodeableConcept.text
:not——
:above——
:below——
:in——
:not-in——

对于原来数据类型是identifier的
格式有三种：
1、[parameter]=[value],不论Organization.identifier.system值是什么，只匹配Organization.identifier.value的值
2、[parameter]=[system]|[value]:根据Organization.identifier.system和Organization.identifier.value的值进行匹配
3、[parameter]=|[value]: Organization.identifier.system字段不存在，只匹配Organization.identifier.value的值
支持如下限定符：
:text——identifier.type.text
:not——
:above——
:below——
:in——
:not-in——
例如：
? identifier = https://nppes.cms.hhs.gov/NPPES/|1235349085
? identifier =1235349085
? identifier:text=工商局分配的机构编码


对于原来数据类型是 code 的
code等同于string

根据该时间段的 繁忙程度(BUSY 、FREE、BUSY-UNAVAILABLE、BUSY-TENTATIVE)( Slot. freeBusyType)来查询
例如：
?fbtype=BUSY

accepted declined tentative needs-action

对于原来数据类型是boolean的
例如
?active =false
?active =true

对于原来数据类型是uri的
格式应满足URI (RFC 3986)。可以是绝对地址或相对地址。大小写敏感。
支持:above or :below限定符

###  2、reference 类型的简化
可以是绝对地址或相对地址。大小写敏感。
例如：?partof=Organization/f001


##  conditional read create update delete

| 名称               | FHIR                                                        | 服务平台                                                    | 备注         |
|:-------------------|:------------------------------------------------------------|:------------------------------------------------------------|:-------------|
| conditional read   | If-None-Exist header参数：base/Schedule?[search parameters] | If-None-Exist header参数：base/Schedule?[search parameters] | ------------ |
| conditional create |                                                             | If-None-Exist header参数：base/Schedule?[search parameters] | ------------ |
| conditional update | ----------                                                  | ----------                                                  | ------------ |
| conditional delete | ----------                                                  | ----------                                                  | ------------ |

服务器不支持各种情况下的 status code的使用
## _format  Content-Type Accept  Accept-Charset的区别和使用



##  同时返回资源内容和  operationOutcome
提议改造 operationOutcome 增加status code和data字段


## Slot.type  Schedule.type  Appointment.type 的区别
但是哪里来表示 早中晚 号 的区别呢 可否使用slot.type
预约方式在哪里表达
