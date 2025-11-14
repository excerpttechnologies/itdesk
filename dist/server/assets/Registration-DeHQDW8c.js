import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const RegistrationForm = () => {
  useNavigate();
  const [formData, setFormData] = useState({
    regid: "",
    fName: "",
    lName: "",
    guardianName: "",
    contactAddress: "",
    email: "",
    city: "",
    state: "",
    qualification: "",
    otherQualification: "",
    collegeName: "",
    phone: "",
    source: "",
    courseTypeId: "",
    courseId: "",
    courseName: "",
    selectedSubjects: [],
    courseFee: "",
    joiningDate: "",
    password: "",
    profilePhoto: "",
    ReferralName: "",
    offeredFee: "",
    feeType: "Single",
    installmentCount: 0,
    installments: [],
    paymentsPlan: []
  });
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [courseTypes, setCourseTypes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [emailValidation, setEmailValidation] = useState({
    isChecking: false,
    exists: false,
    message: ""
  });
  const emailCheckTimeout = useRef(null);
  const sourceOptions = [
    "Instagram",
    "LinkedIn",
    "Facebook",
    "Twitter",
    "YouTube",
    "Reference",
    "Direct"
  ];
  const [errors, setErrors] = useState({
    fName: "",
    lName: "",
    guardianName: "",
    qualification: "",
    otherQualification: "",
    collegeName: "",
    phone: "",
    email: ""
  });
  const checkEmailExists = async (email) => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) return;
    setEmailValidation((prev) => ({ ...prev, isChecking: true }));
    try {
      const response = await axios.get(
        `/api/check-email-exists?email=${email}`
      );
      const exists = response.data.exists;
      setEmailValidation({
        isChecking: false,
        exists,
        message: exists ? "This email is already registered" : "Email is available"
      });
    } catch (error) {
      console.error("Error checking email:", error);
      setEmailValidation({
        isChecking: false,
        exists: false,
        message: "Unable to verify email"
      });
    }
  };
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [courseTypeRes, courseRes, subjectRes] = await Promise.all([
          axios.get("/api/coursetypes"),
          axios.get("/api/new/courses"),
          axios.get("/api/subjects")
        ]);
        setCourseTypes(courseTypeRes.data);
        setCourses(courseRes.data);
        setSubjects(subjectRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchAllData();
  }, []);
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const indianStates = [
          "Andhra Pradesh",
          "Arunachal Pradesh",
          "Assam",
          "Bihar",
          "Chhattisgarh",
          "Goa",
          "Gujarat",
          "Haryana",
          "Himachal Pradesh",
          "Jharkhand",
          "Karnataka",
          "Kerala",
          "Madhya Pradesh",
          "Maharashtra",
          "Manipur",
          "Meghalaya",
          "Mizoram",
          "Nagaland",
          "Odisha",
          "Punjab",
          "Rajasthan",
          "Sikkim",
          "Tamil Nadu",
          "Telangana",
          "Tripura",
          "Uttar Pradesh",
          "Uttarakhand",
          "West Bengal"
        ];
        setStates(indianStates);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    fetchStates();
  }, []);
  const getCitiesForState = (state) => {
    const cityMap = {
      "Andhra Pradesh": [
        // Districts
        "Anantapur",
        "Chittoor",
        "East Godavari",
        "Guntur",
        "Kadapa",
        "Krishna",
        "Kurnool",
        "Nellore",
        "Prakasam",
        "Srikakulam",
        "Visakhapatnam",
        "Vizianagaram",
        "West Godavari",
        // Major Cities
        "Vijayawada",
        "Tirupati",
        "Kakinada",
        "Rajamahendravaram",
        "Eluru",
        "Ongole",
        "Machilipatnam",
        "Tadepalligudem",
        "Bhimavaram",
        "Hindupur",
        "Srikakulam",
        "Amadalavalasa",
        "Tadipatri",
        "Tenali"
      ],
      "Arunachal Pradesh": [
        // Districts
        "Tawang",
        "West Kameng",
        "East Kameng",
        "Papum Pare",
        "Kurung Kumey",
        "Kra Daadi",
        "Lower Subansiri",
        "Upper Subansiri",
        "West Siang",
        "East Siang",
        "Siang",
        "Upper Siang",
        "Lower Siang",
        "Lower Dibang Valley",
        "Dibang Valley",
        "Anjaw",
        "Lohit",
        "Namsai",
        "Changlang",
        "Tirap",
        "Longding",
        // Major Cities
        "Itanagar",
        "Naharlagun",
        "Pasighat",
        "Bomdila",
        "Ziro",
        "Tezu",
        "Aalo",
        "Roing"
      ],
      Assam: [
        // Districts
        "Baksa",
        "Barpeta",
        "Biswanath",
        "Bongaigaon",
        "Cachar",
        "Charaideo",
        "Chirang",
        "Darrang",
        "Dhemaji",
        "Dhubri",
        "Dibrugarh",
        "Dima Hasao",
        "Goalpara",
        "Golaghat",
        "Hailakandi",
        "Hojai",
        "Jorhat",
        "Kamrup",
        "Kamrup Metropolitan",
        "Karbi Anglong",
        "Karimganj",
        "Kokrajhar",
        "Lakhimpur",
        "Majuli",
        "Morigaon",
        "Nagaon",
        "Nalbari",
        "Sivasagar",
        "Sonitpur",
        "South Salmara-Mankachar",
        "Tamulpur",
        "Tinsukia",
        "Udalguri",
        "West Karbi Anglong",
        // Major Cities
        "Guwahati",
        "Silchar",
        "Dibrugarh",
        "Jorhat",
        "Nagaon",
        "Tinsukia",
        "Tezpur",
        "Diphu",
        "Karimganj",
        "Sivasagar",
        "Goalpara",
        "Duliajan",
        "Bongaigaon",
        "Dhubri"
      ],
      Bihar: [
        // Districts
        "Araria",
        "Arwal",
        "Aurangabad",
        "Banka",
        "Begusarai",
        "Bhagalpur",
        "Bhojpur",
        "Buxar",
        "Darbhanga",
        "East Champaran",
        "Gaya",
        "Gopalganj",
        "Jamui",
        "Jehanabad",
        "Kaimur",
        "Katihar",
        "Khagaria",
        "Kishanganj",
        "Lakhisarai",
        "Madhepura",
        "Madhubani",
        "Munger",
        "Muzaffarpur",
        "Nalanda",
        "Nawada",
        "Patna",
        "Purnia",
        "Rohtas",
        "Saharsa",
        "Samastipur",
        "Saran",
        "Sheikhpura",
        "Sheohar",
        "Sitamarhi",
        "Siwan",
        "Supaul",
        "Vaishali",
        "West Champaran",
        // Major Cities
        "Patna",
        "Gaya",
        "Bhagalpur",
        "Muzaffarpur",
        "Darbhanga",
        "Purnia",
        "Arrah",
        "Begusarai",
        "Chapra",
        "Katihar",
        "Sasaram",
        "Hajipur",
        "Dehri",
        "Siwan",
        "Motihari",
        "Bihar Sharif"
      ],
      Chhattisgarh: [
        // Districts
        "Balod",
        "Baloda Bazar",
        "Balrampur",
        "Bastar",
        "Bemetara",
        "Bijapur",
        "Bilaspur",
        "Dantewada",
        "Dhamtari",
        "Durg",
        "Gariaband",
        "Gaurela-Pendra-Marwahi",
        "Janjgir-Champa",
        "Jashpur",
        "Kabirdham",
        "Kanker",
        "Khairagarh-Chhuikhadan-Gandai",
        "Kondagaon",
        "Korba",
        "Korea",
        "Mahasamund",
        "Manendragarh-Chirmiri-Bharatpur",
        "Mohla-Manpur-Ambagarh Chowki",
        "Mungeli",
        "Narayanpur",
        "Raigarh",
        "Raipur",
        "Rajnandgaon",
        "Sarangarh-Bilaigarh",
        "Sakti",
        "Sukma",
        "Surajpur",
        "Surguja",
        // Major Cities
        "Raipur",
        "Bilaspur",
        "Bhilai",
        "Korba",
        "Durg",
        "Rajnandgaon",
        "Jagdalpur",
        "Ambikapur",
        "Raigarh",
        "Dhamtari",
        "Mahasamund",
        "Chirmiri",
        "Bhatapara"
      ],
      Goa: [
        // Districts
        "North Goa",
        "South Goa",
        // Major Cities
        "Panaji",
        "Margao",
        "Vasco da Gama",
        "Mapusa",
        "Ponda",
        "Cuncolim",
        "Curchorem",
        "Sanguem",
        "Bicholim",
        "Pernem",
        "Canacona",
        "Quepem"
      ],
      Gujarat: [
        // Districts
        "Ahmedabad",
        "Amreli",
        "Anand",
        "Aravalli",
        "Banaskantha",
        "Bharuch",
        "Bhavnagar",
        "Botad",
        "Chhota Udaipur",
        "Dahod",
        "Dang",
        "Devbhoomi Dwarka",
        "Gandhinagar",
        "Gir Somnath",
        "Jamnagar",
        "Junagadh",
        "Kheda",
        "Kutch",
        "Mahisagar",
        "Mehsana",
        "Morbi",
        "Narmada",
        "Navsari",
        "Panchmahal",
        "Patan",
        "Porbandar",
        "Rajkot",
        "Sabarkantha",
        "Surat",
        "Surendranagar",
        "Tapi",
        "Vadodara",
        "Valsad",
        // Major Cities
        "Ahmedabad",
        "Surat",
        "Vadodara",
        "Rajkot",
        "Bhavnagar",
        "Jamnagar",
        "Junagadh",
        "Gandhinagar",
        "Anand",
        "Nadiad",
        "Gandhidham",
        "Bharuch",
        "Navsari",
        "Porbandar",
        "Veraval",
        "Godhra",
        "Palanpur"
      ],
      Haryana: [
        // Districts
        "Ambala",
        "Bhiwani",
        "Charkhi Dadri",
        "Faridabad",
        "Fatehabad",
        "Gurugram",
        "Hisar",
        "Jhajjar",
        "Jind",
        "Kaithal",
        "Karnal",
        "Kurukshetra",
        "Mahendragarh",
        "Nuh",
        "Palwal",
        "Panchkula",
        "Panipat",
        "Rewari",
        "Rohtak",
        "Sirsa",
        "Sonipat",
        "Yamunanagar",
        // Major Cities
        "Gurugram",
        "Faridabad",
        "Panipat",
        "Ambala",
        "Yamunanagar",
        "Rohtak",
        "Hisar",
        "Karnal",
        "Sonipat",
        "Panchkula",
        "Bhiwani",
        "Sirsa",
        "Bahadurgarh",
        "Jind",
        "Thanesar",
        "Kaithal"
      ],
      "Himachal Pradesh": [
        // Districts
        "Bilaspur",
        "Chamba",
        "Hamirpur",
        "Kangra",
        "Kinnaur",
        "Kullu",
        "Lahaul and Spiti",
        "Mandi",
        "Shimla",
        "Sirmaur",
        "Solan",
        "Una",
        // Major Cities
        "Shimla",
        "Dharamshala",
        "Mandi",
        "Solan",
        "Palampur",
        "Baddi",
        "Nahan",
        "Kullu",
        "Hamirpur",
        "Una",
        "Bilaspur",
        "Chamba",
        "Sundernagar",
        "Nalagarh"
      ],
      Jharkhand: [
        // Districts
        "Bokaro",
        "Chatra",
        "Deoghar",
        "Dhanbad",
        "Dumka",
        "East Singhbhum",
        "Garhwa",
        "Giridih",
        "Godda",
        "Gumla",
        "Hazaribagh",
        "Jamtara",
        "Khunti",
        "Koderma",
        "Latehar",
        "Lohardaga",
        "Pakur",
        "Palamu",
        "Ramgarh",
        "Ranchi",
        "Sahebganj",
        "Seraikela Kharsawan",
        "Simdega",
        "West Singhbhum",
        // Major Cities
        "Ranchi",
        "Jamshedpur",
        "Dhanbad",
        "Bokaro Steel City",
        "Hazaribagh",
        "Deoghar",
        "Giridih",
        "Ramgarh",
        "Medininagar",
        "Chirkunda",
        "Gumla",
        "Dumka",
        "Chaibasa",
        "Godda",
        "Sahibganj"
      ],
      Karnataka: [
        // Districts
        "Bagalkot",
        "Bangalore Rural",
        "Bangalore Urban",
        "Belagavi",
        "Bellary",
        "Bidar",
        "Chamarajanagar",
        "Chikkaballapur",
        "Chikkamagaluru",
        "Chitradurga",
        "Dakshina Kannada",
        "Davanagere",
        "Dharwad",
        "Gadag",
        "Gulbarga",
        "Hassan",
        "Haveri",
        "Kodagu",
        "Kolar",
        "Koppal",
        "Mandya",
        "Mysore",
        "Raichur",
        "Ramanagara",
        "Shivamogga",
        "Tumkur",
        "Udupi",
        "Uttara Kannada",
        "Vijayapura",
        "Yadgir",
        // Major Cities
        "Bengaluru",
        "Mysuru",
        "Hubballi-Dharwad",
        "Mangaluru",
        "Belagavi",
        "Kalaburagi",
        "Davanagere",
        "Ballari",
        "Vijayapura",
        "Shivamogga",
        "Tumakuru",
        "Hassan",
        "Udupi",
        "Raichur",
        "Bidar",
        "Hospet",
        "Gadag-Betageri",
        "Robertsonpet",
        "Bhadravati",
        "Chitradurga"
      ],
      Kerala: [
        // Districts
        "Alappuzha",
        "Ernakulam",
        "Idukki",
        "Kannur",
        "Kasaragod",
        "Kollam",
        "Kottayam",
        "Kozhikode",
        "Malappuram",
        "Palakkad",
        "Pathanamthitta",
        "Thiruvananthapuram",
        "Thrissur",
        "Wayanad",
        // Major Cities
        "Thiruvananthapuram",
        "Kochi",
        "Kozhikode",
        "Thrissur",
        "Kollam",
        "Alappuzha",
        "Kannur",
        "Kottayam",
        "Palakkad",
        "Manjeri",
        "Kasaragod",
        "Malappuram",
        "Ponnani",
        "Vatakara",
        "Cherthala",
        "Neyyattinkara",
        "Thalassery",
        "Chengannur",
        "Kodungallur"
      ],
      "Madhya Pradesh": [
        // Districts
        "Agar Malwa",
        "Alirajpur",
        "Anuppur",
        "Ashoknagar",
        "Balaghat",
        "Barwani",
        "Betul",
        "Bhind",
        "Bhopal",
        "Burhanpur",
        "Chhatarpur",
        "Chhindwara",
        "Damoh",
        "Datia",
        "Dewas",
        "Dhar",
        "Dindori",
        "Guna",
        "Gwalior",
        "Harda",
        "Hoshangabad",
        "Indore",
        "Jabalpur",
        "Jhabua",
        "Katni",
        "Khandwa",
        "Khargone",
        "Mandla",
        "Mandsaur",
        "Morena",
        "Narsinghpur",
        "Neemuch",
        "Niwari",
        "Panna",
        "Raisen",
        "Rajgarh",
        "Ratlam",
        "Rewa",
        "Sagar",
        "Satna",
        "Sehore",
        "Seoni",
        "Shahdol",
        "Shajapur",
        "Sheopur",
        "Shivpuri",
        "Sidhi",
        "Singrauli",
        "Tikamgarh",
        "Ujjain",
        "Umaria",
        "Vidisha",
        // Major Cities
        "Indore",
        "Bhopal",
        "Jabalpur",
        "Gwalior",
        "Ujjain",
        "Sagar",
        "Dewas",
        "Satna",
        "Ratlam",
        "Rewa",
        "Chhindwara",
        "Khandwa",
        "Morena",
        "Burhanpur",
        "Singrauli",
        "Bhind",
        "Guna",
        "Shivpuri",
        "Vidisha",
        "Chhatarpur",
        "Damoh",
        "Mandsaur",
        "Khargone",
        "Neemuch"
      ],
      Maharashtra: [
        // Districts
        "Ahmednagar",
        "Akola",
        "Amravati",
        "Aurangabad",
        "Beed",
        "Bhandara",
        "Buldhana",
        "Chandrapur",
        "Dhule",
        "Gadchiroli",
        "Gondia",
        "Hingoli",
        "Jalgaon",
        "Jalna",
        "Kolhapur",
        "Latur",
        "Mumbai City",
        "Mumbai Suburban",
        "Nagpur",
        "Nanded",
        "Nandurbar",
        "Nashik",
        "Osmanabad",
        "Palghar",
        "Parbhani",
        "Pune",
        "Raigad",
        "Ratnagiri",
        "Sangli",
        "Satara",
        "Sindhudurg",
        "Solapur",
        "Thane",
        "Wardha",
        "Washim",
        "Yavatmal",
        // Major Cities
        "Mumbai",
        "Pune",
        "Nagpur",
        "Thane",
        "Nashik",
        "Aurangabad",
        "Solapur",
        "Kolhapur",
        "Amravati",
        "Navi Mumbai",
        "Kalyan-Dombivli",
        "Vasai-Virar",
        "Bhiwandi",
        "Jalgaon",
        "Akola",
        "Latur",
        "Dhule",
        "Ahmednagar",
        "Chandrapur",
        "Parbhani",
        "Ichalkaranji",
        "Jalna",
        "Ambarnath",
        "Bhusawal",
        "Panvel",
        "Badlapur",
        "Beed",
        "Gondia",
        "Satara",
        "Barshi"
      ],
      Manipur: [
        // Districts
        "Bishnupur",
        "Chandel",
        "Churachandpur",
        "Imphal East",
        "Imphal West",
        "Jiribam",
        "Kakching",
        "Kamjong",
        "Kangpokpi",
        "Noney",
        "Pherzawl",
        "Senapati",
        "Tamenglong",
        "Tengnoupal",
        "Thoubal",
        "Ukhrul",
        // Major Cities
        "Imphal",
        "Thoubal",
        "Kakching",
        "Ukhrul",
        "Bishnupur",
        "Churachandpur",
        "Moirang",
        "Jiribam",
        "Lilong",
        "Kangpokpi",
        "Yairipok",
        "Ningthoukhong",
        "Moreh",
        "Nambol",
        "Senapati"
      ],
      Meghalaya: [
        // Districts
        "East Garo Hills",
        "East Jaintia Hills",
        "East Khasi Hills",
        "North Garo Hills",
        "Ri-Bhoi",
        "South Garo Hills",
        "South West Garo Hills",
        "South West Khasi Hills",
        "West Garo Hills",
        "West Jaintia Hills",
        "West Khasi Hills",
        "Eastern West Khasi Hills",
        // Major Cities
        "Shillong",
        "Tura",
        "Jowai",
        "Nongstoin",
        "Baghmara",
        "Williamnagar",
        "Resubelpara",
        "Nongpoh",
        "Khliehriat",
        "Mawkyrwat",
        "Ampati",
        "Mairang"
      ],
      Mizoram: [
        // Districts
        "Aizawl",
        "Champhai",
        "Hnahthial",
        "Khawzawl",
        "Kolasib",
        "Lawngtlai",
        "Lunglei",
        "Mamit",
        "Saiha",
        "Saitual",
        "Serchhip",
        // Major Cities
        "Aizawl",
        "Lunglei",
        "Champhai",
        "Kolasib",
        "Serchhip",
        "Saiha",
        "Lawngtlai",
        "Mamit",
        "Saitual",
        "Khawzawl",
        "Hnahthial",
        "Bairabi",
        "Lengpui",
        "Zawlnuam",
        "Tlabung"
      ],
      Nagaland: [
        // Districts
        "Chümoukedima",
        "Dimapur",
        "Kiphire",
        "Kohima",
        "Longleng",
        "Mokokchung",
        "Mon",
        "Niuland",
        "Noklak",
        "Peren",
        "Phek",
        "Shamator",
        "Tseminyü",
        "Tuensang",
        "Wokha",
        "Zünheboto",
        // Major Cities
        "Dimapur",
        "Kohima",
        "Mokokchung",
        "Wokha",
        "Tuensang",
        "Zunheboto",
        "Mon",
        "Kiphire",
        "Phek",
        "Peren",
        "Longleng",
        "Tseminyu",
        "Shamator",
        "Chumukedima",
        "Noklak",
        "Niuland"
      ],
      Odisha: [
        // Districts
        "Angul",
        "Balangir",
        "Balasore",
        "Bargarh",
        "Bhadrak",
        "Boudh",
        "Cuttack",
        "Debagarh",
        "Dhenkanal",
        "Gajapati",
        "Ganjam",
        "Jagatsinghpur",
        "Jajpur",
        "Jharsuguda",
        "Kalahandi",
        "Kandhamal",
        "Kendrapara",
        "Kendujhar",
        "Khordha",
        "Koraput",
        "Malkangiri",
        "Mayurbhanj",
        "Nabarangpur",
        "Nayagarh",
        "Nuapada",
        "Puri",
        "Rayagada",
        "Sambalpur",
        "Sonepur",
        "Sundargarh",
        // Major Cities
        "Bhubaneswar",
        "Cuttack",
        "Rourkela",
        "Berhampur",
        "Sambalpur",
        "Puri",
        "Balasore",
        "Bhadrak",
        "Baripada",
        "Jeypore",
        "Jharsuguda",
        "Angul",
        "Bargarh",
        "Bolangir",
        "Jajpur",
        "Kendrapara",
        "Paradip",
        "Rayagada",
        "Bhawanipatna",
        "Dhenkanal"
      ],
      Punjab: [
        // Districts
        "Amritsar",
        "Barnala",
        "Bathinda",
        "Faridkot",
        "Fatehgarh Sahib",
        "Fazilka",
        "Ferozepur",
        "Gurdaspur",
        "Hoshiarpur",
        "Jalandhar",
        "Kapurthala",
        "Ludhiana",
        "Malerkotla",
        "Mansa",
        "Moga",
        "Muktsar",
        "Nawanshahr",
        "Pathankot",
        "Patiala",
        "Rupnagar",
        "Sangrur",
        "SAS Nagar",
        "Tarn Taran",
        // Major Cities
        "Ludhiana",
        "Amritsar",
        "Jalandhar",
        "Patiala",
        "Bathinda",
        "Mohali",
        "Pathankot",
        "Hoshiarpur",
        "Batala",
        "Moga",
        "Abohar",
        "Malout",
        "Khanna",
        "Phagwara",
        "Firozpur",
        "Kapurthala",
        "Muktsar",
        "Rajpura",
        "Sangrur",
        "Barnala"
      ],
      Rajasthan: [
        // Districts
        "Ajmer",
        "Alwar",
        "Banswara",
        "Baran",
        "Barmer",
        "Bharatpur",
        "Bhilwara",
        "Bikaner",
        "Bundi",
        "Chittorgarh",
        "Churu",
        "Dausa",
        "Dholpur",
        "Dungarpur",
        "Ganganagar",
        "Hanumangarh",
        "Jaipur",
        "Jaisalmer",
        "Jalore",
        "Jhalawar",
        "Jhunjhunu",
        "Jodhpur",
        "Karauli",
        "Kota",
        "Nagaur",
        "Pali",
        "Pratapgarh",
        "Rajsamand",
        "Sawai Madhopur",
        "Sikar",
        "Sirohi",
        "Tonk",
        "Udaipur",
        // Major Cities
        "Jaipur",
        "Jodhpur",
        "Kota",
        "Bikaner",
        "Ajmer",
        "Udaipur",
        "Bhilwara",
        "Alwar",
        "Bharatpur",
        "Sri Ganganagar",
        "Sikar",
        "Pali",
        "Chittorgarh",
        "Nagaur",
        "Hanumangarh",
        "Beawar",
        "Kishangarh",
        "Tonk",
        "Sujangarh",
        "Jhunjhunu",
        "Sawai Madhopur",
        "Churu",
        "Bundi",
        "Hindaun",
        "Dausa",
        "Jhalawar",
        "Banswara",
        "Barmer",
        "Rajsamand",
        "Makrana"
      ],
      Sikkim: [
        // Districts
        "East Sikkim",
        "North Sikkim",
        "South Sikkim",
        "West Sikkim",
        "Pakyong",
        "Soreng",
        // Major Cities
        "Gangtok",
        "Namchi",
        "Gyalshing",
        "Mangan",
        "Singtam",
        "Rangpo",
        "Jorethang",
        "Naya Bazar",
        "Pakyong",
        "Soreng",
        "Yuksom",
        "Ravangla",
        "Rhenock",
        "Legship",
        "Chungthang"
      ],
      "Tamil Nadu": [
        // Districts
        "Ariyalur",
        "Chengalpattu",
        "Chennai",
        "Coimbatore",
        "Cuddalore",
        "Dharmapuri",
        "Dindigul",
        "Erode",
        "Kallakurichi",
        "Kanchipuram",
        "Kanniyakumari",
        "Karur",
        "Krishnagiri",
        "Madurai",
        "Nagapattinam",
        "Namakkal",
        "Nilgiris",
        "Perambalur",
        "Pudukkottai",
        "Ramanathapuram",
        "Ranipet",
        "Salem",
        "Sivaganga",
        "Tenkasi",
        "Thanjavur",
        "Theni",
        "Thoothukudi",
        "Tiruchirappalli",
        "Tirunelveli",
        "Tirupathur",
        "Tiruppur",
        "Tiruvallur",
        "Tiruvannamalai",
        "Tiruvarur",
        "Vellore",
        "Viluppuram",
        "Virudhunagar",
        // Major Cities
        "Chennai",
        "Coimbatore",
        "Madurai",
        "Tiruchirappalli",
        "Salem",
        "Tirunelveli",
        "Tiruppur",
        "Vellore",
        "Thoothukudi",
        "Erode",
        "Dindigul",
        "Thanjavur",
        "Ranipet",
        "Sivakasi",
        "Karur",
        "Udhagamandalam",
        "Hosur",
        "Nagercoil",
        "Kanchipuram",
        "Kumarapalayam",
        "Karaikudi",
        "Neyveli",
        "Cuddalore",
        "Kumbakonam",
        "Tiruvannamalai",
        "Pollachi",
        "Rajapalayam",
        "Gudiyatham",
        "Pudukottai",
        "Vaniyambadi",
        "Ambur"
      ],
      Telangana: [
        // Districts
        "Adilabad",
        "Bhadradri Kothagudem",
        "Hyderabad",
        "Jagtial",
        "Jangaon",
        "Jayashankar Bhupalapally",
        "Jogulamba Gadwal",
        "Kamareddy",
        "Karimnagar",
        "Khammam",
        "Komaram Bheem",
        "Mahabubabad",
        "Mahabubnagar",
        "Mancherial",
        "Medak",
        "Medchal-Malkajgiri",
        "Mulugu",
        "Nagarkurnool",
        "Nalgonda",
        "Nirmal",
        "Nizamabad",
        "Peddapalli",
        "Rangareddy",
        "Sangareddy",
        "Siddipet",
        "Suryapet",
        "Vikarabad",
        "Warangal Urban",
        "Warangal Rural",
        "Yadadri Bhuvanagiri",
        // Major Cities
        "Hyderabad",
        "Warangal",
        "Nizamabad",
        "Karimnagar",
        "Khammam",
        "Ramagundam",
        "Mahbubnagar",
        "Suryapet",
        "Siddipet",
        "Miryalaguda",
        "Adilabad",
        "Nalgonda",
        "Jagtial",
        "Mancherial",
        "Kothagudem",
        "Nirmal",
        "Kamareddy",
        "Bodhan",
        "Vikarabad",
        "Zahirabad"
      ],
      Tripura: [
        // Districts
        "Dhalai",
        "North Tripura",
        "Sepahijala",
        "South Tripura",
        "Unakoti",
        "West Tripura",
        // Major Cities
        "Agartala",
        "Udaipur",
        "Dharmanagar",
        "Kailashahar",
        "Belonia",
        "Khowai",
        "Teliamura",
        "Santir Bazar",
        "Ambassa",
        "Kumarghat",
        "Sonamura",
        "Amarpur",
        "Ranirbazar",
        "Bishramganj"
      ],
      "Uttar Pradesh": [
        // Districts
        "Agra",
        "Aligarh",
        "Ambedkar Nagar",
        "Amethi",
        "Amroha",
        "Auraiya",
        "Azamgarh",
        "Baghpat",
        "Bahraich",
        "Ballia",
        "Balrampur",
        "Banda",
        "Barabanki",
        "Bareilly",
        "Basti",
        "Bhadohi",
        "Bijnor",
        "Budaun",
        "Bulandshahr",
        "Chandauli",
        "Chitrakoot",
        "Deoria",
        "Etah",
        "Etawah",
        "Faizabad",
        "Farrukhabad",
        "Fatehpur",
        "Firozabad",
        "Gautam Buddha Nagar",
        "Ghaziabad",
        "Ghazipur",
        "Gonda",
        "Gorakhpur",
        "Hapur",
        "Hardoi",
        "Hathras",
        "Jalaun",
        "Jaunpur",
        "Jhansi",
        "Kannauj",
        "Kanpur Dehat",
        "Kanpur Nagar",
        "Kushinagar",
        "Lakhimpur Kheri",
        "Lalitpur",
        "Lucknow",
        "Maharajganj",
        "Mahoba",
        "Mainpuri",
        "Mathura",
        "Mau",
        "Meerut",
        "Mirzapur",
        "Moradabad",
        "Muzaffarnagar",
        "Pratapgarh",
        "Raebareli",
        "Rampur",
        "Saharanpur",
        "Shahjahanpur",
        "Shravasti",
        "Siddharthnagar",
        "Sitapur",
        "Sonbhadra",
        "Sultanpur",
        "Unnao",
        "Varanasi",
        // Major Cities
        "Lucknow",
        "Kanpur",
        "Ghaziabad",
        "Agra",
        "Varanasi",
        "Meerut",
        "Allahabad (Prayagraj)",
        "Bareilly",
        "Aligarh",
        "Moradabad",
        "Saharanpur",
        "Gorakhpur",
        "Noida",
        "Firozabad",
        "Jhansi",
        "Muzaffarnagar",
        "Mathura",
        "Ayodhya",
        "Shahjahanpur",
        "Rampur",
        "Farrukhabad",
        "Mau",
        "Hapur",
        "Etawah",
        "Mirzapur",
        "Bulandshahr",
        "Sambhal",
        "Amroha",
        "Hardoi",
        "Bahraich",
        "Sitapur"
      ],
      Uttarakhand: [
        // Districts
        "Almora",
        "Bageshwar",
        "Chamoli",
        "Champawat",
        "Dehradun",
        "Haridwar",
        "Nainital",
        "Pauri Garhwal",
        "Pithoragarh",
        "Rudraprayag",
        "Tehri Garhwal",
        "Udham Singh Nagar",
        "Uttarkashi",
        // Major Cities
        "Dehradun",
        "Haridwar",
        "Roorkee",
        "Haldwani",
        "Rudrapur",
        "Kashipur",
        "Rishikesh",
        "Nainital",
        "Mussoorie",
        "Kotdwar",
        "Pithoragarh",
        "Pauri",
        "Tehri",
        "Almora",
        "Ramnagar",
        "Uttarkashi",
        "Chamoli",
        "Jaspur",
        "Kichha",
        "Manglaur",
        "Srinagar",
        "Bageshwar",
        "Champawat",
        "Khatima"
      ],
      "West Bengal": [
        // Districts
        "Alipurduar",
        "Bankura",
        "Birbhum",
        "Bardhaman",
        "Cooch Behar",
        "Dakshin Dinajpur",
        "Darjeeling",
        "Hooghly",
        "Howrah",
        "Jalpaiguri",
        "Jhargram",
        "Kalimpong",
        "Kolkata",
        "Maldah",
        "Murshidabad",
        "Nadia",
        "North 24 Parganas",
        "Paschim Medinipur",
        "Purba Medinipur",
        "Purulia",
        "South 24 Parganas",
        "Uttar Dinajpur",
        // Major Cities
        "Kolkata",
        "Howrah",
        "Durgapur",
        "Asansol",
        "Siliguri",
        "Bardhaman",
        "Malda",
        "Baharampur",
        "Habra",
        "Kharagpur",
        "Raniganj",
        "Haldia",
        "Raiganj",
        "Krishnanagar",
        "Jalpaiguri",
        "Bidhannagar",
        "Barasat",
        "Cooch Behar",
        "Balurghat",
        "Bankura",
        "Bishnupur",
        "Puruliya",
        "Darjeeling",
        "Alipurduar",
        "Kalimpong"
      ]
    };
    return cityMap[state] || [];
  };
  const handleStateChange = (e) => {
    const stateName = e.target.value;
    setFormData((prev) => ({ ...prev, state: stateName, city: "" }));
    setCities(getCitiesForState(stateName));
  };
  const normalizeId = (id) => {
    if (!id) return null;
    if (typeof id === "string") return id;
    if (id.$oid) return id.$oid;
    return id._id ? normalizeId(id._id) : null;
  };
  const filteredCourses = courses.filter((course) => {
    if (!formData.courseTypeId) return false;
    if (Array.isArray(course.CourseTypeID)) {
      return course.CourseTypeID.some(
        (ctId) => normalizeId(ctId) === formData.courseTypeId
      );
    }
    return normalizeId(course.CourseTypeID) === formData.courseTypeId;
  });
  const filteredSubjects = subjects.filter((subject) => {
    if (!formData.courseId || !subject.coursesids) return false;
    return Array.isArray(subject.coursesids) && subject.coursesids.some(
      (courseId) => normalizeId(courseId) === formData.courseId
    );
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";
    if (["fName", "lName", "guardianName", "otherQualification", "qualification", "collegeName", "ReferralName"].includes(name)) {
      if (value && !/^[A-Za-z\s.'"-]*$/.test(value)) {
        errorMessage = "Only alphabets and spaces allowed";
      }
    } else if (name === "phone") {
      if (/^\d*$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (value.length === 0) {
          errorMessage = "Phone number is required";
        } else if (value.length === 1 && !/^[6-9]$/.test(value)) {
          errorMessage = "Phone number must start with 6, 7, 8, or 9";
        } else if (value.length === 10 && !/^[6-9]\d{9}$/.test(value)) {
          errorMessage = "Phone number must be 10 digits and start with 6, 7, 8, or 9";
        } else {
          errorMessage = "";
        }
      } else {
        errorMessage = "Only numbers allowed";
      }
      setErrors((prev) => ({ ...prev, [name]: errorMessage }));
      return;
    } else if (name === "email") {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (emailCheckTimeout.current) {
        clearTimeout(emailCheckTimeout.current);
      }
      if (value && /^\S+@\S+\.\S{2,12}$/.test(value)) {
        errorMessage = "";
        emailCheckTimeout.current = setTimeout(() => {
          checkEmailExists(value);
        }, 500);
      } else if (value) {
        errorMessage = "Invalid email format";
      } else {
        errorMessage = "";
      }
      setErrors((prev) => ({ ...prev, [name]: errorMessage }));
      return;
    } else if (name === "courseTypeId") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        courseId: "",
        courseName: "",
        selectedSubjects: []
      }));
      return;
    } else if (name === "courseId") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        courseName: courses.find((course) => course._id === value)?.CourseName || "",
        selectedSubjects: []
      }));
      return;
    }
    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
    if (!errorMessage || value === "") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleSubjectChange = (e) => {
    const subjectId = e.target.value;
    const isChecked = e.target.checked;
    const name = formData.courseName?.toLowerCase();
    let maxSubjects = Infinity;
    if (name.includes("certification")) {
      maxSubjects = 1;
    } else if (name.includes("professional diploma")) {
      maxSubjects = 3;
    } else if (name.includes("master diploma")) {
      maxSubjects = 10;
    } else if (name.includes("diploma")) {
      maxSubjects = 2;
    } else if (name.includes("master")) {
      maxSubjects = 10;
    }
    if (isChecked) {
      if (formData.selectedSubjects.length >= maxSubjects) {
        alert(`You can select a maximum of ${maxSubjects} subject(s) for this course type.`);
        return;
      }
      setFormData((prev) => ({
        ...prev,
        selectedSubjects: [...prev.selectedSubjects, subjectId]
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        selectedSubjects: prev.selectedSubjects.filter((id) => id !== subjectId)
      }));
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "feeType") {
      setFormData((prev) => ({
        ...prev,
        feeType: value,
        installmentCount: value === "Installment" ? prev.installmentCount : 0,
        installments: value === "Installment" ? prev.installments : []
      }));
    } else if (name === "installmentCount") {
      let count = parseInt(value, 10);
      if (isNaN(count) || count < 0) count = 0;
      if (count > 12) count = 12;
      setFormData((prev) => {
        let newInstallments = [...prev.installments];
        if (newInstallments.length > count) {
          newInstallments.length = count;
        } else {
          while (newInstallments.length < count) {
            newInstallments.push({ dueDate: "", amount: "" });
          }
        }
        return {
          ...prev,
          installmentCount: count,
          installments: newInstallments
        };
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };
  const handleInstallmentInputChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      let installments = [...prev.installments || []];
      if (name === `dueDate${index + 1}`) {
        if (!installments[index]) installments[index] = {};
        installments[index].dueDate = value;
        return { ...prev, installments };
      }
      if (name === `amount${index + 1}`) {
        if (value === "" || /^\d+$/.test(value)) {
          const newAmount = value === "" ? 0 : parseInt(value, 10);
          const offeredFee = parseInt(prev.offeredFee || 0);
          let sumBefore = 0;
          for (let i = 0; i < index; i++) {
            sumBefore += parseInt(installments[i]?.amount || 0);
          }
          if (sumBefore + newAmount > offeredFee) {
            return prev;
          }
          const remaining = offeredFee - sumBefore - newAmount;
          if (!installments[index]) installments[index] = {};
          installments[index].amount = newAmount.toString();
          const remainingInstallments = installments.length - index - 1;
          if (remainingInstallments > 0) {
            const equalAmount = Math.floor(remaining / remainingInstallments);
            const smallRemainder = remaining % remainingInstallments;
            for (let i = index + 1; i < installments.length; i++) {
              if (!installments[i]) installments[i] = {};
              const extraAmount = i === index + 1 ? smallRemainder : 0;
              installments[i].amount = (equalAmount + extraAmount).toString();
            }
          }
          return { ...prev, installments };
        }
        return prev;
      }
      return prev;
    });
  };
  const generateInstallmentRows = () => {
    const count = parseInt(formData.installmentCount || 0);
    if (count <= 0) return null;
    return Array.from({ length: count }, (_, index) => {
      const installment = formData.installments?.[index] || {};
      return /* @__PURE__ */ jsxs("div", { className: "row mb-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-xl-6", children: [
          /* @__PURE__ */ jsxs("label", { className: "form-label", children: [
            "Due Date ",
            index + 1,
            ":"
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "date",
              className: "form-control",
              name: `dueDate${index + 1}`,
              value: installment.dueDate || "",
              onChange: (e) => handleInstallmentInputChange(e, index)
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-xl-6", children: [
          /* @__PURE__ */ jsxs("label", { className: "form-label", children: [
            "Amount ",
            index + 1,
            ":"
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              className: "form-control",
              name: `amount${index + 1}`,
              value: installment.amount || "",
              onChange: (e) => handleInstallmentInputChange(e, index)
            }
          )
        ] })
      ] }, index);
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors2 = {};
    const data = new FormData();
    const requiredFields = [
      "fName",
      "guardianName",
      "contactAddress",
      "email",
      "city",
      "state",
      "qualification",
      "collegeName",
      "phone",
      "courseTypeId",
      "courseId",
      "source",
      "offeredFee"
    ];
    if (formData.qualification === "Other" && !formData.otherQualification) {
      errors2.otherQualification = "Other qualification is required when 'Other' is selected.";
    }
    requiredFields.forEach((field) => {
      if (!formData[field]?.trim && !formData[field]) {
        errors2[field] = `${field} is required.`;
      } else if (formData[field]?.trim && !formData[field]?.trim()) {
        errors2[field] = `${field} is required.`;
      }
    });
    if (formData.email && !/^\S+@\S+\.\S{2,12}$/.test(formData.email)) {
      errors2.email = "Invalid email format.";
    }
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      errors2.phone = "Phone number must be exactly 10 digits.";
    }
    if (!formData.source) {
      errors2.source = "Please select how you heard about us.";
    }
    if (Object.keys(errors2).length > 0) {
      const errorMessages = Object.values(errors2).join("\n");
      alert(`Please correct the following errors:

${errorMessages}`);
      return;
    }
    if (formData.feeType === "Installment" && Array.isArray(formData.installments)) {
      const validInstallments = formData.installments.filter(
        (inst) => inst && typeof inst === "object" && inst.dueDate && inst.amount && String(inst.dueDate).trim() !== "" && String(inst.amount).trim() !== ""
      );
      validInstallments.forEach((inst, idx) => {
        data.append(`paymentsPlan[${idx}][dueDate]`, String(inst.dueDate).trim());
        data.append(`paymentsPlan[${idx}][amount]`, parseInt(inst.amount));
        data.append(`paymentsPlan[${idx}][status]`, "Pending");
        data.append(`paymentsPlan[${idx}][paidDate]`, "");
        data.append(`paymentsPlan[${idx}][paidAmount]`, 0);
        data.append(`paymentsPlan[${idx}][transactionId]`, "");
        data.append(`paymentsPlan[${idx}][receivedBy]`, "");
        data.append(`paymentsPlan[${idx}][receiptPath]`, "");
        data.append(`paymentsPlan[${idx}][receiptId]`, "");
        data.append(`paymentsPlan[${idx}][paymentMode]`, "");
      });
    }
    Object.keys(formData).forEach((key) => {
      if (key === "installments") return;
      if (key === "selectedSubjects") {
        if (Array.isArray(formData.selectedSubjects)) {
          formData.selectedSubjects.forEach((subjectId, index) => {
            if (subjectId && subjectId !== "") {
              data.append(`selectedSubjects[${index}]`, subjectId);
            }
          });
        }
      } else if (key === "courseId") {
        if (Array.isArray(formData.courseId)) {
          formData.courseId.forEach((course, index) => {
            if (course?._id) {
              data.append(`courseIds[${index}]`, course._id);
            }
          });
        } else if (typeof formData.courseId === "object" && formData.courseId?._id) {
          data.append("courseIds[0]", formData.courseId._id);
        } else if (typeof formData.courseId === "string" && formData.courseId.trim() !== "") {
          data.append("courseIds[0]", formData.courseId);
          data.append("courseId", formData.courseId);
        }
      } else if (key === "courseTypeId") {
        if (formData[key] && formData[key].trim() !== "") {
          data.append(key, formData[key]);
        }
      } else {
        if (formData[key] !== null && formData[key] !== void 0 && formData[key] !== "") {
          if (key === "phone") {
            data.append(key, `+91${formData[key]}`);
          } else {
            data.append(key, formData[key]);
          }
        }
      }
    });
    if (selectedFile) {
      data.append("profilePhoto", selectedFile);
    }
    try {
      const response = await axios.post(
        "/api/newregistration",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );
      alert("Registration Successful!");
      setFormData({
        fName: "",
        lName: "",
        guardianName: "",
        contactAddress: "",
        email: "",
        city: "",
        state: "",
        qualification: "",
        otherQualification: "",
        collegeName: "",
        phone: "",
        source: "",
        courseTypeId: "",
        courseId: "",
        courseName: "",
        selectedSubjects: [],
        courseFee: "",
        joiningDate: "",
        feeType: "Single",
        installmentCount: "",
        password: "",
        offeredFee: "",
        installments: [],
        regid: ""
      });
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Error registering student!");
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "page-wrapper", children: /* @__PURE__ */ jsxs("div", { className: "content", children: [
    /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-md-12", children: /* @__PURE__ */ jsx("div", { className: "page-header", children: /* @__PURE__ */ jsx("div", { className: "row align-items-center", children: /* @__PURE__ */ jsx("div", { className: "col-md-4", children: /* @__PURE__ */ jsx("h3", { children: "Registration Form" }) }) }) }) }) }),
    /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-md-12 d-flex", children: /* @__PURE__ */ jsx("div", { className: "card w-100", children: /* @__PURE__ */ jsx("div", { className: "card-body", children: /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit, children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-xl-3 col-lg-5 col-md-6 col-sm-12", children: [
        /* @__PURE__ */ jsxs("label", { children: [
          "Registration Id",
          /* @__PURE__ */ jsx("span", { className: "text-danger", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "regid",
            className: "form-control",
            placeholder: "Enter regid",
            value: formData.regid,
            onChange: handleChange,
            required: true
          }
        ),
        errors.fName && /* @__PURE__ */ jsx("small", { className: "text-danger", children: errors.fName })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-xl-3 col-lg-5 col-md-6 col-sm-12", children: [
        /* @__PURE__ */ jsxs("label", { children: [
          "First Name",
          /* @__PURE__ */ jsx("span", { className: "text-danger", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "fName",
            className: "form-control",
            placeholder: "Enter First Name",
            value: formData.fName,
            onChange: handleChange,
            required: true
          }
        ),
        errors.fName && /* @__PURE__ */ jsx("small", { className: "text-danger", children: errors.fName })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-xl-3 col-lg-5 col-md-6 col-sm-12", children: [
        /* @__PURE__ */ jsx("label", { children: "Last Name" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "lName",
            className: "form-control",
            placeholder: "Enter Last Name",
            value: formData.lName,
            onChange: handleChange
          }
        ),
        errors.lName && /* @__PURE__ */ jsx("small", { className: "text-danger", children: errors.lName })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-xl-3 col-lg-5 col-md-6 col-sm-12", children: [
        /* @__PURE__ */ jsxs("label", { children: [
          "Guardian/Father's Name ",
          /* @__PURE__ */ jsx("span", { className: "text-danger", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "guardianName",
            placeholder: "Enter Guardian/Father's Name",
            className: "form-control",
            value: formData.guardianName,
            onChange: handleChange,
            required: true
          }
        ),
        errors.guardianName && /* @__PURE__ */ jsx("small", { className: "text-danger", children: errors.guardianName })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-xl-3 col-lg-5 col-md-6 col-sm-12", children: [
        /* @__PURE__ */ jsxs("label", { children: [
          "Phone Number ",
          /* @__PURE__ */ jsx("span", { className: "text-danger", children: "*" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "input-group", children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: "input-group-text",
              style: {
                width: "45px",
                height: "43px",
                fontSize: "14px",
                textAlign: "center",
                marginTop: "10px"
              },
              children: "+91"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "phone",
              className: "form-control",
              value: formData.phone,
              onChange: handleChange,
              maxLength: 10,
              placeholder: "Enter 10-digit number",
              required: true
            }
          )
        ] }),
        errors.phone && /* @__PURE__ */ jsx("small", { className: "text-danger", children: errors.phone })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-xl-3 col-lg-5 col-md-6 col-sm-12", children: [
        /* @__PURE__ */ jsxs("label", { children: [
          "Email ",
          /* @__PURE__ */ jsx("span", { className: "text-danger", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            name: "email",
            className: "form-control",
            value: formData.email,
            onChange: handleChange,
            placeholder: "Enter Email",
            required: true
          }
        ),
        errors.email && /* @__PURE__ */ jsx("small", { className: "text-danger", children: errors.email })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-xl-3 col-lg-5 col-md-6 col-sm-12", children: [
        /* @__PURE__ */ jsxs("label", { children: [
          "State ",
          /* @__PURE__ */ jsx("span", { className: "text-danger", children: "*" })
        ] }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            name: "state",
            className: "form-control",
            value: formData.state,
            onChange: handleStateChange,
            required: true,
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Select State" }),
              states.map((state, index) => /* @__PURE__ */ jsx("option", { value: state, children: state }, index))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-xl-3 col-lg-5 col-md-6 col-sm-12", children: [
        /* @__PURE__ */ jsxs("label", { children: [
          "City ",
          /* @__PURE__ */ jsx("span", { className: "text-danger", children: "*" })
        ] }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            name: "city",
            className: "form-control",
            value: formData.city,
            onChange: handleChange,
            required: true,
            disabled: !formData.state,
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Select City" }),
              cities.map((city, index) => /* @__PURE__ */ jsx("option", { value: city, children: city }, index))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-xl-3 col-lg-5 col-md-6 col-sm-12", children: [
        /* @__PURE__ */ jsxs("label", { children: [
          "Qualification ",
          /* @__PURE__ */ jsx("span", { className: "text-danger", children: "*" })
        ] }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            name: "qualification",
            className: "form-control",
            value: formData.qualification,
            onChange: handleChange,
            required: true,
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Select Qualification" }),
              /* @__PURE__ */ jsx("option", { value: "BE", children: "BE" }),
              /* @__PURE__ */ jsx("option", { value: "BTech", children: "BTech" }),
              /* @__PURE__ */ jsx("option", { value: "ME", children: "ME" }),
              /* @__PURE__ */ jsx("option", { value: "MTech", children: "MTech" }),
              /* @__PURE__ */ jsx("option", { value: "Diploma", children: "Diploma" }),
              /* @__PURE__ */ jsx("option", { value: "Other", children: "Other" })
            ]
          }
        )
      ] }),
      formData.qualification === "Other" && /* @__PURE__ */ jsxs("div", { className: "col-xl-3 col-lg-5 col-md-6 col-sm-12", children: [
        /* @__PURE__ */ jsxs("label", { children: [
          "Other Qualification ",
          /* @__PURE__ */ jsx("span", { className: "text-danger", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "otherQualification",
            className: "form-control",
            value: formData.otherQualification || "",
            onChange: handleChange,
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-xl-3 col-lg-5 col-md-6 col-sm-12", children: [
        /* @__PURE__ */ jsxs("label", { children: [
          "College Name ",
          /* @__PURE__ */ jsx("span", { className: "text-danger", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "collegeName",
            className: "form-control",
            value: formData.collegeName,
            onChange: handleChange,
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-xl-3 col-lg-5 col-md-6 col-sm-12", children: [
        /* @__PURE__ */ jsxs("label", { className: "mb-2", children: [
          "Contact Address ",
          /* @__PURE__ */ jsx("span", { className: "text-danger", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            style: { resize: "none" },
            rows: 2,
            name: "contactAddress",
            className: "form-control",
            value: formData.contactAddress,
            onChange: handleChange,
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-xl-3 col-lg-5 col-md-6 col-sm-12", children: [
        /* @__PURE__ */ jsxs("label", { children: [
          "Course Type ",
          /* @__PURE__ */ jsx("span", { className: "text-danger", children: "*" })
        ] }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            name: "courseTypeId",
            className: "form-control",
            value: formData.courseTypeId,
            onChange: handleChange,
            required: true,
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Select Course Type" }),
              courseTypes.map((ct) => /* @__PURE__ */ jsx("option", { value: ct._id, children: ct.CourseTypeName }, ct._id))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-xl-3 col-lg-5 col-md-6 col-sm-12", children: [
        /* @__PURE__ */ jsxs("label", { children: [
          "Course ",
          /* @__PURE__ */ jsx("span", { className: "text-danger", children: "*" })
        ] }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            name: "courseId",
            className: "form-control",
            value: formData.courseId,
            onChange: handleChange,
            required: true,
            disabled: !formData.courseTypeId,
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Select Course" }),
              filteredCourses.map((course) => /* @__PURE__ */ jsx("option", { value: course._id, children: course.CourseName }, course._id))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-xl-3 col-lg-5 col-md-6 col-sm-12", children: [
        /* @__PURE__ */ jsxs("label", { children: [
          "How did you hear about us? ",
          /* @__PURE__ */ jsx("span", { className: "text-danger", children: "*" })
        ] }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            name: "source",
            className: "form-control",
            value: formData.source,
            onChange: handleChange,
            required: true,
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Select Source" }),
              sourceOptions.map((source, index) => /* @__PURE__ */ jsx("option", { value: source, children: source }, index))
            ]
          }
        )
      ] }),
      formData.source === "Reference" && /* @__PURE__ */ jsxs("div", { className: "col-xl-3", children: [
        /* @__PURE__ */ jsxs("label", { children: [
          "Friend/Referral Name ",
          /* @__PURE__ */ jsx("span", { className: "text-danger", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "ReferralName",
            className: "form-control",
            value: formData.ReferralName || "",
            onChange: handleChange,
            required: true
          }
        )
      ] }),
      filteredSubjects.length > 0 && /* @__PURE__ */ jsxs("div", { className: "col-xl-12 col-lg-5 col-md-6 col-sm-12", children: [
        /* @__PURE__ */ jsxs("label", { children: [
          "Select Subjects: ",
          /* @__PURE__ */ jsx("span", { className: "text-danger", children: "*" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "row", children: filteredSubjects.map((subject) => /* @__PURE__ */ jsx("div", { className: "col-md-2 mb-2", children: /* @__PURE__ */ jsxs("div", { className: "form-check", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              className: "form-check-input",
              id: subject._id,
              value: subject._id,
              checked: formData.selectedSubjects.includes(subject._id),
              onChange: handleSubjectChange
            }
          ),
          /* @__PURE__ */ jsx("label", { className: "form-check-label", htmlFor: subject._id, children: subject.SubjectName })
        ] }) }, subject._id)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-xl-3 col-lg-5 col-md-6 col-sm-12", children: [
        /* @__PURE__ */ jsxs("label", { children: [
          "Course Fee ",
          /* @__PURE__ */ jsx("span", { className: "text-danger", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "offeredFee",
            className: "form-control",
            value: formData.offeredFee,
            onChange: handleChange,
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-xl-3", children: [
        /* @__PURE__ */ jsx("label", { children: "Fee Type:" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            className: "form-select",
            name: "feeType",
            value: formData.feeType,
            onChange: handleInputChange,
            children: [
              /* @__PURE__ */ jsx("option", { value: "Single", children: "Full Payment" }),
              /* @__PURE__ */ jsx("option", { value: "Installment", children: "Installment" })
            ]
          }
        )
      ] }),
      formData.feeType === "Installment" && /* @__PURE__ */ jsxs("div", { className: "col-xl-3 mb-3", children: [
        /* @__PURE__ */ jsx("label", { children: "Installment Count:" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            className: "form-control",
            name: "installmentCount",
            value: formData.installmentCount,
            onChange: handleInputChange,
            min: "1",
            max: "12",
            placeholder: "Enter number of installments"
          }
        )
      ] }),
      formData.feeType === "Installment" && formData.installmentCount > 0 && /* @__PURE__ */ jsxs("div", { className: "col-xl-6 mt-3", children: [
        /* @__PURE__ */ jsx("h6", { children: "Payment Plan" }),
        /* @__PURE__ */ jsx("div", { className: "installment-plan", children: generateInstallmentRows() })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "row" }),
      /* @__PURE__ */ jsx("div", { className: "col-xl-3 col-lg-5 col-md-6 col-sm-12", children: /* @__PURE__ */ jsx("button", { type: "submit", className: "btn btn-primary", children: "Submit" }) })
    ] }) }) }) }) }) })
  ] }) });
};
export {
  RegistrationForm as default
};
