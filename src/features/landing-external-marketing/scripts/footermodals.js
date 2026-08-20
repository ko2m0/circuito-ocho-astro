 // Privacy Modal
            var privacyModal = document.getElementById('privacy-modal');
            var closePrivacy = document.getElementById('close-privacy');
            var privacyLink = document.querySelector('a[href="#privacy"]');

            if (privacyLink && privacyModal) {
                privacyLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    privacyModal.classList.remove('hidden');
                    body.style.overflow = 'hidden';
                });
            }
            if (closePrivacy && privacyModal) {
                closePrivacy.addEventListener('click', function() {
                    privacyModal.classList.add('hidden');
                    body.style.overflow = '';
                });
                privacyModal.addEventListener('click', function(e) {
                    if (e.target === privacyModal) {
                        privacyModal.classList.add('hidden');
                        body.style.overflow = '';
                    }
                });
            }

            // Terms Modal
            var termsModal = document.getElementById('terms-modal');
            var closeTerms = document.getElementById('close-terms');
            var termsLink = document.querySelector('a[href="#terms"]');

            if (termsLink && termsModal) {
                termsLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    termsModal.classList.remove('hidden');
                    body.style.overflow = 'hidden';
                });
            }
            if (closeTerms && termsModal) {
                closeTerms.addEventListener('click', function() {
                    termsModal.classList.add('hidden');
                    body.style.overflow = '';
                });
                termsModal.addEventListener('click', function(e) {
                    if (e.target === termsModal) {
                        termsModal.classList.add('hidden');
                        body.style.overflow = '';
                    }
                });
            }