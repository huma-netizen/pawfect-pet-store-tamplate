/* =========================================================
   PAWFECT — JAVASCRIPT
========================================================= */


/* =========================================================
   INITIALIZE LUCIDE ICONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    lucide.createIcons();

});



/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");


if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {

        mobileMenu.classList.toggle("active");


        if (mobileMenu.classList.contains("active")) {

            menuButton.innerHTML =
                '<i data-lucide="x"></i>';

            menuButton.setAttribute(
                "aria-label",
                "Close menu"
            );

        } else {

            menuButton.innerHTML =
                '<i data-lucide="menu"></i>';

            menuButton.setAttribute(
                "aria-label",
                "Open menu"
            );

        }


        lucide.createIcons();

    });

}



/* =========================================================
   CLOSE MOBILE MENU AFTER CLICKING LINK
========================================================= */

document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");


            menuButton.innerHTML =
                '<i data-lucide="menu"></i>';


            menuButton.setAttribute(
                "aria-label",
                "Open menu"
            );


            lucide.createIcons();

        });

    });



/* =========================================================
   SEARCH OVERLAY
========================================================= */

const searchPanel =
    document.getElementById("searchPanel");

const openSearch =
    document.getElementById("openSearch");

const closeSearch =
    document.getElementById("closeSearch");

const globalSearch =
    document.getElementById("globalSearch");


if (openSearch) {

    openSearch.addEventListener("click", () => {

        searchPanel.classList.add("active");


        setTimeout(() => {

            globalSearch.focus();

        }, 100);

    });

}


if (closeSearch) {

    closeSearch.addEventListener("click", () => {

        searchPanel.classList.remove("active");

    });

}


if (searchPanel) {

    searchPanel.addEventListener(
        "click",
        event => {

            if (
                event.target === searchPanel
            ) {

                searchPanel.classList.remove(
                    "active"
                );

            }

        }
    );

}



/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            searchPanel.classList.remove(
                "active"
            );

        }

    }
);



/* =========================================================
   PRODUCT FILTERING
========================================================= */

const filterButtons =
    document.querySelectorAll(
        ".filter-btn"
    );


const productCards =
    document.querySelectorAll(
        ".product-card"
    );


const productSearch =
    document.getElementById(
        "productSearch"
    );


const emptyProducts =
    document.getElementById(
        "emptyProducts"
    );


let currentFilter = "all";



filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {


            filterButtons.forEach(btn => {

                btn.classList.remove(
                    "active"
                );

            });


            button.classList.add(
                "active"
            );


            currentFilter =
                button.dataset.filter;


            filterProducts();

        }
    );

});



if (productSearch) {

    productSearch.addEventListener(
        "input",
        filterProducts
    );

}



/* =========================================================
   FILTER FUNCTION
========================================================= */

function filterProducts() {

    const searchTerm =
        productSearch.value
            .toLowerCase()
            .trim();


    let visibleProducts = 0;


    productCards.forEach(card => {


        const category =
            card.dataset.category;


        const name =
            card.dataset.name
                .toLowerCase();


        const description =
            card.querySelector(
                ".product-description"
            )
            .textContent
            .toLowerCase();


        const categoryMatch =
            currentFilter === "all" ||
            category === currentFilter;


        const searchMatch =
            name.includes(searchTerm) ||
            description.includes(searchTerm);


        if (
            categoryMatch &&
            searchMatch
        ) {

            card.style.display = "";

            visibleProducts++;

        } else {

            card.style.display =
                "none";

        }

    });



    if (visibleProducts === 0) {

        emptyProducts.style.display =
            "block";

    } else {

        emptyProducts.style.display =
            "none";

    }

}



/* =========================================================
   CART
========================================================= */

let cartCount = 0;


const cartCountElement =
    document.getElementById(
        "cartCount"
    );


const addCartButtons =
    document.querySelectorAll(
        ".add-cart"
    );



addCartButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {


            const productName =
                button.dataset.product;


            cartCount++;


            cartCountElement.textContent =
                cartCount;


            button.textContent =
                "✓ Added";


            button.classList.add(
                "added"
            );


            showToast(
                `${productName} added to your cart.`
            );


            setTimeout(() => {

                button.textContent =
                    "+ Add to cart";


                button.classList.remove(
                    "added"
                );

            }, 1800);

        }
    );

});



/* =========================================================
   WISHLIST
========================================================= */

const wishlistButtons =
    document.querySelectorAll(
        ".wishlist"
    );


wishlistButtons.forEach(button => {


    button.addEventListener(
        "click",
        () => {


            button.classList.toggle(
                "liked"
            );


            if (
                button.classList.contains(
                    "liked"
                )
            ) {


                button.style.background =
                    "#E07A5F";


                button.style.color =
                    "white";


                showToast(
                    "Added to your wishlist ♥"
                );


            } else {


                button.style.background =
                    "";


                button.style.color =
                    "";


                showToast(
                    "Removed from your wishlist."
                );

            }

        }
    );

});



/* =========================================================
   TOAST
========================================================= */

const toast =
    document.getElementById(
        "toast"
    );


let toastTimeout;


function showToast(message) {


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimeout
    );


    toastTimeout =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 2500);

}



/* =========================================================
   NEWSLETTER
========================================================= */

const newsletterForm =
    document.getElementById(
        "newsletterForm"
    );


if (newsletterForm) {


    newsletterForm.addEventListener(
        "submit",
        event => {


            event.preventDefault();


            const email =
                document
                    .getElementById(
                        "emailInput"
                    )
                    .value;


            if (
                email.trim() !== ""
            ) {


                showToast(
                    "Welcome to the Pawfect pack! 🐾"
                );


                newsletterForm.reset();

            }

        }
    );

}



/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const observer =
    new IntersectionObserver(
        entries => {


            entries.forEach(entry => {


                if (
                    entry.isIntersecting
                ) {


                    entry.target.classList.add(
                        "visible"
                    );


                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    observer.observe(element);

});



/* =========================================================
   GLOBAL SEARCH
========================================================= */

if (globalSearch) {


    globalSearch.addEventListener(
        "keydown",
        event => {


            if (
                event.key === "Enter"
            ) {


                const searchTerm =
                    globalSearch.value.trim();


                searchPanel.classList.remove(
                    "active"
                );


                productSearch.value =
                    searchTerm;


                document
                    .getElementById("shop")
                    .scrollIntoView({
                        behavior: "smooth"
                    });


                filterProducts();

            }

        }
    );

}



/* =========================================================
   CART BUTTON
========================================================= */

const cartButton =
    document.querySelector(
        ".cart-button"
    );


if (cartButton) {


    cartButton.addEventListener(
        "click",
        () => {


            if (cartCount === 0) {


                showToast(
                    "Your cart is waiting for some pawfect picks!"
                );


            } else {


                showToast(
                    `You have ${cartCount} item${cartCount > 1 ? "s" : ""} in your cart.`
                );

            }

        }
    );

}



/* =========================================================
   RE-INITIALIZE ICONS
========================================================= */

lucide.createIcons();