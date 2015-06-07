package com.fhir2avro.avro.inheritance;


import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.EOFException;
import java.io.File;

import org.apache.avro.Schema;
import org.apache.avro.generic.GenericData;
import org.apache.avro.generic.GenericDatumReader;
import org.apache.avro.generic.GenericDatumWriter;
import org.apache.avro.generic.GenericRecord;
import org.apache.avro.io.BinaryEncoder;
import org.apache.avro.io.Decoder;
import org.apache.avro.io.DecoderFactory;
import org.apache.avro.io.Encoder;
import org.apache.avro.io.EncoderFactory;
import org.apache.avro.util.Utf8;
import org.junit.Before;
import org.junit.Test;

import com.fhir2avro.avro.FacebookSpecialUser;
import com.fhir2avro.avro.FacebookUser;
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
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        GenericDatumWriter<GenericRecord> writer =
                new GenericDatumWriter<GenericRecord>(schema);
		BinaryEncoder encoder = EncoderFactory.get().binaryEncoder(outputStream,
				null);

        GenericRecord subRecord1 = new GenericData.Record(subSchema);
        subRecord1.put("name", new Utf8("Doctor Who"));
        subRecord1.put("num_likes", 1);
        subRecord1.put("num_photos", 0);
        subRecord1.put("num_groups", 423);
        GenericRecord record1 = new GenericData.Record(schema);
        record1.put("user", subRecord1);
        record1.put("specialData", 1);

        writer.write(record1, encoder);

        GenericRecord subRecord2 = new GenericData.Record(subSchema);
        subRecord2.put("name", new org.apache.avro.util.Utf8("Doctor WhoWho"));
        subRecord2.put("num_likes", 2);
        subRecord2.put("num_photos", 0);
        subRecord2.put("num_groups", 424);
        GenericRecord record2 = new GenericData.Record(schema);
        record2.put("user", subRecord2);
        record2.put("specialData", 2);

        writer.write(record2, encoder);

        encoder.flush();

        ByteArrayInputStream inputStream =
                new ByteArrayInputStream(outputStream.toByteArray());
        Decoder decoder = DecoderFactory.defaultFactory().
                createBinaryDecoder(inputStream, null);
        GenericDatumReader<GenericRecord> reader =
                new GenericDatumReader<GenericRecord>(schema);
        while(true){
            try{
                GenericRecord result = reader.read(null, decoder);
                System.out.println(result);
            }
            catch(EOFException eof){
                break;
            }
            catch(Exception ex){
                ex.printStackTrace();
            }
        }
    }
}
