document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll(".counter");
    const appointmentForm = document.getElementById("appointmentForm");
    const navbar = document.querySelector(".medical-navbar");
    const themeBtn = document.getElementById("themeToggle");
    const backTop = document.getElementById("backToTop");
    const doctorSearch = document.getElementById("doctorSearch");
    const doctorCards = document.querySelectorAll(".doctor-card");

    setTimeout(() => {
        const preloader = document.getElementById("preloader");
        if (preloader) preloader.style.display = "none";
    }, 700);

    function showToast(message) {
        const toastBox = document.getElementById("toastBox");
        if (!toastBox) return;

        const toast = document.createElement("div");
        toast.className = "custom-toast";
        toast.innerText = message;
        toastBox.appendChild(toast);

        setTimeout(() => toast.remove(), 2500);
    }

    counters.forEach((counter) => {
        counter.innerText = "0";
        const target = Number(counter.getAttribute("data-target"));
        const increment = Math.ceil(target / 80);

        function updateCounter() {
            const current = Number(counter.innerText);

            if (current < target) {
                counter.innerText = current + increment;
                setTimeout(updateCounter, 25);
            } else {
                counter.innerText = target + "+";
            }
        }

        updateCounter();
    });

    if (appointmentForm) {
        appointmentForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const submitBtn = document.querySelector(".medical-submit-btn");
            submitBtn.innerHTML = "Booking...";
            submitBtn.style.opacity = "0.8";

            setTimeout(() => {
                showToast("Appointment Booked Successfully!");
                appointmentForm.reset();
                submitBtn.innerHTML = "Confirm Appointment";
                submitBtn.style.opacity = "1";
            }, 1000);
        });
    }

    if (doctorSearch) {
        doctorSearch.addEventListener("keyup", function () {
            const value = doctorSearch.value.toLowerCase();

            doctorCards.forEach((card) => {
                const text = card.innerText.toLowerCase();
                card.parentElement.style.display = text.includes(value) ? "block" : "none";
            });
        });
    }

    document.querySelectorAll(".doctor-card").forEach((card) => {
        const favBtn = document.createElement("button");
        favBtn.className = "doctor-fav-btn";
        favBtn.innerHTML = `<i class="fa-regular fa-heart"></i>`;
        card.appendChild(favBtn);

        favBtn.addEventListener("click", function () {
            favBtn.classList.toggle("active");

            if (favBtn.classList.contains("active")) {
                favBtn.innerHTML = `<i class="fa-solid fa-heart"></i>`;
                showToast("Doctor Added To Favorites");
            } else {
                favBtn.innerHTML = `<i class="fa-regular fa-heart"></i>`;
                showToast("Doctor Removed");
            }
        });
    });

    document.querySelectorAll(".faq-question").forEach((question) => {
        question.addEventListener("click", function () {
            question.parentElement.classList.toggle("active");
        });
    });

    if (themeBtn) {
        if (localStorage.getItem("medicalTheme") === "dark") {
            document.body.classList.add("dark-mode");
            themeBtn.innerHTML = `<i class="fa-solid fa-sun"></i>`;
        }

        themeBtn.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");

            if (document.body.classList.contains("dark-mode")) {
                localStorage.setItem("medicalTheme", "dark");
                themeBtn.innerHTML = `<i class="fa-solid fa-sun"></i>`;
                showToast("Dark Mode Enabled");
            } else {
                localStorage.setItem("medicalTheme", "light");
                themeBtn.innerHTML = `<i class="fa-solid fa-moon"></i>`;
                showToast("Light Mode Enabled");
            }
        });
    }

    window.addEventListener("scroll", function () {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.padding = "14px 0";
                navbar.style.background = "rgba(15,23,42,0.98)";
            } else {
                navbar.style.padding = "18px 0";
                navbar.style.background = "rgba(15,23,42,0.92)";
            }
        }

        if (backTop) {
            backTop.classList.toggle("show", window.scrollY > 300);
        }
    });

    if (backTop) {
        backTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});