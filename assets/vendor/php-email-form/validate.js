(function() {
    "use strict";

    let forms = document.querySelectorAll('.php-email-form');

    forms.forEach(function(e) {
        e.addEventListener('submit', function(event) {
            event.preventDefault();

            let thisForm = this;

            let action = thisForm.getAttribute('action');


            thisForm.querySelector('.loading').classList.add('d-block');
            thisForm.querySelector('.error-message').classList.remove('d-block');
            thisForm.querySelector('.sent-message').classList.remove('d-block');

            let formData = new FormData(thisForm);

            php_email_form_submit(thisForm, action, formData);
        });
    });

    function php_email_form_submit(thisForm, action, formData) {
        fetch(action, {
                method: 'POST',
                body: formData,
                headers: { 'X-Requested-With': 'XMLHttpRequest' }
            })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error(`${response.status} ${response.statusText} ${response.url}`);
                }
            })
            .then(data => {
                thisForm.querySelector('.loading').classList.remove('d-block');
                if (data.trim() == 'Su mensaje ha sido enviado. Gracias por contactarnos.') {
                    thisForm.querySelector('.sent-message').innerHTML = data;
                    thisForm.querySelector('.sent-message').classList.add('d-block');
                    thisForm.reset();
                    setTimeout('document.location.reload()', 5000);
                } else {
                    throw new Error(data ? data : 'Form submission failed and no error message returned from: ' + action);
                }
            })
            .catch((error) => {
                displayError(thisForm, error);
            });
    }

    function displayError(thisForm, error) {
        thisForm.querySelector('.loading').classList.remove('d-block');
        thisForm.querySelector('.error-message').innerHTML = error;
        thisForm.querySelector('.error-message').classList.add('d-block');
    }

})();