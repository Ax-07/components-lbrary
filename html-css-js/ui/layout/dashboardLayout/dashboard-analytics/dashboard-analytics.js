document.addEventListener("DOMContentLoaded", () => {
    // Example using Chart.js for Visitors Chart
    const ctx = document.getElementById('visitorsChart').getContext('2d');
    const visitorsChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
        datasets: [{
          label: 'Visiteurs',
          data: [120, 190, 300, 500, 200, 300, 400],
          backgroundColor: 'rgba(0, 123, 255, 0.2)',
          borderColor: 'rgba(0, 123, 255, 1)',
          borderWidth: 1,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        // Additional chart options for accessibility
        plugins: {
          legend: {
            display: true,
            labels: {
              color: 'var(--text-color)'
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Jour de la semaine',
              color: 'var(--text-color)'
            },
            ticks: {
              color: 'var(--text-color)'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Nombre de visiteurs',
              color: 'var(--text-color)'
            },
            ticks: {
              color: 'var(--text-color)'
            },
            beginAtZero: true
          }
        }
      }
    });
  });
  