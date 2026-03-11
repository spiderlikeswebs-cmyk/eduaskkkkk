/*=============================================================================
  Ron Education & Certification Engine
  Highly Analytical Client-Side Advisor
=============================================================================*/

// --- State Variables ---
let ronState = {
    step: 'start',
    mode: '', // 'offline' or 'online'
    stream: '', // Engineering, Management, Medical, Law, Design, etc.
    region: '',
    budget: '',
    exam: '',
    filteredColleges: [],
    profileScore: 0
};

// --- DOM Elements ---
// Fixed DOM element ID from 'ronMessages' to 'chatMessages'
const ronMessages = document.getElementById('chatMessages');
const ronButtonsArea = document.getElementById('ronButtonsArea');
const ronButtons = document.getElementById('ronButtons');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initRon();
});

// --- Core Helper Functions ---
function scrollToBottom() {
    if (ronMessages) {
        ronMessages.scrollTop = ronMessages.scrollHeight;
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Render a message bubble from Ron
function renderMessage(htmlContent, isRon = true) {
    if (!ronMessages) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${isRon ? 'ron' : 'user'}`;
    msgDiv.style.animation = 'msgIn 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards';
    msgDiv.innerHTML = htmlContent;
    ronMessages.appendChild(msgDiv);
    scrollToBottom();
}

// Render the action buttons area
function renderButtons(buttonConfigs) {
    if (!ronButtons || !ronButtonsArea) return;
    ronButtons.innerHTML = '';

    // Animate buttons out first (optional smooth transition)
    ronButtonsArea.style.opacity = '0';

    setTimeout(() => {
        buttonConfigs.forEach(btn => {
            const btnEl = document.createElement('button');
            btnEl.className = `btn btn-${btn.type || 'outline'}`;
            btnEl.innerHTML = btn.text;
            btnEl.onclick = () => {
                // Instantly feedback user choice
                renderMessage(btn.text, false);
                btn.action();
            };
            ronButtons.appendChild(btnEl);
        });
        ronButtonsArea.style.opacity = '1';
    }, 150);
}

// Show a section label
function renderSectionLabel(text) {
    if (!ronMessages) return;
    const lblDiv = document.createElement('div');
    lblDiv.className = 'ron-section-label';
    lblDiv.innerText = text;
    ronMessages.appendChild(lblDiv);
    scrollToBottom();
}

// Adds visual typing indicator delay
async function think(timeMs = 800) {
    if (!ronMessages) return;
    const id = 'typing-' + Date.now();
    const msgDiv = document.createElement('div');
    msgDiv.id = id;
    msgDiv.className = 'message ron';
    msgDiv.innerHTML = `<div class="typing-indicator"><span></span><span></span><span></span></div>`;
    ronMessages.appendChild(msgDiv);
    scrollToBottom();

    await delay(timeMs);
    const typingEl = document.getElementById(id);
    if (typingEl) typingEl.remove();
}

// --- Main State Machine ---

async function initRon() {
    ronState = { step: 'start', mode: '', stream: '', region: '', budget: '', exam: '', filteredColleges: [] };
    if (ronMessages) ronMessages.innerHTML = '';

    await think(600);
    renderMessage(`
        <strong style="color:var(--primary-blue); font-size:1.1rem;">Hello! I am Ron 🤖</strong><br>
        EduAsk’s Advanced Education & Certification Advisor.<br>
        I have data on 130+ Offline Colleges, Top Online Universities, Career Paths, and Scholarships. How can I help you today?
    `);

    renderButtons([
        { text: '🎓 Find a College', type: 'primary', action: () => handleCollegeSearch() },
        { text: '🧠 Not Sure? Take Aptitude Test', action: () => startAptitudeTest() },
        { text: '🚀 Explore Career Paths', action: () => renderCareerExplorer() },
        { text: '💰 Find Scholarships', action: () => renderScholarshipFinder() },
        { text: '📊 Evaluate My Profile', action: () => startProfileEvaluator() },
        { text: '📜 Explore Certifications', action: () => redirectToCertifications() }
    ]);
}

// ==========================================
// ADAPTIVE APTITUDE TEST (Stream Selector)
// ==========================================
let aptitudeScores = { "Engineering": 0, "Medical": 0, "Management": 0, "Arts / Humanities": 0, "Law": 0, "Computer Science": 0 };

async function startAptitudeTest() {
    aptitudeScores = { "Engineering": 0, "Medical": 0, "Management": 0, "Arts / Humanities": 0, "Law": 0, "Computer Science": 0 };
    await think(600);
    renderSectionLabel('AI Aptitude Analyzer');
    renderMessage("Let's discover your ideal career stream based on your natural inclinations. <br><br>Question 1/4: **How do you prefer to solve problems?**");

    renderButtons([
        { text: 'Analyzing data and calculating logic', action: () => { aptitudeScores["Computer Science"] += 20; aptitudeScores["Engineering"] += 20; aptQ2(); } },
        { text: 'Understanding human behavior & life sciences', action: () => { aptitudeScores["Medical"] += 30; aptitudeScores["Arts / Humanities"] += 10; aptQ2(); } },
        { text: 'Debating, reading, and arguing a point', action: () => { aptitudeScores["Law"] += 30; aptitudeScores["Arts / Humanities"] += 20; aptQ2(); } },
        { text: 'Organizing people and managing resources', action: () => { aptitudeScores["Management"] += 30; aptitudeScores["Law"] += 10; aptQ2(); } }
    ]);
}

async function aptQ2() {
    await think(500);
    renderMessage("Question 2/4: **Which environment sounds most appealing to you?**");
    renderButtons([
        { text: 'A high-tech lab or software company', action: () => { aptitudeScores["Engineering"] += 15; aptitudeScores["Computer Science"] += 15; aptQ3(); } },
        { text: 'A hospital, clinic, or research facility', action: () => { aptitudeScores["Medical"] += 30; aptQ3(); } },
        { text: 'A corporate boardroom or startup office', action: () => { aptitudeScores["Management"] += 30; aptQ3(); } },
        { text: 'A courtroom, NGO, or media house', action: () => { aptitudeScores["Law"] += 20; aptitudeScores["Arts / Humanities"] += 20; aptQ3(); } }
    ]);
}

async function aptQ3() {
    await think(500);
    renderMessage("Question 3/4: **What is your strongest academic subject historically?**");
    renderButtons([
        { text: 'Mathematics / Physics', action: () => { aptitudeScores["Engineering"] += 15; aptitudeScores["Computer Science"] += 15; aptQ4(); } },
        { text: 'Biology / Chemistry', action: () => { aptitudeScores["Medical"] += 30; aptQ4(); } },
        { text: 'Economics / Business Studies', action: () => { aptitudeScores["Management"] += 30; aptQ4(); } },
        { text: 'History / Political Science / English', action: () => { aptitudeScores["Arts / Humanities"] += 30; aptitudeScores["Law"] += 10; aptQ4(); } }
    ]);
}

async function aptQ4() {
    await think(500);
    renderMessage("Final Question: **What impact do you want to make on the world?**");
    renderButtons([
        { text: 'Inventing systems & writing software', action: () => { aptitudeScores["Engineering"] += 10; aptitudeScores["Computer Science"] += 10; calculateAptitude(); } },
        { text: 'Saving lives & healthcare innovation', action: () => { aptitudeScores["Medical"] += 10; calculateAptitude(); } },
        { text: 'Leading businesses & creating wealth', action: () => { aptitudeScores["Management"] += 10; calculateAptitude(); } },
        { text: 'Fighting for justice & shaping culture', action: () => { aptitudeScores["Law"] += 10; aptitudeScores["Arts / Humanities"] += 10; calculateAptitude(); } }
    ]);
}

async function calculateAptitude() {
    await think(1000);

    // Find the max score
    let topStream = Object.keys(aptitudeScores).reduce((a, b) => aptitudeScores[a] > aptitudeScores[b] ? a : b);
    let maxScore = aptitudeScores[topStream];

    // Convert to rough percentages
    let totalScore = Object.values(aptitudeScores).reduce((acc, curr) => acc + curr, 0);
    let topPercent = Math.round((maxScore / totalScore) * 100);

    let html = `
        <div class="profile-card">
            <h3>Aptitude Results</h3>
            <p>Your highest affinity is:</p>
            <h4 style="margin: 10px 0; font-size: 1.2rem; color: var(--primary-blue);">${topStream}</h4>
            <div style="font-size: 0.9rem; margin-top: 10px;">
                <div style="display:flex; justify-content:space-between; margin-bottom:3px;">
                    <span>Match Confidence:</span> <strong>${topPercent}%</strong>
                </div>
                <div style="width:100%; height:8px; background:#e2e8f0; border-radius:4px; overflow:hidden;">
                    <div style="width:${topPercent}%; height:100%; background:var(--primary-blue);"></div>
                </div>
            </div>
        </div>
        <p style="font-size:0.9rem; margin-top:10px;">Based on your psychological and academic inputs, <strong>${topStream}</strong> is your ideal path.</p>
    `;

    renderMessage(html);

    renderButtons([
        { text: `🎓 Find ${topStream} Colleges`, type: 'primary', action: () => { ronState.stream = topStream; askOfflineRegion(); } },
        { text: `🚀 Explore ${topStream} Careers`, action: () => showCareers(topStream) },
        { text: 'Start Over', action: () => initRon() }
    ]);
}

async function handleCollegeSearch() {
    await think(500);
    renderMessage("Great! Are you looking for a traditional **On-Campus (Offline)** degree, or a flexible **Online Degree**?");
    renderButtons([
        { text: '🏫 Offline (Campus)', type: 'primary', action: () => { ronState.mode = 'offline'; askOfflineStream(); } },
        { text: '💻 Online Degree', action: () => { ronState.mode = 'online'; askOnlineStream(); } },
        { text: 'Back to Menu', action: () => initRon() }
    ]);
}

// ==========================================
// OFFLINE COLLEGE FLOW
// ==========================================

async function askOfflineStream() {
    await think(500);
    renderMessage("Which field of study (Stream) are you interested in?");

    // Extract unique streams from offlineColleges array
    let allStreams = new Set();
    if (typeof offlineColleges !== 'undefined') {
        offlineColleges.forEach(c => {
            if (c.streams) c.streams.forEach(s => allStreams.add(s.trim()));
        });
    }
    const streams = [...allStreams];

    const streamButtons = streams.map(s => ({
        text: s, action: () => { ronState.stream = s; askOfflineRegion(); }
    }));
    streamButtons.push({ text: 'Back', action: () => handleCollegeSearch() });

    renderButtons(streamButtons);
}

async function askOfflineRegion() {
    await think(500);
    renderMessage(`Got it! ${ronState.stream} is a great choice. In which region of India do you want to study?`);

    let allRegions = new Set();
    if (typeof offlineColleges !== 'undefined') {
        offlineColleges.forEach(c => {
            if (c.region) allRegions.add(c.region);
        });
    }
    const regions = [...allRegions, 'All India'];

    const regionButtons = regions.map(r => ({
        text: r, action: () => { ronState.region = (r === 'All India' ? '' : r); askOfflineExam(); }
    }));
    regionButtons.push({ text: 'Back', action: () => askOfflineStream() });

    renderButtons(regionButtons);
}

async function askOfflineExam() {
    await think(500);

    // Suggest relevant exams based on stream
    let suggestedExams = [];
    if (ronState.stream.includes('Engineering')) suggestedExams = ['JEE', 'State CET', 'Private University Exam', 'None/Direct'];
    else if (ronState.stream.includes('Management')) suggestedExams = ['CAT', 'XAT', 'MAT', 'None/Direct'];
    else if (ronState.stream.includes('Medical')) suggestedExams = ['NEET'];
    else if (ronState.stream.includes('Law')) suggestedExams = ['CLAT', 'State Law Exam'];
    else suggestedExams = ['No Exam', 'Merit Based'];

    let html = `Did you take any specific entrance exams for ${ronState.stream}? This helps me recommend reachable colleges.`;
    renderMessage(html);

    const buttons = suggestedExams.map(ex => ({
        text: ex, action: () => { ronState.exam = (ex.includes('None') || ex.includes('No Exam') ? '' : ex); askOfflineBudget(); }
    }));
    buttons.push({ text: 'Back', action: () => askOfflineRegion() });

    renderButtons(buttons);
}

async function askOfflineBudget() {
    await think(500);
    renderMessage("Finally, do you have a specific budget preference? (Note: Government colleges generally have lower fees).");

    renderButtons([
        { text: 'Government/Low Fee', action: () => { ronState.budget = 'low'; computeOfflineResults(); } },
        { text: 'Private (Standard)', action: () => { ronState.budget = 'standard'; computeOfflineResults(); } },
        { text: 'Premium/High End', action: () => { ronState.budget = 'high'; computeOfflineResults(); } },
        { text: 'Does not matter', type: 'primary', action: () => { ronState.budget = 'any'; computeOfflineResults(); } },
        { text: 'Back', action: () => askOfflineExam() }
    ]);
}

async function computeOfflineResults() {
    await think(1000);

    if (typeof offlineColleges === 'undefined') {
        renderMessage("Unable to load college data. Please refresh.");
        return;
    }

    // Advanced filtering engine
    let results = offlineColleges.filter(col => col.streams && col.streams.map(s => s.trim()).includes(ronState.stream));

    if (ronState.region) {
        results = results.filter(col => col.region === ronState.region);
    }

    if (ronState.exam) {
        results = results.filter(col => col.entranceExam === ronState.exam);
    }

    // Budget filtering
    if (ronState.budget === 'low') {
        results = results.filter(col => col.type.toLowerCase().includes('government') || col.name.toLowerCase().includes('iit') || col.name.toLowerCase().includes('nit') || col.feeMax <= 200000);
    } else if (ronState.budget === 'high') {
        // Filter purely premium institutions mapping feeMax >= 600000
        results = results.filter(col => col.feeMax >= 500000);
    }

    // Sort by NIRF (lower is better, treating 0 as unranked)
    results.sort((a, b) => {
        let rankA = (a.nirfRank && a.nirfRank > 0) ? a.nirfRank : 999;
        let rankB = (b.nirfRank && b.nirfRank > 0) ? b.nirfRank : 999;
        return rankA - rankB;
    });

    ronState.filteredColleges = results.slice(0, 5); // Take top 5

    if (ronState.filteredColleges.length === 0) {
        renderMessage(`I couldn't find exact matches for ${ronState.stream} in ${ronState.region || 'India'} with your criteria. Try broadening your search!`);
        renderButtons([{ text: 'Try Again', type: 'primary', action: () => askOfflineRegion() }]);
        return;
    }

    renderSectionLabel('Ron Analytical Matches');

    let resultHTML = `<div style="margin-bottom:10px;">Here are your top ${ronState.filteredColleges.length} targeted college matches:</div>`;

    ronState.filteredColleges.forEach(col => {
        resultHTML += `
            <div class="result-card">
                <h3>${col.name}</h3>
                <p>📍 ${col.city}, ${col.region} | 🏢 Type: ${col.type}</p>
                <div class="result-details">
                    <span>🏆 NIRF: ${(col.nirfRank && col.nirfRank > 0) ? col.nirfRank : 'N/A'}</span>
                    <span>⭐ NAAC: ${col.naacGrade || '-'}</span>
                    <span>💼 Avg Package: ${col.avgPackage || '-'}</span>
                </div>
            </div>
        `;
    });

    renderMessage(resultHTML);

    renderButtons([
        { text: '📊 Compare Top 3', type: 'primary', action: () => renderComparisonTable() },
        { text: '💸 Calculate ROI & EMI', action: () => calculateROI() },
        { text: '💵 Check Living Costs', action: () => renderCityCosts() },
        { text: '📜 View Certifications for ' + ronState.stream, action: () => showCertReco(ronState.stream) },
        { text: 'Start Over', action: () => initRon() }
    ]);
}

async function calculateROI() {
    await think(800);
    const topCollege = ronState.filteredColleges[0];
    if (!topCollege) return;

    // Clean amounts for math
    let avgPkgStr = topCollege.avgPackage || '5 LPA';
    let pkgVal = parseFloat(avgPkgStr.replace(/[^0-9.]/g, '')) * 100000;
    if (avgPkgStr.includes('CPA')) pkgVal *= 100; // Convert CPA to Lakhs roughly, though usually parsed as 1.xx

    let totalFees = topCollege.feeMax || 400000;

    // Very rough ROI calculation (Months to break even)
    let monthlySalary = pkgVal / 12;
    let monthsToRecover = (totalFees / monthlySalary).toFixed(1);

    // EMI Math: Assume 8.5% over 7 years (84 months) for totalFees
    let r = 8.5 / 12 / 100;
    let n = 84;
    let emi = (totalFees * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    let html = `
        <div class="profile-card" style="text-align:left;">
            <h3 style="text-align:center;">Deep ROI Calculator</h3>
            <p style="text-align:center;">Based on <strong>${topCollege.name}</strong></p>
            
            <div style="margin-top:15px; border-top:1px solid #e2e8f0; padding-top:10px;">
                <p><strong>Total Estimated Fees:</strong> ₹${(totalFees / 100000).toFixed(2)} Lakhs</p>
                <p><strong>Average Package:</strong> ${topCollege.avgPackage}</p>
                <div style="background:#f8fafc; padding:10px; border-radius:8px; margin:10px 0;">
                    <h4 style="color:var(--primary-blue); margin-bottom:5px;">Break-even Period 📈</h4>
                    <p style="font-size:0.9rem;">You will recover your tuition cost in approximately <strong>${monthsToRecover} months</strong> assuming average placement and zero tax.</p>
                </div>
                
                <div style="background:#f8fafc; padding:10px; border-radius:8px;">
                    <h4 style="color:var(--primary-blue); margin-bottom:5px;">Education Loan Estimate 🏦</h4>
                    <p style="font-size:0.9rem;">Assuming a full loan at 8.5% interest over 7 years:</p>
                    <p style="font-size:1.1rem; font-weight:bold; color:#0f172a; margin-top:5px;">₹${Math.round(emi).toLocaleString()} / month</p>
                </div>
            </div>
        </div>
    `;

    renderMessage(html);
    renderButtons([
        { text: '📊 Compare Top 3', type: 'primary', action: () => renderComparisonTable() },
        { text: 'Start Over', action: () => initRon() }
    ]);
}

async function renderComparisonTable() {
    await think(800);
    const top3 = ronState.filteredColleges.slice(0, 3);
    if (top3.length < 2) {
        renderMessage("Not enough colleges selected to compare. Broaden your search.");
        renderButtons([{ text: 'Back', action: () => initRon() }]);
        return;
    }

    let ths = `<th>Attr</th>`;
    let tdRank = `<td>NIRF</td>`;
    let tdPlace = `<td>Avg Package</td>`;
    let tdAccept = `<td>Acceptance</td>`;
    let tdAlumni = `<td>Alumni Network</td>`;
    let tdStartup = `<td>Startup Index</td>`;
    let tdCampus = `<td>Campus Life</td>`;

    top3.forEach(c => {
        ths += `<th>${c.name.substring(0, 10)}...</th>`;
        tdRank += `<td>${(c.nirfRank && c.nirfRank > 0) ? c.nirfRank : '-'}</td>`;
        tdPlace += `<td>${c.avgPackage || '-'}</td>`;
        tdAccept += `<td>${c.acceptanceRate || '-'}</td>`;

        // Progress bar for Alumni
        tdAlumni += `<td>
            <div style="font-size:0.75rem;">${c.alumniStrength}/100</div>
            <div style="width:100%; height:4px; background:#e2e8f0; border-radius:2px;"><div style="width:${c.alumniStrength}%; height:100%; background:var(--primary-blue); border-radius:2px;"></div></div>
        </td>`;

        // Progress bar for Startup Index
        tdStartup += `<td>
            <div style="font-size:0.75rem;">${c.startupIndex}/100</div>
            <div style="width:100%; height:4px; background:#e2e8f0; border-radius:2px;"><div style="width:${c.startupIndex}%; height:100%; background:#10b981; border-radius:2px;"></div></div>
        </td>`;

        // Progress bar for Campus Life
        tdCampus += `<td>
            <div style="font-size:0.75rem;">${c.campusLife}/10</div>
            <div style="width:100%; height:4px; background:#e2e8f0; border-radius:2px;"><div style="width:${c.campusLife * 10}%; height:100%; background:#f59e0b; border-radius:2px;"></div></div>
        </td>`;
    });

    const tableHTML = `
        <div class="comparison-wrapper">
            <table class="comparison-table">
                <tr>${ths}</tr>
                <tr>${tdRank}</tr>
                <tr>${tdPlace}</tr>
                <tr>${tdAccept}</tr>
                <tr>${tdAlumni}</tr>
                <tr>${tdStartup}</tr>
                <tr>${tdCampus}</tr>
            </table>
        </div>
        <p style="font-size:0.8rem; opacity:0.7; margin-top:5px;">This deep analytical comparison highlights placement, ranking, and hidden environment metrics.</p>
    `;

    renderMessage(tableHTML);
    renderButtons([
        { text: '💸 Calculate Deep ROI', action: () => calculateROI() },
        { text: '💵 Check Living Costs', action: () => renderCityCosts() },
        { text: 'Start Over', action: () => initRon() }
    ]);
}

async function renderCityCosts() {
    await think(600);
    // Grab the first college's region as the context
    let targetRegion = ronState.region || (ronState.filteredColleges[0] ? ronState.filteredColleges[0].region : 'North India');

    // Find cities in offline colleges that match the region
    let citiesInRegionNames = new Set();
    if (typeof offlineColleges !== 'undefined') {
        offlineColleges.filter(c => c.region === targetRegion).forEach(c => citiesInRegionNames.add(c.city));
    }

    let citiesInRegion = [];
    if (typeof cityLivingCost !== 'undefined') {
        Object.keys(cityLivingCost).forEach(cityName => {
            if (citiesInRegionNames.has(cityName) || targetRegion === 'All India') {
                citiesInRegion.push({ city: cityName, ...cityLivingCost[cityName] });
            }
        });

        // Fallback
        if (citiesInRegion.length === 0) {
            Object.keys(cityLivingCost).forEach(cityName => {
                citiesInRegion.push({ city: cityName, ...cityLivingCost[cityName] });
            });
        }
    }

    if (citiesInRegion.length === 0) {
        renderMessage("I don't have cost data for that specific region right now.");
        renderButtons([{ text: 'Start Over', type: 'primary', action: () => initRon() }]);
        return;
    }

    let html = `<h4>Cost of Living in targeted cities</h4>`;
    citiesInRegion.forEach(city => {
        html += `
            <div class="feature-card">
                <div class="feature-card-header">
                    <h4>${city.city}</h4>
                    <span class="feature-badge">${city.rating}</span>
                </div>
                <p>Monthly Expenses: <strong>${city.total}</strong></p>
                <p style="font-size:0.75rem; color:#64748b;">Rent: ${city.rent} | Food: ${city.food}</p>
            </div>
        `;
    });

    renderMessage(html);
    renderButtons([
        { text: 'Start Over', type: 'primary', action: () => initRon() }
    ]);
}

// ==========================================
// ONLINE UNIVERSITY FLOW
// ==========================================

async function askOnlineStream() {
    await think(500);
    renderMessage("Online Degrees offer great flexibility. What do you want to study online?");

    let allStreams = new Set();
    if (typeof onlineUniversities !== 'undefined') {
        onlineUniversities.forEach(u => {
            if (u.streams) u.streams.forEach(s => allStreams.add(s.trim()));
        });
    }
    const streams = [...allStreams];

    const btns = streams.map(s => ({
        text: s, action: () => { ronState.stream = s; computeOnlineResults(); }
    }));
    btns.push({ text: 'Back', action: () => handleCollegeSearch() });

    renderButtons(btns);
}

async function computeOnlineResults() {
    await think(800);
    let results = [];
    if (typeof onlineUniversities !== 'undefined') {
        results = onlineUniversities.filter(col => col.streams && col.streams.includes(ronState.stream));
        if (results.length === 0) results = onlineUniversities; // Fallback Show All
    }

    renderSectionLabel('Top Online Universities');

    let html = ``;
    results.forEach(u => {
        html += `
            <div class="result-card">
                <h3>${u.name}</h3>
                <p>UGC Entitled | ${u.type}</p>
                <div class="result-details">
                    <span>✅ Valid Globally</span>
                    <span>⭐ EMI Available</span>
                </div>
            </div>
        `;
    });

    if (results.length === 0) {
        html += `<p>No data available currently.</p>`;
    }

    renderMessage(html);

    renderButtons([
        { text: '📜 View Certifications for ' + ronState.stream, type: 'primary', action: () => showCertReco(ronState.stream) },
        { text: 'Start Over', action: () => initRon() }
    ]);
}

// ==========================================
// CERTIFICATION INTELLIGENCE
// ==========================================

// Maps Streams to relevant specific Certifications
const certIntel = {
    'Engineering': [
        { name: "Full Stack Developer", by: "EduAsk", icon: "💻" },
        { name: "AWS Solutions Architect", by: "Amazon", icon: "☁️" }
    ],
    'Computer Science': [
        { name: "Full Stack Developer", by: "EduAsk", icon: "💻" },
        { name: "AWS Solutions Architect", by: "Amazon", icon: "☁️" }
    ],
    'Management': [
        { name: "Digital Marketing Pro", by: "EduAsk", icon: "📈" },
        { name: "Google Data Analytics", by: "Google", icon: "📊" }
    ],
    'Medical': [
        { name: "Medical Coding Specialization", by: "EduAsk", icon: "⚕️" }
    ],
    'IT': [
        { name: "AI & Machine Learning", by: "EduAsk", icon: "🤖" },
        { name: "Microsoft Azure Fundamentals", by: "Microsoft", icon: "🌐" }
    ]
};

async function showCertReco(stream) {
    await think(800);
    let html = `Based on your interest in **${stream}**, I highly recommend boosting your profile with these certifications passing our ROI analyzer:`;

    // Find closest match or fallback
    let matchKey = Object.keys(certIntel).find(k => stream.includes(k));
    let recos = matchKey ? certIntel[matchKey] : certIntel['IT']; // Fallback to IT

    recos.forEach(c => {
        html += `
            <div class="cert-recommend-card">
                <h4>${c.icon} ${c.name}</h4>
                <p style="font-size:0.8rem; margin:5px 0;">Offered by ${c.by}</p>
                <a href="certifications.html" class="btn btn-outline" style="font-size:0.75rem; padding:4px 8px; margin-top:5px; text-decoration:none;">View Details</a>
            </div>
        `;
    });

    renderMessage(html);
    renderButtons([
        { text: 'Start Over', action: () => initRon() }
    ]);
}

// ==========================================
// ANALYTICAL FEATURES (Mega Upgrade)
// ==========================================

// Career Explorer
async function renderCareerExplorer() {
    await think(600);
    renderMessage("Let's look at future projections. Which stream's career paths do you want to explore?");

    let cs = [];
    if (typeof careerPaths !== 'undefined') {
        cs = Object.keys(careerPaths);
    }

    const btns = cs.map(c => ({
        text: c, action: () => showCareers(c)
    }));
    btns.push({ text: 'Back', action: () => initRon() });

    renderButtons(btns);
}

async function showCareers(stream) {
    await think(800);
    const matches = (typeof careerPaths !== 'undefined' && careerPaths[stream]) ? careerPaths[stream] : [];

    let html = `<h3>High-Demand Roles in ${stream}</h3><div style="margin-top:10px;">`;
    matches.forEach(c => {
        html += `
            <div class="feature-card">
                <div class="feature-card-header">
                    <h4>${c.title}</h4>
                    <span class="feature-badge">Growth: ${c.growth}</span>
                </div>
                <p>Entry Salary: <span class="feature-highlight">${c.salary}</span></p>
                <p>Skills: ${c.skills}</p>
            </div>
        `;
    });
    html += `</div>`;

    if (matches.length === 0) {
        html += `<p>Data coming soon.</p>`;
    }

    renderMessage(html);
    renderButtons([
        { text: '🔍 Analyze Skill Gap', type: 'primary', action: () => analyzeSkillGap(stream) },
        { text: '🎓 Find College for this', action: () => { ronState.stream = stream; askOfflineRegion(); } },
        { text: 'Start Over', action: () => initRon() }
    ]);
}

async function analyzeSkillGap(stream) {
    await think(800);

    // Simple logic: grab the top skills for the stream and contrast with common beginner skills
    const matches = (typeof careerPaths !== 'undefined' && careerPaths[stream]) ? careerPaths[stream] : [];
    let requiredSkills = new Set();
    matches.forEach(m => {
        m.skills.split(',').forEach(s => requiredSkills.add(s.trim()));
    });

    let allSkillsStr = Array.from(requiredSkills).slice(0, 5).join(", ");

    // Find closest cert matches
    let matchKey = Object.keys(certIntel).find(k => stream.includes(k));
    let recos = matchKey ? certIntel[matchKey] : certIntel['IT']; // Fallback

    let certsHtml = recos.map(c => `<div style="background:#fff; border:1px solid #e2e8f0; padding:10px; margin-top:5px; border-radius:5px; color:#333;"><strong>${c.icon} ${c.name}</strong> <em>by ${c.by}</em></div>`).join("");

    let html = `
        <div class="profile-card" style="text-align:left;">
            <h3 style="text-align:center;">Skill Gap Analyzer</h3>
            <p style="text-align:center;">Target Stream: <strong>${stream}</strong></p>
            
            <div style="margin-top:10px; background:#fefce8; padding:12px; border-radius:8px; border:1px solid #fef08a;">
                <h4 style="color:#ca8a04; margin-bottom:5px;">⚠️ Identified Gap</h4>
                <p style="font-size:0.9rem; color:#854d0e;">Most students enter ${stream} with basic theoretical knowledge, but employers seek practical proficiency in: <br><strong>${allSkillsStr}</strong>.</p>
            </div>
            
            <div style="margin-top:15px;">
                <h4 style="color:var(--primary-blue);">Recommended EduAsk Certifications to Bridge the Gap:</h4>
                ${certsHtml}
            </div>
        </div>
    `;

    renderMessage(html);
    renderButtons([
        { text: '🎓 Proceed to College Search', type: 'primary', action: () => { ronState.stream = stream; askOfflineRegion(); } },
        { text: 'Start Over', action: () => initRon() }
    ]);
}

// Scholarship Finder
async function renderScholarshipFinder() {
    await think(600);
    renderMessage("Awesome! Which type of scholarship do you want to explore?");

    renderButtons([
        { text: 'Merit Based (Top Ranks)', action: () => showScholarships('merit') },
        { text: 'Need Based / Gov', action: () => showScholarships('need') },
        { text: 'View All', action: () => showScholarships('all') },
        { text: 'Back', action: () => initRon() }
    ]);
}

async function showScholarships(type) {
    await think(800);
    let html = `<h4>Top Scholarship Opportunities</h4>`;

    let results = [];
    if (typeof scholarshipDatabase !== 'undefined') {
        if (type === 'merit') {
            results = scholarshipDatabase.filter(s => s.criteria.toLowerCase().includes('merit') || s.criteria.includes('Top') || s.criteria.includes('rank'));
        } else if (type === 'need') {
            results = scholarshipDatabase.filter(s => s.criteria.toLowerCase().includes('need') || s.criteria.toLowerCase().includes('sc/st') || s.criteria.toLowerCase().includes('constrained'));
        } else {
            results = scholarshipDatabase;
        }
    }

    results.forEach(s => {
        html += `
            <div class="feature-card">
                <h4>${s.title}</h4>
                <p><strong>Amount:</strong> <span class="feature-highlight">${s.amount}</span></p>
                <p style="font-size:0.8rem; margin-top:5px;"><strong>Eligibility:</strong> ${s.criteria}</p>
                <p style="font-size:0.75rem; margin-top:3px; color:#64748b;">Categories: ${s.categories.join(', ')}</p>
            </div>
        `;
    });
    html += `<p style="font-size:0.8rem; opacity:0.8; margin-top: 10px;">(Note: Displaying featured list. Visit specific university sites to apply.)</p>`;

    renderMessage(html);
    renderButtons([
        { text: 'Start Over', type: 'primary', action: () => initRon() }
    ]);
}

// Profile Evaluator (Mini Game/Tool)
async function startProfileEvaluator() {
    ronState.profileScore = 0;
    await think(500);
    renderMessage("Let's analyze your academic profile! The higher your score, the better your chances at Tier 1 colleges.<br><br>First: <strong>What is your higher secondary (12th) percentage tier?</strong>");

    renderButtons([
        { text: '90%+', action: () => { ronState.profileScore += 40; evalStep2(); } },
        { text: '80% - 90%', action: () => { ronState.profileScore += 30; evalStep2(); } },
        { text: '70% - 80%', action: () => { ronState.profileScore += 20; evalStep2(); } },
        { text: 'Below 70%', action: () => { ronState.profileScore += 10; evalStep2(); } }
    ]);
}

async function evalStep2() {
    await think(500);
    renderMessage("Next: <strong>Do you have any competitive extra-curriculars? (National level sports, Olympiads, Hackathons)</strong>");

    renderButtons([
        { text: 'Yes, Multiple / Major', action: () => { ronState.profileScore += 20; evalStep3(); } },
        { text: 'Yes, Minor participation', action: () => { ronState.profileScore += 10; evalStep3(); } },
        { text: 'None', action: () => { ronState.profileScore += 0; evalStep3(); } }
    ]);
}

async function evalStep3() {
    await think(500);
    renderMessage("Final question: <strong>Are you currently preparing seriously for a major entrance exam (JEE/NEET/CLAT/CAT)?</strong>");

    renderButtons([
        { text: 'Yes, enrolled in coaching', action: () => { ronState.profileScore += 40; showProfileResult(); } },
        { text: 'Self-studying', action: () => { ronState.profileScore += 30; showProfileResult(); } },
        { text: 'Not giving any exam', action: () => { ronState.profileScore += 10; showProfileResult(); } }
    ]);
}

async function showProfileResult() {
    await think(1000);

    let tier = '';
    let advice = '';

    if (ronState.profileScore >= 80) {
        tier = 'Elite (Tier 1 Target)';
        advice = 'Excellent! You should aim for top IITs, NITs, IIMs, AIIMS, or NLUs. Focus heavily on advanced mocks.';
    } else if (ronState.profileScore >= 60) {
        tier = 'Strong (Tier 2 Target)';
        advice = 'Great profile! You have a solid shot at premium Private Universities and good state government colleges. Work on your weaknesses to push higher.';
    } else {
        tier = 'Developing (Tier 3/Private Target)';
        advice = 'Keep working! You have good options in standard private universities and direct admission modes. Consider boosting your profile with Certifications.';
    }

    // Admit Probability Engine
    let safeTier, targetTier, reachTier;
    if (ronState.profileScore >= 80) {
        safeTier = "Top State Govt / Tier 2 NITs";
        targetTier = "Lower IITs / Top NITs / Premium Private";
        reachTier = "Top 5 IITs / IIM A,B,C / AIIMS Delhi";
    } else if (ronState.profileScore >= 50) {
        safeTier = "Standard Private Universities";
        targetTier = "Top State Govt / Tier 2 Private";
        reachTier = "NITs / Top 20 Private (BITS/VIT)";
    } else {
        safeTier = "Direct Admission Private Colleges";
        targetTier = "Standard Private Universities";
        reachTier = "Top State Govt / Premium Private";
    }

    const html = `
        <div class="profile-card">
            <h3>Profile Analysis</h3>
            <p>Your EduAsk Readiness Index</p>
            <div class="score-circle">${ronState.profileScore}</div>
            <h4 style="margin-bottom:8px;">${tier}</h4>
        </div>
        
        <div class="analytics-grid">
            <div class="analytics-pill"><span>Academics</span><strong>Solid</strong></div>
            <div class="analytics-pill"><span>Admissions</span><strong>${ronState.profileScore >= 60 ? 'Competitive' : 'Moderate'}</strong></div>
        </div>
        
        <div style="background:#f8fafc; padding:15px; border-radius:10px; margin-top:15px; border:1px solid #e2e8f0;">
            <h4 style="color:var(--primary-blue); margin-bottom:10px; text-align:center;">Admit Probability Engine 🎯</h4>
            <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.9rem;">
                <span style="color:#10b981; font-weight:bold;">Safe:</span>
                <span style="text-align:right;">${safeTier}</span>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.9rem;">
                <span style="color:#f59e0b; font-weight:bold;">Target:</span>
                <span style="text-align:right;">${targetTier}</span>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:0.9rem;">
                <span style="color:#ef4444; font-weight:bold;">Reach:</span>
                <span style="text-align:right;">${reachTier}</span>
            </div>
        </div>
        
        <p style="margin-top:15px; font-size:0.9rem;"><strong>Ron's Advice:</strong> ${advice}</p>
    `;

    renderMessage(html);

    renderButtons([
        { text: '🎓 Find a College', type: 'primary', action: () => handleCollegeSearch() },
        { text: '📜 Boost with Certifications', action: () => redirectToCertifications() },
        { text: 'Start Over', action: () => initRon() }
    ]);
}

function redirectToCertifications() {
    window.location.href = 'certifications.html';
}
