// models.js

const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  coursename: String,
});

const CollegeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  college_name: String,
});

const CertificateTypeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  Certificate_Name: String,
});
const CourseCertificateTypeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  Course_Certificate_Type_id: Number,
  Certification_Name: String,
});



const StudentListSchema = new mongoose.Schema({
  S_NO: Number,
  NAME: String,
  GENDER:String,

  FATHER_NAME: String,
  REG_NO: String,
  PHOTO: String,
  college_id: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
  Course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  Certificate_Type_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CertificateType' },
  yop:String,
  Course_Certificate_Type_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CourseCertificateType' },
  Role :String,
});

const CourseStudentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  collegeName: String,
  fatherName: String,
  course: String,
  certificateType: String,
  yop: Number,
  from: String,
  to: String,
  softwareCovered: String,
  regNo: String,
  gender: String, // Add gender field
  qualification: { type: String}, // Dropdown
  department: { type: String}, // Input Field
  gender: { type: String}, // Dropdown
  internshipOrProject: { type: String}, // Dropdown
  role: { type: String},
});

const CourseStudent = mongoose.model('CourseStudent', CourseStudentSchema);

const College = mongoose.model('colleges', CollegeSchema);
const CertificateType = mongoose.model('certificatetypes', CertificateTypeSchema);
const StudentList = mongoose.model('internshistudentlists', StudentListSchema);
const CourseCertificateType = mongoose.model('coursecertificatetypes', CourseCertificateTypeSchema);

module.exports = { College, CertificateType, CourseCertificateType, StudentList,CourseStudent };
