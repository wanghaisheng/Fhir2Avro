package com.fhir2avro.avro.common;

import org.apache.avro.Schema;
import org.testng.annotations.Test;

/**
 * @author Jon Todd
 */
public class AvroUtilsTest {

    private static final String schemaDescription =
            "{ \n" +
                    " \"namespace\": \"com.fhir2avro.avro\", \n" +
                    " \"name\": \"FacebookUser\", \n" +
                    " \"type\": \"record\",\n" +
                    " \"fields\": [\n" +
                    " {\"name\": \"name\", \"type\": [\"string\", \"null\"] },\n" +
                    " {\"name\": \"num_likes\", \"type\": \"int\"},\n" +
                    " {\"name\": \"num_photos\", \"type\": \"int\"},\n" +
                    " {\"name\": \"num_groups\", \"type\": \"int\"} ]\n" +
                    "}";

    private static final String schemaDescriptionExt =
            " { \n" +
                    " \"namespace\": \"com.fhir2avro.avro\", \n" +
                    " \"name\": \"FacebookSpecialUser\", \n" +
                    " \"type\": \"record\",\n" +
                    " \"fields\": [\n" +
                    " {\"name\": \"user\", \"type\": com.fhir2avro.avro.FacebookUser },\n" +
                    " {\"name\": \"specialData\", \"type\": \"int\"} ]\n" +
                    "}";

    @Test
    public void testParseSchema() throws Exception{

        AvroUtils.parseSchema(schemaDescription);
        Schema extended = AvroUtils.parseSchema(schemaDescriptionExt);
        System.out.println(extended.toString(true));
    }
}
