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

    // Login
    loginForm
        .querySelector(".auth-form-content")
        .addEventListener("submit", async (e) => {
            e.preventDefault();
            const userMenu = document.querySelector(".user-menu");
            const authButtons = document.querySelector(".auth-buttons");
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

                // hiển thị toast message " đăng nhập thành công"
            } catch (error) {}
        });
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
    logoutBtn.addEventListener("click", async function () {
        // // Close dropdown first
        // const res = await httpRequest.post("auth/logout");
        // console.log(res.message);
        // userDropdown.classList.remove("show");
        // localStorage.clear();
        // // ẩn username + avatar
        // const userMenu = document.querySelector(".user-menu");
        // console.log(userMenu);
        // console.log("Logout clicked"); // debug
        // TODO: Students will implement logout logic here
    });
});

// ẩn buttons login signup khi đã đăng nhập và hiện khi chưa đăng nhập
// document.addEventListener("DOMContentLoaded", async () => {
//     const authButtons = document.querySelector(".auth-buttons");
//     const userInfo = document.querySelector(".user-info");
//     console.log("F8");

//     // console.log(userName, userAvatar); // debug

//     try {
//         const { user } = await httpRequest.get("users/me");
//         // console.log(user); // debug
//         updateCurrentUser(user);
//         userInfo.classList.add("show");
//     } catch (error) {
//         authButtons.classList.add("show");
//     }
// });

// function updateCurrentUser(user) {
//     const userName = document.querySelector("#user-name");
//     const userAvatar = document.querySelector("#user-avatar");

//     if (user.avatar_url) {
//         userAvatar.src = user.avatar_url;
//     }
//     if (user.email) {
//         userName.textContent = user.email;
//     }
// }

// xử lý phím f5 khi hiển thị avatar, thì sẽ check avatar trên header ntn?
document.addEventListener("DOMContentLoaded", function () {
    const userMenu = document.querySelector(".user-menu");
    const authButtons = document.querySelector(".auth-buttons");
    const userAvatarImg = document.querySelector(".user-avatar-img");
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        userMenu.classList.add("show");
        userAvatarImg.src =
            "https://th.bing.com/th/id/R.cc4f50b55c142604b3f83dec6c362278?rik=0DI9WT7I%2bR%2bLew&riu=http%3a%2f%2fwww.showwallpaper.com%2fwallpapercenter%2fKorean_Star%2fChae_Rim%2fChae_Rim_050007.jpg&ehk=48f43jwm9XukCBbRFrCYgazaIRrTkn7hntBjodM0Wk8%3d&risl=&pid=ImgRaw&r=0";
    } else {
        authButtons.classList.add("show");
    }
});
