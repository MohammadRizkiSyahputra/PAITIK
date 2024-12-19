function video() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('courseId');

    const buttons = document.querySelectorAll('button[data-courseid]');
    const buttonContainer = document.querySelector('.space-y-3');
    const hoverBg = document.getElementById('hover-bg');
    const videoBtn = document.getElementById('videoBtn');
    const pptBtn = document.getElementById('pptBtn');
    const pdfBtn = document.getElementById('pdfBtn');
    const videoPlayer = document.getElementById('videoPlayer');
    const pptViewer = document.getElementById('pptViewer');
    const pdfViewer = document.getElementById('pdfViewer');

    let currentView = 'video';
    let currentCourseId = null;
    let lastSelectedButton = null;
    let globalUserAnswers = [];

    // Toggle button event listeners
    videoBtn.addEventListener('click', () => {
        videoPlayer.classList.remove('hidden');
        pptViewer.classList.add('hidden');
        pdfViewer.classList.add('hidden');
        videoBtn.classList.remove('bg-gray-500');
        videoBtn.classList.add('bg-blue-500');
        pptBtn.classList.remove('bg-blue-500');
        pptBtn.classList.add('bg-gray-500');
        pdfBtn.classList.remove('bg-blue-500');
        pdfBtn.classList.add('bg-gray-500');
        currentView = 'video';
    });

    pptBtn.addEventListener('click', () => {
        videoPlayer.classList.add('hidden');
        pptViewer.classList.remove('hidden');
        pdfViewer.classList.add('hidden');
        pptBtn.classList.remove('bg-gray-500');
        pptBtn.classList.add('bg-blue-500');
        videoBtn.classList.remove('bg-blue-500');
        videoBtn.classList.add('bg-gray-500');
        pdfBtn.classList.remove('bg-blue-500');
        pdfBtn.classList.add('bg-gray-500');
        currentView = 'ppt';
    });

    pdfBtn.addEventListener('click', () => {
        videoPlayer.classList.add('hidden');
        pptViewer.classList.add('hidden');
        pdfViewer.classList.remove('hidden');
        videoBtn.classList.remove('bg-blue-500');
        videoBtn.classList.add('bg-gray-500');
        pptBtn.classList.remove('bg-blue-500');
        pptBtn.classList.add('bg-gray-500');
        pdfBtn.classList.remove('bg-gray-500');
        pdfBtn.classList.add('bg-blue-500');
        currentView = 'pdf';
    });

    const setPosition = (button) => {
        if (!button || !buttonContainer || !hoverBg) return;
    
        // Get the button's position relative to its container
        const buttonRect = button.getBoundingClientRect();
        const containerRect = buttonContainer.getBoundingClientRect();
    
        // Calculate the offsetTop and left relative to the container
        const offsetTop = button.offsetTop; // Use offsetTop for accurate positioning
        const offsetLeft = button.offsetLeft;
    
        // Set the dimensions and position of the hover background
        hoverBg.style.top = `${offsetTop}px`;
        hoverBg.style.left = `${offsetLeft}px`;
        hoverBg.style.width = `${button.offsetWidth}px`;
        hoverBg.style.height = `${button.offsetHeight}px`;
        hoverBg.style.opacity = "1";
    };

    // Initialize position for the first button or stored button
    const initializePosition = () => {
        let buttonToSelect = buttons[0]; // Default to the first button
    
        // Get the courseId from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const courseIdFromUrl = urlParams.get('courseId');
    
        if (courseIdFromUrl) {
            // Find the button with the corresponding courseId
            const storedButton = document.querySelector(`button[data-courseid="${courseIdFromUrl}"]`);
            if (storedButton) {
                buttonToSelect = storedButton; // Select the button based on courseId from URL
            }
        }
    
        if (buttonToSelect) {
            hoverBg.style.transition = 'none';
            setPosition(buttonToSelect);
            lastSelectedButton = buttonToSelect;
    
            requestAnimationFrame(() => {
                hoverBg.style.transition = 'all 0.3s ease';
            });
        }
    };
    
    // Event listeners for buttons
    buttons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
    
            // Move hover background
            setPosition(this);
    
            // Store the clicked button's courseId in localStorage
            const courseId = this.getAttribute('data-courseid');
            localStorage.setItem('selectedCourseId', courseId);
    
            // Navigate after animation
            setTimeout(() => {
                window.location.href = `materi.html?courseId=${courseId}`;
            }, 300);
    
            // Update last selected button
            lastSelectedButton = this;
        });
    });
    
    // Initialize position on page load
    initializePosition();
    

    const courses = [
        { 
            id: 1, 
            title: "Hakikat Manusia Menurut Ajaran Islam", 
            video: "https://drive.google.com/file/d/1KmhIyUDj5I11xsLWsjWqpHQWpsOE4Z72/preview",
            ppt: "https://1drv.ms/p/c/40c2f8318aa7fa63/IQT4mLkYdpBgQKqg38L6EPC5AYzoDZHpGcqoxeODExqfJas?em=2&amp;wdAr=1.7777777777777777",
            pdf: "pdf/presentation1.pdf",
            description: `Materi Hakikat Manusia dalam Islam \n\n Di materi ini akan membahas : \n 1. Pengertian Manusia dalam Islam,
                2. Manusia dalam Perspektif Islam \n 3. Dalil Tentang Manusia Diciptakan dan Fungsinya \n 4. Potensi yang dimiliki Manusia
                5. Hakikat Manusia dalam Islam \n 6. Fungsi dan Tanggung Jawab Manusia dalam Islam \n 7. Kesimpulan`
        },
        { 
            id: 2, 
            title: "Agama Islam dan Ruang Lingkupnya", 
            video: "https://drive.google.com/file/d/1AGz-FK059TAN8l5PSNPkaUMqHKsQzxaB/preview",
            ppt: "https://1drv.ms/p/c/40c2f8318aa7fa63/IQSt3KofyT-BRqZ7LE18RO0_AUwprZ4V8HlZNvaKUZu7gcw?em=2&amp;wdAr=1.7777777777777777",
            pdf: "pdf/presentation2.pdf",
            description: `Materi Agama Islam dan Ruang Lingkupnya \n\n Di materi ini akan membahas : \n 1. Pengertian Agama,
                2. Pengertian Islam \n 3. Ruang Lingkup Agama Islam \n 4. Iman
                5. Taqwa \n 6. Kesimpulan`
        },
        { 
            id: 3, 
            title: "Sumber-sumber Ajaran Islam", 
            video: "https://drive.google.com/file/d/1RVqEcKjq2TE5swSlPpTgUvN7JmtwtGUU/preview", 
            ppt: "https://1drv.ms/p/c/40c2f8318aa7fa63/IQS8me6dU_7yR7MLVgz63e4jAazG8IOi9CdQMpSGzB0Cq7A?em=2&amp;wdAr=1.7777777777777777",
            pdf: "pdf/presentation3.pdf",
            description: `Materi Sumber-sumber Ajaran Islam \n\n Di materi ini akan membahas : \n 1. Al-Quran,
                2. Sunnah \n 3. Ijtihad \n 4. Kesimpulan`
        },
        { 
            id: 4, 
            title: "Hukum Islam (Syariah) dan HAM dalam Islam", 
            video: "https://drive.google.com/file/d/1iGnCy3QeO6B7hmwTp7KV1FZDlRoQn-nh/preview", 
            ppt: "https://1drv.ms/p/c/40c2f8318aa7fa63/IQQ0jlJ3GFvkR47upWMhJYQ_ATX4pcU_6xv2Y2klH1IVFlg?em=2&amp;wdAr=1.7777777777777777",
            pdf: "pdf/presentation4.pdf",
            description: `Materi Hukum Islam (Syariah) dan HAM dalam Islam \n\n Di materi ini akan membahas : \n 1. Pengertian Hukum Islam,
                2. Tujuan Hukum Islam \n 3. Karakteristik Hukum Islam \n 4. HAM Menurut Ajaran Islam \n 5. Kesimpulan`
        },
        { 
            id: 5, 
            title: "Perkembangan IPTEKS dalam Islam", 
            video: "https://drive.google.com/file/d/19CsbBI2MpStPZxfMG7lRtUQDHVBVA_fo/preview", 
            ppt: "https://1drv.ms/p/c/40c2f8318aa7fa63/IQSpzLRkCMMaTakb1fJI5Kc5AQx5s4l0mtE1wN6QtsYz69M?em=2&amp;wdAr=1.7777777777777777",
            pdf: "pdf/presentation5.pdf",
            description: `Materi Perkembangan IPTEKS dalam Islam \n\n Di materi ini akan membahas : \n 1. Latar Belakang mempelajari Ilmu,
                2. Ilmu Pengetahuan \n 3. Teknologi \n 4. Seni \n 5. Ilmuan \n 6. Kesimpulan`
        },
        { 
            id: 6, 
            title: "Kerukunan Umat Beragama", 
            video: "https://drive.google.com/file/d/1SBfFyQh48BP82aXK1iC3VFXuWpjUPJUg/preview", 
            ppt: "https://1drv.ms/p/c/40c2f8318aa7fa63/IQSAkBZL3dUeTaN5ldcaMKYgAXLlvsb0blMV9XhWLBLaL4M?em=2&amp;wdAr=1.7777777777777777",
            pdf: "pdf/presentation6.pdf",
            description: `Materi Kerukunan Umat Beragama \n\n Di materi ini akan membahas : \n 1. Pengertian Kerukunan Umat Beragama,
                2. Tantangan Kerukunan Umat Beragama \n 3. Hambatan dan Konsepsi Kerukunan Umat Beragama \n 4. Rahmatan Lil Alamin
                5. Upaya Kerukunan Umat Beragama \n 6. Kesimpulan`
        },
        { 
            id: 7, 
            title: "Masyarakat Madani dalam Islam", 
            video: "https://drive.google.com/file/d/18YgllkXrlV27dyC1CUFjmbplSRS2VZnq/preview", 
            ppt: "https://1drv.ms/p/c/40c2f8318aa7fa63/IQSxsXqrkGjCTpm0dQi6mkC8AR8Wtu55VGAzaFK5JOnE6wY?em=2&amp;wdAr=1.7777777777777777",
            pdf: "pdf/presentation7.pdf",
            description: `Materi Masyarakat Madani dalam Islam \n\n Di materi ini akan membahas : \n 1. Pengertian Masyarakat Madani,
                2. Karakteristik Masyarakat Madani \n 3. Kendala/Tantangan Masyarkaat Madani \n 4. Kesimpulan`
        },
        { 
            id: 8, 
            title: "Kebudayaan Islam", 
            video: "https://drive.google.com/file/d/1nkDiM1nhkOr95WVy9I7lFvOdupzvy1pL/preview", 
            ppt: "https://1drv.ms/p/c/40c2f8318aa7fa63/IQRLuYin4E6TTakzzqa9kD0OATBXT_k-ldpv9mDkqZkoRTg?em=2&amp;wdAr=1.7777777777777777",
            pdf: "pdf/presentation8.pdf",
            description: `Materi Kebudayaan Islam \n\n Di materi ini akan membahas : \n 1. Pengertian Budaya dan Islam,
                2. Karakteristik Kebudayaan Islam \n 3. Budaya Akademik dalam Islam \n 4. Etos Kerja dalam Islam
                5. Karakteristik Etos Kerja dalam Islam \n 6. Kesimpulan`
        },
        { 
            id: 9, 
            title: "Sistem Politik dalam Islam", 
            video: "https://drive.google.com/file/d/1MykSGgyyC8IlZLA_jENbQQIWN7WJdina/preview", 
            ppt: "https://1drv.ms/p/c/40c2f8318aa7fa63/IQSdZRzzOtuMQ48hi6roSGw5ATbCRhTgkBGWlqeImxL0p9c?em=2&amp;wdAr=1.7777777777777777",
            pdf: "pdf/presentation9.pdf",
            description: `Materi Sistem Politik dalam Islam \n\n Di materi ini akan membahas : \n 1. Definisi Politik,
                2. Prinsip Politik dalam Islam \n 3. Tujuan Politik dalam Islam \n 4. Peran Agama dalam Mewujudkan Persatuan dan Kesatuan Bangsa
                5. Kesimpulan`
        },
        { 
            id: 10, 
            title: "Ekonomi Islam", 
            video: "https://drive.google.com/file/d/1kX-TPhEkJfCyceqnirF83QbcZi7MLJ3W/preview", 
            ppt: "https://1drv.ms/p/c/40c2f8318aa7fa63/IQSp0wKyfFwCSYKC4BKdPrrFAdJpy7W44YR8Rd3hVqAkaes?em=2&amp;wdAr=1.7777777777777777",
            pdf: "pdf/presentation10.pdf",
            description: `Materi Ekonomi Islam \n\n Di materi ini akan membahas : \n 1. Pengertian, Definisi Menurut Ahli dan Tujuan,
                2. Perbedaan Ekonomi Islam \n 3. Zakat \n 4. Infaq dan Sadaqah
                5. Wakaf \n 6. Kesimpulan`
        },
        { 
            id: 11, 
            title: "Keluarga dalam Islam", 
            video: "https://drive.google.com/file/d/1_jgSdJ7IxgE2wnYcoQIfUSIBA-YMmG32/preview", 
            ppt: "https://1drv.ms/p/c/40c2f8318aa7fa63/IQTAcepz7HyhT48ANPiDldmyAZS3ENJuW3A10PJFb-jWL2s?em=2&amp;wdAr=1.7777777777777777",
            pdf: "pdf/presentation11.pdf",
            description: `Materi Keluarga dalam Islam \n\n Di materi ini akan membahas : \n 1. Pengertian Keluarga,
                2. Perintah Pembentukan Keluarga \n 3. Tujuan Perkawinan \n 4. Rukun dan Syariat Pernikahan dalam Islam
                5. Kesimpulan`
        },
            { 
                id: 12, 
                title: "Akhlak, Etika, Moral dalam Islam", 
                video: "https://drive.google.com/file/d/1KsrB9sExXxGwuCtEQ819CaOz1xPVXIWK/preview", 
                ppt: "https://1drv.ms/p/c/40c2f8318aa7fa63/IQTB0ijDoCtEQo78YRWP26sTAV-IV0xq8nBx4V6eSg2_nYw?em=2&amp;wdAr=1.7777777777777777",
                pdf: "pdf/presentation12.pdf",
                description: `Materi Akhlak, Etika, Moral dalam Islam \n\n Di materi ini akan membahas : \n 1. DEFINISI, CIRI CIRI, DAN JENIS AKHLAK                2. SUMBER DAN PERANAN AKHLAK \n 3. ETIKA \n 4. MORAL
                5. PERBEDAAN AKHLAK, ETIKA DAN MORAL \n 6. Kesimpulan`
            },
        ];
            
    

    const course = courses.find(c => c.id === parseInt(courseId));

    if (course) {
        document.getElementById('materiTitle').textContent = course.title;
        document.getElementById('videoPlayer').src = course.video;
        document.getElementById('pptViewer').src = course.ppt;
        document.getElementById('pdfViewer').src = course.pdf;
        document.getElementById('videoDescription').textContent = course.description;

        if (currentView === 'ppt') {
            pptBtn.click();
        } else if (currentView === 'pdf') {
            pdfBtn.click();
        } else {
            videoBtn.click();
        }
    }
}

function quiz() {
    const quizButton = document.getElementById("quizButton");
    const quizModal = document.getElementById("quizModal");
    const popupContent = document.getElementById("popupContent");
    const cancelButton = document.getElementById("cancelButton");
    const startQuizButton = document.getElementById("startQuizButton");

    quizButton.addEventListener("click", () => {
        // Remove all existing classes first
        quizModal.classList.remove('hidden', 'animate-slide-out');
        popupContent.classList.remove('animate-slide-out', 'opacity-0', 'opacity-100');
        
        // Force reflow
        void quizModal.offsetWidth;
        
        // Add animation classes
        popupContent.classList.add("animate-slide-in");
        
        setTimeout(() => {
            popupContent.classList.remove("opacity-0");
            popupContent.classList.add("opacity-100");
        }, 300);
    });

    // Use SweetAlert to confirm cancellation
    cancelButton.addEventListener("click", () => {
                popupContent.classList.remove("animate-slide-in");
                popupContent.classList.add("animate-slide-out");

                setTimeout(() => {
                    quizModal.classList.add("hidden"); // Close the modal
                }, 300); // Match the duration of the slide-out animation
            });

    // Use SweetAlert to confirm starting the quiz
    startQuizButton.addEventListener("click", () => {
        Swal.fire({
            title: 'Mulai Quiz?',
            text: "Sudah siap? Sudah baca peraturan? Kalau gitu Ayo Mulai!",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Gaskeun!',
            cancelButtonText: 'Eh ntar dulu deh'
        }).then((result) => {
            if (result.isConfirmed) {
                // User confirmed to start the quiz
                quizModal.classList.remove('animate-slide-in');
                quizModal.classList.add("animate-slide-out");
                
                setTimeout(() => {
                    quizModal.classList.add("hidden");
                    openQuizPopup(); // Call the function to open the quiz
                }, 300); // Match the animation duration
            }
        });
    });
}

  function openQuizPopup() {
    const quizPopup = document.getElementById('quizPopup');
    
    // Prepare the popup for animation
    quizPopup.classList.remove('hidden');
    quizPopup.classList.add('opacity-0', 'translate-y-10');
    
    // Use setTimeout to create a smooth transition
    setTimeout(() => {
      // Animate the popup in
      quizPopup.classList.remove('opacity-0', 'translate-y-10');
      quizPopup.classList.add('opacity-100', 'translate-y-0');
      
      // Start the timer and generate questions after animation
      setTimeout(() => {
        startQuizTimer();
        generateQuizQuestions();
      }, 300);
    }, 50); // Small delay for smoother transition
  }

  let timerInterval;
  let timeRemaining = 30 * 60; // 30 minutes in seconds

  function startQuizTimer() {
    // Immediately update the timer display
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    document.getElementById('timer').innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    
    // Set up the interval to update the timer every second
    timerInterval = setInterval(() => {
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert("Waktu habis! Quiz otomatis disubmit.");
            submitQuiz();
        } else {
            timeRemaining--;
            const minutes = Math.floor(timeRemaining / 60);
            const seconds = timeRemaining % 60;
            document.getElementById('timer').innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
    }, 1000);
}

  function generateQuizQuestions() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = parseInt(urlParams.get('courseId'));
    
    const quizQuestionsContainer = document.getElementById('quizQuestions');
    const quizPaginationContainer = document.getElementById('quizPagination');
    quizQuestionsContainer.innerHTML = ''; 
    quizPaginationContainer.innerHTML = '';

    const questions = getQuestionsAndAnswersByCourse(courseId);  
    
    if (questions.length === 0) {
        quizQuestionsContainer.innerHTML = '<p>No questions available for this course.</p>';
        return;
    }

    // Array to store user's selected answers
    globalUserAnswers = new Array(questions.length).fill(null);

    let currentQuestionIndex = 0;

    function renderQuestion(index) {
        const question = questions[index];
        quizQuestionsContainer.innerHTML = ''; // Clear previous question
    
        const questionElement = document.createElement('div');
        questionElement.classList.add(
            'mb-6', 
            'w-full', 
            'opacity-0', 
            'transform', 
            'translate-y-10', 
            'transition-all', 
            'duration-300', 
            'ease-out'
        );
    
        questionElement.innerHTML = `
            <div class="w-full bg-white p-6 rounded-lg shadow-md">
                <p class="text-lg font-semibold mb-4 text-center">${index + 1}. ${question.question}</p>
                <div class="space-y-3">
                    ${question.options.map((option, i) => `
                        <label class="block w-full opacity-0 transform translate-x-5 transition-all duration-300 ease-out flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50" style="transition-delay: ${i * 50}ms;">
                            <input 
                                type="radio" 
                                name="question${index}" 
                                value="${option}" 
                                class="mr-3 h-4 w-4"
                                ${globalUserAnswers[index] === option ? 'checked' : ''}
                            />
                            <span class="text-base">${option}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
        
        quizQuestionsContainer.appendChild(questionElement);
    
        // Add event listeners to radio buttons to save answers
        const radioButtons = questionElement.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => {
            radio.addEventListener('change', (e) => {
                globalUserAnswers[index] = e.target.value;
                updateQuestionNavButtons();
            });
        });
    
        // Numbered Pagination
        quizPaginationContainer.innerHTML = `
            <div class="flex justify-center items-center space-x-2 w-full mt-4">
                ${questions.map((_, i) => `
                    <button 
                        id="questionNav-${i}" 
                        data-answered="${globalUserAnswers[i] !== null}"
                        class="question-nav-btn w-10 h-10 rounded-full ${
                            i === index 
                            ? 'bg-blue-500 text-white' 
                            : (globalUserAnswers[i] !== null 
                                ? 'bg-green-500 text-white' 
                                : 'bg-gray-200 text-gray-700')
                        } hover:bg-opacity-80 transition-colors"
                    >
                        ${i + 1}
                    </button>
                `).join('')}
            </div>
        `;
    
        // Function to update question nav buttons
        function updateQuestionNavButtons() {
            questions.forEach((_, i) => {
                const navBtn = document.getElementById(`questionNav-${i}`);
                
                // Remove all existing classes
                navBtn.classList.remove(
                    'bg-blue-500', 'bg-green-500', 'bg-gray-200', 
                    'text-white', 'text-gray-700'
                );
                
                // Set button color based on state
                if (globalUserAnswers[i] !== null) {
                    navBtn.classList.add('bg-green-500', 'text-white');
                    navBtn.dataset.answered = 'true';
                } else {
                    navBtn.classList.add('bg-gray-200', 'text-gray-700');
                    navBtn.dataset.answered = 'false';
                }
            });
        }
    
        // Add event listeners to numbered navigation buttons
        questions.forEach((_, i) => {
            const navBtn = document.getElementById(`questionNav-${i}`);
            navBtn.addEventListener('click', () => {
    // If the button is already answered (green), just navigate
    if (globalUserAnswers[i] !== null) {
        currentQuestionIndex = i;
        renderQuestion(currentQuestionIndex);
        return;
    }

    // Highlight the current button in blue
    navBtn.classList.remove('bg-gray-200', 'text-gray-700');
    navBtn.classList.add('bg-blue-500', 'text-white');

    // Navigate to the clicked question
    currentQuestionIndex = i;
    renderQuestion(currentQuestionIndex);
});
        });
    
        // Trigger animation
        requestAnimationFrame(() => {
            questionElement.classList.remove('opacity-0', 'translate-y-10');
            
            const options = questionElement.querySelectorAll('label');
            options.forEach((option, i) => {
                setTimeout(() => {
                    option.classList.remove('opacity-0', 'translate-x-5');
                }, i * 50);
            });
        });
    }

    // Initial render of first question
    renderQuestion(0);

       // Submit Quiz Functionality with Incomplete Quiz Check
const submitQuizBtn = document.getElementById('submitQuiz');
submitQuizBtn.addEventListener('click', () => {
    // Check if all questions are answered
    const incompleteQuestions = globalUserAnswers.filter(answer => answer === null);
    
    if (incompleteQuestions.length > 0) {
        // Show SweetAlert warning
        Swal.fire({
            title: 'Duh, quiz belum kelar nih...',
            html: `Kamu punya ${incompleteQuestions.length} pertanyaan yang belum terjawab. Sayang loh skornya kalau submit...`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Submit aja dah, nyerah aku. 😞',
            cancelButtonText: 'Pantang menyerah sebelum kelar 😤'
        }).then((result) => {
            if (result.isConfirmed) {
                // User confirms submission despite incomplete quiz
                submitQuiz(courseId, globalUserAnswers, questions);
            }
        });
    } else {
        // All questions answered, show confirmation before submitting
        Swal.fire({
            title: 'Yakin mau submit quiz?',
            html: `Pastikan kamu sudah mengecek semua jawaban dengan teliti.<br>Kamu tidak bisa mengubah jawaban setelah submit.`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Submit Quiz! 🏆',
            cancelButtonText: 'Tunggu, mau cek lagi 🤔'
        }).then((result) => {
            if (result.isConfirmed) {
                // Proceed with quiz submission
                submitQuiz(courseId, globalUserAnswers, questions);
            }
        });
    }
});
  }

  function renderSolutions() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = parseInt(urlParams.get('courseId'));
    
    const solutionsPopup = document.getElementById('solutions-popup');
    const solutionsContainer = document.getElementById('solutions-container');
    const solutionsSummary = document.getElementById('solutions-summary');
    
    if (!solutionsContainer || !solutionsSummary) {
        console.error('Solutions containers not found');
        return;
    }

    // Clear previous content
    solutionsContainer.innerHTML = ''; 
    solutionsSummary.innerHTML = '';

    const questions = getQuestionsAndAnswersByCourse(courseId);
    
    if (!questions || questions.length === 0) {
        console.error('No questions found for course ID:', courseId);
        return;
    }
    
    // Ensure userAnswers matches questions length
    if (globalUserAnswers.length !== questions.length) {
        globalUserAnswers = new Array(questions.length).fill(null);
    }

    // Calculate total score
    const totalPoints = questions.reduce((total, question) => total + (question.points || 1), 0);
    const earnedPoints = questions.reduce((total, question, index) => {
        return total + ((globalUserAnswers[index] === question.correctAnswer) ? (question.points || 1) : 0);
    }, 0);

    // Render score summary
    solutionsSummary.innerHTML = `
        <div class="flex justify-between items-center">
            <div>
                <p class="text-lg font-semibold">Total Score</p>
                <p class="text-2xl font-bold text-blue-600">${earnedPoints}/${totalPoints}</p>
            </div>
            <div>
                <p class="text-lg font-semibold">Nilai</p>
                <p class="text-2xl font-bold text-green-600">
                    ${((earnedPoints / totalPoints) * 100).toFixed(2)}%
                </p>
            </div>
        </div>
    `;

    // Show solutions popup
    solutionsPopup.classList.remove('hidden');

    questions.forEach((question, index) => {
        const isCorrect = globalUserAnswers[index] === question.correctAnswer;
        const pointValue = question.points || 1;

        const solutionElement = document.createElement('div');
        solutionElement.classList.add(
            'mb-6', 
            'w-full', 
            'solution-item',
            'bg-white',
            'p-4',
            'rounded-lg',
            'shadow-md',
            'opacity-0', 
            'transform', 
            'translate-y-10', 
            'transition-all', 
            'duration-300', 
            'ease-out'
        );
        solutionElement.setAttribute('id', `solution-${index}`);

        // Question rendering
        solutionElement.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <div class="w-full">
                    <h3 class="text-lg font-semibold mb-2">
                        Soal ${index + 1}: 
                        <span class="${isCorrect ? 'text-green-600' : 'text-red-600'}">
                            ${isCorrect ? 'Benar' : 'Salah'}
                        </span>
                    </h3>
                    <p class="text-gray-800 mb-3">${question.question}</p>
                    
                    <div class="space-y-2 mb-4">
                        ${question.options.map((option) => `
                            <div class="flex items-center ${
                                globalUserAnswers[index] === option 
                                    ? (option === question.correctAnswer 
                                        ? 'bg-green-100' 
                                        : 'bg-red-100')
                                    : (option === question.correctAnswer 
                                        ? 'bg-green-50' 
                                        : '')
                            } p-2 rounded">
                                <span class="mr-2 ${
                                    globalUserAnswers[index] === option 
                                        ? (option === question.correctAnswer 
                                            ? 'text-green-700' 
                                            : 'text-red-700')
                                        : (option === question.correctAnswer 
                                            ? 'text-green-600' 
                                            : 'text-gray-700')
                                }">
                                    ${option === question.correctAnswer ? '✓' : ''}
                                </span>
                                <span class="${
                                    globalUserAnswers[index] === option 
                                        ? (option === question.correctAnswer 
                                            ? 'text-green-800' 
                                            : 'text-red-800')
                                        : (option === question.correctAnswer 
                                            ? 'text-green-700' 
                                            : 'text-gray-800')
                                }">
                                    ${option}
                                </span>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="bg-gray-50 p-3 rounded">
                        <h4 class="font-semibold text-blue-700 mb-2">Penjelasan:</h4>
                        <p class="text-gray-700">${question.explanation}</p>
                    </div>
                </div>
                
                <div class="ml-4 text-right">
                    <span class="text-sm font-medium ${
                        isCorrect ? 'text-green-600' : 'text-red-600'
                    }">
                        ${isCorrect ? `+${pointValue}` : '0'} Points
                    </span>
                </div>
            </div>
        `;

        // Add animation delay
        setTimeout(() => {
            solutionElement.classList.remove('opacity-0', 'translate-y-10');
        }, index * 100);

        solutionsContainer.appendChild(solutionElement);
    });

    // Sassy slide-out animation with ATTITUDE
    const closeButton = document.getElementById('close-solutions');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            solutionsPopup.style.animation = 'slideOut 0.3s ease-out';
            
            // Sass-tastic disappearing act
            setTimeout(() => {
                solutionsPopup.classList.add('hidden');
                solutionsPopup.style.animation = ''; // Reset animation
            }, 300); // Perfectly timed mic drop
        });
    }
}

function getQuestionsAndAnswersByCourse(courseId) {
    switch(courseId) {
        case 1:
            return [
                {
                    question: "Dalam perspektif Islam, istilah 'basyar' untuk manusia merujuk pada aspek:",
                    options: [
                        "a. Sosiologis",
                        "b. Biologis dan fisik",
                        "c. Kecerdasan rohani",
                        "d. Historis penciptaan",
                        "e. Sifat kemanusiaan"
                    ],
                    correctAnswer: "b. Biologis dan fisik",
                    explanation: "Istilah 'basyar' mencerminkan sifat-sifat fisik, kimia, dan biologis manusia. Ini dijelaskan dalam Q.S al-Mukminun ayat 33 yang menyebutkan bahwa Nabi Muhammad SAW adalah manusia seperti manusia lainnya yang makan dan minum, merujuk pada aspek fisik manusia."
                },
                {
                    question: "Berapa kali kata 'annas' disebutkan dalam Al-Qur'an untuk menunjukkan eksistensi manusia sebagai makhluk sosial?",
                    options: [
                        "a. 139 kali",
                        "b. 189 kali",
                        "c. 179 kali",
                        "d. 156 kali",
                        "e. 18 kali"
                    ],
                    correctAnswer: "c. 179 kali",
                    explanation: "Allah SWT memanggil manusia dengan sebutan 'annas' sebanyak 179 kali, yang menunjukkan bahwa keberadaan manusia sebagai makhluk sosial menempati posisi yang besar dalam Al-Qur'an."
                },
                {
                    question: "Apa tujuan utama penciptaan manusia menurut Q.S. Adz-Dzariyat ayat 56?",
                    options: [
                        "a. Untuk menjadi pemimpin di bumi",
                        "b. Untuk mengabdi kepada Allah",
                        "c. Untuk membangun peradaban",
                        "d. Untuk memakmurkan bumi",
                        "e. Untuk berkembang biak"
                    ],
                    correctAnswer: "b. Untuk mengabdi kepada Allah",
                    explanation: "Dalam Q.S. Adz-Dzariyat ayat 56 disebutkan, 'Dan aku tidak menciptakan jin dan manusia melainkan supaya mereka mengabdi kepada-Ku.'"
                },
                {
                    question: "Dalam penciptaan manusia pertama (Adam A.S.), dari apakah ia diciptakan?",
                    options: [
                        "a. Tanah liat basah",
                        "b. Air dan tanah",
                        "c. Tanah liat kering dari lumpur hitam",
                        "d. Debu tanah",
                        "e. Saripati tanah"
                    ],
                    correctAnswer: "c. Tanah liat kering dari lumpur hitam",
                    explanation: "Q.S. Al-Hijr ayat 26 menyebutkan bahwa Allah menciptakan manusia (Adam) dari tanah liat kering dari lumpur hitam yang dibentuk."
                },
                {
                    question: "Dalam konteks potensi yang dimiliki manusia, apakah yang dimaksud dengan 'nafs'?",
                    options: [
                        "a. Hanya merujuk pada nafsu",
                        "b. Kekuatan fisik",
                        "c. Jiwa, diri, dan nafsu",
                        "d. Kecerdasan berpikir",
                        "e. Kemampuan spiritual"
                    ],
                    correctAnswer: "c. Jiwa, diri, dan nafsu",
                    explanation: "'Nafs' dalam Al-Qur'an diartikan sebagai jiwa, diri, dan nafsu, yang berkaitan dengan kehidupan, kematian, dan kecenderungan manusia."
                },
                {
                    question: "Fungsi utama manusia menurut Islam terbagi menjadi dua, yaitu:",
                    options: [
                        "a. Pemimpin dan pengikut",
                        "b. Abdullah dan Rasul",
                        "c. Khalifah dan Rasul",
                        "d. Abdullah dan Khalifah",
                        "e. Hamba dan Pemimpin"
                    ],
                    correctAnswer: "d. Abdullah dan Khalifah",
                    explanation: "Manusia dalam Islam memiliki dua fungsi utama, yaitu sebagai Abdullah (hamba Allah) dan Khalifah (pemimpin/wakil Allah di bumi)."
                },
                {
                    question: "Potensi rohaniah manusia terdiri dari beberapa aspek, kecuali:",
                    options: [
                        "a. Potensi Roh",
                        "b. Potensi Akal",
                        "c. Potensi Qalbu",
                        "d. Potensi Nafs",
                        "e. Potensi Jasad"
                    ],
                    correctAnswer: "e. Potensi Jasad",
                    explanation: "Potensi rohaniah manusia terdiri dari potensi roh, akal, qalbu, dan nafs. Potensi jasad merupakan bagian dari potensi jasmaniah."
                },
                {
                    question: "Berapa kali kata 'abdun' (hamba) disebutkan dalam Al-Qur'an?",
                    options: [
                        "a. 179 kali",
                        "b. 139 kali",
                        "c. 156 kali",
                        "d. 18 kali",
                        "e. 189 kali"
                    ],
                    correctAnswer: "b. 139 kali",
                    explanation: "Kata 'abdun' yang berarti hamba disebutkan sebanyak 139 kali dalam Al-Qur'an."
                },
                {
                    question: "Manusia dalam perspektif Islam didefinisikan sebagai:",
                    options: [
                        "a. Makhluk sosial dan biologis",
                        "b. Makhluk mukalaf, mukaram, mukhaiyar, dan mujizat",
                        "c. Makhluk rasional dan spiritual",
                        "d. Makhluk politik dan ekonomi",
                        "e. Makhluk individual dan kolektif"
                    ],
                    correctAnswer: "b. Makhluk mukalaf, mukaram, mukhaiyar, dan mujizat",
                    explanation: "Dalam pandangan Islam, manusia didefinisikan sebagai makhluk mukalaf (memiliki kewajiban), mukaram (dimuliakan), mukhaiyar (memiliki pilihan), dan mujizat (dapat melakukan hal-hal luar biasa)."
                },
                {
                    question: "Qalbu dalam potensi rohaniah manusia memiliki sifat:",
                    options: [
                        "a. Statis dan tidak berubah",
                        "b. Selalu konsisten",
                        "c. Mudah berbolak-balik",
                        "d. Selalu benar",
                        "e. Selalu salah"
                    ],
                    correctAnswer: "c. Mudah berbolak-balik",
                    explanation: "Qalbu atau hati manusia memiliki sifat yang mudah berbolak-balik, sehingga hati manusia bisa terombang-ambing oleh dunia. Itulah sebabnya Rasulullah SAW mengajarkan doa agar hati tetap teguh dalam agama."
                }
            ];
        case 2:
            return [
                {
                    question: "Menurut Harun Nasution, agama adalah...",
                    options: [
                        "A. Sistem kepercayaan kepada Tuhan",
                        "B. Ajaran kebaktian dan kewajiban",
                        "C. Sistem kepercayaan dan perilaku yang bersumber dari kekuatan gaib",
                        "D. Perilaku baik kepada sesama manusia",
                        "E. Tradisi yang diwariskan secara turun-temurun"
                    ],
                    correctAnswer: "C. Sistem kepercayaan dan perilaku yang bersumber dari kekuatan gaib",
                    explanation: "Menurut Harun Nasution, agama merupakan sistem kepercayaan yang melibatkan perilaku dan keyakinan terhadap kekuatan gaib atau supernatural yang memiliki pengaruh dalam kehidupan manusia."
                },
                {
                    question: "Menurut Al-Syahrastani, apa aspek utama yang menjadi fokus agama?",
                    options: [
                        "A. Kebaktian kepada Tuhan",
                        "B. Pembalasan amal di akhirat",
                        "C. Perintah dan larangan Tuhan",
                        "D. Sistem hukum",
                        "E. Ketaatan kepada para rasul"
                    ],
                    correctAnswer: "B. Pembalasan amal di akhirat",
                    explanation: "Al-Syahrastani menyebut bahwa agama mencakup kepatuhan dan pembalasan amal di akhirat."
                },
                {
                    question: "Apa saja aspek utama dalam ruang lingkup Agama Islam?",
                    options: [
                        "A. Tauhid, Syari’ah, Akhlak",
                        "B. Aqidah, Syari’ah, Akhlak",
                        "C. Aqidah, Ibadah, Muamalah",
                        "D. Syari’ah, Muamalah, Akhlak",
                        "E. Syari'ah, Muamalah, Ibadah"
                    ],
                    correctAnswer: "B. Aqidah, Syari’ah, Akhlak",
                    explanation: "Ruang lingkup Islam mencakup Aqidah (keimanan), Syari’ah (hukum), dan Akhlak (budi pekerti)."
                },
                {
                    question: "Apa yang dimaksud dengan Sam’iyah dalam Aqidah?",
                    options: [
                        "A. Pembahasan tentang malaikat dan jin",
                        "B. Ilmu metafisika dalam Islam",
                        "C. Dalil naqli tentang akhirat dan azab kubur",
                        "D. Pembahasan tentang wahyu Allah",
                        "E. Mukjizat para nabi"
                    ],
                    correctAnswer: "C. Dalil naqli tentang akhirat dan azab kubur",
                    explanation: "Sam’iyah membahas dalil-dalil terkait alam barzakh, akhirat, azab, dan kubur."
                },
                {
                    question: "Syari’ah dalam Islam mencakup makna luas, yaitu...",
                    options: [
                        "A. Hukum Islam",
                        "B. Tauhid, iman, dan ihsan",
                        "C. Segala aturan yang membawa manusia kepada Allah",
                        "D. Rukun Islam dan Rukun Iman",
                        "E. Hanya tentang ibadah"
                    ],
                    correctAnswer: "C. Segala aturan yang membawa manusia kepada Allah",
                    explanation: "Syari’ah mencakup aqidah, akhlak, dan aturan yang membawa manusia untuk berserah diri kepada Allah."
                },
                {
                    question: "Bagaimana ihsan dijelaskan dalam hadis Nabi?",
                    options: [
                        "A. Menjaga amal sesuai Al-Qur'an",
                        "B. Beribadah kepada Allah seakan-akan melihat-Nya",
                        "C. Menjalankan tauhid praktis",
                        "D. Menghindari maksiat dengan rasa takut",
                        "E. Menyerahkan diri kepada Allah"
                    ],
                    correctAnswer: "B. Beribadah kepada Allah seakan-akan melihat-Nya",
                    explanation: "Ihsan dijelaskan dalam hadis sebagai beribadah kepada Allah seakan-akan melihat-Nya."
                },
                {
                    question: "Apa istilah yang digunakan untuk menyebut iman pada keesaan Allah?",
                    options: [
                        "A. Tauhid",
                        "B. Akhlak",
                        "C. Syari’ah",
                        "D. Nubuwah",
                        "E. Rukun Islam"
                    ],
                    correctAnswer: "A. Tauhid",
                    explanation: "Keimanan pada keesaan Allah disebut tauhid."
                },
                {
                    question: "Dalam pembagian tauhid, aspek yang berkaitan dengan amal ibadah disebut...",
                    options: [
                        "A. Tauhid teoritis",
                        "B. Tauhid praktis",
                        "C. Tauhid ilahiyah",
                        "D. Tauhid rububiyah",
                        "E. Tauhid sam’iyah"
                    ],
                    correctAnswer: "B. Tauhid praktis",
                    explanation: "Tauhid praktis adalah penerapan tauhid dalam amal ibadah."
                },
                {
                    question: "Dalam rukun iman, iman kepada kitab-kitab Allah menunjukkan...",
                    options: [
                        "A. Kepercayaan kepada Al-Qur'an saja",
                        "B. Keyakinan pada kitab suci yang diturunkan sebelumnya",
                        "C. Keimanan kepada isi wahyu Allah yang masih otentik",
                        "D. Semua kitab suci yang pernah ada tanpa kecuali",
                        "E. Hanya kitab yang dibawa oleh Nabi Muhammad SAW"
                    ],
                    correctAnswer: "C. Keimanan kepada isi wahyu Allah yang masih otentik",
                    explanation: "Rukun iman mengharuskan kepercayaan pada wahyu Allah yang masih otentik."
                },
                {
                    question: "Bagaimana hubungan taqwa dengan al-khasyyah dan al-khauf?",
                    options: [
                        "A. Taqwa adalah bentuk takut kepada Allah",
                        "B. Taqwa hanya mencakup aspek ketaatan",
                        "C. Taqwa tidak terkait dengan rasa takut",
                        "D. Al-khasyyah dan al-khauf hanya berlaku untuk para nabi",
                        "E. Taqwa adalah aspek utama amal saleh"
                    ],
                    correctAnswer: "A. Taqwa adalah bentuk takut kepada Allah",
                    explanation: "Taqwa melibatkan al-khasyyah (takut kepada Allah) yang mendorong ketaatan."
                },
            ];
        case 3:
            return [
                {
                    question: "Apa arti kata 'Al-Qur'an' secara bahasa?",
                    options: [
                        "A. Bacaan atau sesuatu yang dibaca",
                        "B. Petunjuk atau panduan hidup",
                        "C. Kalam Allah yang diturunkan",
                        "D. Ayat-ayat yang terpilih",
                        "E. Kumpulan hukum-hukum Islam"
                    ],
                    correctAnswer: "A. Bacaan atau sesuatu yang dibaca",
                    explanation: "Al-Qur'an berasal dari kata 'qaraa yaqrau qiraatan wa qur'anan' yang berarti bacaan atau sesuatu yang dibaca."
                },
                {
                    question: "Di bawah ini yang merupakan isi pokok Al-Qur'an, kecuali...",
                    options: [
                        "A. Akidah",
                        "B. Akhlak",
                        "C. Hukum alam semesta",
                        "D. Teknologi modern",
                        "E. Kisah umat terdahulu"
                    ],
                    correctAnswer: "D. Teknologi modern",
                    explanation: "Al-Qur'an mencakup akidah, syariah, akhlak, kisah masa lalu, berita masa depan, serta dasar-dasar ilmu pengetahuan, tetapi tidak secara eksplisit mencantumkan teknologi modern."
                },
                {
                    question: "Metode tafsir yang menggunakan pendekatan ilmu pengetahuan disebut...",
                    options: [
                        "A. Tafsir bil Ma'tsur",
                        "B. Tafsir bil Ilmi",
                        "C. Tafsir Muqarin",
                        "D. Tafsir Maudhui",
                        "E. Tafsir Tahlili"
                    ],
                    correctAnswer: "B. Tafsir bil Ilmi",
                    explanation: "Tafsir bil Ilmi adalah metode penafsiran Al-Qur'an dengan pendekatan ilmu pengetahuan."
                },
                {
                    question: "Sunnah yang berupa perbuatan Nabi Muhammad SAW disebut...",
                    options: [
                        "A. Sunnah Qauliyah",
                        "B. Sunnah Fi'liyah",
                        "C. Sunnah Taqririyah",
                        "D. Sunnah Khuluqiyah",
                        "E. Sunnah Wahyiyah"
                    ],
                    correctAnswer: "B. Sunnah Fi'liyah",
                    explanation: "Sunnah Fi'liyah adalah sunnah berupa perbuatan Nabi Muhammad SAW, misalnya cara berwudu atau salat."
                },
                {
                    question: "Fungsi sunnah terhadap Al-Qur'an, kecuali...",
                    options: [
                        "A. Memberikan penjelasan ayat yang rumit",
                        "B. Menambah larangan baru",
                        "C. Mengganti ayat Al-Qur'an",
                        "D. Mengikat makna yang lepas",
                        "E. Menetapkan hukum baru"
                    ],
                    correctAnswer: "C. Mengganti ayat Al-Qur'an",
                    explanation: "Sunnah tidak mengganti ayat Al-Qur'an tetapi berfungsi untuk memperjelas, menguatkan, dan menetapkan hukum baru yang tidak disebutkan dalam Al-Qur'an."
                },
                {
                    question: "Pengertian ijtihad secara istilah adalah...",
                    options: [
                        "A. Upaya memahami hadis",
                        "B. Upaya mencurahkan kemampuan untuk merumuskan hukum syara'",
                        "C. Menetapkan hukum dengan logika",
                        "D. Meniru pendapat ulama terdahulu",
                        "E. Menafsirkan Al-Qur'an secara bebas"
                    ],
                    correctAnswer: "B. Upaya mencurahkan kemampuan untuk merumuskan hukum syara'",
                    explanation: "Ijtihad adalah mencurahkan segenap kemampuan dalam merumuskan hukum syara' berdasarkan Al-Qur'an dan sunnah."
                },
                {
                    question: "Syarat utama bagi seseorang yang ingin melakukan ijtihad adalah...",
                    options: [
                        "A. Menguasai teknologi modern",
                        "B. Mengetahui kitab tafsir",
                        "C. Mengetahui ushul fikih dan nash Al-Qur'an",
                        "D. Menjadi pemimpin agama",
                        "E. Hafal Al-Qur'an secara keseluruhan"
                    ],
                    correctAnswer: "C. Mengetahui ushul fikih dan nash Al-Qur'an",
                    explanation: "Syarat melakukan ijtihad meliputi penguasaan bahasa Arab, mengetahui nash Al-Qur'an, ijma', ushul fikih, serta nasikh dan mansukh."
                },
                {
                    question: "Qiyas sebagai metode ijtihad berarti...",
                    options: [
                        "A. Menggunakan akal pikiran",
                        "B. Menetapkan hukum dengan dasar persamaan antara dua perkara",
                        "C. Mengikuti kesepakatan para ulama",
                        "D. Menyesuaikan dengan kebutuhan masyarakat",
                        "E. Menafsirkan ayat berdasarkan riwayat"
                    ],
                    correctAnswer: "B. Menetapkan hukum dengan dasar persamaan antara dua perkara",
                    explanation: "Qiyas adalah menetapkan hukum berdasarkan persamaan suatu hal dengan yang lain sesuai nash hukum yang telah ada."
                },
                {
                    question: "Istihsan sebagai metode ijtihad mengutamakan...",
                    options: [
                        "A. Kesepakatan ulama",
                        "B. Pertimbangan manfaat dan keadilan",
                        "C. Penafsiran ayat Al-Qur'an",
                        "D. Penggunaan hadis",
                        "E. Pengabaian hukum lama"
                    ],
                    correctAnswer: "B. Pertimbangan manfaat dan keadilan",
                    explanation: "Istihsan menetapkan hukum berdasarkan prinsip kebaikan, keadilan, dan kasih sayang sesuai syariat Islam."
                },
                {
                    question: "Mashalihul Mursalah menetapkan hukum berdasarkan...",
                    options: [
                        "A. Kemutlakan ayat Al-Qur'an",
                        "B. Kesepakatan semua ahli ijtihad",
                        "C. Kemanfaatan yang sesuai tujuan syariat",
                        "D. Tradisi masyarakat tertentu",
                        "E. Penghapusan hukum lama"
                    ],
                    correctAnswer: "C. Kemanfaatan yang sesuai tujuan syariat",
                    explanation: "Mashalihul Mursalah mempertimbangkan kegunaan dan kemanfaatan suatu hukum untuk tujuan syariat meskipun tidak ada dalil eksplisit."
                }
            ];
        case 4: 
            return [
                {
                    question: "Apa arti istilah 'syari'ah' secara literal menurut hukum Islam?",
                    options: [
                        "A. kumpulan hukum-hukum manusia",
                        "B. jalan menuju air",
                        "C. jalan menuju surga",
                        "D. hukum yang berasal dari akal manusia",
                        "E. tuntunan kebahagiaan material"
                    ],
                    correctAnswer: "B. jalan menuju air",
                    explanation: "Syari'ah secara literal diambil dari akar kata syaro-a’, yang berarti jalan menuju air, simbol kehidupan dan petunjuk hidup yang baik."
                },
                {
                    question: "Apa yang menjadi fokus utama tujuan hukum Islam?",
                    options: [
                        "A. kebahagiaan material manusia",
                        "B. keseimbangan ekonomi dan politik",
                        "C. pemeliharaan kebutuhan manusia secara spiritual dan material",
                        "D. peningkatan kekuatan hukum negara",
                        "E. pembatasan kebebasan individu"
                    ],
                    correctAnswer: "C. pemeliharaan kebutuhan manusia secara spiritual dan material",
                    explanation: "Tujuan hukum Islam bersifat humanis dan transendental, mencakup dimensi spiritual (ibadah) dan kebutuhan material manusia."
                },
                {
                    question: "Apa karakteristik hukum Islam yang membedakannya dari hukum positif Barat?",
                    options: [
                        "A. berpusat pada akal manusia",
                        "B. berbasis tradisi masyarakat lokal",
                        "C. berorientasi kolektivisme dan bersumber pada wahyu",
                        "D. mementingkan peraturan negara",
                        "E. terbatas pada aspek material"
                    ],
                    correctAnswer: "C. berorientasi kolektivisme dan bersumber pada wahyu",
                    explanation: "Hukum Islam bersifat elastis, sempurna, dan berlandaskan wahyu, yang membedakannya dari hukum positif Barat."
                },
                {
                    question: "Apa definisi fikih dalam hukum Islam?",
                    options: [
                        "A. jalan kehidupan manusia",
                        "B. kumpulan undang-undang agama",
                        "C. ilmu tentang hukum syar’i yang diperoleh dari dalil-dalil spesifik",
                        "D. sistem perundang-undangan yang disahkan negara",
                        "E. tuntunan moral manusia"
                    ],
                    correctAnswer: "C. ilmu tentang hukum syar’i yang diperoleh dari dalil-dalil spesifik",
                    explanation: "Fikih adalah ilmu yang mendalami hukum-hukum syar’i terkait tindakan manusia yang bersumber dari dalil tafsili."
                },
                {
                    question: "Menurut Imam Al-Ghazali, apa tujuan utama syariat Islam?",
                    options: [
                        "A. membatasi perilaku manusia",
                        "B. mencapai kemakmuran ekonomi",
                        "C. memelihara kesejahteraan manusia termasuk iman, akal, keturunan, dan harta benda",
                        "D. menegakkan kekuasaan politik",
                        "E. melindungi hak individu secara absolut"
                    ],
                    correctAnswer: "C. memelihara kesejahteraan manusia termasuk iman, akal, keturunan, dan harta benda",
                    explanation: "Imam Al-Ghazali menekankan pentingnya menjaga lima aspek ini demi kemaslahatan manusia."
                },
                {
                    question: "Apa makna 'qanun' dalam konteks hukum Islam?",
                    options: [
                        "A. kumpulan hukum yang tidak wajib",
                        "B. aturan yang berlaku dalam masyarakat adat",
                        "C. perundang-undangan yang disahkan oleh negara",
                        "D. kode etik moral masyarakat",
                        "E. pedoman ibadah pribadi"
                    ],
                    correctAnswer: "C. perundang-undangan yang disahkan oleh negara",
                    explanation: "Qanun adalah undang-undang yang berlaku resmi di bawah pengawasan lembaga negara."
                },
                {
                    question: "Apa pengertian hak asasi manusia dalam perspektif Islam?",
                    options: [
                        "A. segala sesuatu berpusat pada manusia",
                        "B. pusatnya adalah keinginan individu",
                        "C. bersifat teosentris dengan fokus pada kewajiban kepada Tuhan",
                        "D. pembebasan manusia dari segala aturan agama",
                        "E. hak-hak yang ditentukan negara"
                    ],
                    correctAnswer: "C. bersifat teosentris dengan fokus pada kewajiban kepada Tuhan",
                    explanation: "Hak asasi dalam Islam berfokus pada hubungan dengan Allah SWT, berbeda dari pendekatan Barat yang humanis."
                },
                {
                    question: "Apa yang dimaksud dengan huququllah?",
                    options: [
                        "A. hak-hak individu atas harta benda",
                        "B. hak-hak manusia terhadap sesama",
                        "C. kewajiban manusia kepada Allah SWT",
                        "D. kebebasan dalam menjalankan agama",
                        "E. tuntutan kepada pemerintah"
                    ],
                    correctAnswer: "C. kewajiban manusia kepada Allah SWT",
                    explanation: "Huququllah adalah hak-hak Allah berupa kewajiban manusia dalam ibadah dan kepatuhan."
                },
                {
                    question: "Apa keunikan hukum Islam dalam menghadapi perubahan zaman?",
                    options: [
                        "A. selalu tetap tanpa perubahan",
                        "B. didasarkan pada konsensus masyarakat",
                        "C. elastis namun tetap sempurna",
                        "D. berubah sesuai konteks politik",
                        "E. hanya relevan pada masa lalu"
                    ],
                    correctAnswer: "C. elastis namun tetap sempurna",
                    explanation: "Hukum Islam bersifat elastis dalam adaptasi tetapi tetap memegang prinsip dasarnya."
                },
                {
                    question: "Apa tujuan utama al-mashlahat dalam hukum Islam?",
                    options: [
                        "A. menentukan batas kebebasan individu",
                        "B. mengatur kepemilikan harta",
                        "C. memastikan terpenuhinya kebutuhan dasar manusia",
                        "D. mengontrol perilaku masyarakat",
                        "E. menghilangkan semua perbedaan sosial"
                    ],
                    correctAnswer: "C. memastikan terpenuhinya kebutuhan dasar manusia",
                    explanation: "Al-mashlahat mencakup kebutuhan dasar seperti pendidikan, keamanan, dan hak beragama."
                }
            ];        
        case 5: 
            return [
                {
                    question: "Wahyu pertama yang diterima Nabi Muhammad SAW di Gua Hira menegaskan pentingnya ilmu pengetahuan. Apa tujuan utama perintah “Iqra” dalam wahyu tersebut?",
                    options: [
                        "A. Memperluas wawasan duniawi",
                        "B. Menguatkan iman kepada Allah",
                        "C. Menekankan pentingnya membaca teks tertulis",
                        "D. Mengajarkan cara menggunakan pena",
                        "E. Mengembangkan kemampuan penelitian"
                    ],
                    correctAnswer: "B. Menguatkan iman kepada Allah",
                    explanation: "Perintah 'Iqra' mendorong manusia untuk membaca segala hal dengan mengingat Allah, sehingga ilmu yang diperoleh memperkuat iman dan bernilai tauhid."
                },
                {
                    question: "Apa istilah yang digunakan dalam Al-Qur’an untuk menyebut ilmu yang berasal langsung dari Allah tanpa usaha manusia?",
                    options: [
                        "A. Ilmu Kasyby",
                        "B. Ilmu Ladunny",
                        "C. Al-Ma’rifah",
                        "D. Al-Fahm",
                        "E. Ilmu Syuhudi"
                    ],
                    correctAnswer: "B. Ilmu Ladunny",
                    explanation: "Ilmu Ladunny adalah ilmu yang langsung diberikan oleh Allah, seperti pengetahuan tentang hal-hal ghaib yang tidak diperoleh melalui usaha manusia."
                },
                {
                    question: "Berdasarkan QS Al-Alaq: 1-5, apa simbol utama dalam ayat tersebut yang menggambarkan alat untuk menyebarkan ilmu?",
                    options: [
                        "A. Pena",
                        "B. Buku",
                        "C. Akal",
                        "D. Alam",
                        "E. Intuisi"
                    ],
                    correctAnswer: "A. Pena",
                    explanation: "QS Al-Alaq menyebutkan pena sebagai alat yang mengajarkan manusia apa yang tidak diketahuinya, simbol penting penyebaran ilmu."
                },
                {
                    question: "Dalam pandangan Al-Qur’an, teknologi yang baik harus memiliki fungsi utama untuk...",
                    options: [
                        "A. Meningkatkan kesejahteraan ekonomi manusia",
                        "B. Mempermudah kehidupan sehari-hari",
                        "C. Mendukung manusia dalam menjalankan tugas sebagai hamba dan khalifah Allah",
                        "D. Mengembangkan peradaban yang lebih maju",
                        "E. Mengurangi ketergantungan pada tenaga manusia"
                    ],
                    correctAnswer: "C. Mendukung manusia dalam menjalankan tugas sebagai hamba dan khalifah Allah",
                    explanation: "Teknologi dalam Islam harus mendukung manusia menjalankan tugas sebagai hamba Allah dan khalifah-Nya di bumi."
                },
                {
                    question: "Seni Islam tidak sekadar ekspresi keindahan, tetapi juga bertujuan untuk...",
                    options: [
                        "A. Menghibur masyarakat",
                        "B. Memperkenalkan budaya Arab",
                        "C. Mencapai harmoni antara kebenaran dan keindahan",
                        "D. Menjaga nilai-nilai tradisional",
                        "E. Melestarikan sejarah Islam"
                    ],
                    correctAnswer: "C. Mencapai harmoni antara kebenaran dan keindahan",
                    explanation: "Seni Islam mencerminkan harmoni antara kebenaran dan keindahan dengan tujuan spiritual menuju Allah."
                },
                {
                    question: "Ilmu pengetahuan menurut Al-Attas memiliki dua konteks utama, yaitu...",
                    options: [
                        "A. Alam dan manusia",
                        "B. Tuhan dan jiwa",
                        "C. Akal dan intuisi",
                        "D. Logika dan pengalaman",
                        "E. Spiritual dan fisik"
                    ],
                    correctAnswer: "B. Tuhan dan jiwa",
                    explanation: "Menurut Al-Attas, ilmu berasal dari Allah (Tuhan) dan diinterpretasikan oleh jiwa manusia melalui kemampuan spiritual dan fisik."
                },
                {
                    question: "QS Al-Mujadilah: 11 menyatakan bahwa Allah akan meninggikan derajat...",
                    options: [
                        "A. Para penguasa yang adil",
                        "B. Orang-orang yang berilmu dan beriman",
                        "C. Mereka yang menjaga lingkungan",
                        "D. Orang-orang yang bertakwa",
                        "E. Kaum fakir miskin"
                    ],
                    correctAnswer: "B. Orang-orang yang berilmu dan beriman",
                    explanation: "Ayat ini menegaskan bahwa Allah memberikan kedudukan tinggi kepada orang beriman dan berilmu."
                },
                {
                    question: "Apa metode utama yang diajarkan Al-Qur’an untuk memahami alam semesta?",
                    options: [
                        "A. Eksperimen ilmiah",
                        "B. Tafakkur dan dzikir",
                        "C. Penelitian akademik",
                        "D. Observasi langsung",
                        "E. Diskusi kelompok"
                    ],
                    correctAnswer: "B. Tafakkur dan dzikir",
                    explanation: "Al-Qur'an mendorong tafakkur (berpikir) dan dzikir (mengingat Allah) sebagai metode memahami alam semesta."
                },
                {
                    question: "Dalam pandangan Islam, IPTEK membantu manusia untuk...",
                    options: [
                        "A. Memahami tanda-tanda kebesaran Allah",
                        "B. Menguasai teknologi modern",
                        "C. Memperoleh kekuasaan",
                        "D. Mengatasi ketertinggalan peradaban",
                        "E. Meningkatkan daya saing"
                    ],
                    correctAnswer: "A. Memahami tanda-tanda kebesaran Allah",
                    explanation: "IPTEK membantu manusia memahami kebesaran Allah dan memperkuat iman."
                },
                {
                    question: "Ilmu Kasyby adalah ilmu yang diperoleh melalui...",
                    options: [
                        "A. Akal dan hati",
                        "B. Wahyu langsung dari Allah",
                        "C. Pengalaman hidup",
                        "D. Intuisi murni",
                        "E. Bantuan teknologi"
                    ],
                    correctAnswer: "A. Akal dan hati",
                    explanation: "Ilmu Kasyby diperoleh melalui proses berpikir berdasarkan pengamatan dan pengalaman inderawi."
                }
            ];
        case 6: 
            return [
                {
                    question: "Apa pengertian kerukunan umat beragama?",
                    options: [
                        "A. Hubungan harmonis antarumat berdasarkan keyakinan yang sama",
                        "B. Keadaan hubungan yang penuh toleransi dan saling menghormati perbedaan",
                        "C. Kehidupan beragama tanpa perbedaan pandangan",
                        "D. Kolaborasi antarumat beragama tanpa kebebasan beribadah",
                        "E. Hubungan sosial tanpa melibatkan aspek keagamaan"
                    ],
                    correctAnswer: "B. Keadaan hubungan yang penuh toleransi dan saling menghormati perbedaan",
                    explanation: "Kerukunan umat beragama mencakup toleransi, saling pengertian, dan penghormatan terhadap perbedaan."
                },
                {
                    question: "Apa yang dimaksud dengan liberalisme dalam tantangan keberagaman?",
                    options: [
                        "A. Penafsiran teks yang terlalu ketat",
                        "B. Penafsiran teks secara bebas tanpa kaidah penafsiran",
                        "C. Penafsiran yang mengutamakan empiris",
                        "D. Penafsiran yang tidak melibatkan konteks",
                        "E. Penafsiran berdasarkan tradisi lokal"
                    ],
                    correctAnswer: "B. Penafsiran teks secara bebas tanpa kaidah penafsiran",
                    explanation: "Liberalisme adalah tantangan keberagaman yang menafsirkan teks agama dengan sangat bebas tanpa mengikuti kaidah penafsiran."
                },
                {
                    question: "Mengapa agama formal sulit menjangkau kelompok pinggiran?",
                    options: [
                        "A. Terlalu fokus pada ritual formal",
                        "B. Hanya menyentuh individu yang sudah beragama",
                        "C. Tidak relevan dengan kebutuhan spiritual",
                        "D. Kurang menyediakan pendidikan agama",
                        "E. Tidak memberikan ruang dialog"
                    ],
                    correctAnswer: "B. Hanya menyentuh individu yang sudah beragama",
                    explanation: "Agama formal lebih banyak menjangkau mereka yang sudah beragama, tidak menyentuh kelompok di luar itu."
                },
                {
                    question: "Apa yang menjadi hambatan kerukunan hidup beragama?",
                    options: [
                        "A. Kurangnya pendidikan agama",
                        "B. Fanatisme dan sikap memonopoli kebenaran",
                        "C. Ketidakseimbangan jumlah umat beragama",
                        "D. Tidak adanya pemahaman antaragama",
                        "E. Kurangnya dukungan pemerintah"
                    ],
                    correctAnswer: "B. Fanatisme dan sikap memonopoli kebenaran",
                    explanation: "Fanatisme dan klaim kebenaran mutlak menjadi hambatan dalam menciptakan kerukunan umat beragama."
                },
                {
                    question: "Apa yang dimaksud dengan Rahmatan lil 'Alamin?",
                    options: [
                        "A. Kasih sayang sesama manusia",
                        "B. Islam sebagai rahmat bagi seluruh alam",
                        "C. Pengakuan terhadap agama lain",
                        "D. Kehidupan harmonis di masyarakat",
                        "E. Penerimaan terhadap perbedaan internal agama"
                    ],
                    correctAnswer: "B. Islam sebagai rahmat bagi seluruh alam",
                    explanation: "Rahmatan lil 'Alamin berarti Islam menjadi rahmat bagi seluruh alam, bukan hanya umat Islam."
                },
                {
                    question: "Apa tujuan dialog antarumat beragama?",
                    options: [
                        "A. Memperkuat dominasi agama tertentu",
                        "B. Menghilangkan perbedaan antaragama",
                        "C. Menjembatani ketidaktahuan dan kesalahpahaman",
                        "D. Membatasi kebebasan beragama",
                        "E. Menyamakan pemahaman tentang agama"
                    ],
                    correctAnswer: "C. Menjembatani ketidaktahuan dan kesalahpahaman",
                    explanation: "Dialog bertujuan menciptakan pemahaman yang lebih baik untuk mengatasi kesalahpahaman."
                },
                {
                    question: "Apa yang dimaksud dengan passing over dalam upaya kerukunan?",
                    options: [
                        "A. Berpindah agama",
                        "B. Memahami agama lain untuk memperkuat keyakinan sendiri",
                        "C. Menyerahkan perbedaan pada otoritas agama",
                        "D. Mengadopsi prinsip agama lain",
                        "E. Melihat kesamaan antaragama"
                    ],
                    correctAnswer: "B. Memahami agama lain untuk memperkuat keyakinan sendiri",
                    explanation: "Passing over adalah memahami agama lain untuk meneguhkan keyakinan agama sendiri."
                },
                {
                    question: "Apa yang menjadi fokus utama Rahmatan lil 'Alamin?",
                    options: [
                        "A. Kehidupan duniawi",
                        "B. Kesempurnaan spiritualitas manusia",
                        "C. Implementasi risalah Islam dalam kehidupan nyata",
                        "D. Keseimbangan antara agama dan budaya",
                        "E. Peningkatan jumlah penganut Islam"
                    ],
                    correctAnswer: "C. Implementasi risalah Islam dalam kehidupan nyata",
                    explanation: "Rahmatan lil 'Alamin terwujud saat risalah Islam diterapkan dalam kehidupan sehari-hari."
                },
                {
                    question: "Apa pendekatan yang disarankan untuk menumbuhkan toleransi beragama?",
                    options: [
                        "A. Penafsiran agama secara ketat",
                        "B. Menonjolkan perbedaan agama",
                        "C. Menemukan kesamaan antaragama",
                        "D. Mengabaikan agama lain",
                        "E. Fokus pada ritual keagamaan"
                    ],
                    correctAnswer: "C. Menemukan kesamaan antaragama",
                    explanation: "Menemukan kesamaan antaragama membantu mempertebal toleransi."
                },
                {
                    question: "Bagaimana cara Islam menghormati perbedaan antaragama?",
                    options: [
                        "A. Dengan menghilangkan perbedaan pandangan",
                        "B. Melalui ajaran yang bersifat memaksa",
                        "C. Dengan prinsip 'tidak ada paksaan dalam beragama'",
                        "D. Menyeragamkan tradisi keagamaan",
                        "E. Melarang hubungan lintas agama"
                    ],
                    correctAnswer: "C. Dengan prinsip 'tidak ada paksaan dalam beragama'",
                    explanation: "Ajaran 'La ikraha fiddin' menekankan penghormatan tanpa paksaan dalam beragama."
                }
            ];        
        case 7: 
            return [
                {
                    question: "Apa makna utama dari konsep masyarakat madani?",
                    options: [
                        "a. Masyarakat yang kaya secara ekonomi",
                        "b. Masyarakat yang menjunjung tinggi nilai-nilai peradaban",
                        "c. Masyarakat yang fokus pada individu",
                        "d. Masyarakat yang tidak memiliki aturan",
                        "e. Masyarakat yang mementingkan politik semata"
                    ],
                    correctAnswer: "b. Masyarakat yang menjunjung tinggi nilai-nilai peradaban",
                    explanation: "Masyarakat madani menekankan pada nilai-nilai peradaban seperti keadilan, toleransi, dan kesetaraan."
                },
                {
                    question: "Istilah 'madani' berasal dari bahasa apa?",
                    options: [
                        "a. Latin",
                        "b. Yunani",
                        "c. Arab",
                        "d. Persia",
                        "e. Inggris"
                    ],
                    correctAnswer: "c. Arab",
                    explanation: "'Madani' berasal dari bahasa Arab yang bermakna peradaban dan terkait dengan kota Madinah."
                },
                {
                    question: "Salah satu karakteristik masyarakat madani adalah...",
                    options: [
                        "a. Mengurangi kekuasaan negara",
                        "b. Membentuk masyarakat individualistik",
                        "c. Menyebarkan kekuasaan melalui kekuatan alternatif",
                        "d. Menolak pluralitas",
                        "e. Menekankan otoritas negara"
                    ],
                    correctAnswer: "c. Menyebarkan kekuasaan melalui kekuatan alternatif",
                    explanation: "Masyarakat madani mengurangi dominasi kekuasaan dengan menyebarkan kekuatan melalui berbagai elemen masyarakat."
                },
                {
                    question: "Apa arti penting dari ukhuwah islamiyah dalam masyarakat madani?",
                    options: [
                        "a. Membangun kekuatan politik",
                        "b. Membentuk jaringan bisnis",
                        "c. Meningkatkan toleransi antar individu dan kelompok",
                        "d. Menyebarkan agama secara paksa",
                        "e. Mengurangi keberagaman"
                    ],
                    correctAnswer: "c. Meningkatkan toleransi antar individu dan kelompok",
                    explanation: "Ukhuwah islamiyah menekankan pentingnya toleransi dan persaudaraan antar manusia."
                },
                {
                    question: "Salah satu kendala mewujudkan masyarakat madani di Indonesia adalah...",
                    options: [
                        "a. Pendidikan yang terlalu maju",
                        "b. Kekayaan yang berlebihan",
                        "c. Kualitas SDM yang belum memadai",
                        "d. Terlalu banyak lapangan kerja",
                        "e. Stabilitas politik yang kuat"
                    ],
                    correctAnswer: "c. Kualitas SDM yang belum memadai",
                    explanation: "Kualitas SDM yang rendah dan pendidikan yang belum merata menjadi hambatan utama."
                },
                {
                    question: "Apa tujuan utama dari zakat, infak, dan sedekah dalam masyarakat madani?",
                    options: [
                        "a. Membentuk kelompok elit baru",
                        "b. Memperkaya individu tertentu",
                        "c. Membantu pemerataan kesejahteraan masyarakat",
                        "d. Membiayai politik praktis",
                        "e. Menyokong otoritas pemerintah"
                    ],
                    correctAnswer: "c. Membantu pemerataan kesejahteraan masyarakat",
                    explanation: "Zakat, infak, dan sedekah digunakan untuk meningkatkan kesejahteraan dan mengurangi kesenjangan sosial."
                },
                {
                    question: "Bagaimana peran masjid dalam membangun masyarakat madani?",
                    options: [
                        "a. Sebagai tempat kegiatan ekonomi",
                        "b. Sebagai pusat kegiatan sosial dan dakwah",
                        "c. Sebagai tempat rekreasi",
                        "d. Sebagai pusat pengambilan keputusan politik",
                        "e. Sebagai tempat penyaluran hibah pemerintah"
                    ],
                    correctAnswer: "b. Sebagai pusat kegiatan sosial dan dakwah",
                    explanation: "Masjid menjadi pusat aktivitas sosial dan dakwah untuk membangun pribadi dan masyarakat yang lebih baik."
                },
                {
                    question: "Salah satu cara membangun kreatifitas masyarakat madani adalah...",
                    options: [
                        "a. Menghilangkan pendidikan formal",
                        "b. Membatasi kebebasan individu",
                        "c. Meningkatkan akses pendidikan dan pelatihan",
                        "d. Memusatkan kekuasaan pada negara",
                        "e. Mengurangi keterlibatan komunitas lokal"
                    ],
                    correctAnswer: "c. Meningkatkan akses pendidikan dan pelatihan",
                    explanation: "Kreativitas tumbuh melalui pendidikan dan pelatihan yang memadai."
                },
                {
                    question: "Apa arti toleransi dalam masyarakat madani?",
                    options: [
                        "a. Menerima perbedaan tetapi menghindari interaksi",
                        "b. Mengabaikan hak individu lain",
                        "c. Tidak merasa terganggu oleh perbedaan aktivitas pihak lain",
                        "d. Memaksakan pandangan kepada orang lain",
                        "e. Menghindari kerja sama dengan pihak lain"
                    ],
                    correctAnswer: "c. Tidak merasa terganggu oleh perbedaan aktivitas pihak lain",
                    explanation: "Toleransi dalam masyarakat madani berarti menghargai perbedaan tanpa merasa terganggu oleh pandangan atau aktivitas yang berbeda."
                },
                {
                    question: "Mengapa pendidikan politik penting dalam masyarakat madani?",
                    options: [
                        "a. Untuk mengurangi partisipasi politik",
                        "b. Untuk mempermudah dominasi pemerintah",
                        "c. Untuk meningkatkan kesadaran hak dan kewajiban warga negara",
                        "d. Untuk menekan partisipasi sosial",
                        "e. Untuk menghapuskan sistem demokrasi"
                    ],
                    correctAnswer: "c. Untuk meningkatkan kesadaran hak dan kewajiban warga negara",
                    explanation: "Pendidikan politik membantu masyarakat memahami hak dan kewajiban mereka, yang esensial dalam membangun masyarakat madani."
                }
            ];        
        case 8:
                return [
                    {
                        question: "Apa arti kebudayaan dalam bahasa Arab?",
                        options: [
                            "a. Budaya",
                            "b. Tsaqafah",
                            "c. Colere",
                            "d. Buddhi",
                            "e. Adab"
                        ],
                        correctAnswer: "b. Tsaqafah",
                        explanation: "Kebudayaan dalam bahasa Arab disebut 'tsaqafah,' yang bermakna pemahaman atau pengolahan."
                    },
                    {
                        question: "Islam berasal dari kata yang memiliki arti berikut, kecuali...?",
                        options: [
                            "a. Keselamatan",
                            "b. Kedamaian",
                            "c. Kesejahteraan",
                            "d. Pengabdian",
                            "e. Kebebasan"
                        ],
                        correctAnswer: "e. Kebebasan",
                        explanation: "Islam berasal dari kata 'salima' yang berarti keselamatan, kedamaian, kesejahteraan, penyerahan diri, dan ketaatan​."
                    },
                    {
                        question: "Apa yang membedakan agama dan kebudayaan menurut Islam?",
                        options: [
                            "a. Agama adalah kebutuhan sekunder, kebudayaan kebutuhan primer",
                            "b. Agama bersifat mutlak, kebudayaan bersifat dinamis",
                            "c. Agama hanya untuk manusia, kebudayaan untuk semua makhluk",
                            "d. Agama berbasis material, kebudayaan berbasis spiritual",
                            "e. Agama adalah bagian dari kebudayaan"
                        ],
                        correctAnswer: "b. Agama bersifat mutlak, kebudayaan bersifat dinamis",
                        explanation: "Dalam Islam, agama adalah kebutuhan primer yang tidak berubah, sementara kebudayaan bersifat fleksibel dan dapat berubah sesuai waktu dan tempat​."
                    },
                    {
                        question: "Salah satu karakteristik kebudayaan Islam adalah Wasathiyah, yang berarti...?",
                        options: [
                            "a. Moderasi dan keseimbangan",
                            "b. Keterbukaan terhadap semua budaya",
                            "c. Keberanian menghadapi tantangan",
                            "d. Kebanggaan terhadap akhlak Islami",
                            "e. Penghormatan terhadap hak asasi"
                        ],
                        correctAnswer: "a. Moderasi dan keseimbangan",
                        explanation: "Wasathiyah mencerminkan keseimbangan antara dunia dan akhirat, jasmani dan rohani, serta hak dan kewajiban​."
                    },
                    {
                        question: "Mengapa ilmu pengetahuan sangat penting dalam budaya akademik Islam?",
                        options: [
                            "a. Ilmu pengetahuan adalah kewajiban agama",
                            "b. Tanpa ilmu pengetahuan, manusia tidak bisa menjalankan tugas sebagai khalifah",
                            "c. Hanya orang yang berilmu yang akan masuk surga",
                            "d. Ilmu pengetahuan menggantikan kewajiban ibadah",
                            "e. Untuk bersaing dengan budaya lain"
                        ],
                        correctAnswer: "b. Tanpa ilmu pengetahuan, manusia tidak bisa menjalankan tugas sebagai khalifah",
                        explanation: "Sebagai khalifah di bumi, manusia perlu memiliki ilmu pengetahuan agar dapat mengelola dunia dengan bijak​."
                    },
                    {
                        question: "Etos kerja Islami mencakup semua karakteristik berikut, kecuali...?",
                        options: [
                            "a. Kejujuran",
                            "b. Disiplin",
                            "c. Harga diri",
                            "d. Keserakahan",
                            "e. Kreativitas"
                        ],
                        correctAnswer: "d. Keserakahan",
                        explanation: "Etos kerja Islami meliputi nilai-nilai positif seperti kejujuran, disiplin, harga diri, dan kreativitas​."
                    },
                    {
                        question: "Karakteristik kebudayaan Islam yang mencerminkan penghormatan terhadap hak dan martabat manusia adalah...?",
                        options: [
                            "a. Rabbaniyah",
                            "b. Alamiyah",
                            "c. Insaniyah",
                            "d. Takamul",
                            "e. Tanawwu'"
                        ],
                        correctAnswer: "c. Insaniyah",
                        explanation: "Insaniyah menunjukkan penghormatan terhadap fitrah manusia, hak-haknya, dan kemuliaannya​."
                    },
                    {
                        question: "Apa tujuan utama budaya akademik dalam Islam?",
                        options: [
                            "a. Meningkatkan status sosial",
                            "b. Mengembangkan kreativitas",
                            "c. Menyelesaikan konflik budaya",
                            "d. Mendukung tugas manusia sebagai khalifah",
                            "e. Menjadikan umat Islam lebih kompetitif"
                        ],
                        correctAnswer: "d. Mendukung tugas manusia sebagai khalifah",
                        explanation: "Budaya akademik dalam Islam bertujuan untuk mempersiapkan manusia menjalankan tugasnya sebagai khalifah di bumi dengan ilmu pengetahuan."
                    },
                    {
                        question: "Bagaimana Islam memandang hubungan antara agama dan budaya?",
                        options: [
                            "a. Agama dan budaya selalu bertentangan",
                            "b. Budaya adalah ekspresi agama",
                            "c. Agama harus mengikuti perubahan budaya",
                            "d. Budaya lebih penting daripada agama",
                            "e. Agama menghapuskan budaya lokal"
                        ],
                        correctAnswer: "b. Budaya adalah ekspresi agama",
                        explanation: "Islam memandang budaya sebagai ekspresi hidup keagamaan, meskipun sifatnya sekunder​."
                    },
                    {
                        question: "Karakteristik etos kerja Islami yang mendorong seseorang untuk terus belajar adalah...?",
                        options: [
                            "a. Kreativitas",
                            "b. Istiqomah",
                            "c. Rasa kecanduan belajar",
                            "d. Kepercayaan diri",
                            "e. Semangat perantauan"
                        ],
                        correctAnswer: "c. Rasa kecanduan belajar",
                        explanation: "Etos kerja Islami mengajarkan rasa kecanduan belajar untuk menambah ilmu demi pengembangan diri dan keberhasilan."
                    }
                ];            
        case 9:
                    return [
                        {
                            question: "Apa arti istilah politik dalam bahasa Arab?",
                            options: [
                                "a. Siyasah",
                                "b. Tsaqafah",
                                "c. Shariah",
                                "d. Fiqh",
                                "e. Ijtihad"
                            ],
                            correctAnswer: "a. Siyasah",
                            explanation: "Dalam bahasa Arab, politik diterjemahkan sebagai siyasah, yang berarti mengemudi, mengendalikan, atau mengatur."
                        },
                        {
                            question: "Salah satu tujuan politik Islam adalah...?",
                            options: [
                                "a. Memperkuat kekuasaan individu",
                                "b. Menyeragamkan keyakinan masyarakat",
                                "c. Terwujudnya ketenteraman dalam kehidupan masyarakat",
                                "d. Meningkatkan dominasi budaya tertentu",
                                "e. Meninggalkan sistem pemerintahan modern"
                            ],
                            correctAnswer: "c. Terwujudnya ketenteraman dalam kehidupan masyarakat",
                            explanation: "Politik Islam bertujuan menciptakan ketenteraman dalam masyarakat dengan menerapkan hukum Islam​."
                        },
                        {
                            question: "Apa prinsip utama dalam politik Islam yang menunjukkan kedaulatan Allah?",
                            options: [
                                "a. Khalifah",
                                "b. Tauhid",
                                "c. Musyawarah",
                                "d. Persamaan",
                                "e. Perdamaian"
                            ],
                            correctAnswer: "b. Tauhid",
                            explanation: "Prinsip tauhid menegaskan bahwa kedaulatan mutlak milik Allah dan semua aturan harus berlandaskan syariat​."
                        },
                        {
                            question: "Prinsip persatuan dalam Islam menekankan bahwa perbedaan di antara manusia adalah...?",
                            options: [
                                "a. Hambatan menuju kesatuan",
                                "b. Bukti keagungan Allah",
                                "c. Penyebab konflik yang tak terhindarkan",
                                "d. Alasan untuk menyeragamkan semua tradisi",
                                "e. Ancaman terhadap harmoni masyarakat"
                            ],
                            correctAnswer: "b. Bukti keagungan Allah",
                            explanation: "Islam memandang perbedaan sebagai kehendak Allah untuk menguji manusia dalam amal kebajikan​."
                        },
                        {
                            question: "Musyawarah dalam Islam bertujuan untuk...?",
                            options: [
                                "a. Menegakkan otoritas pemimpin",
                                "b. Memastikan keputusan mayoritas",
                                "c. Mengakomodasi kepentingan semua pihak",
                                "d. Membatasi kebebasan individu",
                                "e. Memperkuat kedudukan agama"
                            ],
                            correctAnswer: "c. Mengakomodasi kepentingan semua pihak",
                            explanation: "Musyawarah bertujuan agar keputusan dapat mengakomodasi kepentingan semua kelompok dalam masyarakat​."
                        },
                        {
                            question: "Salah satu prinsip politik Islam yang menolak eksploitasi dan penindasan adalah...?",
                            options: [
                                "a. Tauhid",
                                "b. Persamaan",
                                "c. Perdamaian",
                                "d. Risalah",
                                "e. Kebebasan"
                            ],
                            correctAnswer: "b. Persamaan",
                            explanation: "Prinsip persamaan menekankan bahwa semua manusia memiliki kedudukan yang sama di hadapan Allah, sehingga eksploitasi tidak dibenarkan."
                        },
                        {
                            question: "Apa peran utama agama dalam politik Islam?",
                            options: [
                                "a. Menjamin keberlanjutan tradisi lokal",
                                "b. Menegakkan keadilan dan kemanusiaan",
                                "c. Mewujudkan supremasi agama tertentu",
                                "d. Menyeragamkan semua keyakinan",
                                "e. Meningkatkan ekonomi umat"
                            ],
                            correctAnswer: "b. Menegakkan keadilan dan kemanusiaan",
                            explanation: "Agama dalam politik Islam berperan untuk menegakkan keadilan dan menghormati nilai-nilai kemanusiaan​."
                        },
                        {
                            question: "Apa makna prinsip kebebasan dalam pandangan politik Islam?",
                            options: [
                                "a. Tidak ada batasan dalam ekspresi individu",
                                "b. Kebebasan untuk memaksa orang lain",
                                "c. Hak untuk menjalani hidup sesuai pilihan tanpa melanggar nilai masyarakat",
                                "d. Kebebasan hanya bagi mayoritas",
                                "e. Kebebasan untuk mengubah hukum syariat"
                            ],
                            correctAnswer: "c. Hak untuk menjalani hidup sesuai pilihan tanpa melanggar nilai masyarakat",
                            explanation: "Kebebasan dalam Islam memberikan hak kepada manusia untuk memilih hidupnya, tetapi tetap harus menghormati nilai masyarakat​."
                        },
                        {
                            question: "Bagaimana prinsip perdamaian dalam politik Islam diaplikasikan di masyarakat majemuk?",
                            options: [
                                "a. Dengan membatasi hak kelompok minoritas",
                                "b. Dengan mendukung satu pandangan tertentu",
                                "c. Dengan mengutamakan rekonsiliasi dalam konflik",
                                "d. Dengan memisahkan agama dari pemerintahan",
                                "e. Dengan menegakkan hukum perang"
                            ],
                            correctAnswer: "c. Dengan mengutamakan rekonsiliasi dalam konflik",
                            explanation: "Prinsip perdamaian dalam Islam mendorong penyelesaian konflik melalui rekonsiliasi untuk menjaga persatuan​."
                        },
                        {
                            question: "Siapa yang bertanggung jawab untuk menjalankan kekuasaan berdasarkan prinsip Islam?",
                            options: [
                                "a. Ulama",
                                "b. Pemimpin masyarakat",
                                "c. Khalifah sebagai wakil Allah di bumi",
                                "d. Masyarakat mayoritas",
                                "e. Pemimpin agama"
                            ],
                            correctAnswer: "c. Khalifah sebagai wakil Allah di bumi",
                            explanation: "Dalam politik Islam, manusia bertanggung jawab menjalankan kekuasaan sebagai khalifah Allah di bumi dengan mengikuti hukum-Nya."
                        }
                    ];                
        case 10:
                    return [
                        {
                            question: "Mengapa sedekah dianggap lebih luas daripada infaq?",
                            options: [
                                "a. Sedekah mencakup sumbangan wajib dan sukarela.",
                                "b. Sedekah dapat berupa non-materi seperti tenaga atau senyuman.",
                                "c. Sedekah hanya diberikan kepada fakir miskin.",
                                "d. Sedekah harus diberikan dalam bentuk barang.",
                                "e. Sedekah tidak memiliki tujuan sosial tertentu."
                            ],
                            correctAnswer: "b. Sedekah dapat berupa non-materi seperti tenaga atau senyuman.",
                            explanation: "Sedekah mencakup pemberian non-materi seperti tenaga atau senyuman, sedangkan infaq hanya mencakup hal-hal material."
                        },
                        {
                            question: "Apa yang menjadi dasar utama sistem ekonomi Islam dalam pengambilan keputusan ekonomi?",
                            options: [
                                "a. Tradisi masyarakat lokal",
                                "b. Al-Qur'an dan Sunnah",
                                "c. Prinsip pasar bebas",
                                "d. Undang-undang negara",
                                "e. Konsensus ulama"
                            ],
                            correctAnswer: "b. Al-Qur'an dan Sunnah",
                            explanation: "Ekonomi Islam didasarkan pada ajaran Al-Qur'an dan Sunnah yang menjadi pedoman utama dalam seluruh aktivitas ekonomi."
                        },
                        {
                            question: "Menurut Khurshid Ahmad, ekonomi Islam adalah upaya untuk memahami masalah ekonomi dalam perspektif apa?",
                            options: [
                                "a. Perspektif hukum syariah",
                                "b. Perspektif universal",
                                "c. Perspektif Islam",
                                "d. Perspektif tradisional",
                                "e. Perspektif rasional"
                            ],
                            correctAnswer: "c. Perspektif Islam",
                            explanation: "Khurshid Ahmad mendefinisikan ekonomi Islam sebagai usaha sistematis untuk memahami masalah ekonomi dan perilaku masyarakat dari perspektif Islam."
                        },
                        {
                            question: "Ciri utama ekonomi kapitalisme adalah ...",
                            options: [
                                "a. Larangan riba dan monopoli",
                                "b. Penguasaan sumber daya oleh negara",
                                "c. Kebebasan individu tanpa nilai aqidah dan syariat",
                                "d. Pemerataan kekayaan melalui pajak progresif",
                                "e. Penekanan pada produksi berbasis masyarakat"
                            ],
                            correctAnswer: "c. Kebebasan individu tanpa nilai aqidah dan syariat",
                            explanation: "Kapitalisme menolak nilai aqidah dan syariat, mendukung riba, serta memperkuat dominasi individu dalam sistem ekonomi."
                        },
                        {
                            question: "Apa yang membedakan zakat mal dengan zakat fitrah?",
                            options: [
                                "a. Zakat mal dikeluarkan oleh pemerintah, zakat fitrah dikeluarkan secara individu.",
                                "b. Zakat mal terkait harta, zakat fitrah terkait jiwa.",
                                "c. Zakat mal diberikan kepada fakir miskin, zakat fitrah diberikan kepada keluarga.",
                                "d. Zakat mal bersifat wajib, zakat fitrah bersifat sukarela.",
                                "e. Zakat mal hanya dikeluarkan pada bulan Ramadan, zakat fitrah setiap saat."
                            ],
                            correctAnswer: "b. Zakat mal terkait harta, zakat fitrah terkait jiwa.",
                            explanation: "Zakat mal terkait dengan harta tertentu seperti emas atau penghasilan, sedangkan zakat fitrah adalah penyucian jiwa menjelang Idulfitri."
                        },
                        {
                            question: "Apa tujuan utama dari wakaf produktif?",
                            options: [
                                "a. Memanfaatkan harta untuk konsumsi masyarakat langsung.",
                                "b. Mengelola harta agar memberikan hasil yang berkelanjutan.",
                                "c. Menjaga harta agar tetap dimiliki keluarga pewakaf.",
                                "d. Mengalokasikan harta untuk pajak pemerintah.",
                                "e. Mengubah status kepemilikan harta secara permanen."
                            ],
                            correctAnswer: "b. Mengelola harta agar memberikan hasil yang berkelanjutan.",
                            explanation: "Wakaf produktif bertujuan mengelola harta untuk menghasilkan pendapatan yang digunakan bagi kepentingan masyarakat."
                        },
                        {
                            question: "Dalam ekonomi Islam, riba dilarang karena ...",
                            options: [
                                "a. Meningkatkan kemiskinan masyarakat.",
                                "b. Tidak memiliki dasar dalam tradisi Islam.",
                                "c. Bertentangan dengan nilai keadilan dan keberkahan.",
                                "d. Membebani pemerintah dalam pengelolaan ekonomi.",
                                "e. Menghalangi persaingan dalam pasar bebas."
                            ],
                            correctAnswer: "c. Bertentangan dengan nilai keadilan dan keberkahan.",
                            explanation: "Larangan riba dalam ekonomi Islam didasarkan pada prinsip keadilan dan keberkahan, karena riba dianggap sebagai bentuk ketidakadilan."
                        },
                        {
                            question: "Apa yang dimaksud dengan infaq sunnah?",
                            options: [
                                "a. Infaq yang dikeluarkan untuk zakat fitrah.",
                                "b. Infaq yang dikeluarkan karena tuntutan kewajiban.",
                                "c. Infaq yang dianjurkan tetapi tidak diwajibkan.",
                                "d. Infaq yang hanya diberikan kepada keluarga.",
                                "e. Infaq yang harus dikeluarkan pada bulan Ramadan."
                            ],
                            correctAnswer: "c. Infaq yang dianjurkan tetapi tidak diwajibkan.",
                            explanation: "Infaq sunnah adalah sumbangan yang dianjurkan tanpa kewajiban, seperti untuk pembangunan masjid atau bantuan sosial."
                        },
                        {
                            question: "Wakaf sementara (mu’aqqat) berbeda dari wakaf permanen (muabbad) karena ...",
                            options: [
                                "a. Memiliki nilai aset yang lebih rendah.",
                                "b. Diperbolehkan untuk dijual setelah jangka waktu tertentu.",
                                "c. Memiliki jangka waktu penggunaan tertentu.",
                                "d. Digunakan untuk keperluan pribadi.",
                                "e. Tidak menghasilkan manfaat sosial."
                            ],
                            correctAnswer: "c. Memiliki jangka waktu penggunaan tertentu.",
                            explanation: "Wakaf sementara memiliki batas waktu tertentu, setelah itu harta dapat kembali kepada pewakaf."
                        },
                        {
                            question: "Apa pengertian ekonomi Islam menurut Hasanuz Zaman?",
                            options: [
                                "a. Ilmu untuk menciptakan keseimbangan ekonomi global.",
                                "b. Penerapan hukum syariah untuk mencegah ketidakadilan ekonomi.",
                                "c. Upaya sistematis untuk memahami perilaku pasar modern.",
                                "d. Sistem ekonomi yang melibatkan pemerintah dalam seluruh sektor.",
                                "e. Ilmu sosial yang menolak segala bentuk kepemilikan pribadi."
                            ],
                            correctAnswer: "b. Penerapan hukum syariah untuk mencegah ketidakadilan ekonomi.",
                            explanation: "Hasanuz Zaman mendefinisikan ekonomi Islam sebagai ilmu yang menerapkan hukum syariah untuk mencegah ketidakadilan."
                        }
                    ];
        case 11: 
            return [
                {
                    question: "Apa tujuan utama perkawinan dalam Islam menurut Imam Al-Ghazali?",
                    options: [
                        "A. Meningkatkan kesejahteraan finansial",
                        "B. Mendapatkan keturunan dan melangsungkan kasih sayang",
                        "C. Memperkuat kekuasaan dalam masyarakat",
                        "D. Memenuhi kebutuhan jasmani dan rohani",
                        "E. Menjalankan perintah orang tua"
                    ],
                    correctAnswer: "B. Mendapatkan keturunan dan melangsungkan kasih sayang",
                    explanation: "Tujuan utama perkawinan menurut Imam Al-Ghazali adalah untuk melanjutkan keturunan, menyalurkan kasih sayang, dan membentuk keluarga harmonis."
                },
                {
                    question: "Menurut UU No. 1 Tahun 1974, perkawinan bertujuan untuk...?",
                    options: [
                        "A. Membangun keluarga bahagia dan kekal berdasarkan ketuhanan",
                        "B. Membentuk masyarakat yang adil dan makmur",
                        "C. Melestarikan adat istiadat tradisional",
                        "D. Menjaga hubungan antar keluarga besar",
                        "E. Memenuhi syarat hukum Islam"
                    ],
                    correctAnswer: "A. Membangun keluarga bahagia dan kekal berdasarkan ketuhanan",
                    explanation: "UU No. 1 Tahun 1974 menyebutkan bahwa tujuan perkawinan adalah membentuk keluarga bahagia dan kekal berdasarkan ketuhanan."
                },
                {
                    question: "Rukun pernikahan dalam Islam, kecuali...?",
                    options: [
                        "A. Ijab kabul",
                        "B. Mahar",
                        "C. Dua orang saksi",
                        "D. Kehadiran wali",
                        "E. Catatan administrasi negara"
                    ],
                    correctAnswer: "E. Catatan administrasi negara",
                    explanation: "Rukun nikah dalam Islam adalah ijab kabul, kehadiran wali, dan dua orang saksi, sedangkan catatan administrasi negara adalah syarat administratif."
                },
                {
                    question: "Apa fungsi keluarga menurut pandangan Islam?",
                    options: [
                        "A. Sarana untuk melatih kebebasan individu",
                        "B. Landasan utama pembentukan masyarakat muslim",
                        "C. Media untuk menanamkan nilai-nilai ekonomi modern",
                        "D. Alat untuk mempromosikan kebudayaan tertentu",
                        "E. Pusat pengembangan teknologi"
                    ],
                    correctAnswer: "B. Landasan utama pembentukan masyarakat muslim",
                    explanation: "Islam memandang keluarga sebagai landasan pertama untuk membangun masyarakat muslim dan madrasah iman."
                },
                {
                    question: "Dalil perintah menikah yang menyebutkan 'Siapa yang menikah, maka ia telah menyempurnakan setengah agamanya' berasal dari...?",
                    options: [
                        "A. Q.S. An-Nisa: 1",
                        "B. Hadis dari Anas bin Malik",
                        "C. Q.S. Ar-Rum: 21",
                        "D. Hadis dari Abu Hurairah",
                        "E. Hadis dari Abdullah bin Mas’ud"
                    ],
                    correctAnswer: "B. Hadis dari Anas bin Malik",
                    explanation: "Hadis tersebut berasal dari riwayat Anas bin Malik RA, menyatakan bahwa menikah adalah penyempurnaan setengah agama."
                },
                {
                    question: "Apa arti child-free menurut Oxford Dictionary?",
                    options: [
                        "A. Situasi pasangan yang tidak dapat memiliki anak",
                        "B. Kondisi seseorang memilih tidak memiliki anak",
                        "C. Kebijakan pemerintah terkait kelahiran",
                        "D. Gaya hidup untuk mengurangi populasi",
                        "E. Konsep pengasuhan modern"
                    ],
                    correctAnswer: "B. Kondisi seseorang memilih tidak memiliki anak",
                    explanation: "Oxford Dictionary mendefinisikan child-free sebagai pilihan seseorang atau pasangan untuk tidak memiliki anak."
                },
                {
                    question: "Dalam Islam, apa kewajiban utama orang tua terhadap anak?",
                    options: [
                        "A. Memberikan pendidikan formal",
                        "B. Memberikan nasab yang sah",
                        "C. Menyediakan tempat tinggal yang mewah",
                        "D. Mengajarkan keterampilan ekonomi",
                        "E. Memberi kemerdekaan penuh"
                    ],
                    correctAnswer: "B. Memberikan nasab yang sah",
                    explanation: "Nasab yang sah adalah hubungan darah antara anak dengan orang tua berdasarkan pernikahan yang diakui secara syar'i."
                },
                {
                    question: "Menurut Q.S. Ar-Rum: 21, Allah menciptakan pasangan agar manusia...?",
                    options: [
                        "A. Memperbanyak keturunan",
                        "B. Merasa tenteram, cinta, dan kasih sayang",
                        "C. Memiliki mitra dalam menjalani kehidupan",
                        "D. Meningkatkan kualitas kehidupan sosial",
                        "E. Menyelesaikan tugas agama"
                    ],
                    correctAnswer: "B. Merasa tenteram, cinta, dan kasih sayang",
                    explanation: "Dalam Q.S. Ar-Rum: 21, disebutkan bahwa pasangan diciptakan untuk menciptakan ketenteraman (sakinah), cinta (mawaddah), dan kasih sayang (rahmah)."
                },
                {
                    question: "Apa alasan Rasulullah SAW menganjurkan menikah dengan wanita subur dan penuh kasih sayang?",
                    options: [
                        "A. Untuk meningkatkan kesejahteraan keluarga",
                        "B. Untuk kebanggaan beliau pada hari kiamat",
                        "C. Untuk memenuhi kebutuhan sosial",
                        "D. Untuk mengurangi dosa umat Islam",
                        "E. Untuk menjaga kehormatan wanita"
                    ],
                    correctAnswer: "B. Untuk kebanggaan beliau pada hari kiamat",
                    explanation: "Rasulullah SAW bersabda bahwa beliau akan berbangga dengan jumlah umatnya yang banyak pada hari kiamat."
                },
                {
                    question: "Keluarga sakinah dalam Islam dapat terwujud jika...",
                    options: [
                        "A. Hanya fokus pada kesejahteraan ekonomi",
                        "B. Anggota keluarga saling menjaga cinta dan tanggung jawab",
                        "C. Memprioritaskan pendidikan formal anak",
                        "D. Meningkatkan jumlah anak setiap tahun",
                        "E. Menerapkan aturan tanpa kompromi"
                    ],
                    correctAnswer: "B. Anggota keluarga saling menjaga cinta dan tanggung jawab",
                    explanation: "Keluarga sakinah terwujud melalui hubungan yang dilandasi cinta, kasih sayang, dan tanggung jawab sesuai ajaran Islam."
                }
            ];
        case 12: 
            return [
                {
                    question: "Dalam konsep akhlak Islam, apa yang dimaksud dengan sifat waqi’iyah dari akhlak?",
                    options: [
                        "A. Akhlak hanya berlaku dalam kondisi tertentu",
                        "B. Akhlak didasarkan pada wahyu dan akal",
                        "C. Akhlak bersifat realistis sesuai kebutuhan manusia",
                        "D. Akhlak bersifat dinamis mengikuti perkembangan zaman",
                        "E. Akhlak terikat pada adat masyarakat lokal"
                    ],
                    correctAnswer: "C. Akhlak bersifat realistis sesuai kebutuhan manusia",
                    explanation: "Sifat waqi’iyah berarti akhlak mampu menyesuaikan dengan kebutuhan dan realitas kehidupan sehari-hari manusia."
                },
                {
                    question: "Apa hubungan antara etika deskriptif dan etika normatif dalam kajian filsafat moral?",
                    options: [
                        "A. Etika deskriptif memberikan pedoman untuk normatif",
                        "B. Etika normatif menganalisis fakta sosial deskriptif",
                        "C. Etika deskriptif hanya berlaku pada masyarakat tertentu",
                        "D. Etika deskriptif menggambarkan fakta; normatif memberikan arahan",
                        "E. Etika normatif lebih praktis daripada deskriptif"
                    ],
                    correctAnswer: "D. Etika deskriptif menggambarkan fakta; normatif memberikan arahan",
                    explanation: "Etika deskriptif berfokus pada pengamatan fakta sosial, sedangkan etika normatif memberi arahan dan penilaian."
                },
                {
                    question: "Menurut surah Al-Qalam ayat 4, apa yang menjadi inti utama akhlak Rasulullah SAW?",
                    options: [
                        "A. Kepemimpinan yang kuat",
                        "B. Kekayaan ilmu",
                        "C. Budi pekerti yang agung",
                        "D. Kesempurnaan iman",
                        "E. Ketegasan dalam hukum"
                    ],
                    correctAnswer: "C. Budi pekerti yang agung",
                    explanation: "Ayat ini menyatakan bahwa Nabi Muhammad SAW memiliki akhlak yang sangat mulia dan agung."
                },
                {
                    question: "Dalam konteks moral, apa yang membedakan moral hukum dengan moral ideologi?",
                    options: [
                        "A. Moral hukum lebih mendasarkan pada agama",
                        "B. Moral ideologi berorientasi pada aturan hukum",
                        "C. Moral hukum berasal dari tradisi masyarakat lokal",
                        "D. Moral hukum mengacu pada aturan negara, moral ideologi pada cita-cita bangsa",
                        "E. Moral ideologi lebih universal daripada moral hukum"
                    ],
                    correctAnswer: "D. Moral hukum mengacu pada aturan negara, moral ideologi pada cita-cita bangsa",
                    explanation: "Moral hukum bersifat legal formal, sedangkan moral ideologi terkait nilai kebangsaan dan patriotisme."
                },
                {
                    question: "Apa yang dimaksud dengan ciri insaniyah pada akhlak?",
                    options: [
                        "A. Akhlak didasarkan pada akal pikiran manusia",
                        "B. Akhlak mengutamakan kepentingan umat secara keseluruhan",
                        "C. Akhlak sesuai dengan fitrah alami manusia",
                        "D. Akhlak bersifat lokal dan temporal",
                        "E. Akhlak menyesuaikan norma sosial masyarakat"
                    ],
                    correctAnswer: "C. Akhlak sesuai dengan fitrah alami manusia",
                    explanation: "Ciri insaniyah menunjukkan bahwa akhlak Islam relevan dengan kebutuhan dan karakter dasar manusia."
                },
                {
                    question: "Mengapa akhlak mahmudah dianggap sebagai tanda keimanan seseorang?",
                    options: [
                        "A. Karena sifat terpuji adalah bukti amal saleh",
                        "B. Karena akhlak mahmudah mematuhi hukum negara",
                        "C. Karena tradisi masyarakat mendukung sifat tersebut",
                        "D. Karena akhlak mahmudah mendasarkan penilaian pada adat",
                        "E. Karena sifat tersebut diterima secara universal"
                    ],
                    correctAnswer: "A. Karena sifat terpuji adalah bukti amal saleh",
                    explanation: "Akhlak mahmudah merupakan manifestasi keimanan yang tampak melalui amal dan perilaku terpuji."
                },
                {
                    question: "Apa fungsi utama hadis dalam pembentukan akhlak Islam?",
                    options: [
                        "A. Menggambarkan tradisi sosial Rasulullah SAW",
                        "B. Menyempurnakan norma masyarakat",
                        "C. Sebagai penjelas dan pelengkap Al-Qur'an dalam akhlak",
                        "D. Sebagai dasar tunggal moralitas Islam",
                        "E. Sebagai hukum adat yang berlaku universal"
                    ],
                    correctAnswer: "C. Sebagai penjelas dan pelengkap Al-Qur'an dalam akhlak",
                    explanation: "Hadis memberikan panduan lebih spesifik tentang perilaku terpuji sesuai dengan ajaran Al-Qur'an."
                },
                {
                    question: "Apa perbedaan mendasar antara akhlak dan moral dalam hal sumber nilainya?",
                    options: [
                        "A. Akhlak bersumber dari wahyu; moral dari kebiasaan",
                        "B. Moral lebih universal daripada akhlak",
                        "C. Akhlak hanya berlaku di komunitas Muslim",
                        "D. Moral menekankan aspek hukum agama",
                        "E. Akhlak lebih fleksibel dibanding moral"
                    ],
                    correctAnswer: "A. Akhlak bersumber dari wahyu; moral dari kebiasaan",
                    explanation: "Akhlak berdasarkan Al-Qur'an dan Hadis, sedangkan moral berakar pada kebiasaan dan tradisi masyarakat."
                },
                {
                    question: "Apa konsekuensi utama tidak menerapkan akhlak mahmudah dalam kehidupan?",
                    options: [
                        "A. Kehilangan kepercayaan dari masyarakat",
                        "B. Tidak dikenalnya seseorang dalam komunitas",
                        "C. Kelemahan pada hukum negara",
                        "D. Terhalangnya kemajuan teknologi",
                        "E. Penurunan standar pendidikan"
                    ],
                    correctAnswer: "A. Kehilangan kepercayaan dari masyarakat",
                    explanation: "Tidak menerapkan akhlak terpuji dapat merusak hubungan sosial dan kepercayaan antarindividu."
                },
                {
                    question: "Dalam perspektif Islam, apa yang menjadi pembeda utama antara akhlak mahmudah dan madzmumah?",
                    options: [
                        "A. Sumbernya",
                        "B. Dampak sosialnya",
                        "C. Konteks penerapannya",
                        "D. Hubungan dengan hukum adat",
                        "E. Tujuan penerapannya"
                    ],
                    correctAnswer: "B. Dampak sosialnya",
                    explanation: "Akhlak mahmudah menghasilkan kebaikan sosial, sementara madzmumah membawa kerugian dan konflik."
                }
            ];
        default:
            return [];
    }
}

function submitQuiz(courseId, globalUserAnswers, questions) {
    // Count answered questions
    globalUserAnswers = globalUserAnswers || [];

    const answeredQuestions = globalUserAnswers.filter(answer => answer !== null).length;

    const score = globalUserAnswers.reduce((total, answer, index) => {
        // Only count score for answered questions
        if (answer !== null) {
            // Compare with correct answer
            const correctAnswer = questions[index].correctAnswer;
            return answer === correctAnswer ? total + 1 : total;
        }
        return total;
    }, 0);

    // Determine motivational message based on score
    let motivationalMessage = '';

    if (score <= 4) {
        motivationalMessage = 'Jangan menyerah, pasti kamu bisa. Pelajari lagi materi yang kamu belum paham.';
    } else if (score === 5) {
        motivationalMessage = 'Wih keren 50%, mau seberapapun persentasenya kamu harus bangga karena itu hasil pemikiranmu sendiri. Semoga skornya lebih naik ya selanjutnya!';
    } else if (score >= 6 && score < 8) {
        motivationalMessage = 'Tingkatkan lagi! Kamu pasti bisa!';
    } else if (score >= 8 && score < questions.length) {
        motivationalMessage = 'Hampir sempurna! Wah kamu keren banget, tingkatkan lagi bentar lagi sempurna!';
    } else if (score === questions.length) {
        motivationalMessage = 'WoWoWoWow SEMPURNA! Bagi tim tips belajar dong sepuh!';
    }

    Swal.fire({
        title: 'Quiz Submitted!',
        html: `
    <p>Total Questions: ${questions.length}</p>
    <p>Answered Questions: ${answeredQuestions}</p>
    <p>Your Score: ${score}/${questions.length}</p>
    <p style="font-weight: bold; text-align: center; color: #666;">${motivationalMessage}</p>
    <p style="margin-top: 15px; font-weight: bold; text-align: center; font-size: 1.2em; color: #333;">Mau liat penyelesaian?</p>
    <div class="swal2-button-container" style="display: flex; justify-content: center; gap: 10px;">
        <button id="viewSolutions" class="swal2-confirm swal2-styled" style="background-color: #3085d6;">Ya</button>
        <button id="cancelSolutions" class="swal2-cancel swal2-styled" style="background-color: #dc3545;">Ngga dulu deh</button>
    </div>
`,
        icon: 'success',
        showConfirmButton: false,
        showCancelButton: false,
    });

    // Add event listeners for custom buttons
    document.addEventListener('click', function(event) {
        if (event.target) {
            if (event.target.id === 'viewSolutions') {
                // Call the function to render solutions
                document.getElementById('quizPopup').classList.add('hidden'); // Hide the popup
                renderSolutions();

                // Close the SweetAlert dialog
                Swal.close();
            } else if (event.target.id === 'cancelSolutions') {
                // Close the SweetAlert dialog
                Swal.close();
            }
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    video();
    quiz();

    document.getElementById('cancelQuiz').addEventListener('click', () => {
        // Show a confirmation dialog using SweetAlert
        Swal.fire({
            title: 'Yakin mau keluar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Iya yakin',
            cancelButtonText: 'Ga jadi deh'
        }).then((result) => {
            if (result.isConfirmed) {
                // User confirmed cancellation
                clearInterval(timerInterval);
                timeRemaining = 30 * 60; // Reset time to 30 minutes
                document.getElementById('timer').innerText = '30:00';
                document.getElementById('quizPopup').classList.add('hidden'); // Hide the popup
                
                // Show success message
                Swal.fire(
                    'Cancelled!',
                    'Oke quiz ke cancel ya, sampai jumpa nanti!',
                    'success'
                );
            }
        });
    });
    });
