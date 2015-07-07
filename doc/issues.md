1、uri数据类型的校验
其格式为xs:anyURI

 There is no perfect URL validation regex, because there are so many things you can do with URLs, and so many contexts to use them with. So, it might be perfect for the OP, but completely inappropriate for you.

That said, there is a regex in RFC3986, but that's for parsing a URI, not validating it.

I converted 3986's ABNF to regex here: https://gist.github.com/mnot/138549

However, some of the test cases in the original post (the list of URLs there aren't available separately any more :( ) are IRIs, not URIs, so they fail; they need to be converted to URIs first.

In the sense of the WHATWG's specs, what he's looking for are URLs, so this could be useful: http://url.spec.whatwg.org

However, I don't know of a regex that implements that, and there isn't any ABNF to convert from there.

参考材料
1、https://news.ycombinator.com/item?id=7930199
2、https://gist.github.com/mnot/138549


2、base64是一种将二进制的01序列转化成ASCII字符的编码方法

3、到底是选择avro avdl avpr avsc 来表示呢？
| 名称    | 优劣                                    | 示例                                                                                            |
|:--------|:----------------------------------------|:------------------------------------------------------------------------------------------------|
| avdl    | --------                                | https://github.com/ga4gh/schemas 这里是使用avro来定义基因数据的格式 但定义的时候走的是IDL .AVDL |
| avsc    | json格式                                | --------                                                                                        |
| avpr    | json格式  和avdl表示内容一致 格式不一样 | --------                                                                                        |
| ------- | --------                                | --------                                                                                        |

avsc

```
{
    "namespace": "def.note.pad",
    "type": "record",
    "name": "Page",
    "doc": "Object definition of a Page composed of alphabet",
    "fields": [
        {
            "name": "letter",
            "type": {
                "type": "enum",
                "namespace": "def.al.pha.bet",
                "name": "KnownLetters",
                "doc": "Specifies known types of letters",
                "symbols": [
                    "A",
                    "B",
                    "C",
                    "D",
                    "E"
                ]
            }
        }
    ]
}
```


avpr

```
{
    "protocol": "Foo",
    "namespace": "def.al.pha.bet",
    "types": [
        {
            "type": "enum",
            "name": "KnownLetters",
            "doc": "Specifies known types of letters",
            "symbols": [
                "A",
                "B",
                "C",
                "D",
                "E"
            ]
        },
        {
            "namespace": "def.note.pad",
            "type": "record",
            "name": "Page",
            "doc": "Object definition of a Page composed of alphabet",
            "fields": [
                {
                    "name": "letter",
                    "type": "KnownLetters"
                }
            ]
        }
    ]
}
```
