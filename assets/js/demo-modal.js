// Demo Request Submission Logic
function submitDemoRequest(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Set submitting state if using Alpine.js or manual
    if (window.Alpine) {
        const data = Alpine.$data(form);
        if (data) data.submitting = true;
    }

    fetch('../send-demo.aspx', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            if (window.Alpine) {
                const alpineData = Alpine.$data(form);
                alpineData.success = true;
                alpineData.submitting = false;
                setTimeout(() => {
                    alpineData.showDemoModal = false;
                    alpineData.success = false;
                    form.reset();
                }, 3000);
            } else {
                alert('Request sent successfully!');
                form.reset();
            }
        } else {
            alert('Error: ' + data.message);
            if (window.Alpine) {
                Alpine.$data(form).submitting = false;
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
        if (window.Alpine) {
            Alpine.$data(form).submitting = false;
        }
    });
}
