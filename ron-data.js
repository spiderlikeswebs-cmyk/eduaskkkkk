/* ============================================
   EduAsk — ron-data.js
   Massive Database for Ron Decision Engine
   ============================================ */

// Helper to expand compressed arrays into objects
function expandColleges(data) {
    return data.map(c => ({
        name: c[0], city: c[1], state: c[2], type: c[3],
        streams: c[4].split(','), approxFees: c[5], feeMin: c[6], feeMax: c[7],
        placementStrength: c[8], entranceExam: c[9], region: c[10],
        nirfRank: c[11], naacGrade: c[12], avgPackage: c[13], highestPackage: c[14],
        established: c[15], specializations: c[16].split(','), acceptanceRate: c[17],
        researchScore: c[18], campusSize: c[19], website: c[20],
        alumniStrength: c[21] || Math.floor(Math.random() * 40 + 60), // Mock data if missing
        startupIndex: c[22] || Math.floor(Math.random() * 50 + 50),
        campusLife: c[23] || (Math.random() * 2 + 7).toFixed(1) // 7.0 to 9.0
    }));
}

// FORMAT: [Name, City, State, Type, Streams, Approx Fees, Min Fee, Max Fee, Placement Strength, Exam, Region, NIRF, NAAC, Avg Pkg, Highest Pkg, Established, Specializations, Acceptance Rate, Research Score, Campus Size, Website]
const offlineCollegesRaw = [
    // ─── IITs (23) ───
    ["IIT Madras", "Chennai", "Tamil Nadu", "Government", "Engineering,Computer Science", "₹2L–₹3L", 200000, 300000, "Exceptional", "JEE", "South India", 1, "A++", "21.48 LPA", "1.98 CPA", 1959, "CS,Aerospace,Mechanical", "Very Low", 98, 617, "iitm.ac.in"],
    ["IIT Delhi", "New Delhi", "Delhi", "Government", "Engineering,Computer Science,Design", "₹2L–₹3L", 200000, 300000, "Exceptional", "JEE", "North India", 2, "A++", "22.5 LPA", "2.4 CPA", 1961, "CS,Core,Textile", "Very Low", 97, 320, "iitd.ac.in"],
    ["IIT Bombay", "Mumbai", "Maharashtra", "Government", "Engineering,Computer Science,Design", "₹2L–₹3L", 200000, 300000, "Exceptional", "JEE", "West India", 3, "A++", "21.8 LPA", "3.67 CPA", 1958, "CS,Electrical,Aerospace", "Very Low", 96, 550, "iitb.ac.in"],
    ["IIT Kanpur", "Kanpur", "Uttar Pradesh", "Government", "Engineering,Computer Science,Arts / Humanities", "₹2L–₹3L", 200000, 300000, "Exceptional", "JEE", "North India", 4, "A++", "22.07 LPA", "1.9 CPA", 1959, "CS,Aerospace,Economics", "Very Low", 97, 1055, "iitk.ac.in"],
    ["IIT Roorkee", "Roorkee", "Uttarakhand", "Government", "Engineering,Computer Science,Design", "₹2L–₹3L", 200000, 300000, "Exceptional", "JEE", "North India", 5, "A++", "18.34 LPA", "2.15 CPA", 1847, "Civil,Architecture,CS", "Very Low", 94, 365, "iitr.ac.in"],
    ["IIT Kharagpur", "Kharagpur", "West Bengal", "Government", "Engineering,Computer Science,Law,Management", "₹2L–₹3L", 200000, 300000, "Exceptional", "JEE", "East India", 6, "A++", "19.36 LPA", "2.6 CPA", 1951, "CS,Architecture,Law", "Very Low", 95, 2100, "iitkgp.ac.in"],
    ["IIT Guwahati", "Guwahati", "Assam", "Government", "Engineering,Computer Science,Design", "₹2L–₹3L", 200000, 300000, "Exceptional", "JEE", "East India", 7, "A++", "21.6 LPA", "2.4 CPA", 1994, "CS,Design,Mechanical", "Very Low", 92, 700, "iitg.ac.in"],
    ["IIT Hyderabad", "Hyderabad", "Telangana", "Government", "Engineering,Computer Science,Design", "₹2L–₹3L", 200000, 300000, "Exceptional", "JEE", "South India", 8, "A++", "20.07 LPA", "63.78 LPA", 2008, "AI,CS,Design", "Very Low", 90, 576, "iith.ac.in"],
    ["IIT BHU", "Varanasi", "Uttar Pradesh", "Government", "Engineering,Computer Science", "₹2L–₹3L", 200000, 300000, "Exceptional", "JEE", "North India", 15, "A++", "21.89 LPA", "1.2 CPA", 1919, "Ceramic,Metallurgy,CS", "Very Low", 85, 1300, "iitbhu.ac.in"],
    ["IIT Indore", "Indore", "Madhya Pradesh", "Government", "Engineering,Computer Science", "₹2L–₹3L", 200000, 300000, "Excellent", "JEE", "Central India", 14, "A+", "23.5 LPA", "68 LPA", 2009, "CS,Electrical,Mechanical", "Low", 88, 501, "iiti.ac.in"],
    // (Adding a few more IITs for brevity...)
    ["IIT Ropar", "Rupnagar", "Punjab", "Government", "Engineering,Computer Science", "₹2L–₹3L", 200000, 300000, "Excellent", "JEE", "North India", 22, "A+", "20.99 LPA", "50 LPA", 2008, "CS,AI,Maths", "Low", 82, 500, "iitrpr.ac.in"],
    ["IIT Patna", "Patna", "Bihar", "Government", "Engineering,Computer Science", "₹2L–₹3L", 200000, 300000, "Excellent", "JEE", "East India", 41, "A+", "23.90 LPA", "82.05 LPA", 2008, "CS,Electrical", "Low", 80, 501, "iitp.ac.in"],
    ["IIT Gandhinagar", "Gandhinagar", "Gujarat", "Government", "Engineering,Computer Science", "₹2L–₹3L", 200000, 300000, "Excellent", "JEE", "West India", 18, "A+", "19.6 LPA", "2 CPA", 2008, "Cognitive Science,CS", "Low", 84, 400, "iitgn.ac.in"],
    ["IIT Jodhpur", "Jodhpur", "Rajasthan", "Government", "Engineering,Computer Science", "₹2L–₹3L", 200000, 300000, "Excellent", "JEE", "North India", 30, "A+", "21.3 LPA", "61 LPA", 2008, "AI,Data Science,CS", "Low", 81, 852, "iitj.ac.in"],

    // ─── NITs (Top 15) ───
    ["NIT Trichy", "Tiruchirappalli", "Tamil Nadu", "Government", "Engineering,Computer Science,Management", "₹1L–₹3L", 100000, 300000, "Exceptional", "JEE", "South India", 9, "A++", "12 LPA", "52.89 LPA", 1964, "CS,Production,Architecture", "Low", 85, 800, "nitt.edu"],
    ["NIT Surathkal", "Mangalore", "Karnataka", "Government", "Engineering,Computer Science", "₹1L–₹3L", 100000, 300000, "Exceptional", "JEE", "South India", 12, "A++", "18.26 LPA", "54.75 LPA", 1960, "CS,IT,Mining", "Low", 82, 295, "nitk.ac.in"],
    ["NIT Rourkela", "Rourkela", "Odisha", "Government", "Engineering,Computer Science,Design", "₹1L–₹3L", 100000, 300000, "Exceptional", "JEE", "East India", 16, "A++", "12.95 LPA", "83.60 LPA", 1961, "Ceramic,Biomedical,CS", "Low", 80, 1144, "nitrkl.ac.in"],
    ["NIT Warangal", "Warangal", "Telangana", "Government", "Engineering,Computer Science", "₹1L–₹3L", 100000, 300000, "Exceptional", "JEE", "South India", 21, "A++", "17.29 LPA", "88 LPA", 1959, "CS,Civil,Electrical", "Low", 78, 248, "nitw.ac.in"],
    ["NIT Calicut", "Kozhikode", "Kerala", "Government", "Engineering,Computer Science,Architecture", "₹1L–₹3L", 100000, 300000, "Excellent", "JEE", "South India", 23, "A+", "13.77 LPA", "47 LPA", 1961, "Architecture,CS", "Low", 75, 296, "nitc.ac.in"],
    ["VNIT Nagpur", "Nagpur", "Maharashtra", "Government", "Engineering,Computer Science,Architecture", "₹1L–₹3L", 100000, 300000, "Excellent", "JEE", "West India", 41, "A+", "10.36 LPA", "34.25 LPA", 1960, "Architecture,Mining,CS", "Low", 72, 214, "vnit.ac.in"],
    ["MNIT Jaipur", "Jaipur", "Rajasthan", "Government", "Engineering,Computer Science,Architecture", "₹1L–₹3L", 100000, 300000, "Excellent", "JEE", "North India", 37, "A+", "13.20 LPA", "64 LPA", 1963, "Architecture,CS", "Low", 74, 317, "mnit.ac.in"],
    ["MNNIT Allahabad", "Prayagraj", "Uttar Pradesh", "Government", "Engineering,Computer Science", "₹1L–₹3L", 100000, 300000, "Excellent", "JEE", "North India", 49, "A+", "20.18 LPA", "1.35 CPA", 1961, "CS,IT,Electrical", "Low", 70, 222, "mnnit.ac.in"],
    ["NIT Kurukshetra", "Kurukshetra", "Haryana", "Government", "Engineering,Computer Science", "₹1L–₹3L", 100000, 300000, "Good", "JEE", "North India", 58, "A", "13.89 LPA", "1.25 CPA", 1963, "CS,IT", "Medium", 65, 300, "nitkkr.ac.in"],
    ["NIT Durgapur", "Durgapur", "West Bengal", "Government", "Engineering,Computer Science", "₹1L–₹3L", 100000, 300000, "Good", "JEE", "East India", 43, "A", "13.62 LPA", "70 LPA", 1960, "CS,Metallurgy", "Medium", 68, 187, "nitdgp.ac.in"],

    // ─── IIITs & Premium Engineering ───
    ["IIIT Hyderabad", "Hyderabad", "Telangana", "Private", "Engineering,Computer Science,Data Science", "₹3L–₹6L", 300000, 600000, "Exceptional", "JEE", "South India", 55, "A++", "32 LPA", "74 LPA", 1998, "CS,AI,Research", "Very Low", 95, 66, "iiit.ac.in"],
    ["IIIT Bangalore", "Bangalore", "Karnataka", "Private", "Engineering,Computer Science,Data Science", "₹3L–₹6L", 300000, 600000, "Exceptional", "JEE", "South India", 74, "A+", "30.78 LPA", "2.02 CPA", 1999, "CS,Data Science", "Very Low", 90, 9, "iiitb.ac.in"],
    ["IIIT Delhi", "New Delhi", "Delhi", "Government", "Engineering,Computer Science,Design", "₹3L–₹6L", 300000, 600000, "Exceptional", "JEE", "North India", 75, "A", "23.72 LPA", "51.03 LPA", 2008, "CS,Design,AI", "Low", 88, 25, "iiitd.ac.in"],
    ["IIIT Allahabad", "Prayagraj", "Uttar Pradesh", "Government", "Engineering,Computer Science,Management", "₹1L–₹3L", 100000, 300000, "Exceptional", "JEE", "North India", 89, "A+", "30.68 LPA", "1.02 CPA", 1999, "IT,CS", "Low", 85, 100, "iiita.ac.in"],
    ["DTU", "New Delhi", "Delhi", "Government", "Engineering,Computer Science,Design", "₹1L–₹3L", 100000, 300000, "Exceptional", "State CET", "North India", 29, "A", "15.06 LPA", "1.8 CPA", 1941, "CS,Software", "Low", 80, 164, "dtu.ac.in"],
    ["NSUT", "New Delhi", "Delhi", "Government", "Engineering,Computer Science", "₹1L–₹3L", 100000, 300000, "Exceptional", "State CET", "North India", 60, "A", "16 LPA", "1.25 CPA", 1983, "CS,IT,AI", "Low", 78, 145, "nsut.ac.in"],
    ["Jadavpur University", "Kolkata", "West Bengal", "Government", "Engineering,Computer Science,Arts / Humanities", "Under ₹1L", 10000, 50000, "Exceptional", "State CET", "East India", 4, "A", "10 LPA", "85 LPA", 1955, "Engineering,Arts,Science", "Low", 90, 58, "jaduniv.edu.in"],

    // ─── Top Private Engineering & Comphrehensive ───
    ["BITS Pilani", "Pilani", "Rajasthan", "Private", "Engineering,Computer Science,Management", "₹6L–₹10L", 600000, 1000000, "Exceptional", "Private University Exam", "North India", 20, "A", "30.37 LPA", "60.75 LPA", 1964, "CS,Electrical,Science", "Low", 88, 328, "bits-pilani.ac.in"],
    ["VIT Vellore", "Vellore", "Tamil Nadu", "Private", "Engineering,Computer Science,Commerce,Management", "₹3L–₹6L", 300000, 600000, "Excellent", "Private University Exam", "South India", 11, "A++", "9.23 LPA", "1.02 CPA", 1984, "CS,IT,Biotech", "Medium", 85, 372, "vit.ac.in"],
    ["SRM Institute", "Chennai", "Tamil Nadu", "Private", "Engineering,Computer Science,Medical,Management", "₹3L–₹6L", 300000, 600000, "Very Good", "Private University Exam", "South India", 18, "A++", "7.58 LPA", "1 CPA", 1985, "CS,Medical,Management", "Medium", 80, 250, "srmist.edu.in"],
    ["Manipal Academy (MAHE)", "Manipal", "Karnataka", "Private", "Engineering,Computer Science,Medical,Management", "₹3L–₹6L", 300000, 600000, "Excellent", "Private University Exam", "South India", 6, "A++", "12.59 LPA", "54.75 LPA", 1953, "Medical,Engineering", "Medium", 82, 313, "manipal.edu"],
    ["Amity University", "Noida", "Uttar Pradesh", "Private", "Engineering,Computer Science,Management,Law,Commerce,Design,Arts / Humanities,Hotel Management", "₹3L–₹6L", 300000, 600000, "Good", "No Exam", "North India", 35, "A+", "5.5 LPA", "61.75 LPA", 2005, "Management,CS,Law", "High", 75, 1200, "amity.edu"],
    ["Thapar Institute", "Patiala", "Punjab", "Private", "Engineering,Computer Science,Management", "₹3L–₹6L", 300000, 600000, "Very Good", "JEE", "North India", 20, "A+", "11.90 LPA", "55.75 LPA", 1956, "CS,Computer Engineering", "Medium", 78, 250, "thapar.edu"],
    ["RV College of Engineering", "Bangalore", "Karnataka", "Private", "Engineering,Computer Science", "₹3L–₹6L", 300000, 600000, "Excellent", "State CET", "South India", 96, "A", "10 LPA", "62 LPA", 1963, "CS,IT,Electronics", "Medium", 70, 52, "rvce.edu.in"],
    ["LNMIIT", "Jaipur", "Rajasthan", "Private", "Engineering,Computer Science", "₹3L–₹6L", 300000, 600000, "Very Good", "JEE", "North India", 0, "A", "13.23 LPA", "50.96 LPA", 2002, "CS,Communication", "Medium", 65, 100, "lnmiit.ac.in"],

    // ─── IIMs (Management) ───
    ["IIM Ahmedabad", "Ahmedabad", "Gujarat", "Government", "Management", "Above ₹10L", 1000000, 3000000, "Exceptional", "CAT", "West India", 1, "A++", "32.8 LPA", "1.15 CPA", 1961, "General Management,Agri", "Very Low", 98, 100, "iima.ac.in"],
    ["IIM Bangalore", "Bangalore", "Karnataka", "Government", "Management", "Above ₹10L", 1000000, 3000000, "Exceptional", "CAT", "South India", 2, "A++", "35.31 LPA", "80 LPA", 1973, "Strategy,Public Policy", "Very Low", 97, 100, "iimb.ac.in"],
    ["IIM Calcutta", "Kolkata", "West Bengal", "Government", "Management", "Above ₹10L", 1000000, 3000000, "Exceptional", "CAT", "East India", 4, "A++", "34.20 LPA", "1.15 CPA", 1961, "Finance,Economics", "Very Low", 96, 135, "iimcal.ac.in"],
    ["IIM Lucknow", "Lucknow", "Uttar Pradesh", "Government", "Management", "Above ₹10L", 1000000, 3000000, "Exceptional", "CAT", "North India", 6, "A++", "32.20 LPA", "65 LPA", 1984, "Marketing,Operations", "Very Low", 94, 200, "iiml.ac.in"],
    ["IIM Kozhikode", "Kozhikode", "Kerala", "Government", "Management", "Above ₹10L", 1000000, 3000000, "Exceptional", "CAT", "South India", 3, "A++", "31.02 LPA", "67.02 LPA", 1996, "Finance,Marketing", "Very Low", 92, 112, "iimk.ac.in"],
    ["IIM Indore", "Indore", "Madhya Pradesh", "Government", "Management", "Above ₹10L", 1000000, 3000000, "Exceptional", "CAT", "Central India", 8, "A++", "25.01 LPA", "1.14 CPA", 1996, "IPM,General", "Very Low", 90, 193, "iimidr.ac.in"],
    ["FMS Delhi", "New Delhi", "Delhi", "Government", "Management", "Under ₹1L", 20000, 100000, "Exceptional", "CAT", "North India", 0, "A", "34.1 LPA", "58 LPA", 1954, "Marketing,Finance", "Very Low", 85, 10, "fms.edu"],
    ["XLRI", "Jamshedpur", "Jharkhand", "Private", "Management", "Above ₹10L", 1000000, 3000000, "Exceptional", "XAT", "East India", 9, "A++", "32.7 LPA", "1.1 CPA", 1949, "HR,Business Management", "Very Low", 90, 50, "xlri.ac.in"],
    ["SPJIMR", "Mumbai", "Maharashtra", "Private", "Management", "Above ₹10L", 1000000, 3000000, "Exceptional", "CAT", "West India", 20, "A+", "33.02 LPA", "77.8 LPA", 1981, "Finance,Operations", "Very Low", 88, 45, "spjimr.org"],

    // ─── Medical (Top Institutes) ───
    ["AIIMS Delhi", "New Delhi", "Delhi", "Government", "Medical", "Under ₹1L", 5000, 20000, "Exceptional", "NEET", "North India", 1, "A++", "12 LPA", "24 LPA", 1956, "MBBS,MD,MS", "Very Low", 99, 115, "aiims.edu"],
    ["PGIMER", "Chandigarh", "Chandigarh", "Government", "Medical", "Under ₹1L", 5000, 20000, "Exceptional", "NEET", "North India", 2, "A++", "15 LPA", "25 LPA", 1962, "MD,MS", "Very Low", 98, 277, "pgimer.edu.in"],
    ["CMC Vellore", "Vellore", "Tamil Nadu", "Private", "Medical", "₹1L–₹3L", 100000, 200000, "Exceptional", "NEET", "South India", 3, "A++", "8 LPA", "15 LPA", 1900, "MBBS,MD", "Very Low", 95, 200, "cmch-vellore.edu"],
    ["JIPMER", "Puducherry", "Puducherry", "Government", "Medical", "Under ₹1L", 10000, 30000, "Exceptional", "NEET", "South India", 5, "A++", "10 LPA", "20 LPA", 1823, "MBBS,MD", "Very Low", 92, 195, "jipmer.edu.in"],
    ["KGMU", "Lucknow", "Uttar Pradesh", "Government", "Medical", "Under ₹1L", 30000, 80000, "Excellent", "NEET", "North India", 12, "A+", "9 LPA", "18 LPA", 1911, "MBBS,BDS", "Low", 85, 250, "kgmu.org"],
    ["MAMC", "New Delhi", "Delhi", "Government", "Medical", "Under ₹1L", 10000, 30000, "Exceptional", "NEET", "North India", 14, "A+", "12 LPA", "24 LPA", 1959, "MBBS,MD", "Very Low", 88, 122, "mamc.ac.in"],
    ["AFMC", "Pune", "Maharashtra", "Government", "Medical", "Under ₹1L", 0, 10000, "Exceptional", "NEET", "West India", 0, "A+", "Commissioned Officer", "Commissioned Officer", 1948, "Armed Forces Medical", "Very Low", 85, 119, "afmc.nic.in"],

    // ─── Law (NLUs) ───
    ["NLSIU", "Bangalore", "Karnataka", "Government", "Law", "₹1L–₹3L", 200000, 300000, "Exceptional", "CLAT", "South India", 1, "A++", "16 LPA", "35 LPA", 1986, "Corporate,Litigation", "Very Low", 95, 23, "nls.ac.in"],
    ["NLU Delhi", "New Delhi", "Delhi", "Government", "Law", "₹1L–₹3L", 150000, 250000, "Exceptional", "CLAT", "North India", 2, "A++", "15 LPA", "25 LPA", 2008, "Corporate,Litigation", "Very Low", 94, 12, "nludelhi.ac.in"],
    ["NALSAR", "Hyderabad", "Telangana", "Government", "Law", "₹1L–₹3L", 200000, 300000, "Exceptional", "CLAT", "South India", 3, "A++", "14 LPA", "30 LPA", 1998, "Corporate,Aviation", "Very Low", 92, 55, "nalsar.ac.in"],
    ["WBNUJS", "Kolkata", "West Bengal", "Government", "Law", "₹1L–₹3L", 200000, 300000, "Excellent", "CLAT", "East India", 4, "A+", "12 LPA", "25 LPA", 1999, "Corporate,IP", "Very Low", 88, 5, "nujs.edu"],
    ["Symbiosis Law School", "Pune", "Maharashtra", "Private", "Law", "₹3L–₹6L", 300000, 500000, "Excellent", "State Law Exam", "West India", 6, "A+", "10 LPA", "17 LPA", 1977, "Corporate,Criminal", "Medium", 80, 5, "symlaw.ac.in"],

    // ─── Arts, Commerce & Sciences ───
    ["SRCC", "New Delhi", "Delhi", "Government", "Commerce,Management", "Under ₹1L", 15000, 40000, "Exceptional", "No Exam", "North India", 11, "A++", "13 LPA", "35 LPA", 1926, "Economics,Commerce", "Very Low", 80, 16, "srcc.edu"],
    ["St. Stephen's College", "New Delhi", "Delhi", "Government", "Arts / Humanities,Science", "Under ₹1L", 20000, 50000, "Excellent", "No Exam", "North India", 14, "A+", "10 LPA", "25 LPA", 1881, "History,Economics,Math", "Very Low", 85, 20, "ststephens.edu"],
    ["Hindu College", "New Delhi", "Delhi", "Government", "Commerce,Arts / Humanities,Science", "Under ₹1L", 15000, 40000, "Excellent", "No Exam", "North India", 2, "A+", "10 LPA", "36 LPA", 1899, "Commerce,Arts", "Very Low", 82, 25, "hinducollege.ac.in"],
    ["LSR College", "New Delhi", "Delhi", "Government", "Arts / Humanities,Commerce", "Under ₹1L", 15000, 40000, "Excellent", "No Exam", "North India", 9, "A++", "9.8 LPA", "40 LPA", 1956, "Psychology,Economics", "Very Low", 85, 15, "lsr.edu.in"],
    ["Loyola College", "Chennai", "Tamil Nadu", "Private", "Arts / Humanities,Commerce,Science", "Under ₹1L", 20000, 80000, "Very Good", "No Exam", "South India", 7, "A++", "6 LPA", "15 LPA", 1925, "Commerce,Visual Comm", "Low", 78, 99, "loyolacollege.edu"],
    ["St. Xavier's College", "Mumbai", "Maharashtra", "Private", "Arts / Humanities,Commerce,Management", "Under ₹1L", 15000, 80000, "Very Good", "No Exam", "West India", 0, "A+", "6.5 LPA", "30 LPA", 1869, "BMM,BMS,Arts", "Low", 75, 3, "xaviers.edu"],
    ["Christ University", "Bangalore", "Karnataka", "Private", "Commerce,Management,Arts / Humanities,Law,Hotel Management", "₹1L–₹3L", 100000, 200000, "Excellent", "No Exam", "South India", 60, "A+", "7.5 LPA", "21 LPA", 1969, "BBA,Commerce,Psychology", "Medium", 70, 25, "christuniversity.in"],

    // ─── Design & Hotel Management ───
    ["NID", "Ahmedabad", "Gujarat", "Government", "Design", "₹3L–₹6L", 300000, 500000, "Exceptional", "No Exam", "West India", 1, "A", "15 LPA", "40 LPA", 1961, "Industrial,Communication", "Very Low", 85, 15, "nid.edu"],
    ["NIFT", "New Delhi", "Delhi", "Government", "Design", "₹1L–₹3L", 200000, 300000, "Excellent", "No Exam", "North India", 1, "A", "8.5 LPA", "24 LPA", 1986, "Fashion,Apparel", "Low", 75, 5, "nift.ac.in"],
    ["Srishti Manipal", "Bangalore", "Karnataka", "Private", "Design", "₹3L–₹6L", 400000, 600000, "Very Good", "No Exam", "South India", 0, "A", "7 LPA", "15 LPA", 1996, "Visual Arts,Design", "Medium", 65, 0, "srishtimanipalinstitute.in"],
    ["IHM Pusa", "New Delhi", "Delhi", "Government", "Hotel Management", "₹1L–₹3L", 100000, 150000, "Exceptional", "No Exam", "North India", 1, "A", "6 LPA", "12 LPA", 1962, "Hospitality,Culinary", "Low", 50, 0, "ihmpusa.net"],
    ["IHM Mumbai", "Mumbai", "Maharashtra", "Government", "Hotel Management", "₹1L–₹3L", 100000, 150000, "Excellent", "No Exam", "West India", 2, "A", "5.5 LPA", "10 LPA", 1954, "Hospitality,Food Production", "Low", 50, 0, "ihmctan.edu"]
];

var offlineColleges = expandColleges(offlineCollegesRaw);

// ─── Online Universities ───
var onlineUniversities = [
    {
        name: "Jain University Online", city: "Bangalore", state: "Karnataka", type: "Private",
        streams: ["Computer Science", "Business", "Commerce", "Data Science", "Digital Marketing"],
        approxFees: "₹1L–₹2L", feeMin: 100000, feeMax: 200000,
        strength: "Strong management programs with NAAC A++ accreditation", region: "South India",
        naacGrade: "A++", placements: "Strong tech and marketing networks"
    },
    {
        name: "Amity University Online", city: "Noida", state: "Uttar Pradesh", type: "Private",
        streams: ["Business", "Computer Science", "Data Science", "Commerce", "Digital Marketing", "Arts / Humanities"],
        approxFees: "₹1.5L–₹3L", feeMin: 150000, feeMax: 300000,
        strength: "Internationally recognized brand with massive global placement network", region: "North India",
        naacGrade: "A+", placements: "Excellent corporate connections"
    },
    {
        name: "Manipal University Online", city: "Manipal", state: "Karnataka", type: "Private",
        streams: ["Business", "Computer Science", "Data Science", "Commerce", "Medical"],
        approxFees: "₹1.5L–₹2.5L", feeMin: 150000, feeMax: 250000,
        strength: "Excellent tech/medical background with top-tier faculty", region: "South India",
        naacGrade: "A++", placements: "Very high ROI for IT and Management"
    },
    {
        name: "Lovely Professional University Online", city: "Phagwara", state: "Punjab", type: "Private",
        streams: ["Business", "Computer Science", "Commerce", "Arts / Humanities", "Data Science", "Digital Marketing", "Law"],
        approxFees: "₹1L–₹2L", feeMin: 100000, feeMax: 200000,
        strength: "Largest course variety with active placement support", region: "North India",
        naacGrade: "A++", placements: "Multiple mass recruiting tie-ups"
    },
    {
        name: "Arka Jain University Online", city: "Jamshedpur", state: "Jharkhand", type: "Private",
        streams: ["Business", "Commerce", "Arts / Humanities"],
        approxFees: "Under ₹50k", feeMin: 30000, feeMax: 80000,
        strength: "Highly affordable, UGC-approved online degrees", region: "East India",
        naacGrade: "A", placements: "Good regional placements"
    },
    {
        name: "Symbiosis Centre for Distance Learning", city: "Pune", state: "Maharashtra", type: "Private",
        streams: ["Business", "Management", "Digital Marketing"],
        approxFees: "₹50k–₹1L", feeMin: 50000, feeMax: 100000,
        strength: "Pioneer in distance management education in India", region: "West India",
        naacGrade: "A++", placements: "Highly respected PGDMs among top MNCs"
    },
    {
        name: "IGNOU", city: "New Delhi", state: "Delhi", type: "Government",
        streams: ["Arts / Humanities", "Commerce", "Computer Science", "Business", "Management"],
        approxFees: "Under ₹50k", feeMin: 10000, feeMax: 40000,
        strength: "Central University, universally recognized, extremely affordable", region: "North India",
        naacGrade: "A++", placements: "Self-driven, highly accepted in Government jobs"
    },
    {
        name: "NMIMS Global Access", city: "Mumbai", state: "Maharashtra", type: "Private",
        streams: ["Business", "Management", "Commerce", "Data Science"],
        approxFees: "₹1L–₹2L", feeMin: 100000, feeMax: 200000,
        strength: "Premium management tag from NMIMS Mumbai", region: "West India",
        naacGrade: "A+", placements: "Strong alumni base in finance/consulting"
    },
    {
        name: "Chandigarh University Online", city: "Mohali", state: "Punjab", type: "Private",
        streams: ["Business", "Computer Science", "Arts / Humanities", "Data Science"],
        approxFees: "₹1L–₹2L", feeMin: 100000, feeMax: 160000,
        strength: "Fastest-growing private university with modern curriculum", region: "North India",
        naacGrade: "A+", placements: "Good tie-ups with IT and Core sectors"
    },
    {
        name: "DY Patil University Online", city: "Pune", state: "Maharashtra", type: "Private",
        streams: ["Business", "Management", "Medical", "Hotel Management"],
        approxFees: "₹1L–₹2L", feeMin: 100000, feeMax: 180000,
        strength: "Renowned brand in Maharashtra, excellent healthcare management", region: "West India",
        naacGrade: "A++", placements: "Strong in pharmaceuticals and operations"
    }
];

// ─── Career Explorer Data ───
var careerPaths = {
    "Computer Science": [
        { title: "Software Engineer / SDE", salary: "₹6L–₹25L+", growth: "High", skills: "DSA, System Design, Java/Python/C++" },
        { title: "Full Stack Developer", salary: "₹5L–₹20L", growth: "Very High", skills: "React, Node.js, Databases, REST APIs" },
        { title: "Cybersecurity Analyst", salary: "₹6L–₹18L", growth: "Exceptional", skills: "Network Security, Ethical Hacking, Linux" }
    ],
    "Data Science / AI": [
        { title: "Data Scientist", salary: "₹8L–₹30L+", growth: "Exceptional", skills: "Python, ML Models, Stats, SQL" },
        { title: "AI/ML Engineer", salary: "₹10L–₹35L+", growth: "Exceptional", skills: "Deep Learning, PyTorch/TensorFlow, MLOps" },
        { title: "Data Analyst", salary: "₹5L–₹15L", growth: "High", skills: "Excel, SQL, Power BI, Tableau" }
    ],
    "Management": [
        { title: "Management Consultant", salary: "₹12L–₹40L+", growth: "High", skills: "Problem Solving, Strategy, Excel, Presentation" },
        { title: "Product Manager", salary: "₹15L–₹45L+", growth: "Exceptional", skills: "Agile, UX understanding, Data-driven, Leadership" },
        { title: "Investment Banker", salary: "₹15L–₹50L+", growth: "High", skills: "Financial Modeling, Valuation, Networking" }
    ],
    "Engineering": [
        { title: "Core Design Engineer", salary: "₹5L–₹15L", growth: "Steady", skills: "AutoCAD, SolidWorks, Core fundamentals" },
        { title: "EV Battery Engineer", salary: "₹6L–₹20L", growth: "Exceptional", skills: "Electrochemistry, Thermal Management, Manufacturing" },
        { title: "Semiconductor/VLSI Engineer", salary: "₹8L–₹25L", growth: "Very High", skills: "Verilog, Chip Design, Electronics" }
    ],
    "Medical": [
        { title: "Physician / Specialist", salary: "₹12L–₹50L+", growth: "Steady", skills: "Clinical Diagnosis, Patient Care, Medical Surgery" },
        { title: "Clinical Researcher", salary: "₹6L–₹20L", growth: "High", skills: "Trial Management, Pharmacology, Data Accurary" },
        { title: "Healthcare Administrator", salary: "₹8L–₹25L", growth: "High", skills: "Hospital Ops, Policy, Team Management" }
    ],
    "Commerce": [
        { title: "Chartered Accountant (CA)", salary: "₹8L–₹25L+", growth: "High", skills: "Taxation, Audit, Financial Reporting, Law" },
        { title: "Financial Analyst", salary: "₹5L–₹18L", growth: "High", skills: "Financial Modeling, Ratio Analysis, Market Research" },
        { title: "Risk Manager", salary: "₹7L–₹22L", growth: "Very High", skills: "Risk Assesment, Compliance, Quantitative Analysis" }
    ],
    "Law": [
        { title: "Corporate Lawyer", salary: "₹10L–₹35L+", growth: "High", skills: "Contract Law, M&A, Negotiation, Legal Drafting" },
        { title: "Litigation Attorney", salary: "₹5L–₹30L+", growth: "Steady", skills: "Argumentation, Case Research, Court Procedures" },
        { title: "Legal Advisor (In-house)", salary: "₹8L–₹25L", growth: "High", skills: "Compliance, Employment Law, IP Law" }
    ],
    "Arts / Humanities": [
        { title: "Civil Services (UPSC)", salary: "Govt Scale + Perks", growth: "Exceptional", skills: "Admin, Policy, General Knowledge, Leadership" },
        { title: "Psychologist / Counselor", salary: "₹4L–₹15L", growth: "Very High", skills: "Empathy, Cognitive Therapy, Active Listening" },
        { title: "Content Strategist", salary: "₹5L–₹18L", growth: "High", skills: "Copywriting, SEO, Audience Analysis" }
    ],
    "Design": [
        { title: "UX/UI Designer", salary: "₹6L–₹25L+", growth: "Exceptional", skills: "Figma, User Research, Wireframing, Prototyping" },
        { title: "Product/Industrial Designer", salary: "₹5L–₹20L", growth: "High", skills: "3D CAD, Material Science, Ergonomics" },
        { title: "Fashion Designer", salary: "₹4L–₹20L+", growth: "Steady", skills: "Apparel Design, Trend Forecasting, Textiles" }
    ]
    // Other streams map dynamically or fallback
};

// ─── Entrance Exam Guides ───
var entranceExamGuide = {
    "JEE": { name: "JEE (Main & Advanced)", for: "Engineering & Architecture", pattern: "MCQ + Numerical Value. Physics, Chemistry, Maths", prepTip: "Focus intensely on solving previous 10-year papers and mock tests." },
    "NEET": { name: "NEET UG", for: "Medical (MBBS, BDS)", pattern: "MCQ. Physics, Chemistry, Biology (Botany & Zoology)", prepTip: "NCERT Biology is your bible. Memorize standard facts and practice speed." },
    "CAT": { name: "CAT", for: "Management (MBA, PGDM)", pattern: "MCQ + TITA. VARC, DILR, QA", prepTip: "Time management is everything. Improve reading speed and mental math." },
    "CLAT": { name: "CLAT", for: "Law (BA LLB)", pattern: "MCQ. English, Current Affairs, Legal Reasoning, Logical Reasoning, Quants", prepTip: "Read newspapers daily (editorial sections) to build reading comprehension and current affairs." }
};

// ─── Scholarships ───
var scholarshipDatabase = [
    { title: "INSPIRE Scholarship", categories: ["Science", "Engineering"], amount: "₹80,000/year", criteria: "Top 1% in 12th Board, pursuing Natural/Basic Sciences or Engg via top exams." },
    { title: "NTPC Scholarship Scheme", categories: ["Engineering"], amount: "₹4,000/month", criteria: "SC/ST/PH students in engineering, based on merit." },
    { title: "Foundation for Excellence", categories: ["Medical", "Engineering"], amount: "Varies (Need-based)", criteria: "Meritorious but financially constrained students in professional courses." },
    { title: "Aditya Birla Scholarship", categories: ["Management", "Engineering", "Law"], amount: "Up to ₹3L/year", criteria: "Top ranks in premier institutes (IITs, IIMs, NLUs)." }
];

// ─── City Cost of Living (Monthly) ───
var cityLivingCost = {
    "Mumbai": { rent: "₹15,000 - ₹25,000+", food: "₹6,000", total: "₹25,000+", rating: "Very Expensive" },
    "Delhi": { rent: "₹10,000 - ₹18,000", food: "₹5,000", total: "₹18,000+", rating: "Expensive" },
    "Bangalore": { rent: "₹12,000 - ₹20,000", food: "₹6,000", total: "₹22,000+", rating: "Expensive" },
    "Chennai": { rent: "₹8,000 - ₹15,000", food: "₹4,500", total: "₹15,000+", rating: "Moderate" },
    "Pune": { rent: "₹9,000 - ₹16,000", food: "₹5,000", total: "₹16,000+", rating: "Moderate" },
    "Hyderabad": { rent: "₹9,000 - ₹15,000", food: "₹5,000", total: "₹16,000+", rating: "Moderate" },
    "Kolkata": { rent: "₹6,000 - ₹12,000", food: "₹4,000", total: "₹12,000+", rating: "Affordable" }
};
