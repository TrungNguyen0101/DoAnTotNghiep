export const DialogDidMount = () => {

    (function () {
        // Variables
        var panel = document.getElementById("js-panel");
        var btns = document.querySelectorAll(".flap__btn");

        // On load, init panel
        var init = function () {
            if (panel) {
                panel.classList.add("is--open");
            }

            // If btns are clicked, hide panel
            // Show replay button
            if (btns) {
                if (btns.length !== 0) {
                    for (var i = 0; i < btns.length; i++) {
                        btns[i].addEventListener("click", function () {
                            hidePanel();
                        });
                    }
                }

            }


            function hidePanel() {
                if (panel) {
                    panel.classList.remove("is--open");
                }

            }


        }

        // On load, call init function
        window.onload = function () {
            init();
        }
    })();
};
