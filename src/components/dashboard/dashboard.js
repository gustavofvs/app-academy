export async function initDashboard() {
    // Fetch dashboard data from the backend
    try {
        const response = await fetch('http://localhost:3000/api/dashboard');
        const data = await response.json();

        document.querySelector('.stat-number[data-target="152"]').setAttribute('data-target', data.activeClients);
        document.querySelector('.stat-number[data-target="89"]').setAttribute('data-target', data.registeredPlans);
        document.querySelector('.stat-number[data-target="12"]').setAttribute('data-target', data.scheduledClasses);
        document.querySelector('.stat-number[data-target="5"]').setAttribute('data-target', data.newNotifications);

        // Animação de Contagem
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;
        const animateCounter = (counter) => {
            const target = +counter.getAttribute('data-target');
            const updateCount = () => {
                const count = +counter.innerText;
                const increment = target / speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        };
        counters.forEach(animateCounter);

    } catch (error) {
        console.error('Error fetching dashboard data:', error);
    }
}