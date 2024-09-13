document.addEventListener('DOMContentLoaded', () => {
    // Handle Login Popup
    const loginPopup = document.querySelector('.btnLogin-popup');
    const formPopup = document.querySelector('.form-popup');
    const formClose = document.querySelector('.icon-close');
    const loginForm = document.getElementById('loginForm');
  
    // Toggle login form visibility
    loginPopup.addEventListener('click', () => {
        formPopup.classList.remove('hidden');
    });
  
    formClose.addEventListener('click', () => {
        formPopup.classList.add('hidden');
    });
  
    // Handle login form submission
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
  
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
  
            const data = await response.json();
  
            if (response.status === 200) {
                alert(data.message);
                // Redirect to home.html upon successful login
                window.location.href = 'home.html';
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });
  
    // Hamburger Menu Functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('.navigation');
  
    menuToggle.addEventListener('click', () => {
        navigation.classList.toggle('active');
    });
  
    // Close the navigation menu when a link is clicked (for single-page behavior)
    const navLinks = document.querySelectorAll('.navigation a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navigation.classList.remove('active');
        });
    });
  
    // Show login popup when clicking on any navigation link if not logged in
    let isLoggedIn = false; // This should be updated to true after successful login
  
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            if (!isLoggedIn) {
                event.preventDefault();
                formPopup.classList.remove('hidden'); // Show the login popup
            }
        });
    });
  
    // Profile Dropdown
    let profileDropdownList = document.querySelector('.profile-dropdown-list');
    let btn = document.querySelector('.profile-dropdown-btn');
    let classList = profileDropdownList.classList;
  
    const toggle = () => classList.toggle('active');
  
    window.addEventListener('click', (e) => {
        if (!btn.contains(e.target)) classList.remove('active');
    });
  
    // Notes Form Action
    const form = document.querySelector('form');
    if (form) {
        form.setAttribute('action', 'upload_notes.php');
    }
  
    // Validate File Upload
    function validateForm() {
        const fileInput = document.getElementById('note-file');
        const filePath = fileInput.value;
        const allowedExtensions = /(\.pdf|\.doc|\.docx)$/i;
  
        if (!allowedExtensions.exec(filePath)) {
            document.getElementById('file-error').innerText = 'Invalid file type. Only PDF, DOC, and DOCX are allowed.';
            fileInput.value = '';
            return false;
        }
  
        const fileSize = fileInput.files[0].size;
        const maxSize = 5 * 1024 * 1024; // 5MB
  
        if (fileSize > maxSize) {
            document.getElementById('file-error').innerText = 'File size exceeds 5MB limit.';
            fileInput.value = '';
            return false;
        }
  
        document.getElementById('file-error').innerText = '';
        return true;
    }
  
    // Semester Subjects Toggle
    function toggleSubjects(semesterId) {
        const subjectList = document.getElementById(semesterId);
        if (subjectList.style.display === 'none' || subjectList.style.display === '') {
            subjectList.style.display = 'block';
        } else {
            subjectList.style.display = 'none';
        }
    }
  });
  