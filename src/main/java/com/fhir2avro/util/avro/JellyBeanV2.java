/**
 * Autogenerated by Avro
 * 
 * DO NOT EDIT DIRECTLY
 */
package com.fhir2avro.util.avro;  
@SuppressWarnings("all")
@org.apache.avro.specific.AvroGenerated
public class JellyBeanV2 extends org.apache.avro.specific.SpecificRecordBase implements org.apache.avro.specific.SpecificRecord {
  public static final org.apache.avro.Schema SCHEMA$ = new org.apache.avro.Schema.Parser().parse("{\"type\":\"record\",\"name\":\"JellyBeanV2\",\"namespace\":\"com.fhir2avro.util.avro\",\"fields\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"id\",\"type\":\"int\"},{\"name\":\"color\",\"type\":\"string\"}]}");
  public static org.apache.avro.Schema getClassSchema() { return SCHEMA$; }
  @Deprecated public java.lang.CharSequence name;
  @Deprecated public int id;
  @Deprecated public java.lang.CharSequence color;

  /**
   * Default constructor.  Note that this does not initialize fields
   * to their default values from the schema.  If that is desired then
   * one should use <code>newBuilder()</code>. 
   */
  public JellyBeanV2() {}

  /**
   * All-args constructor.
   */
  public JellyBeanV2(java.lang.CharSequence name, java.lang.Integer id, java.lang.CharSequence color) {
    this.name = name;
    this.id = id;
    this.color = color;
  }

  public org.apache.avro.Schema getSchema() { return SCHEMA$; }
  // Used by DatumWriter.  Applications should not call. 
  public java.lang.Object get(int field$) {
    switch (field$) {
    case 0: return name;
    case 1: return id;
    case 2: return color;
    default: throw new org.apache.avro.AvroRuntimeException("Bad index");
    }
  }
  // Used by DatumReader.  Applications should not call. 
  @SuppressWarnings(value="unchecked")
  public void put(int field$, java.lang.Object value$) {
    switch (field$) {
    case 0: name = (java.lang.CharSequence)value$; break;
    case 1: id = (java.lang.Integer)value$; break;
    case 2: color = (java.lang.CharSequence)value$; break;
    default: throw new org.apache.avro.AvroRuntimeException("Bad index");
    }
  }

  /**
   * Gets the value of the 'name' field.
   */
  public java.lang.CharSequence getName() {
    return name;
  }

  /**
   * Sets the value of the 'name' field.
   * @param value the value to set.
   */
  public void setName(java.lang.CharSequence value) {
    this.name = value;
  }

  /**
   * Gets the value of the 'id' field.
   */
  public java.lang.Integer getId() {
    return id;
  }

  /**
   * Sets the value of the 'id' field.
   * @param value the value to set.
   */
  public void setId(java.lang.Integer value) {
    this.id = value;
  }

  /**
   * Gets the value of the 'color' field.
   */
  public java.lang.CharSequence getColor() {
    return color;
  }

  /**
   * Sets the value of the 'color' field.
   * @param value the value to set.
   */
  public void setColor(java.lang.CharSequence value) {
    this.color = value;
  }

  /** Creates a new JellyBeanV2 RecordBuilder */
  public static com.fhir2avro.util.avro.JellyBeanV2.Builder newBuilder() {
    return new com.fhir2avro.util.avro.JellyBeanV2.Builder();
  }
  
  /** Creates a new JellyBeanV2 RecordBuilder by copying an existing Builder */
  public static com.fhir2avro.util.avro.JellyBeanV2.Builder newBuilder(com.fhir2avro.util.avro.JellyBeanV2.Builder other) {
    return new com.fhir2avro.util.avro.JellyBeanV2.Builder(other);
  }
  
  /** Creates a new JellyBeanV2 RecordBuilder by copying an existing JellyBeanV2 instance */
  public static com.fhir2avro.util.avro.JellyBeanV2.Builder newBuilder(com.fhir2avro.util.avro.JellyBeanV2 other) {
    return new com.fhir2avro.util.avro.JellyBeanV2.Builder(other);
  }
  
  /**
   * RecordBuilder for JellyBeanV2 instances.
   */
  public static class Builder extends org.apache.avro.specific.SpecificRecordBuilderBase<JellyBeanV2>
    implements org.apache.avro.data.RecordBuilder<JellyBeanV2> {

    private java.lang.CharSequence name;
    private int id;
    private java.lang.CharSequence color;

    /** Creates a new Builder */
    private Builder() {
      super(com.fhir2avro.util.avro.JellyBeanV2.SCHEMA$);
    }
    
    /** Creates a Builder by copying an existing Builder */
    private Builder(com.fhir2avro.util.avro.JellyBeanV2.Builder other) {
      super(other);
      if (isValidValue(fields()[0], other.name)) {
        this.name = data().deepCopy(fields()[0].schema(), other.name);
        fieldSetFlags()[0] = true;
      }
      if (isValidValue(fields()[1], other.id)) {
        this.id = data().deepCopy(fields()[1].schema(), other.id);
        fieldSetFlags()[1] = true;
      }
      if (isValidValue(fields()[2], other.color)) {
        this.color = data().deepCopy(fields()[2].schema(), other.color);
        fieldSetFlags()[2] = true;
      }
    }
    
    /** Creates a Builder by copying an existing JellyBeanV2 instance */
    private Builder(com.fhir2avro.util.avro.JellyBeanV2 other) {
            super(com.fhir2avro.util.avro.JellyBeanV2.SCHEMA$);
      if (isValidValue(fields()[0], other.name)) {
        this.name = data().deepCopy(fields()[0].schema(), other.name);
        fieldSetFlags()[0] = true;
      }
      if (isValidValue(fields()[1], other.id)) {
        this.id = data().deepCopy(fields()[1].schema(), other.id);
        fieldSetFlags()[1] = true;
      }
      if (isValidValue(fields()[2], other.color)) {
        this.color = data().deepCopy(fields()[2].schema(), other.color);
        fieldSetFlags()[2] = true;
      }
    }

    /** Gets the value of the 'name' field */
    public java.lang.CharSequence getName() {
      return name;
    }
    
    /** Sets the value of the 'name' field */
    public com.fhir2avro.util.avro.JellyBeanV2.Builder setName(java.lang.CharSequence value) {
      validate(fields()[0], value);
      this.name = value;
      fieldSetFlags()[0] = true;
      return this; 
    }
    
    /** Checks whether the 'name' field has been set */
    public boolean hasName() {
      return fieldSetFlags()[0];
    }
    
    /** Clears the value of the 'name' field */
    public com.fhir2avro.util.avro.JellyBeanV2.Builder clearName() {
      name = null;
      fieldSetFlags()[0] = false;
      return this;
    }

    /** Gets the value of the 'id' field */
    public java.lang.Integer getId() {
      return id;
    }
    
    /** Sets the value of the 'id' field */
    public com.fhir2avro.util.avro.JellyBeanV2.Builder setId(int value) {
      validate(fields()[1], value);
      this.id = value;
      fieldSetFlags()[1] = true;
      return this; 
    }
    
    /** Checks whether the 'id' field has been set */
    public boolean hasId() {
      return fieldSetFlags()[1];
    }
    
    /** Clears the value of the 'id' field */
    public com.fhir2avro.util.avro.JellyBeanV2.Builder clearId() {
      fieldSetFlags()[1] = false;
      return this;
    }

    /** Gets the value of the 'color' field */
    public java.lang.CharSequence getColor() {
      return color;
    }
    
    /** Sets the value of the 'color' field */
    public com.fhir2avro.util.avro.JellyBeanV2.Builder setColor(java.lang.CharSequence value) {
      validate(fields()[2], value);
      this.color = value;
      fieldSetFlags()[2] = true;
      return this; 
    }
    
    /** Checks whether the 'color' field has been set */
    public boolean hasColor() {
      return fieldSetFlags()[2];
    }
    
    /** Clears the value of the 'color' field */
    public com.fhir2avro.util.avro.JellyBeanV2.Builder clearColor() {
      color = null;
      fieldSetFlags()[2] = false;
      return this;
    }

    @Override
    public JellyBeanV2 build() {
      try {
        JellyBeanV2 record = new JellyBeanV2();
        record.name = fieldSetFlags()[0] ? this.name : (java.lang.CharSequence) defaultValue(fields()[0]);
        record.id = fieldSetFlags()[1] ? this.id : (java.lang.Integer) defaultValue(fields()[1]);
        record.color = fieldSetFlags()[2] ? this.color : (java.lang.CharSequence) defaultValue(fields()[2]);
        return record;
      } catch (Exception e) {
        throw new org.apache.avro.AvroRuntimeException(e);
      }
    }
  }
}
