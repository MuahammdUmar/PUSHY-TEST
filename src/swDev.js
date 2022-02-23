export default function swDev() {

    //const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('/service-worker.js').then(() => {
                console.log("registered service worker")
            }).catch(() => {
                console.error("registered service worker error")
            })
        });
    }

}