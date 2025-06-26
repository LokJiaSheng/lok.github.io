// JavaScript for responsive navigation toggle and dynamic content

document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mainNav = document.getElementById('main-nav');

    // Mobile navigation toggle logic
    if (mobileMenuButton && mainNav) {
        mobileMenuButton.addEventListener('click', () => {
            // Toggle 'show' class to reveal/hide the navigation menu
            mainNav.classList.toggle('show');
        });
    }

    // --- Dynamic Content for News & Events Page ---
    // Get references to news and events containers and load more buttons
    const newsContainer = document.getElementById('news-container');
    const eventsContainer = document.getElementById('events-container');
    const loadMoreNewsButton = document.getElementById('load-more-news');
    const loadMoreEventsButton = document.getElementById('load-more-events');

    let newsPageIndex = 0; // Current page index for news
    let eventsPageIndex = 0; // Current page index for events
    const itemsPerPage = 3; // Number of news/events to load at a time

    // Simulate news data (in a real application, this would be fetched from an API)
    const allNews = [
        {
            title: "University Announces New Research Grant Opportunities",
            date: "June 20, 2024",
            summary: "Exciting new grants are available for faculty and students across various disciplines to foster groundbreaking research.",
            link: "#",
            imageUrl: "research.jpg" // Example placeholder image
        },
        {
            title: "Annual Student Innovation Showcase a Great Success",
            date: "October 15, 2024",
            summary: "Students presented their innovative projects, demonstrating creativity and problem-solving skills to a panel of industry experts.",
            link: "#",
            imageUrl: "innovation.jpg" // User-provided image
        },
        {
            title: "Alumni Reunion Weekend Brings Graduates Back to Campus",
            date: "March 10, 2025",
            summary: "A weekend of cherished memories, networking, and celebration as alumni reconnected with their alma mater.",
            link: "#",
            imageUrl: "reunion.jpg"
        },       
   ];

    // Simulate event data (in a real application, this would be fetched from an API)
    const allEvents = [
        {
            title: "Guest Lecture: The Future of AI",
            date: "July 5, 2024",
            time: "10:00 AM - 11:30 AM",
            location: "Auditorium A",
            summary: "Join us for a thought-provoking lecture by Dr. Alan Turing on the ethical implications and advancements in Artificial Intelligence.",
            link: "#",
            imageUrl: "future of ai.jpg" // User-provided image
        },
        {
            title: "Summer Career Fair",
            date: "July 12, 2024",
            time: "9:00 AM - 4:00 PM",
            location: "Sports Hall",
            summary: "Connect with leading companies and explore internship and job opportunities. Open to all students.",
            link: "#",
            imageUrl: "job.jpg"
        },
        {
            title: "Orientation Day for New Students",
            date: "August 20, 2024",
            time: "8:30 AM - 5:00 PM",
            location: "University Square",
            summary: "A warm welcome to all new students! Learn about campus life, resources, and meet your peers.",
            link: "#",
            imageUrl: "orientation.jpg"
        },
           ];

    // Function to render news articles into the DOM
    function renderNews() {
        // Only proceed if newsContainer element exists on the current page
        if (!newsContainer) return;

        const startIndex = newsPageIndex * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const newsToRender = allNews.slice(startIndex, endIndex); // Get a slice of news data

        // If no more news to render, hide the "Load More" button
        if (newsToRender.length === 0) {
            if (loadMoreNewsButton) loadMoreNewsButton.style.display = 'none';
            return;
        }

        // Loop through news items and create HTML cards for each
        newsToRender.forEach(newsItem => {
            const newsCard = `
                <div class="news-card">
                    ${newsItem.imageUrl ? `<img src="${newsItem.imageUrl}" alt="${newsItem.title}" class="card-image">` : ''}
                    <p class="card-date">${newsItem.date}</p>
                    <h3 class="card-title">${newsItem.title}</h3>
                    <p class="card-summary">${newsItem.summary}</p>
                    <a href="${newsItem.link}" class="card-link">Read More &rarr;</a>
                </div>
            `;
            newsContainer.insertAdjacentHTML('beforeend', newsCard); // Insert card HTML into the container
        });

        newsPageIndex++; // Increment page index for next load
        // If all news has been loaded, hide the "Load More" button
        if (newsPageIndex * itemsPerPage >= allNews.length) {
            if (loadMoreNewsButton) loadMoreNewsButton.style.display = 'none';
        }
    }

    // Function to render events into the DOM
    function renderEvents() {
        // Only proceed if eventsContainer element exists on the current page
        if (!eventsContainer) return;

        const startIndex = eventsPageIndex * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const eventsToRender = allEvents.slice(startIndex, endIndex); // Get a slice of event data

        // If no more events to render, hide the "Load More" button
        if (eventsToRender.length === 0) {
            if (loadMoreEventsButton) loadMoreEventsButton.style.display = 'none';
            return;
        }

        // Loop through event items and create HTML cards for each
        eventsToRender.forEach(eventItem => {
            const eventCard = `
                <div class="event-card">
                    ${eventItem.imageUrl ? `<img src="${eventItem.imageUrl}" alt="${eventItem.title}" class="card-image">` : ''}
                    <p class="card-date">${eventItem.date} | ${eventItem.time}</p>
                    <h3 class="card-title">${eventItem.title}</h3>
                    <p class="card-summary">${eventItem.summary}</p>
                    <p class="card-location">Location: ${eventItem.location}</p>
                    <a href="${eventItem.link}" class="card-link">View Details &rarr;</a>
                </div>
            `;
            eventsContainer.insertAdjacentHTML('beforeend', eventCard); // Insert card HTML into the container
        });

        eventsPageIndex++; // Increment page index for next load
        // If all events has been loaded, hide the "Load More" button
        if (eventsPageIndex * itemsPerPage >= allEvents.length) {
            if (loadMoreEventsButton) loadMoreEventsButton.style.display = 'none';
        }
    }

    // Initial load of content for News & Events page if elements exist
    if (newsContainer) {
        renderNews(); // Render initial news
        if (loadMoreNewsButton) {
            loadMoreNewsButton.addEventListener('click', renderNews); // Attach event listener for "Load More News" button
        }
    }
    if (eventsContainer) {
        renderEvents(); // Render initial events
        if (loadMoreEventsButton) {
            loadMoreEventsButton.addEventListener('click', renderEvents); // Attach event listener for "Load More Events" button
        }
    }

    // --- Password Strength Checker (for login.html) ---
    const passwordInput = document.getElementById('password');
    const strengthIndicator = document.getElementById('password-strength-indicator');

    // Function to check password strength based on various criteria
    function checkPasswordStrength(password) {
        let strength = 0; // Initialize strength score
        let feedback = []; // Array to store feedback messages

        // Check for different criteria and update strength/feedback
        const hasLength = password.length >= 8;
        const hasLowercase = /[a-z]/.test(password);
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[^a-zA-Z0-9\s]/.test(password); // Checks for non-alphanumeric, non-space characters

        if (hasLength) strength++; else feedback.push("at least 8 characters");
        if (hasLowercase) strength++; else feedback.push("a lowercase letter");
        if (hasUppercase) strength++; else feedback.push("an uppercase letter");
        if (hasNumber) strength++; else feedback.push("a number");
        if (hasSpecialChar) strength++; else feedback.push("a special character");

        let strengthText = "";
        let textColorClass = ""; // Class for text color (e.g., 'text-red-500')

        // Determine strength text and color based on score
        if (password.length === 0) {
            strengthText = ""; // No text if input is empty
            textColorClass = "";
        } else if (strength <= 1) {
            strengthText = "Very Weak";
            textColorClass = "text-red-500";
        } else if (strength === 2) {
            strengthText = "Weak";
            textColorClass = "text-orange-500";
        } else if (strength === 3) {
            strengthText = "Medium";
            textColorClass = "text-yellow-600";
        } else if (strength === 4) {
            strengthText = "Strong";
            textColorClass = "text-green-600";
        } else if (strength === 5) {
            strengthText = "Very Strong";
            textColorClass = "text-green-700";
        }

        let recommendation = "";
        // Provide recommendations if password is not "Very Strong"
        if (strength < 5 && password.length > 0) {
            recommendation = " (Needs: " + feedback.join(", ") + ")";
        }

        return { strengthText, textColorClass, recommendation };
    }

    // Attach an event listener to the password input field on the login page
    // This ensures real-time feedback as the user types
    if (passwordInput && strengthIndicator) {
        passwordInput.addEventListener('input', () => {
            const { strengthText, textColorClass, recommendation } = checkPasswordStrength(passwordInput.value);
            strengthIndicator.textContent = `Strength: ${strengthText}${recommendation}`;
            // Apply the appropriate color class to the indicator
            strengthIndicator.className = 'password-strength-indicator ' + textColorClass;
        });
    }
});
