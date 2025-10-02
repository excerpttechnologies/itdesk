const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mime = require('mime');
const expressAsyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const multer = require('multer');
const path = require('path');
const { CourseStudent } = require('./model');
const { StudentList } = require('./model');
const dotenv = require('dotenv');
const PDFDocument = require('pdfkit');
const { type } = require('os');
dotenv.config(); 
const app = express();

const PORT = process.env.PORT || 8080;


app.use(cors());

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

;




// // Connect to MongoDB
mongoose.connect(`mongodb+srv://excerpttech:excerpttech2021@cluster0.5vdeszu.mongodb.net/LookUp`,
  {  useNewUrlParser: true,
    useUnifiedTopology: true}
).then(() => {
  console.log('MongoDB connection successful');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  qualification: String,
  gender: String,
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
});

const User = mongoose.model('User', userSchema);

app.post("/api/register", async (req, res) => {
  const { username, email, password,name,gender } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({  email, password: hashedPassword,name,gender });
  try {
    await user.save();
    res.status(201).send("User registered");
  } catch (error) {
    res.status(400).send("Error registering user");
  }
});



app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        message: 'Login successful',
        role: user.role, // ✅ send role to frontend
        name: user.name, // optional: if you also want to send user's name
        email: user.email // optional: email too
      });
    } else {
      res.status(400).send("Invalid credentials");
    }

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Internal server error");
  }
});


// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;
//   console.log("Login attempt:", email, password);

//   // Hardcoded credentials
//   const hardcodedEmail = 'kavana12@gmail.com';
//   const hardcodedPassword = '1234';

//   try {
//     if (email === hardcodedEmail && password === hardcodedPassword) {
//       console.log("Login successful for:", email);
//       // You might want to generate a token here if you're using JWT
//       res.status(200).json({ message: 'Login successful', role: 'admin' });
//     } else {
//       console.log("Invalid credentials for:", email);
//       res.status(401).json({ message: 'Invalid credentials' });
//     }
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Login failed', error: error.toString() });
//   }
// });


  
app.get('/api/students', async (req, res) => {
  try {
    const students = await StudentList.aggregate([
      {
        $lookup: {
          from: 'colleges',
          localField: 'college_id',
          foreignField: '_id',
          as: 'college'
        }
      },
      // {
      //   $lookup: {
      //     from: 'courses',
      //     localField: 'Course_id',
      //     foreignField: '_id',
      //     as: 'course'
      //   }
      // },
      {
        "$lookup": {
          "from": "courses",
          "localField": "Course_id",
          "foreignField": "Course_id",
          "as": "course"
        }
      },
      {
        "$lookup": {
          "from": "certificatetypes",
          "localField": "Certificate_Type_id",
          "foreignField": "Certificate_Type_id",
          "as": "certificateType",
        }
      },
      {
        $lookup: {
          "from": 'certificatetypes',
          "localField": 'Course_Certificate_Type_id',
          "foreignField": 'Course_Certificate_Type_id',
          "as": 'courseCertificateType'
        }
      },
    
      {
        $project: {
          S_NO: 1,
          NAME: 1,
          GENDER:1,
          FATHER_NAME: 1,
          REG_NO: 1,
          PHOTO: 1,
          college_name: { $arrayElemAt: ["$college.name", 0] },
          coursename: { $arrayElemAt: ["$course.Course_Name", 0] },
          certificate_type: { $arrayElemAt: ["$certificateType.Certificate_Name", 0] },
          yop:1,
          qualification:1,
department:1,
To:1,
From:1,

        
         
          Course_Certificate_Type: { $arrayElemAt: ["$courseCertificateType.Certification_Name", 0] },
          Role:1,
        }
      }
    ]);

    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


const JobSchema = new mongoose.Schema({
  title: String,
  description: String,
  experience: String,
  qualification: String,
  skills: [String],
});

const JobModel = mongoose.model('excerptjobdatas', JobSchema);



// app.get('/api/jobdata', async (req, res) => {
//   try {
//     const jobData = await JobModel.find();
//     res.json(jobData);
//   } catch (error) {
//     console.error('Error fetching job data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });



// const resumeSchema = new mongoose.Schema({
//   job: String,
//   name: String,
//   email: String,
//   resumePath: String,
// });


// Add these API endpoints to your Express server

// POST - Create new job
app.post('/api/jobdata', async (req, res) => {
  try {
    const { title, description, experience, qualification, skills } = req.body;
    
    // Validation
    if (!title || !description || !experience || !qualification || !skills) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    const newJob = new JobModel({
      title,
      description,
      experience,
      qualification,
      skills: Array.isArray(skills) ? skills : [skills]
    });
    
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT - Update existing job
app.put('/api/jobdata/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, experience, qualification, skills } = req.body;
    
    // Validation
    if (!title || !description || !experience || !qualification || !skills) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    const updatedJob = await JobModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        experience,
        qualification,
        skills: Array.isArray(skills) ? skills : [skills]
      },
      { new: true, runValidators: true }
    );
    
    if (!updatedJob) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    res.json(updatedJob);
  } catch (error) {
    console.error('Error updating job:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid job ID' });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE - Delete job
app.delete('/api/jobdata/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedJob = await JobModel.findByIdAndDelete(id);
    
    if (!deletedJob) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    res.json({ message: 'Job deleted successfully', deletedJob });
  } catch (error) {
    console.error('Error deleting job:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid job ID' });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Your existing GET endpoint remains the same
app.get('/api/jobdata', async (req, res) => {
  try {
    const jobData = await JobModel.find();
    res.json(jobData);
  } catch (error) {
    console.error('Error fetching job data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
const resumeSchema = new mongoose.Schema(
  {
    job: String,
    name: String,
    email: String,
    resumePath: String,
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

app.post("/api/addData", async (req, res) => {
  try {
    // Extract the form data from the request body
    const { name, age } = req.body;

    // Create a new instance of the StudentList model with the extracted data
    const newStudent = new StudentList({
      NAME: name,
      // Assuming 'age' is stored as a string in the form
      yop: age,
      // You may need to adjust this based on your form data structure
      // Add other fields here as needed
    });

    // Save the new instance to the database
    await newStudent.save();

    // Return a success response to the client
    res.status(201).json({ message: 'Data added successfully' });
  } catch (error) {
    // Return an error response if something goes wrong
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});




// training popup form
const formSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  qualification: String,
  address: String,
});

// Create a model
const Form = mongoose.model('Form', formSchema);

// Define routes
app.post('/api/saveFormData', async (req, res) => {
  try {
    const formData = new Form(req.body);
    await formData.save();
    res.status(201).send('Form data saved');
  } catch (error) {
    res.status(500).send('Error saving form data');
  }
});


app.get("/api/courseStudents", async (req, res) => {
  try {
    const courseStudents = await CourseStudent.find();
    res.json(courseStudents);
  } catch (error) {
    console.error('Error fetching course students:', error.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.get('/api/courseStudents', async (req, res) => {
  const regNo = req.query.REG_NO;
  if (!regNo) {
      return res.status(400).json({ error: 'Registration number is required' });
  }

  try {
      const student = await CourseStudent.findOne({ regNo });
      if (!student) {
          return res.status(404).json({ error: 'Student not found' });
      }
      res.json(student);
  } catch (error) {
      console.error('Error fetching student details:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


// Create a model for the student data



// Endpoint to add a new student
app.post('/api/addCourseStudent', async (req, res) => {
  try {
    const {
      name,
      age,
      collegeName,
      fatherName,
      course,
      certificateType,
      yop,
      from,
      to,
      softwareCovered,
      regNo,
      role,
      gender,
      qualification,
      department,
      internshipOrProject,
    } = req.body;
    console.log("coursedetails",req.body)

    // Create a new student document
    const newStudent = new CourseStudent({
      name,
      age,
      collegeName,
      fatherName,
      course,
      certificateType,
      yop,
      from,
      to,
      softwareCovered,
      regNo,
      role,
      gender,
      qualification,
      department,
      internshipOrProject,
    });

    // Save the new student document to the database
    await newStudent.save();

    res.status(201).json({ message: 'Data added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});




// // Create Resume model
const Resume = mongoose.model('Resume', resumeSchema);



// Connect to MongoDB


// College Schema
const collegeSchema = new mongoose.Schema({
  _id: Number,
  name: String,
});

const College = mongoose.model("College", collegeSchema);

// Certificate Type Schema
const certificateTypeSchema = new mongoose.Schema({
  Certificate_Type_id: Number,
  Certificate_Name: String,
});

const CertificateType = mongoose.model("CertificateType", certificateTypeSchema);

// Course Details Schema
const courseDetailsSchema = new mongoose.Schema({
  courseId: String,
  courseName: String,
});

const CourseDetails = mongoose.model("CourseDetails", courseDetailsSchema);

// Export models (Optional if needed elsewhere)
module.exports = { College, CertificateType, CourseDetails };

console.log("Schemas created successfully!");


// Routes for lookups
// app.get('/api/colleges', async (req, res) => {
//   try {
//     const colleges = await mongoose.model('colleges').find();
//     console.log("college",colleges)
//     res.json(colleges);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

app.get('/api/colleges', async (req, res) => {
  try {
    const colleges = await mongoose.model('College').find({}, { _id: 1, name: 1 }); // Explicitly include _id
    console.log("college", colleges);
    res.json(colleges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// routes/courseRoutes.js


// GET all courses
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await CourseDetails.find({});
    console.log('Fetched courses:', courses); // For debugging
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error); // For debugging
    res.status(500).json({ 
      message: 'Error fetching courses', 
      error: error.message 
    });
  }
});





// const courseSchema = new mongoose.Schema({
//   Course_id: { type: String, unique: true, required: true }, // Unique Course ID
//   Course_Name: { type: String, required: true }, // Course Name
//   duration: { type: String, required: true }, // Duration (e.g., "3 years", "6 months")
//   department: { type: String }, // Optional: Department associated with the course
// });

// const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);







// const courseSchema = new mongoose.Schema({
//   _id: Number,  // Since you're using numeric IDs like 215
//   name: String,
//   description: String,
//   // Add any other fields your course schema needs
// }, { collection: 'courses' }); // Explicitly specify collection name

// const Course = mongoose.model('Course', courseSchema);

app.get('/api/certificateTypes', async (req, res) => {
  try {
    const certificateTypes = await mongoose.model('certificatetypes').find();
    console.log("cert",certificateTypes)
    res.json(certificateTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// const internSchema = new mongoose.Schema({
//   S_NO: Number,
//   NAME: String,
//   GENDER: String,
//   FATHER_NAME: String,
//   REG_NO: String,
//   PHOTO: String,
//   college_id: { type: mongoose.Schema.Types.String, ref: "College" }, // Reference to College
//   Course_id: { type: mongoose.Schema.Types.String, ref: "Course" }, // Reference to Course
//   Course_Certificate_Type_id: { type: mongoose.Schema.Types.Number, ref: "CourseCertificateType" }, // Reference to Certificate Type
//   yop: String,
//   Course_Certificate_Type_id: String,
//   Role: String,
//   From: Date,
//   To: Date,
//   qualification: String,
//   department: String
// });

// // const internshistudentlists = mongoose.model('internshistudentlists', internSchema);
// const internshistudentlists =
//   mongoose.models.internshistudentlists || mongoose.model('internshistudentlists', internSchema);


// Define schema
const internSchema = new mongoose.Schema({
  S_NO: { type: Number, unique: true }, // Auto-incremented field
  NAME: { type: String, required: true },
  GENDER: { type: String, enum: ["MALE", "FEMALE", "OTHER"], required: true },
  FATHER_NAME: { type: String,  },
  REG_NO: { type: String, },
  PHOTO: { type: String, },
  college_id: { type: Number},
  Course_id: { type: Number },
  Certificate_Type_id: { type: Number },

Course_Certificate_Type_id:{ type: Number },

  yop: { type: String,  },
  Course_Certificate_Type_id: { type: Number },
  Role: { type: String, },
  From: { type: String, },
  To: { type: String,  },
  qualification:{ type: String, },
  department:{ type: String, },
}, { collection: "internshistudentlists" });

// Model
const Intern = mongoose.model("Intern", internSchema);




app.get('/api/interns/latest-sno', async (req, res) => {
  try {
    // Find the latest intern record based on S_NO
    const lastIntern = await Intern.findOne().sort({ S_NO: -1 });
    console.log("lastIntern",lastIntern)
    // Return the latest S_NO (or 0 if no records exist)
    const latestSNo = lastIntern ? lastIntern.S_NO : 0;

    res.status(200).json({ latestSNo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get('/api/interns/count', async (req, res) => {
  try {
    const totalCount = await Intern.countDocuments();  // Fetch total count
    console.log("Total Interns Count:", totalCount);
    res.status(200).json({ total: totalCount });
  } catch (error) {
    console.error("Error fetching count:", error);
    res.status(500).json({ message: "Error fetching document count" });
  }
});


// Route to add new intern
app.post("/api/interns", async (req, res) => {
  try {
    // Fetch the last intern's S_NO and increment
    const lastIntern = await Intern.findOne().sort({ S_NO: -1 });
    const newSNo = lastIntern ? lastIntern.S_NO + 1 : 1; // If no interns, start with 1
console.log("intern",req.body)
    // Create a new intern document
    const newIntern = new Intern({
      S_NO: newSNo,
      NAME: req.body.NAME,
      GENDER: req.body.GENDER,
      FATHER_NAME: req.body.FATHER_NAME,
      REG_NO: req.body.REG_NO,
      PHOTO: req.body.PHOTO,
      college_id: req.body.college_id,
  
      Course_Certificate_Type_id:req.body.Course_Certificate_Type_id,
      Course_id: req.body.Course_id || req.body.course_id,  // Fix case issue
      Certificate_Type_id: req.body.Certificate_Type_id || req.body.certificate_type_id, // Fix case issue
      yop: req.body.yop,
      Role: req.body.Role,
      From: req.body.From,
      To: req.body.To,
      qualification:req.body.qualification,
      department:req.body.department

    });
    
console.log("new adding",newIntern)
    // Save to database
    await newIntern.save();

    res.status(201).json({ message: "Intern added successfully", intern: newIntern });
  } catch (error) {
    res.status(400).json({ message: "Error adding intern", error });
  }
});




// Set up multer middleware for handling file uploads
const storage = multer.diskStorage({
destination: function (req, file, cb) {
  cb(null, 'public/resumes'); // Destination folder for storing resumes
},
filename: function (req, file, cb) {
  cb(null, file.originalname);
},
});

const upload = multer({ storage: storage });

// Define a route for handling form submissions
app.post('/api/submit', upload.single('resume'), async (req, res) => {
try {
  // Create a new resume document
  const newResume = new Resume({
    job: req.body.job,
    name: req.body.name,
    email: req.body.email,
    resumePath: req.file.originalname,
  });

  // Save the resume document to the database
  await newResume.save();

  // Send a response
  res.send('Resume uploaded successfully!');
} catch (error) {
  console.error('Error uploading resume:', error);
  res.status(500).send('Internal Server Error');
}
});

 app.use('/api/resumes', express.static(path.join(__dirname, 'public/resumes')));
app.get('/api/resumedata', async (req, res) => {
try {
  const resumeData = await Resume.find();
  res.json(resumeData);
} catch (error) {
  console.error('Error fetching resume data:', error);
  res.status(500).json({ error: 'Internal Server Error' });
}
});

// -------------------------------------
// -------------------------------------------------------



const contactEmail = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.SMTP_USER,  // Use environment variables
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  }
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});



app.post(`/api/contact`,
  expressAsyncHandler(async (req, res) => {
    const name = req.body.name;
 
    const email = req.body.email;
    const phone = req.body.phone;
    const subject = req.body.subject;

    const message = req.body.message;
    const mail = {
      from: name,
      to: "excerptech@gmail.com",
      subject: "Contact Form Submission",

      html: `<p>Name: ${name} </p>
             <p>Phone: ${phone}</p>
             <p>Email: ${email}</p>
             <p>Subject: ${subject}</p>
             <p>Message: ${message}</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
      if (error) {
        console.log("error");
        res.json({ status: "ERROR" });
      } else {
        console.log("Successful");
        res.json({ status: "Message Sent" });
        res.end();
      }
    });
  })
);








// API endpoint to handle form submission
app.post('/api/course-interest', expressAsyncHandler(async (req, res) => {
  const { fname, lname, email, phone, states, center } = req.body;

  console.log("Received form data:", req.body);

  const mailOptions = {
    from: 'fname', // Sender address
    to: 'excerptech@gmail.com', // List of recipients
    subject: 'Course Interest Form Submission',
    html: `
      <p>First Name: ${fname}</p>
      <p>Last Name: ${lname}</p>
      <p>Phone: ${phone}</p>
      <p>Email: ${email}</p>
      <p>Center: ${center}</p>
      <p>State: ${states}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.json({ status: 'Message Sent' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.json({ status: 'ERROR' });
  }
}));




const invoiceSchema = new mongoose.Schema({
  invoiceNumber: String,
  date: String,
  terms: String,
  dueDate: String,
 billToName: String,
     billtocompanyname:String,
    billToAddress: String,
    billToemail: String,
     billTophone:String,
      billTogstin: String,
      shipToName: String,
     shipTocompanyname:String,
    shipToAddress: String,
    shipToemail: String,
    shipTophone: String,
      shipTogstin: String,
  subTotal: Number,
  cgst: Number,
  sgst: Number,
  cgstRate:String,
  sgstRate:String,
  total: String,
  balanceDue: Number,
  totalInWords: String,
  year: String,
   thankYouMessage: String,
  termsAndConditions: String,
  bankDetails: String,
  totalDiscount:String,
  discounts:[{
    label:String,
    amount:Number
  }],
  parts: [
    {
      title: String,
      items: [
        {
          description: String,
          amount: Number
        }
      ]
    }
  ]
},{timestamps:true});



const Invoice = mongoose.model('Invoice', invoiceSchema);

// New Schema for storing the last invoice number
const lastInvoiceNumberSchema = new mongoose.Schema({
  lastNumber: Number
});

const LastInvoiceNumber = mongoose.model('LastInvoiceNumber', lastInvoiceNumberSchema);
app.get('/invoices', async (req, res) => {
  try {
    const invoices = await Invoice.find({}).sort({ createdAt: -1 }); // Sort by newest first
    res.json(invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ message: error.message });
  }
});
// app.post('/invoices', async (req, res) => {
//   try {
//     const newInvoice = new Invoice(req.body);
//     const savedInvoice = await newInvoice.save();

//     // Increment the last invoice number
//     await LastInvoiceNumber.findOneAndUpdate(
//       {},
//       { $inc: { lastNumber: 1 } },
//       { upsert: true, new: true }
//     );

//     res.status(201).json(savedInvoice);
//   } catch (error) {
//     console.error('Error saving invoice:', error);
//     res.status(400).json({ message: error.message });
//   }
// });

// Existing route for fetching invoices
app.get('/invoices/:id', async (req, res) => {
  try {
    console.log('Fetching invoice with ID:', req.params.id);
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      console.log('Invoice not found');
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.json(invoice);
  } catch (error) {
    console.error('Error fetching invoice:', error);
    res.status(500).json({ message: error.message });
  }
});

// New route for getting the last invoice number
// app.get('/last-invoice-number', async (req, res) => {
//   try {
//     const lastInvoiceNumber = await LastInvoiceNumber.findOne() || { lastNumber: 0 };
//     res.json({ lastNumber: lastInvoiceNumber.lastNumber });
//   } catch (error) {
//     console.error('Error fetching last invoice number:', error);
//     res.status(500).json({ error: 'Error fetching last invoice number' });
//   }
// });
app.get('/last-invoice-number', async (req, res) => {
  try {
    // Get all existing invoices and extract their numbers
    const existingInvoices = await Invoice.find({}).select('invoiceNumber');
    
    // Extract the highest numeric part from invoice numbers
    let highestNumber = 0;
    
    existingInvoices.forEach(invoice => {
      const match = invoice.invoiceNumber.match(/\/(\d{3})$/);
      if (match) {
        const num = parseInt(match[1]);
        if (num > highestNumber) {
          highestNumber = num;
        }
      }
    });
    
    res.json({ lastNumber: highestNumber });
  } catch (error) {
    console.error('Error fetching last invoice number:', error);
    res.status(500).json({ error: 'Error fetching last invoice number' });
  }
});
app.post('/invoices', async (req, res) => {
  try {
    const newInvoice = new Invoice(req.body);
    console.log('new invoice data', req.body)
    const savedInvoice = await newInvoice.save();
    res.status(201).json(savedInvoice);
  } catch (error) {
    console.error('Error saving invoice:', error);
    res.status(400).json({ message: error.message });
  }
});

app.put('/invoices/:id', async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const updateData = req.body;

    // Calculate totals if parts are updated
    if (updateData.parts) {
      const totalItemsAmount = updateData.parts.reduce(
        (partSum, part) =>
          partSum +
          part.items.reduce((itemSum, item) => itemSum + (parseFloat(item.amount) || 0), 0),
        0
      );

      const cgstPercent = parseFloat(updateData.cgstRate) || 0;
      const sgstPercent = parseFloat(updateData.sgstRate) || 0;

      const cgstCalculated = totalItemsAmount * (cgstPercent / 100);
      const sgstCalculated = totalItemsAmount * (sgstPercent / 100);

      const total = totalItemsAmount + cgstCalculated + sgstCalculated;

      updateData.subTotal = totalItemsAmount.toFixed(2);
      updateData.cgst = cgstCalculated.toFixed(2);
      updateData.sgst = sgstCalculated.toFixed(2);
      updateData.total = total.toFixed(2);
    }

    const updatedInvoice = await Invoice.findByIdAndUpdate(
      invoiceId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedInvoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    res.json(updatedInvoice);
  } catch (error) {
    console.error('Error updating invoice:', error);
    res.status(400).json({ message: error.message });
  }
});

// DELETE invoice
app.delete('/invoices/:id', async (req, res) => {
  try {
    const invoiceId = req.params.id;
    
    const deletedInvoice = await Invoice.findByIdAndDelete(invoiceId);
    
    if (!deletedInvoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    res.json({ message: 'Invoice deleted successfully', invoice: deletedInvoice });
  } catch (error) {
    console.error('Error deleting invoice:', error);
    res.status(400).json({ message: error.message });
  }
});



// Database Schema
const quotationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'New Quotation'
  },
  clientName: {
    type: String,
    default: ''
  },
  clientAddress: {
    type: String,
    default: ''
  },
       discount: Number,
  parts: [{
    id: Number,
    title: String,
    description: String,
    items: [{
      id: Number,
      description: String,
      amount: {
        type: Number,
        default: 0
      }
    }]
  }],
  featureCategories: [{
    id: Number,
    name: String,
    color: String,
    features: [String]
  }],
  note: {
    type: String,
    
  },
  validity: {
    type: String,
   
  },
  timeline: {
    type: String,
    
  },
  annualRenewal: {
    type: Number,
    default: 0
  },
   paymentTermsText: {
    type:String,
   },

  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Quotation = mongoose.model('Quotation', quotationSchema);

// Helper function to calculate totals
const calculateTotals = (quotationData) => {
  const partTotals = quotationData.parts.map(part => {
    const total = part.items.reduce((sum, item) => sum + item.amount, 0);
    return { ...part, total };
  });
  
  const grandTotal = partTotals.reduce((sum, part) => sum + part.total, 0);
  
  return { partTotals, grandTotal };
};

// PDF Generation Function


// API Routes

// Get all quotations
app.get('/api/quotations', async (req, res) => {
  try {
    const quotations = await Quotation.find()
      .select('_id title clientName createdAt updatedAt')
      .sort({ updatedAt: -1 });
    
    const formattedQuotations = quotations.map(q => ({
      id: q._id,
      title: q.title,
      clientName: q.clientName,
      createdAt: q.createdAt,
      updatedAt: q.updatedAt
    }));
    
    res.json(formattedQuotations);
  } catch (error) {
    console.error('Error fetching quotations:', error);
    res.status(500).json({ error: 'Failed to fetch quotations' });
  }
});

// Get specific quotation by ID
app.get('/api/quotations/:id', async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.id);
    if (!quotation) {
      return res.status(404).json({ error: 'Quotation not found' });
    }
    
    const quotationData = quotation.toObject();
    quotationData.id = quotationData._id;
    delete quotationData._id;
    delete quotationData.__v;
    
    res.json(quotationData);
  } catch (error) {
    console.error('Error fetching quotation:', error);
    res.status(500).json({ error: 'Failed to fetch quotation' });
  }
});

// Create new quotation
app.post('/api/quotations', async (req, res) => {
  console.log("Creating quotation with data:", req.body);
  try {
    const quotationData = {
      ...req.body,
      updatedAt: new Date()
    };
    
    const quotation = new Quotation(quotationData);
    const savedQuotation = await quotation.save();
    
    res.status(201).json({
      id: savedQuotation._id,
      message: 'Quotation created successfully'
    });
  } catch (error) {
    console.error('Error creating quotation:', error);
    res.status(500).json({ error: 'Failed to create quotation' });
  }
});

// Update existing quotation
app.put('/api/quotations/:id', async (req, res) => {
  try {
    const quotationData = {
      ...req.body,
      updatedAt: new Date()
    };
    console.log("editq",req.body)
    const updatedQuotation = await Quotation.findByIdAndUpdate(
      req.params.id,
      quotationData,
      { new: true, runValidators: true }
    );
    
    if (!updatedQuotation) {
      return res.status(404).json({ error: 'Quotation not found' });
    }
    
    res.json({
      id: updatedQuotation._id,
      message: 'Quotation updated successfully'
    });
  } catch (error) {
    console.error('Error updating quotation:', error);
    res.status(500).json({ error: 'Failed to update quotation' });
  }
});

// Delete quotation
app.delete('/api/quotations/:id', async (req, res) => {
  try {
    const deletedQuotation = await Quotation.findByIdAndDelete(req.params.id);
    
    if (!deletedQuotation) {
      return res.status(404).json({ error: 'Quotation not found' });
    }
    
    res.json({ message: 'Quotation deleted successfully' });
  } catch (error) {
    console.error('Error deleting quotation:', error);
    res.status(500).json({ error: 'Failed to delete quotation' });
  }
});

// Generate PDF for specific quotation


// Duplicate quotation
app.post('/api/quotations/:id/duplicate', async (req, res) => {
  try {
    const originalQuotation = await Quotation.findById(req.params.id);
    
    if (!originalQuotation) {
      return res.status(404).json({ error: 'Quotation not found' });
    }
    
    const duplicateData = originalQuotation.toObject();
    delete duplicateData._id;
    delete duplicateData.__v;
    delete duplicateData.createdAt;
    duplicateData.title = `${duplicateData.title} (Copy)`;
    duplicateData.updatedAt = new Date();
    
    const duplicateQuotation = new Quotation(duplicateData);
    const savedDuplicate = await duplicateQuotation.save();
    
    res.status(201).json({
      id: savedDuplicate._id,
      message: 'Quotation duplicated successfully'
    });
  } catch (error) {
    console.error('Error duplicating quotation:', error);
    res.status(500).json({ error: 'Failed to duplicate quotation' });
  }
});

// Get quotation statistics
app.get('/api/quotations/stats/summary', async (req, res) => {
  try {
    const totalQuotations = await Quotation.countDocuments();
    
    const quotations = await Quotation.find().select('parts annualRenewal');
    
    let totalValue = 0;
    let totalAnnualRenewal = 0;
    
    quotations.forEach(quotation => {
      const { grandTotal } = calculateTotals(quotation);
      totalValue += grandTotal;
      totalAnnualRenewal += quotation.annualRenewal || 0;
    });
    
    res.json({
      totalQuotations,
      totalValue,
      totalAnnualRenewal,
      averageQuotationValue: totalQuotations > 0 ? totalValue / totalQuotations : 0
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler


const coursetypeSchema = new mongoose.Schema({
  CourseTypeId: {
    type: String,
    required: true,
    unique: true
  },
  CourseTypeName: {
    type: String,
    required: true
  },
  // MasterBranchID: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'MasterBranch',
  //   required: true
  // },

});

const CourseType = mongoose.model('CourseType', coursetypeSchema);
app.post('/api/coursetype', async (req, res) => {
  try {
    const { CourseTypeId, CourseTypeName} = req.body;

    if (!CourseTypeId || !CourseTypeName ) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    const courseType = new CourseType({
      CourseTypeId,
      CourseTypeName,
   
      // courseTypeCode: CourseTypeId // Set courseTypeCode explicitly
    });

    const savedCourseType = await courseType.save();
    res.status(201).json(savedCourseType);
  } catch (error) {
    console.error("Error in /api/coursetype:", error);

    // Improved error handling
    if (error.code === 11000) { // Duplicate key error
      return res.status(400).json({
        message: 'A course type with this ID already exists. Please use a different ID.'
      });
    }

    res.status(500).json({ message: error.message });
  }
});

app.get('/api/coursetypes', async (req, res) => {
  try {
    const courseTypes = await CourseType.find()
  
    res.status(200).json(courseTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/coursetype/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { CourseTypeId, CourseTypeName,  } = req.body;

    if (!CourseTypeId || !CourseTypeName ) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    const updatedCourseType = await CourseType.findByIdAndUpdate(
      id,
      {
        CourseTypeId,
        CourseTypeName,

        // courseTypeCode: CourseTypeId // Update courseTypeCode too
      },
      { new: true, runValidators: true }
    );

    if (!updatedCourseType) {
      return res.status(404).json({ message: 'CourseType not found' });
    }

    res.status(200).json(updatedCourseType);
  } catch (error) {
    console.error("Error in PUT /api/coursetype:", error);

    // Improved error handling
    if (error.code === 11000) { // Duplicate key error
      return res.status(400).json({
        message: 'A course type with this ID already exists. Please use a different ID.'
      });
    }

    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/coursetype/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCourseType = await CourseType.findByIdAndDelete(id);

    if (!deletedCourseType) {
      return res.status(404).json({ message: 'CourseType not found' });
    }

    res.status(200).json({ message: 'CourseType deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const courseSchema = new mongoose.Schema({
  CourseID: {
    type: String,
    required: true,
    unique: true
  },
  CourseName: {
    type: String,
    required: true
  },
  CourseTypeID: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CourseType',
    required: true
  }],
  
  duration: {
    value: {
      type: Number,
      default: 0
    },
    unit: {
      type: String,
      enum: ['Months', 'Days'],
      default: 'Months'
    }
  },
  payment: {
    single: {
      type: Number,
      default: 0
    },
    installment: {
      type: Number,
      default: 0
    }
  }
});

const Course = mongoose.model('Course', courseSchema);

// app.get('/api/courses', async (req, res) => {
//   try {
//     const courses = await Course.find()
//       .populate('CourseTypeID')
//       .lean(); // Convert to plain JS objects

//     // Simplify the CourseTypeID to just names
//     const formattedCourses = courses.map(course => ({
//       ...course,
//       CourseTypeNames: course.CourseTypeID.map(ct => ct.CourseTypeName) // New field
//     }));

//     res.json(formattedCourses);
//     // console.log("Courses fetched successfully:", formattedCourses);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
app.post('/api/course', async (req, res) => {
  console.log("Course new data:", req.body); // Log the incoming course data
  try {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Get next course ID for a given CourseType
app.get('/api/course/nextId/:courseTypeId', async (req, res) => {
  try {
    const typeId = req.params.courseTypeId;

    // Find the CourseType to get its code
    const courseType = await CourseType.findById(typeId);
    if (!courseType) return res.status(404).json({ message: "Course type not found" });

    const typeCode = courseType.CourseTypeId || "TYPE";

    // Find the highest CourseID for this type
    const lastCourse = await Course.find({ CourseTypeID: typeId })
      .sort({ CourseID: -1 })
      .limit(1);

    let nextNumber = 1;
    if (lastCourse.length > 0) {
      const lastNum = parseInt(lastCourse[0].CourseID.split("-")[1]);
      nextNumber = lastNum + 1;
    }

    const newID = `${typeCode}-${String(nextNumber).padStart(3, "0")}`;
    res.json({ nextId: newID });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT Update Course
app.put('/api/course/:id', async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE Course
app.delete('/api/course/:id', async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
app.get('/api/new/courses', async (req, res) => {
  try {
    const courses = await Course.find()
  .populate('CourseTypeID')
  
    
    res.json(courses);
    console.log("Courses fetched successfully:", courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Error handling middleware



const subjectSchema = new mongoose.Schema({
  SubjectId: {
    type: String,
    required: true,
    unique: true
  },
  SubjectName: {
    type: String,
    required: true
  },
  coursesids: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  }],
  SubjectCaption: {
    type: String,
    required: true
  },
  SubjectDesc: {
    type: String,
    required: true
  },
 
});

const Subject = mongoose.model('Subject', subjectSchema);
app.post('/api/subject', async (req, res) => {
  try {
    console.log("sree",req.body)
    const { SubjectId, SubjectName, coursesids, SubjectCaption, SubjectDesc } = req.body;
    console.log("Subject new data:", req.body); // Log the incoming subject data
    if (!SubjectId || !SubjectName || !coursesids || !Array.isArray(coursesids) || !SubjectCaption || !SubjectDesc) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    const subject = new Subject({
      SubjectId,
      SubjectName,
      coursesids,
      SubjectCaption,
      SubjectDesc,
      

    });

    const savedSubject = await subject.save();
    res.status(201).json(savedSubject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get('/api/subjects', async (req, res) => {
  try {
    const subjects = await Subject.find().populate('coursesids')
    res.status(200).json(subjects);
    console.log("Subjects fetched successfully:", subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.put('/api/subject/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { SubjectId, SubjectName, coursesids, SubjectCaption, SubjectDesc } = req.body;

    if (!SubjectId || !SubjectName || !coursesids || !Array.isArray(coursesids) || !SubjectCaption || !SubjectDesc) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    const updatedSubject = await Subject.findByIdAndUpdate(
      id,
      { SubjectId, SubjectName, coursesids, SubjectCaption, SubjectDesc },
      { new: true, runValidators: true }
    );

    if (!updatedSubject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    res.status(200).json(updatedSubject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/subject/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSubject = await Subject.findByIdAndDelete(id);

    if (!deletedSubject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    res.status(200).json({ message: 'Subject deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PaymentPlanSchema = new mongoose.Schema({
  dueDate: String,
  amount: Number,
  status: { type: String, default: "Pending" },
  paidDate: String,
  paidAmount: Number,
  transactionId: String,
  receivedBy: String,
  receiptPath: String, 
  receiptId: String,
  paymentMode: { type: String},
});


const RegistrationSchema = new mongoose.Schema({
  
  regid: { type: String },
  fName: String,
  lName: String,
  guardianName: String,
  contactAddress: String,
  email: String,          
  city: String,
  source: String,
  ReferralName: String,
  state: String,
 
  qualification: String,
  otherQualification: String,
  collegeName: String,
  phone: String,
  courseName: String,
  // Add these fields to your existing schema
  courseTypeIds: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'CourseType'
}],
courseIds: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Course'
}],
  selectedSubjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject'
  }],

  courseFee: String,

  joiningDate: String,
  aadhar: String,
  resume: String,
   profilePhoto: String,
  Grade: String,
  role: { type: [String], default: ["Student"] },
  password: { type: String, },
  feeType: { type: String, default: "Single" },
  installmentCount: { type: Number, default: 0 },
  formStatus: { type: String, default: "Pending" },
  regStatus: { type: String, default: "Pending" },
  totalPaid: { type: Number, default: 0 },
  remainingAmount: { type: Number, default: 0 },
  singlePaymentStatus: {
    type: String,

    default: 'Pending'
  },
  singlePaymentDate: {
    type: Date
  },
  singlepaymentrecivedby: String,
  singlePaymentMode:String,
  singlePaymentReceiptId:String,

  singlePaymentTransactionId: {
    type: String
  },
  offeredFee: String,
  paymentsPlan: [PaymentPlanSchema],
  resetCode: String,
  receiptId: String,
  resetCodeExpiry: Date,
  trainingcenter:String,
  // Add these fields to your existing RegistrationSchema
awardedDate: { type: Date },
certificateGrade: { type: String }, // Using certificateGrade to avoid confusion with existing Grade field
}, { timestamps: true });


const CounterSchema = new mongoose.Schema({
  _id: String,
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", CounterSchema);

const Registration = mongoose.model("Registration", RegistrationSchema);
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// const upload = multer({ storage: storage });
// Add this route to your Express.js backend

// Update certificate details (grade and awarded date)
// app.put('/api/student/certificate/:regid', async (req, res) => {
//   try {
//     const { regid } = req.params;
//     const { certificateGrade, awardedDate,trainingcenter } = req.body;
// console.log("up",req.params )
// console.log("up std",req.body)
//     // Validate required fields
//     if (!certificateGrade || !awardedDate) {
//       return res.status(400).json({ 
//         error: 'Certificate grade and awarded date are required' 
//       });
//     }

//     // Find and update the student
//     const updatedStudent = await Registration.findOneAndUpdate(
//       { regid: regid },
//       { 
//         certificateGrade: certificateGrade,
//         trainingcenter:trainingcenter,
//         awardedDate: new Date(awardedDate)
//       },
//       { new: true } // Return the updated document
//     );

//     if (!updatedStudent) {
//       return res.status(404).json({ error: 'Student not found' });
//     }

//     res.json({
//       message: 'Certificate details updated successfully',
//       student: updatedStudent
//     });

//   } catch (error) {
//     console.error('Error updating certificate details:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
app.put('/api/student/certificate', async (req, res) => {
  try {
    const { regid, certificateGrade, awardedDate, trainingcenter } = req.body;
    
    console.log("Update certificate for regid:", regid);
    console.log("Update data:", { certificateGrade, awardedDate, trainingcenter });

    // Validate required fields
    if (!regid || !certificateGrade || !awardedDate) {
      return res.status(400).json({
        error: 'Registration ID, certificate grade and awarded date are required'
      });
    }

    // Find and update the student
    const updatedStudent = await Registration.findOneAndUpdate(
      { regid: regid },
      {
        certificateGrade: certificateGrade,
        trainingcenter: trainingcenter,
        awardedDate: new Date(awardedDate)
      },
      { new: true } // Return the updated document
    );

    if (!updatedStudent) {
      console.log("Student not found with regid:", regid);
      return res.status(404).json({ error: 'Student not found' });
    }

    console.log("Successfully updated student:", updatedStudent.regid);
    res.json({
      message: 'Certificate details updated successfully',
      student: updatedStudent
    });
  } catch (error) {
    console.error('Error updating certificate details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Get single student details (optional - if you need to fetch updated data)
// app.get('/api/student/:regid', async (req, res) => {
//   try {
//     const { regid } = req.params;
//     console.log("std",regid)
//     const student = await Registration.findOne({ regid: regid });
    
//     if (!student) {
//       return res.status(404).json({ error: 'Student not found' });
//     }
    
//     res.json(student);
//     console.log("selected student", student)
//   } catch (error) {
//     console.error('Error fetching student details:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
app.get('/api/new/registrations', async (req, res) => {
  try {

    const registrations = await Registration.find()
      .populate('selectedSubjects') // ✅ this will populate full subject details
     
       .populate({
        path: 'courseIds',
        model: 'Course',
        select: 'CourseID CourseName duration payment CourseTypeID',
        populate: {
          path: 'CourseTypeID',
          model: 'CourseType' // Make sure this matches your CourseType model name
        }
      
      }) 
      .sort({ createdAt: -1 });     // Newest first

    res.json(registrations);
    console.log("regdata", registrations)
    console.log("Fetched registrations:", registrations.length);
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({ error: 'Failed to fetch registrations' });
  }
});

app.post('/api/newregistration', 
  upload.fields([
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'aadhar', maxCount: 1 },
  { name: 'resume', maxCount: 1 }]),
 async (req, res) => {
  try {
    console.log("Received Data:", req.body);
    console.log("Received Files:", req.files);

    // FIXED: Clean up paymentsPlan array - remove empty strings and invalid entries
    let paymentsPlan = [];
    if (req.body.paymentsPlan && Array.isArray(req.body.paymentsPlan)) {
      paymentsPlan = req.body.paymentsPlan.filter(plan => {
        return plan && 
               typeof plan === 'object' && 
               plan !== "" && 
               plan.dueDate && 
               plan.amount &&
               String(plan.dueDate).trim() !== "" &&
               String(plan.amount).trim() !== "";
      });
    }

    // // Generate registration ID
    // const lastRegistration = await Registration.findOne().sort({ regid: -1 });
    // let newRegId;
    // if (lastRegistration && lastRegistration.regid) {
    //   const lastNumber = parseInt(lastRegistration.regid.replace('REG', ''));
    //   newRegId = `REG${String(lastNumber + 1).padStart(3, '0')}`;
    // } else {
    //   newRegId = 'REG001';
    // }

    // FIXED: Handle password - generate random password if not provided
    let hashedPassword = "";
    if (req.body.password && req.body.password.trim() !== "") {
      hashedPassword = await bcrypt.hash(req.body.password, 10);
    } else {
      // Generate random password if not provided
      const randomPassword = Math.random().toString(36).slice(-8);
      hashedPassword = await bcrypt.hash(randomPassword, 10);
      console.log("Generated random password:", randomPassword);
    }

    // FIXED: Step 1 - Find the branch by branchId (string like "R101")
    console.log("Looking for branch with ID:", req.body.branchId);
   

    // Handle file uploads
    let profilePhotoPath = "";
    if (req.files && req.files.profilePhoto) {
      profilePhotoPath = req.files.profilePhoto[0].path;
    }

    // Create registration data
  // Replace your registrationData object with this corrected version:

const registrationData = {
  regid: req.body.regid,
  fName: req.body.fName,
  lName: req.body.lName || "",
  guardianName: req.body.guardianName,
  contactAddress: req.body.contactAddress,
  email: req.body.email,
  city: req.body.city,
  state: req.body.state,
  qualification: req.body.qualification,
  otherQualification: req.body.otherQualification || "",
  collegeName: req.body.collegeName,
  phone: req.body.phone,
  source: req.body.source,
  
  // ✅ FIXED: Convert single values to arrays as expected by your schema
  courseTypeIds: req.body.courseTypeId ? [req.body.courseTypeId] : [],
  courseIds: req.body.courseId ? [req.body.courseId] : [],
  
  courseName: req.body.courseName,
  selectedSubjects: req.body.selectedSubjects || [],
  courseFee: req.body.courseFee || "",
  joiningDate: req.body.joiningDate || "",
  profilePhoto: profilePhotoPath,
  feeType: req.body.feeType || "Single",
  installmentCount: req.body.installmentCount || 0,
  offeredFee: req.body.offeredFee,
  paymentsPlan: paymentsPlan,
  password: hashedPassword,
  formStatus: "Success",
  regStatus: "Approved",
};
    console.log("Cleaned paymentsPlan:", paymentsPlan);
    console.log("Registration data to save:", registrationData);

    const newRegistration = new Registration(registrationData);
    const savedRegistration = await newRegistration.save();

    res.status(201).json({
      message: "Registration successful!",
      registration: savedRegistration
    });

  } catch (error) {
    console.error("Error in /api/newregistration:", error);
    res.status(500).json({ 
      message: "Registration failed", 
      error: error.message 
    });
  }
});




const ReceiptCounterSchema = new mongoose.Schema({
  branchId: String,
  year: Number,
  count: { type: Number, default: 0 }
});

const ReceiptCounter = mongoose.model('ReceiptCounter', ReceiptCounterSchema);
// Additional route to get specific student details for certificate
app.get('/api/student/:id', async (req, res) => {
  try {
    const student = await Registration.findById(req.params.id)
      .populate('courseTypeIds', 'name description duration')
      .populate('courseIds', 'name duration description')
      .populate('selectedSubjects', 'name description');
    
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    res.json(student);
  } catch (error) {
    console.error('Error fetching student details:', error);
    res.status(500).json({ error: 'Failed to fetch student details' });
  }
});
// app.get('/api/verification/:regid', async (req, res) => {
//   const { regid } = req.params;
//   console.log("Fetching student with regid:", regid);
//   try {
//     const student = await Registration.findOne({ regid });
//     if (!student) return res.status(404).send({ error: "Student not found" });
//     res.json(student);
//     console.log("Student fetched successfully:", student);
//   } catch (err) {
//     res.status(500).send({ error: "Server error" });
//   }
// });
// Backend API Route
app.post('/api/verification', async (req, res) => {
  const { regid } = req.body;
  
  console.log("POST /api/verification called");
  console.log("Request body:", req.body);
  console.log("Regid from body:", regid);
  console.log("Fetching student with regid:", regid);
  
  try {
    if (!regid) {
      console.log("No regid provided in request body");
      return res.status(400).json({ error: "Registration ID is required" });
    }
    
    const student = await Registration.findOne({ regid: regid });
    
    if (!student) {
      console.log("Student not found for regid:", regid);
      return res.status(404).json({ error: "Student not found" });
    }
    
    console.log("Student fetched successfully:", student.regid);
    res.json(student);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/registration/:id", async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }
    res.json(registration);
  } catch (error) {
    res.status(500).json({ message: "Error fetching registration", error });
  }
});
app.put("/api/update-payment/:registrationId", async (req, res) => {
  try {
    const { registrationId } = req.params;
    const { transactionId, amount, receivedBy, installmentId, paymentMode } = req.body;
    console.log("Received data:", req.body);
    
    // Find the registration
    const registration = await Registration.findById(registrationId);

    if (!registration) {
      return res.status(404).json({ error: "Registration not found" });
    }

    // Define branchIdString here so it's available for the receipt ID generation
    const branchIdString = registration.branchId?.branchCode || registration.branchId || 'UNK';
    const currentYear = new Date().getFullYear();

    // Helper function to generate unique receipt ID
    const generateReceiptId = async () => {
      // Find or create counter document for this branch and year
      let counter = await ReceiptCounter.findOne({
        branchId: branchIdString,
        year: currentYear
      });

      if (!counter) {
        // If no counter exists yet, create one starting at 0
        counter = new ReceiptCounter({
          branchId: branchIdString,
          year: currentYear,
          count: 0
        });
      }

      // Increment the counter
      counter.count += 1;
      await counter.save();

      // Format receipt ID with padded counter number
      const formattedCount = String(counter.count).padStart(2, '0');
      return `${branchIdString}/${currentYear}/${formattedCount}`;
    };

    // Helper function to calculate total paid and remaining amount
    const calculateTotalAndRemaining = () => {
      const offeredFee = parseFloat(registration.offeredFee) || 0;
      let totalPaid = 0;

      // Calculate total paid from all installments
      if (registration.paymentsPlan && registration.paymentsPlan.length > 0) {
        totalPaid = registration.paymentsPlan.reduce((sum, installment) => {
          if (installment.status === "Paid" || installment.status === "Auto-Paid") {
            return sum + (parseFloat(installment.paidAmount) || 0);
          }
          return sum;
        }, 0);
      }

      const remainingAmount = Math.max(0, offeredFee - totalPaid);
      
      return { totalPaid, remainingAmount };
    };

    // Handle single payment type
    if (registration.feeType === "Single") {
      // Generate unique receipt ID
      const receiptId = await generateReceiptId();

      // Add specific fields for single payment tracking
      registration.singlePaymentStatus = "Paid";
      registration.singlePaymentDate = new Date().toISOString();
      registration.singlePaymentTransactionId = transactionId || `TXN${Date.now()}`;
      registration.singlepaymentrecivedby = receivedBy;
      registration.singlePaymentMode = paymentMode;
      registration.singlePaymentReceiptId = receiptId;

      // Create a single payment plan if not exists
      if (!registration.paymentsPlan || registration.paymentsPlan.length === 0) {
        registration.paymentsPlan = [{
          amount: registration.courseFee,
          status: "Paid",
          paidDate: new Date().toISOString(),
          transactionId: transactionId || `TXN${Date.now()}`,
          paidAmount: registration.courseFee,
          receivedBy: receivedBy,
          receiptId: receiptId,
          paymentMode: paymentMode 
        }];
      } else {
        // Update the first (or only) payment plan
        registration.paymentsPlan[0].status = "Paid";
        registration.paymentsPlan[0].paidDate = new Date().toISOString();
        registration.paymentsPlan[0].transactionId = transactionId || `TXN${Date.now()}`;
        registration.paymentsPlan[0].paidAmount = registration.courseFee;
        registration.paymentsPlan[0].receivedBy = receivedBy;
        registration.paymentsPlan[0].receiptId = receiptId;
        registration.paymentsPlan[0].paymentMode = paymentMode;
      }

      // Calculate and update total paid and remaining amount for single payment
      const { totalPaid, remainingAmount } = calculateTotalAndRemaining();
      registration.totalPaid = totalPaid;
      registration.remainingAmount = remainingAmount;
    }
    // Handle installment payment type
    else if (registration.feeType === "Installment") {
      // Find the specified installment or first unpaid installment
      const installmentToUpdate = installmentId
        ? registration.paymentsPlan.id(installmentId)
        : registration.paymentsPlan.find(installment => installment.status === "Pending");

      if (!installmentToUpdate) {
        return res.status(400).json({ error: "No pending installments found" });
      }

      const paidAmount = parseFloat(amount);
      const dueAmount = parseFloat(installmentToUpdate.amount);
      
      // Generate unique receipt ID for this installment
      const receiptId = await generateReceiptId();

      // Update the current installment
      installmentToUpdate.status = "Paid";
      installmentToUpdate.paidDate = new Date().toISOString();
      installmentToUpdate.transactionId = transactionId || `TXN${Date.now()}`;
      installmentToUpdate.paidAmount = paidAmount;
      installmentToUpdate.receivedBy = receivedBy;
      installmentToUpdate.receiptId = receiptId;
      installmentToUpdate.paymentMode = paymentMode;

      // Calculate difference
      const difference = paidAmount - dueAmount;

      if (difference !== 0) {
        // Handle overpayment or underpayment
        const currentIndex = registration.paymentsPlan.findIndex(p => p._id.toString() === installmentToUpdate._id.toString());
        
        if (difference > 0) {
          // OVERPAYMENT CASE: Reduce next installments
          let remainingCredit = difference;
          
          for (let i = currentIndex + 1; i < registration.paymentsPlan.length && remainingCredit > 0; i++) {
            const nextInstallment = registration.paymentsPlan[i];
            
            if (nextInstallment.status === "Pending") {
              const nextAmount = parseFloat(nextInstallment.amount);
              
              if (remainingCredit >= nextAmount) {
                // This installment is fully covered
                nextInstallment.amount = 0;
                nextInstallment.status = "Auto-Paid";
                nextInstallment.paidDate = new Date().toISOString();
                nextInstallment.paidAmount = nextAmount;
                nextInstallment.transactionId = `AUTO-${receiptId}`;
                nextInstallment.receivedBy = receivedBy;
                nextInstallment.paymentMode = "Auto-Adjustment";
                remainingCredit -= nextAmount;
              } else {
                // Partial reduction
                nextInstallment.amount = nextAmount - remainingCredit;
                remainingCredit = 0;
              }
            }
          }
        } else {
          // UNDERPAYMENT CASE: Add remaining amount to next installment or create new one
          const shortfall = Math.abs(difference);
          const nextInstallmentIndex = currentIndex + 1;
          
          if (nextInstallmentIndex < registration.paymentsPlan.length) {
            // Add to next existing installment
            const nextInstallment = registration.paymentsPlan[nextInstallmentIndex];
            if (nextInstallment.status === "Pending") {
              nextInstallment.amount = parseFloat(nextInstallment.amount) + shortfall;
            }
          } else {
            // Create new installment for remaining amount
            const newDueDate = new Date();
            newDueDate.setMonth(newDueDate.getMonth() + 1); // 1 month from now
            
            registration.paymentsPlan.push({
              dueDate: newDueDate.toISOString().split('T')[0],
              amount: shortfall,
              status: "Pending"
            });
          }
        }
      }

      // Calculate and update total paid and remaining amount for installment payments
      const { totalPaid, remainingAmount } = calculateTotalAndRemaining();
      registration.totalPaid = totalPaid;
      registration.remainingAmount = remainingAmount;
    }

    // Save the updated registration
    await registration.save();

    res.json({
      message: "Payment updated successfully",
      updatedRegistration: registration,
      paymentSummary: {
        totalPaid: registration.totalPaid,
        remainingAmount: registration.remainingAmount,
        offeredFee: registration.offeredFee
      }
    });
  } catch (error) {
    console.error("Error updating payment:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.put("/api/update-due-date/:registrationId/:installmentId", async (req, res) => {
  try {
    const { registrationId, installmentId } = req.params;
    const { dueDate } = req.body;

    console.log("Updating due date for registration:", registrationId, "installment:", installmentId, "to due date:", dueDate);
    // Find the registration
    const registration = await Registration.findById(registrationId);

    if (!registration) {
      return res.status(404).json({ error: "Registration not found" });
    }

    // Find the specific installment
    const installment = registration.paymentsPlan.id(installmentId);

    if (!installment) {
      return res.status(404).json({ error: "Installment not found" });
    }

    // Update the due date
    installment.dueDate = dueDate;

    // Save the updated registration
    await registration.save();

    res.json({
      message: "Due date updated successfully",
      updatedInstallment: installment
    });
  } catch (error) {
    console.error("Error updating due date:", error);
    res.status(500).json({ error: "Server error" });
  }
});




// Route to generate and download certificate
app.get('/api/certificate/:id', async (req, res) => {
  try {
    const student = await Registration.findById(req.params.id)
      .populate('courseTypeIds', 'name description duration')
      .populate('courseIds', 'name duration description')
      .populate('selectedSubjects', 'name description');
    
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    // If you want to serve the static PDF from public folder
    const path = require('path');
    const filePath = path.join(__dirname, 'public', 'certi5.pdf');
    
    // Set headers for download
    res.setHeader('Content-Disposition', `attachment; filename="Certificate_${student.fName}_${student.lName}.pdf"`);
    res.setHeader('Content-Type', 'application/pdf');
    
    // Send the file
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending certificate:', err);
        res.status(500).json({ error: 'Failed to download certificate' });
      }
    });
    
  } catch (error) {
    console.error('Error generating certificate:', error);
    res.status(500).json({ error: 'Failed to generate certificate' });
  }
});




app.use(express.static(path.join(__dirname, "/public")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




