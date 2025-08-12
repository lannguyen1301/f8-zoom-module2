// thêm utils httpRequest vào main.js
import httpRequest from "./utils/httpRequest.js";

// Auth Modal Functionality
document.addEventListener("DOMContentLoaded", function () {
    // Get DOM elements
    const signupBtn = document.querySelector(".signup-btn");
    const loginBtn = document.querySelector(".login-btn");
    const authModal = document.getElementById("authModal");
    const modalClose = document.getElementById("modalClose");
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");
    const showLoginBtn = document.getElementById("showLogin");
    const showSignupBtn = document.getElementById("showSignup");

    // Function to show signup form
    function showSignupForm() {
        signupForm.style.display = "block";
        loginForm.style.display = "none";
    }

    // Function to show login form
    function showLoginForm() {
        signupForm.style.display = "none";
        loginForm.style.display = "block";
    }

    // Function to open modal
    function openModal() {
        authModal.classList.add("show");
        document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    // Open modal with Sign Up form when clicking Sign Up button
    signupBtn.addEventListener("click", function () {
        showSignupForm();
        openModal();
    });

    // Open modal with Login form when clicking Login button
    loginBtn.addEventListener("click", function () {
        showLoginForm();
        openModal();
    });

    // Close modal function
    function closeModal() {
        authModal.classList.remove("show");
        document.body.style.overflow = "auto"; // Restore scrolling
    }

    // Close modal when clicking close button
    modalClose.addEventListener("click", closeModal);

    // Close modal when clicking overlay (outside modal container)
    authModal.addEventListener("click", function (e) {
        if (e.target === authModal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && authModal.classList.contains("show")) {
            closeModal();
        }
    });

    // Switch to Login form
    showLoginBtn.addEventListener("click", function () {
        showLoginForm();
    });

    // Switch to Signup form
    showSignupBtn.addEventListener("click", function () {
        showSignupForm();
    });

    //
    signupForm
        .querySelector(".auth-form-content")
        .addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.querySelector("#signupEmail").value;
            const password = document.querySelector("#signupPassword").value;
            // console.log(email, password); debug

            const credentials = {
                email,
                password,
            };

            cons { user, access_token } = await httpRequest.post('auth/register', credentials);
        });
    // giải thích từng dòng code:
    // signupForm: là 1 biến DOM
    // .querySelector(".auth-form-content"): tìm phần tử con bên trong signupForm có class là .auth-form-content
    // .addEventListener("submit", (e) => {// code...});
    // gắn trình lắng ghe sự kiện cho sự kiện "submit" của form
    // Khi người dùng nhấn nút "Đăng ký" haocwj "Submit", hàm callback (e) =>{//code..}sẽ được gọi.
    // e là ĐỐI TƯỢNG SỰ KIỆN chứa thông tin về hành động submit
    // e.preventDefault(); ngăn chặn hành vi mặc định
    // const email = document.querySelector("#signupEmail").value; tìm phần tử có id = signupEmail, lấy giá trị của người dùng nhập và gán vào biến email
    // const passwordl = document.querySelector("#signupPassword"").value; tìm phần tử có id = signupPassword, lấy giá trị của người dùng nhập và gán vào biến email
    // console.log(email, password); in ra thông số nội sung của email
});

// User Menu Dropdown Functionality
document.addEventListener("DOMContentLoaded", function () {
    const userAvatar = document.getElementById("userAvatar");
    const userDropdown = document.getElementById("userDropdown");
    const logoutBtn = document.getElementById("logoutBtn");

    // Toggle dropdown when clicking avatar
    userAvatar.addEventListener("click", function (e) {
        e.stopPropagation();
        userDropdown.classList.toggle("show");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (e) {
        if (
            !userAvatar.contains(e.target) &&
            !userDropdown.contains(e.target)
        ) {
            userDropdown.classList.remove("show");
        }
    });

    // Close dropdown when pressing Escape
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && userDropdown.classList.contains("show")) {
            userDropdown.classList.remove("show");
        }
    });

    // Handle logout button click
    logoutBtn.addEventListener("click", function () {
        // Close dropdown first
        userDropdown.classList.remove("show");

        console.log("Logout clicked");
        // TODO: Students will implement logout logic here
    });
});

// Other functionality
document.addEventListener("DOMContentLoaded", async () => {
    // const artists = await httpRequest.get("artists");
    const { artists } = await httpRequest.get("artists");
    console.log(artists);
});

// // Other functionality
// document.addEventListener("DOMContentLoaded", function () {
//     // TODO: Implement other functionality here
// });
