document.addEventListener("DOMContentLoaded", function () {

    const protectedPages = [

        "index.html",
        "doctors.html",
        "appointment.html",
        "services.html"

    ];

    const currentPage =
        window.location.pathname.split("/").pop();

    if (protectedPages.includes(currentPage)) {

        const loggedIn =
            localStorage.getItem("medicalUserLoggedIn");

        if (!loggedIn) {

            window.location.href = "auth.html";

        }

    }

});