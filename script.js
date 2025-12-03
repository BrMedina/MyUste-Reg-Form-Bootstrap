(function () {
    const form = document.getElementById('regForm');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const studentNo = document.getElementById('studentNo');
    const birthdate = document.getElementById('birthdate');
    const terms = document.getElementById('termsnCon');
    const termsFeedback = document.getElementById('termsFeedback');
    const result = document.getElementById('result');

    (function setMaxBirthdate() {
        const today = new Date().toISOString().split('T')[0];
        birthdate.setAttribute('max', today);
    })();

    function setValid(el) {
        el.classList.remove('is-invalid');
        el.classList.add('is-valid');
    }
    function setInvalid(el) {
        el.classList.remove('is-valid');
        el.classList.add('is-invalid');
    }

    function validateAll() {
        let valid = true;

        // First name
        const fn = firstName.value.trim();
        if (!fn || fn.length < 2) {
            setInvalid(firstName);
            valid = false;
        } else {
            setValid(firstName);
        }

        // Last name
        const ln = lastName.value.trim();
        if (!ln) {
            setInvalid(lastName);
            valid = false;
        } else {
            setValid(lastName);
        }

        // Email
        const em = email.value.trim();
        if (!em || !email.checkValidity()) {
            setInvalid(email);
            valid = false;
        } else {
            setValid(email);
        }

        // Student number
        const sn = studentNo.value.trim();
        if (!sn || !/^\d{3,}$/.test(sn)) {
            setInvalid(studentNo);
            valid = false;
        } else {
            setValid(studentNo);
        }

        // Birthdate
        if (!birthdate.value) {
            setInvalid(birthdate);
            valid = false;
        } else {
            const b = new Date(birthdate.value);
            const today = new Date();
            b.setHours(0,0,0,0); today.setHours(0,0,0,0);
            if (b > today) {
                setInvalid(birthdate);
                valid = false;
            } else {
                setValid(birthdate);
            }
        }

        // Terms
        if (!terms.checked) {
            setInvalid(terms);
            termsFeedback.style.display = 'block';
            valid = false;
        } else {
            setValid(terms);
            termsFeedback.style.display = 'none';
        }

        return valid;
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (!validateAll()) {
            const firstInvalid = form.querySelector('.is-invalid');
            if (firstInvalid && typeof firstInvalid.focus === 'function') firstInvalid.focus();
            result.style.display = 'none';
            return;
        }

        const data = {
            firstName: firstName.value.trim(),
            lastName: lastName.value.trim(),
            email: email.value.trim(),
            studentNo: studentNo.value.trim(),
            birthdate: birthdate.value,
            termsAccepted: terms.checked
        };

        console.log('Form submission:', data);

        // pop up
        alert(
            'Registration successful!\n\n' +
            'Name: ' + data.firstName + ' ' + data.lastName + '\n' +
            'Email: ' + data.email + '\n' +
            'Student No: ' + data.studentNo + '\n' +
            'Birthdate: ' + data.birthdate
        );

        result.style.display = 'block';
        result.className = 'alert alert-success';
        result.textContent = 'Registration successful!';
    }, false);
})();