/**
 * Autogenerated by Avro
 * 
 * DO NOT EDIT DIRECTLY
 */
package com.fhir2avro.avro;  
@SuppressWarnings("all")
@org.apache.avro.specific.AvroGenerated
public class FacebookUser extends org.apache.avro.specific.SpecificRecordBase implements org.apache.avro.specific.SpecificRecord {
  public static final org.apache.avro.Schema SCHEMA$ = new org.apache.avro.Schema.Parser().parse("{\"type\":\"record\",\"name\":\"FacebookUser\",\"namespace\":\"com.fhir2avro.avro\",\"fields\":[{\"name\":\"name\",\"type\":[\"string\",\"null\"]},{\"name\":\"num_likes\",\"type\":\"int\"},{\"name\":\"num_photos\",\"type\":\"int\"},{\"name\":\"num_groups\",\"type\":\"int\"}]}");
  public static org.apache.avro.Schema getClassSchema() { return SCHEMA$; }
  @Deprecated public java.lang.CharSequence name;
  @Deprecated public int num_likes;
  @Deprecated public int num_photos;
  @Deprecated public int num_groups;

  /**
   * Default constructor.  Note that this does not initialize fields
   * to their default values from the schema.  If that is desired then
   * one should use <code>newBuilder()</code>. 
   */
  public FacebookUser() {}

  /**
   * All-args constructor.
   */
  public FacebookUser(java.lang.CharSequence name, java.lang.Integer num_likes, java.lang.Integer num_photos, java.lang.Integer num_groups) {
    this.name = name;
    this.num_likes = num_likes;
    this.num_photos = num_photos;
    this.num_groups = num_groups;
  }

  public org.apache.avro.Schema getSchema() { return SCHEMA$; }
  // Used by DatumWriter.  Applications should not call. 
  public java.lang.Object get(int field$) {
    switch (field$) {
    case 0: return name;
    case 1: return num_likes;
    case 2: return num_photos;
    case 3: return num_groups;
    default: throw new org.apache.avro.AvroRuntimeException("Bad index");
    }
  }
  // Used by DatumReader.  Applications should not call. 
  @SuppressWarnings(value="unchecked")
  public void put(int field$, java.lang.Object value$) {
    switch (field$) {
    case 0: name = (java.lang.CharSequence)value$; break;
    case 1: num_likes = (java.lang.Integer)value$; break;
    case 2: num_photos = (java.lang.Integer)value$; break;
    case 3: num_groups = (java.lang.Integer)value$; break;
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
   * Gets the value of the 'num_likes' field.
   */
  public java.lang.Integer getNumLikes() {
    return num_likes;
  }

  /**
   * Sets the value of the 'num_likes' field.
   * @param value the value to set.
   */
  public void setNumLikes(java.lang.Integer value) {
    this.num_likes = value;
  }

  /**
   * Gets the value of the 'num_photos' field.
   */
  public java.lang.Integer getNumPhotos() {
    return num_photos;
  }

  /**
   * Sets the value of the 'num_photos' field.
   * @param value the value to set.
   */
  public void setNumPhotos(java.lang.Integer value) {
    this.num_photos = value;
  }

  /**
   * Gets the value of the 'num_groups' field.
   */
  public java.lang.Integer getNumGroups() {
    return num_groups;
  }

  /**
   * Sets the value of the 'num_groups' field.
   * @param value the value to set.
   */
  public void setNumGroups(java.lang.Integer value) {
    this.num_groups = value;
  }

  /** Creates a new FacebookUser RecordBuilder */
  public static com.fhir2avro.avro.FacebookUser.Builder newBuilder() {
    return new com.fhir2avro.avro.FacebookUser.Builder();
  }
  
  /** Creates a new FacebookUser RecordBuilder by copying an existing Builder */
  public static com.fhir2avro.avro.FacebookUser.Builder newBuilder(com.fhir2avro.avro.FacebookUser.Builder other) {
    return new com.fhir2avro.avro.FacebookUser.Builder(other);
  }
  
  /** Creates a new FacebookUser RecordBuilder by copying an existing FacebookUser instance */
  public static com.fhir2avro.avro.FacebookUser.Builder newBuilder(com.fhir2avro.avro.FacebookUser other) {
    return new com.fhir2avro.avro.FacebookUser.Builder(other);
  }
  
  /**
   * RecordBuilder for FacebookUser instances.
   */
  public static class Builder extends org.apache.avro.specific.SpecificRecordBuilderBase<FacebookUser>
    implements org.apache.avro.data.RecordBuilder<FacebookUser> {

    private java.lang.CharSequence name;
    private int num_likes;
    private int num_photos;
    private int num_groups;

    /** Creates a new Builder */
    private Builder() {
      super(com.fhir2avro.avro.FacebookUser.SCHEMA$);
    }
    
    /** Creates a Builder by copying an existing Builder */
    private Builder(com.fhir2avro.avro.FacebookUser.Builder other) {
      super(other);
      if (isValidValue(fields()[0], other.name)) {
        this.name = data().deepCopy(fields()[0].schema(), other.name);
        fieldSetFlags()[0] = true;
      }
      if (isValidValue(fields()[1], other.num_likes)) {
        this.num_likes = data().deepCopy(fields()[1].schema(), other.num_likes);
        fieldSetFlags()[1] = true;
      }
      if (isValidValue(fields()[2], other.num_photos)) {
        this.num_photos = data().deepCopy(fields()[2].schema(), other.num_photos);
        fieldSetFlags()[2] = true;
      }
      if (isValidValue(fields()[3], other.num_groups)) {
        this.num_groups = data().deepCopy(fields()[3].schema(), other.num_groups);
        fieldSetFlags()[3] = true;
      }
    }
    
    /** Creates a Builder by copying an existing FacebookUser instance */
    private Builder(com.fhir2avro.avro.FacebookUser other) {
            super(com.fhir2avro.avro.FacebookUser.SCHEMA$);
      if (isValidValue(fields()[0], other.name)) {
        this.name = data().deepCopy(fields()[0].schema(), other.name);
        fieldSetFlags()[0] = true;
      }
      if (isValidValue(fields()[1], other.num_likes)) {
        this.num_likes = data().deepCopy(fields()[1].schema(), other.num_likes);
        fieldSetFlags()[1] = true;
      }
      if (isValidValue(fields()[2], other.num_photos)) {
        this.num_photos = data().deepCopy(fields()[2].schema(), other.num_photos);
        fieldSetFlags()[2] = true;
      }
      if (isValidValue(fields()[3], other.num_groups)) {
        this.num_groups = data().deepCopy(fields()[3].schema(), other.num_groups);
        fieldSetFlags()[3] = true;
      }
    }

    /** Gets the value of the 'name' field */
    public java.lang.CharSequence getName() {
      return name;
    }
    
    /** Sets the value of the 'name' field */
    public com.fhir2avro.avro.FacebookUser.Builder setName(java.lang.CharSequence value) {
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
    public com.fhir2avro.avro.FacebookUser.Builder clearName() {
      name = null;
      fieldSetFlags()[0] = false;
      return this;
    }

    /** Gets the value of the 'num_likes' field */
    public java.lang.Integer getNumLikes() {
      return num_likes;
    }
    
    /** Sets the value of the 'num_likes' field */
    public com.fhir2avro.avro.FacebookUser.Builder setNumLikes(int value) {
      validate(fields()[1], value);
      this.num_likes = value;
      fieldSetFlags()[1] = true;
      return this; 
    }
    
    /** Checks whether the 'num_likes' field has been set */
    public boolean hasNumLikes() {
      return fieldSetFlags()[1];
    }
    
    /** Clears the value of the 'num_likes' field */
    public com.fhir2avro.avro.FacebookUser.Builder clearNumLikes() {
      fieldSetFlags()[1] = false;
      return this;
    }

    /** Gets the value of the 'num_photos' field */
    public java.lang.Integer getNumPhotos() {
      return num_photos;
    }
    
    /** Sets the value of the 'num_photos' field */
    public com.fhir2avro.avro.FacebookUser.Builder setNumPhotos(int value) {
      validate(fields()[2], value);
      this.num_photos = value;
      fieldSetFlags()[2] = true;
      return this; 
    }
    
    /** Checks whether the 'num_photos' field has been set */
    public boolean hasNumPhotos() {
      return fieldSetFlags()[2];
    }
    
    /** Clears the value of the 'num_photos' field */
    public com.fhir2avro.avro.FacebookUser.Builder clearNumPhotos() {
      fieldSetFlags()[2] = false;
      return this;
    }

    /** Gets the value of the 'num_groups' field */
    public java.lang.Integer getNumGroups() {
      return num_groups;
    }
    
    /** Sets the value of the 'num_groups' field */
    public com.fhir2avro.avro.FacebookUser.Builder setNumGroups(int value) {
      validate(fields()[3], value);
      this.num_groups = value;
      fieldSetFlags()[3] = true;
      return this; 
    }
    
    /** Checks whether the 'num_groups' field has been set */
    public boolean hasNumGroups() {
      return fieldSetFlags()[3];
    }
    
    /** Clears the value of the 'num_groups' field */
    public com.fhir2avro.avro.FacebookUser.Builder clearNumGroups() {
      fieldSetFlags()[3] = false;
      return this;
    }

    @Override
    public FacebookUser build() {
      try {
        FacebookUser record = new FacebookUser();
        record.name = fieldSetFlags()[0] ? this.name : (java.lang.CharSequence) defaultValue(fields()[0]);
        record.num_likes = fieldSetFlags()[1] ? this.num_likes : (java.lang.Integer) defaultValue(fields()[1]);
        record.num_photos = fieldSetFlags()[2] ? this.num_photos : (java.lang.Integer) defaultValue(fields()[2]);
        record.num_groups = fieldSetFlags()[3] ? this.num_groups : (java.lang.Integer) defaultValue(fields()[3]);
        return record;
      } catch (Exception e) {
        throw new org.apache.avro.AvroRuntimeException(e);
      }
    }
  }
}