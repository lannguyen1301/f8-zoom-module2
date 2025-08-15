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
    const authButtons = document.querySelector(".auth-buttons");

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

    // form signup
    signupForm
        .querySelector(".auth-form-content")
        .addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.querySelector("#signupEmail").value;
            const password = document.querySelector("#signupPassword").value;
            // console.log(email, password); // debug
            const credentials = {
                email,
                password,
            };

            try {
                const { user, access_token } = await httpRequest.post(
                    "auth/register",
                    credentials
                );
                // console.log(user, access_token); // debug
                localStorage.setItem("accessToken", access_token);
                localStorage.setItem("currentUser", user);
                updateCurrentUser(user);
            } catch (error) {
                // console.log(error); // debug
                // console.dir(error); // debug

                if (error?.response?.error?.code === "EMAIL_EXISTS") {
                    //
                    console.log(error.response.error.message);
                }
            }
        });

    // Form Login
    loginForm
        .querySelector(".auth-form-content")
        .addEventListener("submit", async (e) => {
            e.preventDefault();
            const userMenu = document.querySelector(".user-menu");
            const authButtons = document.querySelector(".auth-buttons");
            const userAvatarImg = document.querySelector("#user-avatar-img");
            const email = document.querySelector("#loginEmail").value;
            const password = document.querySelector("#loginPassword").value;

            const credentials = {
                email,
                password,
            };

            try {
                //
                const { user, message, access_token } = await httpRequest.post(
                    "auth/login",
                    credentials
                );

                // login thành công: lưu user vào access_token vào localStorage
                localStorage.setItem("user", JSON.stringify(user)); // JSON.stringify(user): chuyển sang kiểu dữ liệu text
                localStorage.setItem("accessToken", access_token);

                // đóng form login
                closeModal();

                // hiển thị avatar, đóng form sign up, sign in
                userMenu.classList.add("show");
                authButtons.classList.remove("show");
                userAvatarImg.src = user?.avatar_url
                    ? user?.avatar_url
                    : "./default-avatar.jpg";

                // hiển thị toast message " đăng nhập thành công"
            } catch (error) {}
        });
});

// User Menu Dropdown Functionality - logout
document.addEventListener("DOMContentLoaded", function () {
    const userAvatar = document.getElementById("userAvatar");
    const userDropdown = document.getElementById("userDropdown");
    const logoutBtn = document.getElementById("logoutBtn");
    const createBtn = document.querySelector(".create-btn");

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
    logoutBtn.addEventListener("click", async function () {
        try {
            // Close dropdown first
            const { message } = await httpRequest.post("auth/logout"); // xoá user đăng nhập trên DB
            if (message) {
                userDropdown.classList.remove("show"); // ẩn btn log out
                localStorage.clear();
                window.location.href = "/";
            }

            // TODO: Students will implement logout logic here
        } catch (error) {
            console.log(error);
        }
    });

    // form Create
    createBtn.addEventListener("click", function (e) => {
        //
    });
});

// xử lý phím f5 khi hiển thị avatar, thì sẽ check avatar trên header ntn?
document.addEventListener("DOMContentLoaded", function () {
    const userMenu = document.querySelector(".user-menu");
    const authButtons = document.querySelector(".auth-buttons");
    const userAvatarImg = document.querySelector("#user-avatar-img");
    const accessToken = localStorage.getItem("accessToken");
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);

    if (accessToken) {
        userMenu.classList.add("show");
        userAvatarImg.src = user?.avatar_url
            ? user?.avatar_url
            : "./default-avatar.jpg";
    } else {
        authButtons.classList.add("show");
    }
});
