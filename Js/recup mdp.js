 document.getElementById('password-reset-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate sending reset link
            const resetBtn = document.getElementById('reset-btn');
            resetBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            resetBtn.disabled = true;
            
            setTimeout(function() {
                document.getElementById('reset-form').style.display = 'none';
                document.getElementById('success-message').style.display = 'block';
            }, 2000);
        });