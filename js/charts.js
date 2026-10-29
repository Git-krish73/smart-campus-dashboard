// ==========================================================================
// CampusVision AI - Dynamic Chart.js Analytics
// Training curves, Confusion Matrix, and Per-Class Performance
// ==========================================================================

const CampusCharts = {
  trainingChart: null,
  classMetricsChart: null,
  datasetDistChart: null,

  // Notebook Training History (5 Epochs)
  trainingData: {
    epochs: ['Epoch 1', 'Epoch 2', 'Epoch 3', 'Epoch 4', 'Epoch 5'],
    loss: [1.2160, 0.4735, 0.2228, 0.1488, 0.1276],
    accuracy: [57.34, 85.94, 94.06, 96.56, 96.88]
  },

  // Test Evaluation Metrics (160 Test Images)
  classMetrics: {
    labels: ['Classroom', 'Common_Canteen', 'Corridor', 'Laboratory', 'Library', 'Office'],
    precision: [0.82, 1.00, 1.00, 0.82, 0.62, 0.89],
    recall: [0.90, 0.77, 0.95, 0.90, 1.00, 0.85],
    f1: [0.86, 0.87, 0.97, 0.86, 0.77, 0.87],
    support: [20, 60, 20, 20, 20, 20]
  },

  // Confusion Matrix Raw Values [Actual x Predicted]
  confusionMatrix: [
    [18, 0, 0, 0, 2, 0],   // Classroom (20)
    [2, 46, 0, 2, 8, 2],   // Common_Canteen (60)
    [1, 0, 19, 0, 0, 0],   // Corridor (20)
    [1, 0, 0, 18, 1, 0],   // Laboratory (20)
    [0, 0, 0, 0, 20, 0],   // Library (20)
    [0, 0, 0, 2, 1, 17]    // Office (20)
  ],

  init() {
    this.renderTrainingCurves();
    this.renderClassMetrics();
    this.renderDatasetDistribution();
    this.renderConfusionMatrixTable();
  },

  renderTrainingCurves() {
    const ctx = document.getElementById('trainingCurvesCanvas');
    if (!ctx) return;

    if (this.trainingChart) this.trainingChart.destroy();

    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const textColor = isDark ? '#94A3B8' : '#475569';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)';

    this.trainingChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.trainingData.epochs,
        datasets: [
          {
            label: 'Accuracy (%)',
            data: this.trainingData.accuracy,
            borderColor: '#38bdf8',
            backgroundColor: 'rgba(56, 189, 248, 0.12)',
            borderWidth: 3,
            fill: true,
            tension: 0.35,
            yAxisID: 'yAcc',
            pointBackgroundColor: '#38bdf8',
            pointBorderColor: '#ffffff',
            pointRadius: 5,
            pointHoverRadius: 8
          },
          {
            label: 'Loss',
            data: this.trainingData.loss,
            borderColor: '#f43f5e',
            backgroundColor: 'rgba(244, 63, 94, 0.08)',
            borderWidth: 3,
            fill: true,
            tension: 0.35,
            yAxisID: 'yLoss',
            pointBackgroundColor: '#f43f5e',
            pointBorderColor: '#ffffff',
            pointRadius: 5,
            pointHoverRadius: 8
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            position: 'top',
            labels: { color: textColor, font: { family: 'Plus Jakarta Sans', weight: '600' } }
          },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            titleColor: '#38bdf8',
            bodyColor: '#FFFFFF',
            borderColor: 'rgba(56, 189, 248, 0.3)',
            borderWidth: 1,
            padding: 12,
            boxPadding: 6,
            usePointStyle: true
          }
        },
        scales: {
          x: {
            grid: { color: gridColor },
            ticks: { color: textColor, font: { family: 'JetBrains Mono' } }
          },
          yAcc: {
            type: 'linear',
            position: 'left',
            min: 50,
            max: 100,
            grid: { color: gridColor },
            ticks: {
              color: '#38bdf8',
              callback: value => value + '%',
              font: { family: 'JetBrains Mono' }
            },
            title: { display: true, text: 'Training Accuracy', color: '#38bdf8' }
          },
          yLoss: {
            type: 'linear',
            position: 'right',
            min: 0,
            max: 1.4,
            grid: { drawOnChartArea: false },
            ticks: {
              color: '#f43f5e',
              font: { family: 'JetBrains Mono' }
            },
            title: { display: true, text: 'CrossEntropy Loss', color: '#f43f5e' }
          }
        }
      }
    });
  },

  renderClassMetrics() {
    const ctx = document.getElementById('classMetricsCanvas');
    if (!ctx) return;

    if (this.classMetricsChart) this.classMetricsChart.destroy();

    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const textColor = isDark ? '#94A3B8' : '#475569';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)';

    this.classMetricsChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Classroom', 'Canteen', 'Corridor', 'Laboratory', 'Library', 'Office'],
        datasets: [
          {
            label: 'Precision',
            data: this.classMetrics.precision.map(v => v * 100),
            backgroundColor: 'rgba(56, 189, 248, 0.75)',
            borderColor: '#38bdf8',
            borderWidth: 1,
            borderRadius: 6
          },
          {
            label: 'Recall',
            data: this.classMetrics.recall.map(v => v * 100),
            backgroundColor: 'rgba(168, 85, 247, 0.75)',
            borderColor: '#a855f7',
            borderWidth: 1,
            borderRadius: 6
          },
          {
            label: 'F1-Score',
            data: this.classMetrics.f1.map(v => v * 100),
            backgroundColor: 'rgba(16, 185, 129, 0.75)',
            borderColor: '#10b981',
            borderWidth: 1,
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: { color: textColor, font: { family: 'Plus Jakarta Sans', weight: '600' } }
          },
          tooltip: {
            callbacks: {
              label: context => `${context.dataset.label}: ${context.raw.toFixed(1)}%`
            }
          }
        },
        scales: {
          x: {
            grid: { color: gridColor },
            ticks: { color: textColor, font: { family: 'Plus Jakarta Sans', weight: '600' } }
          },
          y: {
            min: 50,
            max: 105,
            grid: { color: gridColor },
            ticks: {
              color: textColor,
              callback: value => value + '%',
              font: { family: 'JetBrains Mono' }
            }
          }
        }
      }
    });
  },

  renderDatasetDistribution() {
    const ctx = document.getElementById('datasetDistCanvas');
    if (!ctx) return;

    if (this.datasetDistChart) this.datasetDistChart.destroy();

    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const textColor = isDark ? '#94A3B8' : '#475569';

    this.datasetDistChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Common Canteen (300)', 'Classroom (100)', 'Corridor (100)', 'Laboratory (100)', 'Library (100)', 'Office (100)'],
        datasets: [{
          data: [300, 100, 100, 100, 100, 100],
          backgroundColor: [
            '#06b6d4',
            '#3b82f6',
            '#8b5cf6',
            '#ec4899',
            '#f59e0b',
            '#10b981'
          ],
          borderColor: isDark ? '#0f172a' : '#ffffff',
          borderWidth: 2,
          hoverOffset: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 12 } }
          },
          tooltip: {
            callbacks: {
              label: item => ` ${item.label}: ${item.raw} images (${((item.raw / 800) * 100).toFixed(1)}%)`
            }
          }
        },
        cutout: '68%'
      }
    });
  },

  renderConfusionMatrixTable() {
    const container = document.getElementById('confusionMatrixTableContainer');
    if (!container) return;

    const classes = ['Classroom', 'Canteen', 'Corridor', 'Laboratory', 'Library', 'Office'];
    const totalSamples = [20, 60, 20, 20, 20, 20];

    let html = `<table class="cm-table">
      <thead>
        <tr>
          <th>True \\ Pred</th>
          ${classes.map(c => `<th>${c}</th>`).join('')}
          <th>Recall</th>
        </tr>
      </thead>
      <tbody>`;

    for (let i = 0; i < classes.length; i++) {
      const correct = this.confusionMatrix[i][i];
      const rowTotal = totalSamples[i];
      const recallPct = ((correct / rowTotal) * 100).toFixed(0);

      html += `<tr>
        <td class="header-col">${classes[i]}</td>`;

      for (let j = 0; j < classes.length; j++) {
        const val = this.confusionMatrix[i][j];
        const isDiag = i === j;
        const intensity = (val / rowTotal);
        
        let bgColor = 'rgba(255, 255, 255, 0.02)';
        let fontColor = '#64748b';
        
        if (isDiag && val > 0) {
          bgColor = `rgba(56, 189, 248, ${Math.max(0.2, intensity * 0.85)})`;
          fontColor = intensity > 0.6 ? '#ffffff' : '#38bdf8';
        } else if (!isDiag && val > 0) {
          bgColor = `rgba(244, 63, 94, ${Math.max(0.2, (val / 10) * 0.7)})`;
          fontColor = '#fca5a5';
        }

        html += `<td class="cm-cell" style="background:${bgColor}; color:${fontColor};" 
                     title="True: ${classes[i]}, Pred: ${classes[j]} (${val} samples)">
                   ${val}
                 </td>`;
      }

      html += `<td style="color:var(--accent-emerald); font-weight:700;">${recallPct}%</td>
      </tr>`;
    }

    html += `</tbody></table>`;
    container.innerHTML = html;
  }
};

window.CampusCharts = CampusCharts;
