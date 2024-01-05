function generateArrayOfYears() {
    var max = new Date().getFullYear();
    var min = max - 30;
    var years = [];

    for (var i = max; i >= min; i--) {
      years.push(i.toString());
    }
    return years;
  }

  const indianEducationArray = [
    // Schools

    "Delhi Public School (DPS)",
    "Kendriya Vidyalaya",
    "Doon School, Dehradun",
    "Sanskriti School, New Delhi",
    "The Shri Ram School, Delhi",
    "St. Xavier's School, Mumbai",
    "La Martiniere College, Lucknow",
    "Mayo College, Ajmer",
    "Modern School, Delhi",
    "Welham Girls' School, Dehradun",
    // Add more common schools as needed

    // Universities
    "University of Delhi",
    "Jawaharlal Nehru University (JNU)",
    "Banaras Hindu University (BHU)",
    "St. Stephen's College, Delhi",
    "Christ University, Bangalore",
    "BITS Pilani",
    "Xavier Labour Relations Institute (XLRI), Jamshedpur",
    "Indian Statistical Institute (ISI), Kolkata",
    "Indian Institutes of Technology (IITs)",
    "Indian Institutes of Management (IIMs)",
    // Add more common universities as needed
  ];

  const allDegreesArray = [
    "Bachelor of Arts (BA)",
    "Bachelor of Science (BS)",
    "Bachelor of Fine Arts (BFA)",
    "Bachelor of Business Administration (BBA)",
    "Bachelor of Engineering (BEng)",
    "Bachelor of Computer Science (BCS)",
    "Bachelor of Nursing (BN)",
    "Bachelor of Architecture (BArch)",
    "Bachelor of Education (BEd)",
    "Bachelor of Music (BMus)",
    "Bachelor of Social Work (BSW)",
    "Bachelor of Laws (LLB)",
    // Add more Bachelor's degrees as needed

    "Master of Arts (MA)",
    "Master of Science (MS)",
    "Master of Fine Arts (MFA)",
    "Master of Business Administration (MBA)",
    "Master of Engineering (MEng)",
    "Master of Computer Science (MCS)",
    "Master of Public Health (MPH)",
    "Master of Architecture (MArch)",
    "Master of Education (MEd)",
    "Master of Music (MMus)",
    "Master of Social Work (MSW)",
    "Master of Laws (LLM)",
    // Add more Master's degrees as needed
  ];

  const fields = [
    "Computer Science",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Biology",
    "Chemistry",
    "Physics",
    "Mathematics",
    "Environmental Science",
    "Psychology",
    "Economics",
    "Business Administration",
    "Marketing",
    "Finance",
    "Political Science",
    "International Relations",
    "English Literature",
    "History",
    "Sociology",
    "Nursing",
    "Medicine",
    "Law",
    "Education",
    "Architecture",
    // Add more common fields of study as needed
  ];

  const yearsData = generateArrayOfYears();

  const releventMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const type = [
    { label: "FullTime", value: "fullTime" },
    { label: "PartTime", value: "partTime" },
    { label: "SelfEmployed", value: "selfEmployed" },
    { label: "Freelance", value: "freelance" },
    { label: "Internship", value: "internship" },
    { label: "Trainee", value: "trainee" },
  ];

  const locationType = [
    { label: "remote", value: "remote" },
    { label: "office", value: "office" },
  ];


  export {indianEducationArray,allDegreesArray,fields, yearsData ,releventMonths,type }
