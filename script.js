
/* =========================================
   MOBILE MENU
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.querySelector(".nav-menu");

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("show");

});


/* =========================================
   HERO SLIDER
========================================= */

const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".dot");

const nextButton = document.getElementById("nextSlide");
const prevButton = document.getElementById("prevSlide");

let currentSlide = 0;


function showSlide(index) {

    slides.forEach((slide) => {
        slide.classList.remove("active");
    });

    dots.forEach((dot) => {
        dot.classList.remove("active");
    });


    slides[index].classList.add("active");

    dots[index].classList.add("active");

    currentSlide = index;

}


function nextSlide() {

    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    showSlide(currentSlide);

}


function previousSlide() {

    currentSlide--;

    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);

}


nextButton.addEventListener("click", nextSlide);

prevButton.addEventListener("click", previousSlide);


dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        showSlide(index);

    });

});


let sliderInterval = setInterval(
    nextSlide,
    6000
);


const hero = document.querySelector(".hero");

hero.addEventListener("mouseenter", () => {

    clearInterval(sliderInterval);

});


hero.addEventListener("mouseleave", () => {

    sliderInterval = setInterval(
        nextSlide,
        6000
    );

});


/* =========================================
   PRODUCT MODAL
========================================= */

const productModal =
    document.getElementById("productModal");

const modalOverlay =
    document.getElementById("modalOverlay");

const modalClose =
    document.getElementById("modalClose");


const modalProductImage =
    document.getElementById("modalProductImage");

const modalProductName =
    document.getElementById("modalProductName");

const modalProductPrice =
    document.getElementById("modalProductPrice");

const modalCategory =
    document.getElementById("modalCategory");


const productCards =
    document.querySelectorAll(".product-card");


/* =========================================
   PRODUCT INFORMATION
========================================= */

let selectedProduct = {};

let selectedSize = "";

let selectedColor = "";

let quantity = 1;


/* =========================================
   OPEN PRODUCT
========================================= */

productCards.forEach((card) => {

    const quickView =
        card.querySelector(".quick-view");


    quickView.addEventListener("click", (event) => {

        event.preventDefault();

        selectedProduct = {

            name: card.dataset.name,

            price: Number(card.dataset.price),

            category: card.dataset.category,

            image: card.dataset.image

        };


        openProductModal();

    });

});


/* =========================================
   OPEN MODAL
========================================= */

function openProductModal() {

    modalProductImage.src =
        selectedProduct.image;


    modalProductImage.alt =
        selectedProduct.name;


    modalProductName.textContent =
        selectedProduct.name;


    modalProductPrice.textContent =
        formatCurrency(selectedProduct.price);


    modalCategory.textContent =
        selectedProduct.category.toUpperCase();


    /* Reset selections */

    selectedSize = "";

    selectedColor = "";

    quantity = 1;


    document.getElementById(
        "quantity"
    ).textContent = quantity;


    document.getElementById(
        "selectedSize"
    ).textContent = "Select a size";


    document.getElementById(
        "selectedColor"
    ).textContent = "Select a color";


    document
        .querySelectorAll(".size-btn")
        .forEach((button) => {

            button.classList.remove("selected");

        });


    document
        .querySelectorAll(".color-btn")
        .forEach((button) => {

            button.classList.remove("selected");

        });


    updateOrderLinks();


    productModal.classList.add("show");


    document.body.style.overflow = "hidden";

}


/* =========================================
   CLOSE MODAL
========================================= */

function closeProductModal() {

    productModal.classList.remove("show");

    document.body.style.overflow = "";

}


modalClose.addEventListener(
    "click",
    closeProductModal
);


modalOverlay.addEventListener(
    "click",
    closeProductModal
);


/* =========================================
   ESC KEY
========================================= */

document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        productModal.classList.contains("show")
    ) {

        closeProductModal();

    }

});


/* =========================================
   SIZE SELECTION
========================================= */

const sizeButtons =
    document.querySelectorAll(".size-btn");


sizeButtons.forEach((button) => {

    button.addEventListener("click", () => {

        sizeButtons.forEach((btn) => {

            btn.classList.remove("selected");

        });


        button.classList.add("selected");


        selectedSize =
            button.textContent.trim();


        document.getElementById(
            "selectedSize"
        ).textContent = selectedSize;


        updateOrderLinks();

    });

});


/* =========================================
   COLOR SELECTION
========================================= */

const colorButtons =
    document.querySelectorAll(".color-btn");


colorButtons.forEach((button) => {

    button.addEventListener("click", () => {

        colorButtons.forEach((btn) => {

            btn.classList.remove("selected");

        });


        button.classList.add("selected");


        selectedColor =
            button.dataset.color;


        document.getElementById(
            "selectedColor"
        ).textContent = selectedColor;


        updateOrderLinks();

    });

});


/* =========================================
   QUANTITY
========================================= */

const minusButton =
    document.getElementById("minusBtn");

const plusButton =
    document.getElementById("plusBtn");

const quantityDisplay =
    document.getElementById("quantity");


minusButton.addEventListener("click", () => {

    if (quantity > 1) {

        quantity--;

        quantityDisplay.textContent =
            quantity;

        updateOrderLinks();

    }

});


plusButton.addEventListener("click", () => {

    quantity++;

    quantityDisplay.textContent =
        quantity;

    updateOrderLinks();

});


/* =========================================
   CURRENCY FORMAT
========================================= */

function formatCurrency(amount) {

    return new Intl.NumberFormat(
        "en-NG",
        {
            style: "currency",
            currency: "NGN",
            maximumFractionDigits: 0
        }
    ).format(amount);

}


/* =========================================
   WHATSAPP + EMAIL
========================================= */

function updateOrderLinks() {

    if (!selectedProduct.name) {
        return;
    }


    const whatsappNumber =
        "2348000000000";


    const sizeText =
        selectedSize || "Not selected";


    const colorText =
        selectedColor || "Not selected";


    const totalPrice =
        selectedProduct.price * quantity;


    const message =

        `Hello Velora! 👋

I would like to order:

Product: ${selectedProduct.name}
Category: ${selectedProduct.category}
Size: ${sizeText}
Color: ${colorText}
Quantity: ${quantity}
Price: ${formatCurrency(totalPrice)}

Please let me know if this item is available.`;


    const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


    document.getElementById(
        "whatsappOrder"
    ).href = whatsappURL;


    const emailSubject =
        `Order Request - ${selectedProduct.name}`;


    const emailBody =

        `Hello Velora,

I would like to order:

Product: ${selectedProduct.name}
Category: ${selectedProduct.category}
Size: ${sizeText}
Color: ${colorText}
Quantity: ${quantity}
Price: ${formatCurrency(totalPrice)}

Please let me know if this item is available.`;


    document.getElementById(
        "emailOrder"
    ).href =

        `mailto:hello@velora.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

}


/* =========================================
   MOBILE NAV LINKS
========================================= */

const navLinks =
    document.querySelectorAll(".nav-menu a");


navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("show");

    });

});

/* ==========================================
   VELORA INTRO SCREEN
========================================== */

const veloraIntro = document.getElementById("veloraIntro");
const introCounter = document.getElementById("introCounter");

let introNumber = 0;

const introTimer = setInterval(() => {

    introNumber += 2;

    if (introNumber >= 100) {
        introNumber = 100;
        clearInterval(introTimer);
    }

    introCounter.textContent =
        String(introNumber).padStart(2, "0");

}, 25);


/* Remove intro screen */

setTimeout(() => {

    veloraIntro.classList.add("hide");

}, 2800);


/* Completely remove it from the page */

setTimeout(() => {

    veloraIntro.remove();

}, 5000);

