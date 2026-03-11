/* ============================================
   EduAsk — script.js
   Vanilla JS: Scroll animations, mobile nav,
   Ron alert, smooth scrolling
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------
       1. Scroll Fade-In Animations
       ---------------------------------------- */
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.15
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target); // animate once
            }
        });
    }, observerOptions);

    fadeElements.forEach((el) => fadeObserver.observe(el));


    /* ----------------------------------------
       2. Navbar Scroll Shadow
       ---------------------------------------- */
    const navbar = document.getElementById('navbar');

    const handleNavbarScroll = () => {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll(); // initial check


    /* ----------------------------------------
       3. Mobile Navbar Toggle
       ---------------------------------------- */
    const hamburger = document.getElementById('hamburger');
    const navbarMenu = document.getElementById('navbarMenu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navbarMenu.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    const mobileLinks = navbarMenu.querySelectorAll('.navbar-mobile-links a');
    mobileLinks.forEach((link) => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navbarMenu.classList.remove('active');
        });
    });

    // Close mobile menu on window resize above mobile breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navbarMenu.classList.remove('active');
        }
    });


    /* ----------------------------------------
       4. Smooth Scrolling for Anchor Links
       ---------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});


/* ----------------------------------------
   5. Ron AI Assistant Alert
   (Global so inline onclick works too)
   ---------------------------------------- */
function ronAlert() {
    window.location.href = 'ron.html';
}

/* ----------------------------------------
   6. Certification Exam Start Validation
   ---------------------------------------- */
function startExamValidation() {
    const studentNameInput = document.getElementById('studentName');
    if (!studentNameInput) return; // Not on the exam page

    if (studentNameInput.value.trim() === '') {
        alert('Please enter your full name exactly as it should appear on your certificate before starting the test.');
    } else {
        // Save the name for the certificate
        localStorage.setItem('eduaskName', studentNameInput.value.trim());

        // Pass the course name forward if it exists in the URL
        const params = new URLSearchParams(window.location.search);
        const course = params.get('course') || '';
        window.location.href = `exam-interface.html${course ? '?course=' + encodeURIComponent(course) : ''}`;
    }
}

/* ============================================
   Certification Examination Portal Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Only run if we are on the exam interface page
    const examContainer = document.getElementById('examContainer');
    if (!examContainer) return;

    /* ----------------------------------------
       1. Question Data
       ---------------------------------------- */
    /* ----------------------------------------
       1. Question Banks Metadata
       ---------------------------------------- */
    const questionBanks = {
        "DSA in Python": [
            // EASY QUESTIONS (1-12)
            {
                question: "What is the time complexity of accessing an element in a Python list by index?",
                options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
                correct: 2
            },
            {
                question: "Which data structure follows the LIFO principle?",
                options: ["Queue", "Stack", "Linked List", "Graph"],
                correct: 1
            },
            {
                question: "Which Python structure is most commonly used to implement a stack?",
                options: ["List", "Tuple", "Set", "Dictionary"],
                correct: 0
            },
            {
                question: "FIFO is used by which structure?",
                options: ["Stack", "Queue", "Tree", "Graph"],
                correct: 1
            },
            {
                question: "Worst case time complexity of linear search?",
                options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
                correct: 2
            },
            {
                question: "Which traversal visits root first?",
                options: ["Inorder", "Preorder", "Postorder", "Level Order"],
                correct: 1
            },
            {
                question: "Which sorting algorithm repeatedly swaps adjacent elements?",
                options: ["Merge Sort", "Bubble Sort", "Quick Sort", "Heap Sort"],
                correct: 1
            },
            {
                question: "Which data structure is used internally by recursion?",
                options: ["Queue", "Stack", "Tree", "Graph"],
                correct: 1
            },
            {
                question: "Average time complexity of binary search?",
                options: ["O(log n)", "O(n)", "O(n log n)", "O(1)"],
                correct: 0
            },
            {
                question: "Which Python structure stores key-value pairs?",
                options: ["List", "Dictionary", "Tuple", "Set"],
                correct: 1
            },
            {
                question: "Which data structure represents hierarchical data?",
                options: ["Graph", "Tree", "Stack", "Queue"],
                correct: 1
            },
            {
                question: "What defines the base case in recursion?",
                options: ["First function call", "Stopping condition", "Loop condition", "Stack frame"],
                correct: 1
            },
            // MEDIUM QUESTIONS (13-32)
            {
                question: "Insertion at beginning of singly linked list complexity?",
                options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
                correct: 0
            },
            {
                question: "Worst case complexity of quicksort?",
                options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
                correct: 2
            },
            {
                question: "Which structure is used in BFS traversal?",
                options: ["Stack", "Queue", "Heap", "Array"],
                correct: 1
            },
            {
                question: "Which traversal gives sorted output in BST?",
                options: ["Preorder", "Inorder", "Postorder", "Level Order"],
                correct: 1
            },
            {
                question: "Worst case time complexity of insertion sort?",
                options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
                correct: 2
            },
            {
                question: "Binary search requires the array to be:",
                options: ["Random", "Sorted", "Reversed", "Cyclic"],
                correct: 1
            },
            {
                question: "Which graph traversal uses recursion naturally?",
                options: ["BFS", "DFS", "Dijkstra", "Prim"],
                correct: 1
            },
            {
                question: "Time complexity of traversing a linked list?",
                options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
                correct: 2
            },
            {
                question: "Which data structure is ideal for priority scheduling?",
                options: ["Queue", "Heap", "Stack", "Linked List"],
                correct: 1
            },
            {
                question: "Space complexity of merge sort?",
                options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
                correct: 2
            },
            {
                question: "Height of balanced binary tree with n nodes?",
                options: ["O(n)", "O(log n)", "O(√n)", "O(n log n)"],
                correct: 1
            },
            {
                question: "Which structure stores graph edges efficiently?",
                options: ["Adjacency List", "Array", "Stack", "Heap"],
                correct: 0
            },
            {
                question: "Which algorithm finds shortest path in weighted graph?",
                options: ["DFS", "BFS", "Dijkstra", "Kruskal"],
                correct: 2
            },
            {
                question: "Worst case complexity of bubble sort?",
                options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
                correct: 2
            },
            {
                question: "Which structure avoids duplicate elements automatically?",
                options: ["List", "Set", "Dictionary", "Tuple"],
                correct: 1
            },
            {
                question: "Which traversal uses queue?",
                options: ["DFS", "BFS", "Postorder", "Preorder"],
                correct: 1
            },
            {
                question: "Which algorithm divides array repeatedly?",
                options: ["Merge Sort", "Heap Sort", "Bubble Sort", "Selection Sort"],
                correct: 0
            },
            {
                question: "Dynamic programming avoids repeated computation using?",
                options: ["Recursion", "Memoization", "Looping", "Sorting"],
                correct: 1
            },
            {
                question: "Time complexity of heap insertion?",
                options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
                correct: 1
            },
            {
                question: "Which graph algorithm builds minimum spanning tree?",
                options: ["Dijkstra", "Prim", "BFS", "DFS"],
                correct: 1
            },
            // VERY HARD QUESTIONS (33-40)
            {
                question: "Maximum recursion depth in DFS of skewed tree with n nodes?",
                options: ["O(log n)", "O(n)", "O(√n)", "O(n log n)"],
                correct: 1
            },
            {
                question: "Time complexity of DFS on graph with V vertices and E edges?",
                options: ["O(V)", "O(E)", "O(V + E)", "O(VE)"],
                correct: 2
            },
            {
                question: "Which sorting algorithm performs best on nearly sorted data?",
                options: ["Bubble Sort", "Insertion Sort", "Heap Sort", "Quick Sort"],
                correct: 1
            },
            {
                question: "Minimum edges in connected graph with n nodes?",
                options: ["n", "n - 1", "n + 1", "n²"],
                correct: 1
            },
            {
                question: "Worst case height of BST with n nodes?",
                options: ["log n", "n", "√n", "n log n"],
                correct: 1
            },
            {
                question: "Which algorithm detects cycle in directed graph?",
                options: ["Dijkstra", "DFS with recursion stack", "Prim", "Floyd Warshall"],
                correct: 1
            },
            {
                question: "Heap is implemented as:",
                options: ["Linked List", "Binary Tree", "Array representation of binary tree", "Graph"],
                correct: 2
            },
            {
                question: "Time complexity of building heap from array?",
                options: ["O(n)", "O(n log n)", "O(log n)", "O(n²)"],
                correct: 0
            }
        ],
        "Cloud Engineering": [
            // EASY QUESTIONS (1-12)
            {
                question: "What does cloud computing primarily provide?",
                options: ["Physical computers", "On-demand computing resources over the internet", "Offline storage", "Hardware devices"],
                correct: 1
            },
            {
                question: "Which cloud service model provides virtual machines?",
                options: ["SaaS", "PaaS", "IaaS", "FaaS"],
                correct: 2
            },
            {
                question: "Which cloud deployment model is owned by a single organization?",
                options: ["Public Cloud", "Private Cloud", "Hybrid Cloud", "Community Cloud"],
                correct: 1
            },
            {
                question: "Which company provides AWS cloud services?",
                options: ["Microsoft", "Amazon", "Google", "IBM"],
                correct: 1
            },
            {
                question: "What does SaaS stand for?",
                options: ["Software as a Service", "Storage as a Service", "System as a Service", "Security as a Service"],
                correct: 0
            },
            {
                question: "Which model allows developers to deploy applications without managing infrastructure?",
                options: ["IaaS", "SaaS", "PaaS", "DaaS"],
                correct: 2
            },
            {
                question: "What is the primary benefit of cloud computing?",
                options: ["Higher hardware cost", "On-demand scalability", "Limited access", "Offline processing"],
                correct: 1
            },
            {
                question: "Which storage type is used for files and objects in cloud?",
                options: ["Block storage", "Object storage", "CPU storage", "RAM storage"],
                correct: 1
            },
            {
                question: "Which service is used for scalable computing without servers?",
                options: ["Serverless computing", "Virtual machines", "Containers", "Bare metal"],
                correct: 0
            },
            {
                question: "What does virtualization allow?",
                options: ["Multiple virtual systems on one physical machine", "One program per computer", "No internet connectivity", "Manual scaling"],
                correct: 0
            },
            {
                question: "Which protocol is used for secure web communication?",
                options: ["HTTP", "FTP", "HTTPS", "SMTP"],
                correct: 2
            },
            {
                question: "Which cloud deployment model combines private and public cloud?",
                options: ["Hybrid Cloud", "Community Cloud", "Edge Cloud", "Local Cloud"],
                correct: 0
            },
            // MEDIUM QUESTIONS (13-32)
            {
                question: "Which AWS service provides object storage?",
                options: ["EC2", "S3", "RDS", "Lambda"],
                correct: 1
            },
            {
                question: "What does horizontal scaling mean?",
                options: ["Increasing CPU power", "Adding more servers", "Increasing RAM only", "Increasing storage"],
                correct: 1
            },
            {
                question: "Which cloud component distributes traffic across servers?",
                options: ["Firewall", "Load Balancer", "Router", "Proxy"],
                correct: 1
            },
            {
                question: "Containers are commonly managed using which platform?",
                options: ["Docker", "Excel", "Hadoop", "Oracle DB"],
                correct: 0
            },
            {
                question: "Which service provides automatic scaling based on demand?",
                options: ["Auto Scaling", "Static Hosting", "Dedicated server", "Local storage"],
                correct: 0
            },
            {
                question: "Which database type scales easily in cloud environments?",
                options: ["Relational only", "NoSQL", "Text files", "Manual DB"],
                correct: 1
            },
            {
                question: "Which service model provides ready-to-use applications?",
                options: ["SaaS", "IaaS", "PaaS", "HaaS"],
                correct: 0
            },
            {
                question: "Which cloud concept ensures system availability during failures?",
                options: ["Fault tolerance", "Redundancy", "Backup", "Encryption"],
                correct: 1
            },
            {
                question: "Which technology isolates applications inside lightweight environments?",
                options: ["Containers", "Virtual machines", "Firewalls", "Routers"],
                correct: 0
            },
            {
                question: "Which AWS service runs code without provisioning servers?",
                options: ["EC2", "Lambda", "S3", "EBS"],
                correct: 1
            },
            {
                question: "Which storage type attaches directly to a VM?",
                options: ["Object storage", "Block storage", "File storage", "Archive storage"],
                correct: 1
            },
            {
                question: "What ensures secure access to cloud resources?",
                options: ["IAM", "DNS", "CDN", "FTP"],
                correct: 0
            },
            {
                question: "What is the function of CDN?",
                options: ["Compute", "Content delivery optimization", "Database storage", "Network routing"],
                correct: 1
            },
            {
                question: "Which network component filters malicious traffic?",
                options: ["Firewall", "Router", "Switch", "Load balancer"],
                correct: 0
            },
            {
                question: "DevOps in cloud promotes:",
                options: ["Slow development", "Automation and continuous delivery", "Manual deployment", "Offline systems"],
                correct: 1
            },
            {
                question: "Which storage service is best for backups?",
                options: ["Archive storage", "Compute engine", "Virtual machine", "Load balancer"],
                correct: 0
            },
            {
                question: "Which protocol resolves domain names?",
                options: ["DNS", "HTTP", "FTP", "TCP"],
                correct: 0
            },
            {
                question: "Which service stores container images?",
                options: ["Container registry", "Load balancer", "Virtual machine", "CDN"],
                correct: 0
            },
            {
                question: "Which architecture separates services into independent components?",
                options: ["Monolithic", "Microservices", "Static architecture", "Local architecture"],
                correct: 1
            },
            {
                question: "Which concept distributes workloads geographically?",
                options: ["Multi-region deployment", "Local hosting", "Offline computing", "Standalone server"],
                correct: 0
            },
            // VERY HARD QUESTIONS (33-40)
            {
                question: "What is the main challenge addressed by eventual consistency in distributed systems?",
                options: ["Storage failure", "Network latency and replication delay", "CPU overload", "Power outage"],
                correct: 1
            },
            {
                question: "CAP theorem states a distributed system cannot guarantee which three properties simultaneously?",
                options: ["CPU, RAM, Storage", "Consistency, Availability, Partition Tolerance", "Latency, Speed, Security", "Bandwidth, Throughput, Reliability"],
                correct: 1
            },
            {
                question: "Which architecture pattern allows scaling individual application components independently?",
                options: ["Monolithic architecture", "Microservices architecture", "Standalone system", "Static deployment"],
                correct: 1
            },
            {
                question: "Which strategy reduces downtime during deployments?",
                options: ["Blue-Green Deployment", "Static hosting", "Manual deployment", "Single server deployment"],
                correct: 0
            },
            {
                question: "Which system handles orchestration of containers?",
                options: ["Kubernetes", "MySQL", "Apache", "Jenkins"],
                correct: 0
            },
            {
                question: "What does infrastructure as code allow?",
                options: ["Manual server setup", "Automated infrastructure provisioning", "Physical networking", "Hardware replacement"],
                correct: 1
            },
            {
                question: "Which algorithm is commonly used by load balancers?",
                options: ["Round Robin", "Binary Search", "Merge Sort", "Linear Scan"],
                correct: 0
            },
            {
                question: "Which storage architecture allows unlimited scalability for cloud applications?",
                options: ["Object storage", "Local disk storage", "Tape storage", "Manual storage"],
                correct: 0
            }
        ],
        "DSA in Java": [
            // EASY QUESTIONS (1-12)
            {
                question: "What is the time complexity of accessing an element in a Java array?",
                options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
                correct: 2
            },
            {
                question: "Which data structure follows LIFO principle?",
                options: ["Queue", "Stack", "Tree", "Graph"],
                correct: 1
            },
            {
                question: "Which Java class implements a dynamic array?",
                options: ["LinkedList", "ArrayList", "HashMap", "TreeSet"],
                correct: 1
            },
            {
                question: "Which data structure follows FIFO principle?",
                options: ["Stack", "Queue", "Tree", "Graph"],
                correct: 1
            },
            {
                question: "Worst case complexity of linear search?",
                options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
                correct: 2
            },
            {
                question: "Which traversal visits root first?",
                options: ["Inorder", "Preorder", "Postorder", "Level order"],
                correct: 1
            },
            {
                question: "Which sorting algorithm swaps adjacent elements repeatedly?",
                options: ["Merge Sort", "Bubble Sort", "Heap Sort", "Quick Sort"],
                correct: 1
            },
            {
                question: "Which data structure is used internally for recursion?",
                options: ["Queue", "Stack", "Tree", "Graph"],
                correct: 1
            },
            {
                question: "Average complexity of binary search?",
                options: ["O(log n)", "O(n)", "O(n log n)", "O(1)"],
                correct: 0
            },
            {
                question: "Which Java structure stores key-value pairs?",
                options: ["ArrayList", "HashMap", "Stack", "Queue"],
                correct: 1
            },
            {
                question: "Which structure represents hierarchical data?",
                options: ["Stack", "Queue", "Tree", "Array"],
                correct: 2
            },
            {
                question: "Base case in recursion represents:",
                options: ["Infinite loop", "Stopping condition", "Recursive call", "Stack overflow"],
                correct: 1
            },
            // MEDIUM QUESTIONS (13-32)
            {
                question: "Time complexity of inserting at head of linked list?",
                options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
                correct: 0
            },
            {
                question: "Worst case complexity of quicksort?",
                options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
                correct: 2
            },
            {
                question: "Which structure is used in BFS traversal?",
                options: ["Stack", "Queue", "Heap", "Array"],
                correct: 1
            },
            {
                question: "Which traversal produces sorted output in BST?",
                options: ["Preorder", "Inorder", "Postorder", "Level order"],
                correct: 1
            },
            {
                question: "Worst case complexity of insertion sort?",
                options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
                correct: 2
            },
            {
                question: "Binary search requires the array to be:",
                options: ["Sorted", "Random", "Reversed", "Circular"],
                correct: 0
            },
            {
                question: "Which graph traversal typically uses recursion?",
                options: ["BFS", "DFS", "Dijkstra", "Kruskal"],
                correct: 1
            },
            {
                question: "Traversing a linked list takes:",
                options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
                correct: 2
            },
            {
                question: "Which data structure is best for priority scheduling?",
                options: ["Queue", "Heap", "Stack", "Array"],
                correct: 1
            },
            {
                question: "Space complexity of merge sort?",
                options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
                correct: 2
            },
            {
                question: "Height of balanced binary tree?",
                options: ["O(n)", "O(log n)", "O(√n)", "O(n log n)"],
                correct: 1
            },
            {
                question: "Which structure efficiently stores graph edges?",
                options: ["Adjacency list", "Stack", "Heap", "Queue"],
                correct: 0
            },
            {
                question: "Which algorithm finds shortest path in weighted graph?",
                options: ["DFS", "BFS", "Dijkstra", "Kruskal"],
                correct: 2
            },
            {
                question: "Worst case complexity of bubble sort?",
                options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
                correct: 2
            },
            {
                question: "Which Java collection avoids duplicates?",
                options: ["List", "Set", "ArrayList", "Queue"],
                correct: 1
            },
            {
                question: "BFS traversal uses which structure?",
                options: ["Stack", "Queue", "Heap", "Array"],
                correct: 1
            },
            {
                question: "Which algorithm divides array into halves recursively?",
                options: ["Merge Sort", "Heap Sort", "Bubble Sort", "Selection Sort"],
                correct: 0
            },
            {
                question: "Dynamic programming avoids repeated computation using:",
                options: ["Iteration", "Memoization", "Sorting", "Searching"],
                correct: 1
            },
            {
                question: "Complexity of inserting into binary heap?",
                options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
                correct: 1
            },
            {
                question: "Which algorithm constructs minimum spanning tree?",
                options: ["BFS", "Prim", "DFS", "Binary Search"],
                correct: 1
            },
            // VERY HARD QUESTIONS (33-40)
            {
                question: "Maximum recursion depth for DFS in skewed tree?",
                options: ["O(log n)", "O(n)", "O(√n)", "O(n log n)"],
                correct: 1
            },
            {
                question: "Time complexity of DFS in graph with V vertices and E edges?",
                options: ["O(V)", "O(E)", "O(V + E)", "O(VE)"],
                correct: 2
            },
            {
                question: "Which sorting algorithm performs best for nearly sorted arrays?",
                options: ["Bubble Sort", "Insertion Sort", "Quick Sort", "Heap Sort"],
                correct: 1
            },
            {
                question: "Minimum edges required for connected graph with n nodes?",
                options: ["n", "n − 1", "n + 1", "n²"],
                correct: 1
            },
            {
                question: "Worst case height of binary search tree?",
                options: ["log n", "n", "√n", "n log n"],
                correct: 1
            },
            {
                question: "Which algorithm detects cycles in directed graphs?",
                options: ["Dijkstra", "DFS with recursion stack", "Prim", "Floyd Warshall"],
                correct: 1
            },
            {
                question: "Binary heap is implemented as:",
                options: ["Linked List", "Binary Tree", "Array representation of binary tree", "Graph"],
                correct: 2
            },
            {
                question: "Time complexity of building heap from array?",
                options: ["O(n)", "O(n log n)", "O(log n)", "O(n²)"],
                correct: 0
            }
        ],
        "Computer Applications": [
            // EASY QUESTIONS (1-12)
            {
                question: "What does CPU stand for?",
                options: ["Central Processing Unit", "Computer Processing Utility", "Central Program Unit", "Control Processing Unit"],
                correct: 0
            },
            {
                question: "Which device is used to input text into a computer?",
                options: ["Monitor", "Keyboard", "Printer", "Speaker"],
                correct: 1
            },
            {
                question: "Which storage device stores data permanently?",
                options: ["RAM", "Cache", "Hard Disk", "Register"],
                correct: 2
            },
            {
                question: "Which software manages hardware and software resources?",
                options: ["Application software", "Operating System", "Compiler", "Browser"],
                correct: 1
            },
            {
                question: "Which application is commonly used for creating documents?",
                options: ["Microsoft Excel", "Microsoft Word", "Microsoft PowerPoint", "Notepad"],
                correct: 1
            },
            {
                question: "Which application is mainly used for spreadsheets?",
                options: ["Word", "Excel", "PowerPoint", "Outlook"],
                correct: 1
            },
            {
                question: "What does URL stand for?",
                options: ["Universal Resource Locator", "Uniform Resource Locator", "Unique Resource Link", "Universal Reference Link"],
                correct: 1
            },
            {
                question: "Which device displays output from the computer?",
                options: ["Mouse", "Monitor", "Keyboard", "Scanner"],
                correct: 1
            },
            {
                question: "Which key combination copies selected text?",
                options: ["Ctrl + V", "Ctrl + C", "Ctrl + X", "Ctrl + Z"],
                correct: 1
            },
            {
                question: "Which file extension is used for Microsoft Word documents?",
                options: [".xls", ".ppt", ".docx", ".jpg"],
                correct: 2
            },
            {
                question: "What is the main purpose of antivirus software?",
                options: ["Speed up computer", "Protect against malware", "Increase RAM", "Format disks"],
                correct: 1
            },
            {
                question: "Which network connects computers globally?",
                options: ["LAN", "MAN", "WAN", "Internet"],
                correct: 3
            },
            // MEDIUM QUESTIONS (13-32)
            {
                question: "Which component temporarily stores data for quick access?",
                options: ["Hard Disk", "RAM", "SSD", "ROM"],
                correct: 1
            },
            {
                question: "What is the function of a web browser?",
                options: ["Edit documents", "Access websites", "Manage files", "Install software"],
                correct: 1
            },
            {
                question: "Which Microsoft Office tool is best for presentations?",
                options: ["Word", "Excel", "PowerPoint", "Outlook"],
                correct: 2
            },
            {
                question: "Which feature in Excel performs automatic calculations?",
                options: ["Pivot Table", "Formula", "Chart", "Filter"],
                correct: 1
            },
            {
                question: "Which protocol is used for sending emails?",
                options: ["HTTP", "SMTP", "FTP", "TCP"],
                correct: 1
            },
            {
                question: "What is cloud storage?",
                options: ["Storage on local hard disk", "Storage on remote internet servers", "Storage in RAM", "Storage on CPU"],
                correct: 1
            },
            {
                question: "Which symbol is used in Excel formulas?",
                options: ["#", "$", "=", "%"],
                correct: 2
            },
            {
                question: "What does LAN stand for?",
                options: ["Local Area Network", "Large Area Network", "Logical Area Network", "Linked Area Network"],
                correct: 0
            },
            {
                question: "Which device connects a computer network to the internet?",
                options: ["Router", "Scanner", "Printer", "Monitor"],
                correct: 0
            },
            {
                question: "Which type of malware locks files and demands payment?",
                options: ["Spyware", "Ransomware", "Worm", "Trojan"],
                correct: 1
            },
            {
                question: "What is a spreadsheet mainly used for?",
                options: ["Writing essays", "Data analysis and calculations", "Graphic design", "Video editing"],
                correct: 1
            },
            {
                question: "Which function in Excel calculates the average?",
                options: ["SUM()", "AVG()", "AVERAGE()", "MEAN()"],
                correct: 2
            },
            {
                question: "Which device digitizes physical documents?",
                options: ["Scanner", "Printer", "Router", "Speaker"],
                correct: 0
            },
            {
                question: "What is a firewall used for?",
                options: ["Cooling computer", "Network security", "Data storage", "File editing"],
                correct: 1
            },
            {
                question: "Which shortcut pastes copied content?",
                options: ["Ctrl + C", "Ctrl + V", "Ctrl + X", "Ctrl + A"],
                correct: 1
            },
            {
                question: "What does GUI stand for?",
                options: ["Graphical User Interface", "General User Interface", "Global Utility Interface", "Graphic Utility Input"],
                correct: 0
            },
            {
                question: "Which technology enables online document collaboration?",
                options: ["Local software", "Cloud applications", "Offline programs", "USB storage"],
                correct: 1
            },
            {
                question: "Which device controls cursor movement?",
                options: ["Keyboard", "Mouse", "Printer", "Monitor"],
                correct: 1
            },
            {
                question: "What is phishing?",
                options: ["Hardware attack", "Email scam to steal data", "System update", "Software installation"],
                correct: 1
            },
            {
                question: "Which application is used for managing emails?",
                options: ["Excel", "Outlook", "PowerPoint", "Photoshop"],
                correct: 1
            },
            // VERY HARD QUESTIONS (33-40)
            {
                question: "Which network topology connects all devices through a central hub?",
                options: ["Bus", "Star", "Ring", "Mesh"],
                correct: 1
            },
            {
                question: "What is the main advantage of SSD over HDD?",
                options: ["Lower cost", "Faster data access", "Larger size", "Slower speed"],
                correct: 1
            },
            {
                question: "Which cloud model provides applications directly to users?",
                options: ["IaaS", "SaaS", "PaaS", "DaaS"],
                correct: 1
            },
            {
                question: "What ensures data can be recovered after system failure?",
                options: ["Encryption", "Backup", "Firewall", "Compression"],
                correct: 1
            },
            {
                question: "Which concept ensures only authorized users access systems?",
                options: ["Authentication", "Backup", "Caching", "Compression"],
                correct: 0
            },
            {
                question: "Which architecture allows applications to run across multiple servers?",
                options: ["Distributed computing", "Standalone computing", "Offline computing", "Local computing"],
                correct: 0
            },
            {
                question: "Which protocol secures internet communication?",
                options: ["HTTP", "HTTPS", "FTP", "SMTP"],
                correct: 1
            },
            {
                question: "Which technology enables scalable storage and computing resources over the internet?",
                options: ["Virtual memory", "Cloud computing", "Local networking", "Disk partitioning"],
                correct: 1
            }
        ],
        "Business Analytics": [
            // EASY QUESTIONS (1-12)
            {
                question: "What is the main goal of business analytics?",
                options: ["Designing software", "Analyzing data to support decision making", "Managing hardware", "Writing code"],
                correct: 1
            },
            {
                question: "Which tool is commonly used for business data analysis?",
                options: ["Microsoft Excel", "Photoshop", "AutoCAD", "Blender"],
                correct: 0
            },
            {
                question: "What does KPI stand for?",
                options: ["Key Performance Indicator", "Knowledge Performance Index", "Key Process Information", "Knowledge Process Indicator"],
                correct: 0
            },
            {
                question: "Which type of analytics explains what happened in the past?",
                options: ["Predictive Analytics", "Prescriptive Analytics", "Descriptive Analytics", "Diagnostic Analytics"],
                correct: 2
            },
            {
                question: "Which chart is best for comparing categories?",
                options: ["Pie chart", "Bar chart", "Scatter plot", "Histogram"],
                correct: 1
            },
            {
                question: "Which function in Excel adds numbers?",
                options: ["ADD()", "SUM()", "TOTAL()", "PLUS()"],
                correct: 1
            },
            {
                question: "What is data visualization?",
                options: ["Coding software", "Presenting data graphically", "Writing algorithms", "Storing files"],
                correct: 1
            },
            {
                question: "Which analytics predicts future outcomes?",
                options: ["Descriptive analytics", "Predictive analytics", "Diagnostic analytics", "Static analytics"],
                correct: 1
            },
            {
                question: "What is a dataset?",
                options: ["Collection of structured data", "Computer hardware", "Software program", "Network device"],
                correct: 0
            },
            {
                question: "Which metric measures business performance?",
                options: ["KPI", "API", "GUI", "CPU"],
                correct: 0
            },
            {
                question: "Which type of graph shows proportion of categories?",
                options: ["Pie chart", "Line graph", "Scatter plot", "Histogram"],
                correct: 0
            },
            {
                question: "What does BI stand for?",
                options: ["Business Intelligence", "Binary Interface", "Business Integration", "Binary Information"],
                correct: 0
            },
            // MEDIUM QUESTIONS (13-32)
            {
                question: "Which analytics type explains why something happened?",
                options: ["Descriptive", "Diagnostic", "Predictive", "Prescriptive"],
                correct: 1
            },
            {
                question: "Which Excel feature summarizes large datasets?",
                options: ["Pivot Table", "Chart", "Filter", "Cell format"],
                correct: 0
            },
            {
                question: "Which chart is used to show trends over time?",
                options: ["Bar chart", "Line chart", "Pie chart", "Scatter chart"],
                correct: 1
            },
            {
                question: "Which statistical measure represents the average?",
                options: ["Mean", "Median", "Mode", "Range"],
                correct: 0
            },
            {
                question: "Which measure represents the middle value?",
                options: ["Mean", "Median", "Mode", "Variance"],
                correct: 1
            },
            {
                question: "Which term refers to cleaning and preparing data?",
                options: ["Data mining", "Data preprocessing", "Data compression", "Data encryption"],
                correct: 1
            },
            {
                question: "Which analysis identifies patterns in large datasets?",
                options: ["Data mining", "Coding", "Networking", "Encryption"],
                correct: 0
            },
            {
                question: "Which visualization compares relationship between variables?",
                options: ["Scatter plot", "Pie chart", "Bar chart", "Histogram"],
                correct: 0
            },
            {
                question: "Which type of analytics recommends actions?",
                options: ["Predictive", "Prescriptive", "Descriptive", "Static"],
                correct: 1
            },
            {
                question: "Which business metric measures profitability?",
                options: ["Revenue", "Profit margin", "Market share", "Customer satisfaction"],
                correct: 1
            },
            {
                question: "What does ROI stand for?",
                options: ["Return on Investment", "Rate of Income", "Result of Investment", "Return of Interest"],
                correct: 0
            },
            {
                question: "Which technique forecasts future sales trends?",
                options: ["Predictive modeling", "Data storage", "Encryption", "Data compression"],
                correct: 0
            },
            {
                question: "Which tool is widely used for business dashboards?",
                options: ["Power BI", "Photoshop", "Blender", "AutoCAD"],
                correct: 0
            },
            {
                question: "Which process transforms raw data into insights?",
                options: ["Data analytics", "Data storage", "Data compression", "Data deletion"],
                correct: 0
            },
            {
                question: "Which measure indicates data spread?",
                options: ["Mean", "Variance", "Median", "Mode"],
                correct: 1
            },
            {
                question: "Which technique groups similar data points?",
                options: ["Clustering", "Sorting", "Searching", "Filtering"],
                correct: 0
            },
            {
                question: "Which metric measures company growth?",
                options: ["Revenue growth", "CPU usage", "Disk space", "Network speed"],
                correct: 0
            },
            {
                question: "Which type of analytics helps forecast demand?",
                options: ["Predictive analytics", "Descriptive analytics", "Diagnostic analytics", "Static analytics"],
                correct: 0
            },
            {
                question: "Which chart shows distribution of numeric data?",
                options: ["Histogram", "Pie chart", "Line chart", "Table"],
                correct: 0
            },
            {
                question: "Which process converts data into actionable business insights?",
                options: ["Business analytics", "Networking", "Coding", "Encryption"],
                correct: 0
            },
            // VERY HARD QUESTIONS (33-40)
            {
                question: "Which statistical method estimates relationships between variables?",
                options: ["Regression analysis", "Sorting algorithm", "Data compression", "Encryption"],
                correct: 0
            },
            {
                question: "Which technique identifies groups of customers with similar behavior?",
                options: ["Clustering analysis", "Linear search", "Encryption", "Data compression"],
                correct: 0
            },
            {
                question: "Which model predicts binary outcomes such as yes/no decisions?",
                options: ["Logistic regression", "Linear regression", "Mean analysis", "Sorting model"],
                correct: 0
            },
            {
                question: "Which analytics technique analyzes large historical datasets for patterns?",
                options: ["Data mining", "Encryption", "File compression", "Hardware analysis"],
                correct: 0
            },
            {
                question: "Which concept measures correlation between two variables?",
                options: ["Correlation coefficient", "Variance", "Median", "Mode"],
                correct: 0
            },
            {
                question: "Which business metric evaluates efficiency of marketing campaigns?",
                options: ["Conversion rate", "CPU utilization", "Disk speed", "Network latency"],
                correct: 0
            },
            {
                question: "Which analytics method finds the best possible decision among alternatives?",
                options: ["Optimization modeling", "Data compression", "Sorting algorithm", "Linear search"],
                correct: 0
            },
            {
                question: "Which advanced analytics technique analyzes text data from reviews and feedback?",
                options: ["Sentiment analysis", "Data compression", "File indexing", "Sorting algorithm"],
                correct: 0
            }
        ],
        "AI & Machine Learning": [
            // EASY QUESTIONS (1-12)
            {
                question: "What does AI stand for?",
                options: ["Automated Interface", "Artificial Intelligence", "Algorithmic Information", "Advanced Internet"],
                correct: 1
            },
            {
                question: "What is machine learning?",
                options: ["Programming hardware", "Teaching machines to learn from data", "Building computer chips", "Writing operating systems"],
                correct: 1
            },
            {
                question: "Which type of learning uses labeled data?",
                options: ["Supervised learning", "Unsupervised learning", "Reinforcement learning", "Static learning"],
                correct: 0
            },
            {
                question: "Which type of learning finds patterns without labeled data?",
                options: ["Supervised learning", "Unsupervised learning", "Reinforcement learning", "Manual learning"],
                correct: 1
            },
            {
                question: "Which ML task predicts categories?",
                options: ["Classification", "Regression", "Clustering", "Sorting"],
                correct: 0
            },
            {
                question: "Which ML task predicts numeric values?",
                options: ["Classification", "Regression", "Clustering", "Detection"],
                correct: 1
            },
            {
                question: "Which algorithm is commonly used for classification?",
                options: ["Decision Tree", "Bubble Sort", "Binary Search", "Quick Sort"],
                correct: 0
            },
            {
                question: "What is a dataset?",
                options: ["Hardware device", "Collection of data used for training models", "Programming language", "Network protocol"],
                correct: 1
            },
            {
                question: "Which field enables machines to understand human language?",
                options: ["Computer vision", "Natural language processing", "Networking", "Database management"],
                correct: 1
            },
            {
                question: "Which AI field allows computers to analyze images?",
                options: ["Computer vision", "Networking", "Cloud computing", "Data storage"],
                correct: 0
            },
            {
                question: "What is training data?",
                options: ["Data used to train a machine learning model", "Data used for backup", "Data used for storage", "Data used for encryption"],
                correct: 0
            },
            {
                question: "Which concept measures model accuracy on unseen data?",
                options: ["Model evaluation", "Data compression", "Sorting algorithm", "Encryption"],
                correct: 0
            },
            // MEDIUM QUESTIONS (13-32)
            {
                question: "Which algorithm groups similar data points together?",
                options: ["Clustering", "Regression", "Classification", "Sorting"],
                correct: 0
            },
            {
                question: "Which algorithm predicts continuous values?",
                options: ["Regression", "Clustering", "Sorting", "Encryption"],
                correct: 0
            },
            {
                question: "Which concept occurs when a model learns training data too well?",
                options: ["Underfitting", "Overfitting", "Compression", "Encryption"],
                correct: 1
            },
            {
                question: "Which technique prevents overfitting?",
                options: ["Regularization", "Encryption", "Sorting", "Compression"],
                correct: 0
            },
            {
                question: "What is a neural network inspired by?",
                options: ["Human brain", "Database structure", "Network cables", "Operating systems"],
                correct: 0
            },
            {
                question: "Which learning method uses rewards and penalties?",
                options: ["Reinforcement learning", "Supervised learning", "Unsupervised learning", "Static learning"],
                correct: 0
            },
            {
                question: "Which algorithm finds linear relationships between variables?",
                options: ["Linear regression", "Clustering", "Sorting", "Encryption"],
                correct: 0
            },
            {
                question: "Which ML algorithm is based on probability theory?",
                options: ["Naive Bayes", "Merge Sort", "Bubble Sort", "Binary Search"],
                correct: 0
            },
            {
                question: "What does feature selection improve?",
                options: ["Model performance", "Hardware speed", "Network latency", "Disk storage"],
                correct: 0
            },
            {
                question: "Which metric measures classification accuracy?",
                options: ["Accuracy score", "CPU usage", "Disk speed", "Network bandwidth"],
                correct: 0
            },
            {
                question: "Which algorithm builds decision rules for classification?",
                options: ["Decision tree", "Linear search", "Bubble sort", "Encryption"],
                correct: 0
            },
            {
                question: "Which method divides dataset into training and testing sets?",
                options: ["Data splitting", "Sorting", "Encryption", "Compression"],
                correct: 0
            },
            {
                question: "Which ML technique reduces data dimensionality?",
                options: ["PCA", "Sorting", "Encryption", "Searching"],
                correct: 0
            },
            {
                question: "Which neural network type is used for image processing?",
                options: ["Convolutional Neural Network", "Linear regression", "Naive Bayes", "Decision tree"],
                correct: 0
            },
            {
                question: "Which neural network is used for sequential data?",
                options: ["Recurrent Neural Network", "Decision tree", "Random forest", "Linear regression"],
                correct: 0
            },
            {
                question: "Which process adjusts weights in neural networks?",
                options: ["Backpropagation", "Sorting", "Encryption", "Compression"],
                correct: 0
            },
            {
                question: "Which ML concept measures error of predictions?",
                options: ["Loss function", "Sorting function", "Compression function", "Encryption function"],
                correct: 0
            },
            {
                question: "Which technique combines multiple models for better accuracy?",
                options: ["Ensemble learning", "Linear search", "Encryption", "Sorting"],
                correct: 0
            },
            {
                question: "Which algorithm uses multiple decision trees?",
                options: ["Random forest", "Linear regression", "Naive Bayes", "K-means"],
                correct: 0
            },
            {
                question: "Which method measures similarity between data points?",
                options: ["Distance metrics", "Sorting metrics", "Compression metrics", "Encryption metrics"],
                correct: 0
            },
            // VERY HARD QUESTIONS (33-40)
            {
                question: "Which gradient-based algorithm optimizes neural network weights?",
                options: ["Gradient descent", "Binary search", "Bubble sort", "Linear search"],
                correct: 0
            },
            {
                question: "Which activation function is commonly used in deep learning?",
                options: ["ReLU", "Merge sort", "Binary search", "Linear search"],
                correct: 0
            },
            {
                question: "Which evaluation metric balances precision and recall?",
                options: ["F1 score", "Accuracy", "Mean", "Median"],
                correct: 0
            },
            {
                question: "Which algorithm minimizes squared error in regression models?",
                options: ["Least squares", "Binary search", "Merge sort", "Heap sort"],
                correct: 0
            },
            {
                question: "Which ML concept measures randomness in data?",
                options: ["Entropy", "Sorting", "Encryption", "Compression"],
                correct: 0
            },
            {
                question: "Which algorithm finds clusters using distance to centroids?",
                options: ["K-Means", "Linear regression", "Naive Bayes", "Decision tree"],
                correct: 0
            },
            {
                question: "Which technique reduces training error but may increase variance?",
                options: ["High model complexity", "Low model complexity", "Data compression", "Encryption"],
                correct: 0
            },
            {
                question: "Which advanced ML architecture processes language using attention mechanisms?",
                options: ["Transformer", "Decision tree", "Random forest", "Linear regression"],
                correct: 0
            }
        ]
    };

    // Get Course and Questions
    const courseParams = new URLSearchParams(window.location.search);
    const chosenCourseName = decodeURIComponent(courseParams.get('course') || 'Professional Skillset');
    const questions = questionBanks[chosenCourseName] || questionBanks["DSA in Python"]; // Fallback to DSA for now


    /* ----------------------------------------
       2. Exam State
       ---------------------------------------- */
    let currentQuestionIndex = 0;
    let userAnswers = new Array(questions.length).fill(null);
    let timeLeft = 60 * 60; // 60 minutes in seconds
    let timerInterval;

    /* ----------------------------------------
       3. DOM Elements
       ---------------------------------------- */
    const questionTitle = document.getElementById('questionTitle');
    const optionsGroup = document.getElementById('optionsGroup');
    const progressText = document.getElementById('progressText');
    const progressFill = document.getElementById('progressFill');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitExamBtn = document.getElementById('submitExamBtn');
    const examTimerDisplay = document.getElementById('examTimer');

    // Result Elements
    const resultContainer = document.getElementById('resultContainer');
    const scoreValue = document.getElementById('scoreValue');
    const scorePercentage = document.getElementById('scorePercentage');
    const resultStatus = document.getElementById('resultStatus');
    const resultMessage = document.getElementById('resultMessage');
    const certificateCTA = document.getElementById('certificateCTA');

    // Modal Elements
    const confirmModal = document.getElementById('confirmModal');
    const cancelSubmit = document.getElementById('cancelSubmit');
    const confirmSubmit = document.getElementById('confirmSubmit');

    /* ----------------------------------------
       4. Timer Logic
       ---------------------------------------- */
    function startTimer() {
        timerInterval = setInterval(() => {
            timeLeft--;

            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;

            examTimerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                autoSubmitExam();
            }
        }, 1000);
    }

    /* ----------------------------------------
       5. Render Question
       ---------------------------------------- */
    function renderQuestion() {
        const q = questions[currentQuestionIndex];
        questionTitle.textContent = q.question;

        // Update Options
        optionsGroup.innerHTML = '';
        q.options.forEach((option, index) => {
            const label = document.createElement('label');
            label.className = `option-label ${userAnswers[currentQuestionIndex] === index ? 'selected' : ''}`;

            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'examOption';
            radio.value = index;
            if (userAnswers[currentQuestionIndex] === index) radio.checked = true;

            radio.addEventListener('change', () => {
                userAnswers[currentQuestionIndex] = index;
                // Highlight selected
                document.querySelectorAll('.option-label').forEach(l => l.classList.remove('selected'));
                label.classList.add('selected');
                updateProgress();
            });

            const span = document.createElement('span');
            span.className = 'option-text';
            span.textContent = option;

            label.appendChild(radio);
            label.appendChild(span);
            optionsGroup.appendChild(label);
        });

        // Update Progress UI
        updateProgress();

        // Update Buttons
        prevBtn.disabled = currentQuestionIndex === 0;

        if (currentQuestionIndex === questions.length - 1) {
            nextBtn.style.display = 'none';
            submitExamBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            submitExamBtn.style.display = 'none';
        }
    }

    function updateProgress() {
        const count = currentQuestionIndex + 1;
        progressText.textContent = `Question ${count} of ${questions.length}`;

        // Calculate how many answered
        const answeredCount = userAnswers.filter(a => a !== null).length;
        progressFill.style.width = `${(answeredCount / questions.length) * 100}%`;
    }

    /* ----------------------------------------
       6. Navigation Logic
       ---------------------------------------- */
    nextBtn.addEventListener('click', () => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            renderQuestion();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            renderQuestion();
        }
    });

    /* ----------------------------------------
       7. Submission Logic
       ---------------------------------------- */
    if (submitExamBtn) {
        submitExamBtn.addEventListener('click', () => {
            confirmModal.style.display = 'grid';
        });
    }

    if (cancelSubmit) {
        cancelSubmit.addEventListener('click', () => {
            confirmModal.style.display = 'none';
        });
    }

    if (confirmSubmit) {
        confirmSubmit.addEventListener('click', () => {
            confirmModal.style.display = 'none';
            submitExam();
        });
    }

    function autoSubmitExam() {
        alert('Time is up! Your examination will now be submitted automatically.');
        submitExam();
    }

    function submitExam() {
        clearInterval(timerInterval);
        calculateResult();
    }

    /* ----------------------------------------
       8. Result Calculation
       ---------------------------------------- */
    function calculateResult() {
        let score = 0;
        questions.forEach((q, index) => {
            if (userAnswers[index] === q.correct) {
                score++;
            }
        });

        const percentage = (score / questions.length) * 100;
        const passed = percentage >= 85;

        // Update UI
        scoreValue.textContent = `${score} / ${questions.length}`;
        scorePercentage.textContent = `${Math.round(percentage)}%`;

        if (passed) {
            resultStatus.textContent = 'Status: PASSED';
            resultStatus.className = 'result-status status-passed';
            resultMessage.innerHTML = `<strong>Congratulations!</strong><br>You have successfully passed the EduAsk Certification Examination.`;
            certificateCTA.style.display = 'block';
        } else {
            resultStatus.textContent = 'Status: NOT PASSED';
            resultStatus.className = 'result-status status-failed';
            resultMessage.innerHTML = `<strong>Minimum passing score required is 85%.</strong><br>Keep learning and try again later to earn your certification.`;
            certificateCTA.style.display = 'none';
        }

        examContainer.style.display = 'none';
        resultContainer.style.display = 'block';

        // Force scroll to top
        window.scrollTo(0, 0);
    }

    // Initialize Exam
    const chosenCourse = chosenCourseName || 'Professional Skillset';
    const courseEl = document.getElementById('examCourseName');
    if (courseEl) courseEl.textContent = `Course: ${decodeURIComponent(chosenCourse)}`;

    startTimer();
    renderQuestion();

    // Certificate Generation System
    const generateCertBtn = document.getElementById('generateCertBtn');
    if (generateCertBtn) {
        generateCertBtn.addEventListener('click', downloadCertificate);
    }

    function downloadCertificate() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        const studentName = localStorage.getItem("eduaskName") || "Valued Student";
        const courseName = decodeURIComponent(chosenCourseName || "Professional Certification");
        const date = new Date().toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        // 1. Draw Professional Border
        // Golden Border
        doc.setDrawColor(218, 165, 32); // Goldenrod
        doc.setLineWidth(2);
        doc.rect(5, 5, 287, 200); // Outer
        doc.setLineWidth(0.5);
        doc.rect(7, 7, 283, 196); // Inner

        // Dark Blue Accent Corners
        doc.setFillColor(26, 26, 46);
        doc.rect(5, 5, 20, 20, 'F');
        doc.rect(272, 5, 20, 20, 'F');
        doc.rect(5, 185, 20, 20, 'F');
        doc.rect(272, 185, 20, 20, 'F');

        // 2. EduAsk Header
        doc.setFont("helvetica", "bold");
        doc.setFontSize(30);
        doc.setTextColor(26, 26, 46); // Dark Blue
        doc.text("EduAsk", 148.5, 35, { align: "center" });

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100, 100, 100);
        doc.text("Smarter Education Decisions", 148.5, 42, { align: "center" });

        // 3. Certificate Title
        doc.setFont("times", "bolditalic");
        doc.setFontSize(42);
        doc.setTextColor(184, 134, 11); // Dark Goldenrod
        doc.text("Professional Certification", 148.5, 70, { align: "center" });

        // 4. Main Body Text
        doc.setFont("helvetica", "normal");
        doc.setFontSize(16);
        doc.setTextColor(60, 60, 60);
        doc.text("This certificate is proudly awarded to", 148.5, 90, { align: "center" });

        // Student Name
        doc.setFont("helvetica", "bold");
        doc.setFontSize(32);
        doc.setTextColor(26, 26, 46);
        doc.text(studentName, 148.5, 110, { align: "center" });

        // Course Message
        doc.setFont("helvetica", "normal");
        doc.setFontSize(16);
        doc.setTextColor(60, 60, 60);
        doc.text("for successfully completing the certification in", 148.5, 125, { align: "center" });

        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.setTextColor(218, 165, 32);
        doc.text(courseName, 148.5, 140, { align: "center" });

        doc.setFont("helvetica", "italic");
        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100);
        const description = "and demonstrating strong knowledge and understanding in the subject through\na professional assessment conducted by EduAsk.";
        doc.text(description, 148.5, 155, { align: "center" });

        // 5. Date and Signature
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor(26, 26, 46);

        // Date side
        doc.text(`Date of Completion: ${date}`, 40, 185);
        doc.line(40, 180, 100, 180);

        // Signature side
        doc.setFont("helvetica", "bold");
        doc.text("Aditya Verma", 220, 185);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text("Founder, EduAsk", 220, 190);

        // Stylized Signature Line
        doc.setDrawColor(26, 26, 46);
        doc.setLineWidth(0.8);
        doc.line(210, 180, 260, 180);

        // Enhanced Official Seal
        const sealX = 148.5;
        const sealY = 185;

        // Multi-layered gold circles
        doc.setDrawColor(218, 165, 32);
        doc.setLineWidth(0.8);
        doc.circle(sealX, sealY, 12, 'S'); // Outer circle
        doc.setLineWidth(0.3);
        doc.circle(sealX, sealY, 10.5, 'S'); // Inner thin circle

        // Sunburst/Star pattern in background of seal
        doc.setDrawColor(255, 215, 0); // Gold
        for (let i = 0; i < 360; i += 15) {
            const angle = (i * Math.PI) / 180;
            const x1 = sealX + Math.cos(angle) * 7;
            const y1 = sealY + Math.sin(angle) * 7;
            const x2 = sealX + Math.cos(angle) * 9;
            const y2 = sealY + Math.sin(angle) * 9;
            doc.line(x1, y1, x2, y2);
        }

        doc.setFontSize(7);
        doc.setTextColor(184, 134, 11); // Dark Goldenrod
        doc.setFont("helvetica", "bold");
        doc.text("OFFICIAL", sealX, sealY - 1, { align: "center" });
        doc.text("SEAL", sealX, sealY + 2.5, { align: "center" });
        doc.setFontSize(5);
        doc.text("VERIFIED", sealX, sealY + 5, { align: "center" });

        // 6. Save PDF
        const fileName = `EduAsk_Certificate_${studentName.replace(/\s+/g, '')}_${courseName.replace(/\s+/g, '')}.pdf`;
        doc.save(fileName);
    }
});
