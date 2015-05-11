package com.fhir2avro.avro.inheritance;

import com.fhir2avro.avro.FacebookSpecialUser;
import com.fhir2avro.avro.FacebookUser;
import org.apache.avro.Schema;
import org.junit.Before;
import org.testng.annotations.Test;

/**
 * @author Jon Todd
 */
public class TestSimpleInheritance {
    private Schema schema;
    private Schema subSchema;

    @Before
    public void setUp() throws Exception {

        subSchema = FacebookUser.getClassSchema();
        schema = FacebookSpecialUser.getClassSchema();

    }

    @Test
    public void testSimpleInheritance() throws Exception{
        // FROM: http://www.infoq.com/articles/ApacheAvro
//        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
//        GenericDatumWriter<GenericRecord> writer =
//                new GenericDatumWriter<GenericRecord>(schema);
//        Encoder encoder = BinaryEncoder(outputStream);
//
//        GenericRecord subRecord1 = new GenericData.Record(subSchema);
//        subRecord1.put("name", new Utf8("Doctor Who"));
//        subRecord1.put("num_likes", 1);
//        subRecord1.put("num_photos", 0);
//        subRecord1.put("num_groups", 423);
//        GenericRecord record1 = new GenericData.Record(schema);
//        record1.put("user", subRecord1);
//        record1.put("specialData", 1);
//
//        writer.write(record1, encoder);
//
//        GenericRecord subRecord2 = new GenericData.Record(subSchema);
//        subRecord2.put("name", new org.apache.avro.util.Utf8("Doctor WhoWho"));
//        subRecord2.put("num_likes", 2);
//        subRecord2.put("num_photos", 0);
//        subRecord2.put("num_groups", 424);
//        GenericRecord record2 = new GenericData.Record(schema);
//        record2.put("user", subRecord2);
//        record2.put("specialData", 2);
//
//        writer.write(record2, encoder);
//
//        encoder.flush();
//
//        ByteArrayInputStream inputStream =
//                new ByteArrayInputStream(outputStream.toByteArray());
//        Decoder decoder = DecoderFactory.defaultFactory().
//                createBinaryDecoder(inputStream, null);
//        GenericDatumReader<GenericRecord> reader =
//                new GenericDatumReader<GenericRecord>(schema);
//        while(true){
//            try{
//                GenericRecord result = reader.read(null, decoder);
//                System.out.println(result);
//            }
//            catch(EOFException eof){
//                break;
//            }
//            catch(Exception ex){
//                ex.printStackTrace();
//            }
//        }
    }
}
