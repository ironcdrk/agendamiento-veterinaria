const reviewimage = document.querySelector('.review-image');
const review = document.querySelector('.review');

elementIntersectionObserver(review);
elementIntersectionObserver(reviewimage);
/* native javascript Intersection Observer API */
function elementIntersectionObserver(el){
    const observer = new window.IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
        el.style.animationPlayState = "running";
        return
    }
    }, {
    root: null,
    threshold: 0.25, // set offset 0.1 means trigger if atleast 10% of element in viewport
    })

    observer.observe(el);
}

