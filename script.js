
const tradeData = [
  {
    "date": "2026-03-23",
    "trade": "QQQ 260323P587",
    "size": 50,
    "entry": 1.56,
    "avg_exit": 1.2,
    "pl_pct": -23.08,
    "pl_usd": -1800
  },
  {
    "date": "2026-03-23",
    "trade": "QQQ 260323P592",
    "size": 50,
    "entry": 1.33,
    "avg_exit": 5.82,
    "pl_pct": 337.59,
    "pl_usd": 22450
  },
  {
    "date": "2026-03-23",
    "trade": "QQQ 260323C589",
    "size": 50,
    "entry": 1.15,
    "avg_exit": 1.97,
    "pl_pct": 71.3,
    "pl_usd": 4100
  },
  {
    "date": "2026-03-24",
    "trade": "QQQ 260324C587",
    "size": 50,
    "entry": 2.065,
    "avg_exit": 0.99,
    "pl_pct": -52.06,
    "pl_usd": -5375
  },
  {
    "date": "2026-03-24",
    "trade": "QQQ 260324P583",
    "size": 50,
    "entry": 2.37,
    "avg_exit": 0.15,
    "pl_pct": -93.67,
    "pl_usd": -11100
  },
  {
    "date": "2026-03-25",
    "trade": "QQQ 260325P588",
    "size": 50,
    "entry": 2.25,
    "avg_exit": 1.16,
    "pl_pct": -48.44,
    "pl_usd": -5450
  },
  {
    "date": "2026-03-25",
    "trade": "QQQ 260325P589",
    "size": 50,
    "entry": 1.65,
    "avg_exit": 3.9,
    "pl_pct": 136.36,
    "pl_usd": 11250
  },
  {
    "date": "2026-03-25",
    "trade": "QQQ 260325C589",
    "size": 50,
    "entry": 1.29,
    "avg_exit": 1.75,
    "pl_pct": 35.66,
    "pl_usd": 2300
  },
  {
    "date": "2026-03-26",
    "trade": "QQQ 260326P582",
    "size": 50,
    "entry": 1.85,
    "avg_exit": 1.07,
    "pl_pct": -42.16,
    "pl_usd": -3900
  },
  {
    "date": "2026-03-26",
    "trade": "QQQ 260326P581",
    "size": 50,
    "entry": 1.63,
    "avg_exit": 7.4,
    "pl_pct": 353.99,
    "pl_usd": 28850
  },
  {
    "date": "2026-03-27",
    "trade": "QQQ 260327P569",
    "size": 50,
    "entry": 2.3,
    "avg_exit": 3.6,
    "pl_pct": 56.52,
    "pl_usd": 6500
  },
  {
    "date": "2026-03-27",
    "trade": "QQQ 260327C568",
    "size": 50,
    "entry": 1.83,
    "avg_exit": 2.55,
    "pl_pct": 39.34,
    "pl_usd": 3600
  },
  {
    "date": "2026-03-27",
    "trade": "QQQ 260327P567",
    "size": 50,
    "entry": 1.45,
    "avg_exit": 1.24,
    "pl_pct": -14.48,
    "pl_usd": -1050
  },
  {
    "date": "2026-03-27",
    "trade": "QQQ 260327C568",
    "size": 50,
    "entry": 1.03,
    "avg_exit": 0.63,
    "pl_pct": -38.83,
    "pl_usd": -2000
  },
  {
    "date": "2026-03-27",
    "trade": "QQQ 260327P565",
    "size": 50,
    "entry": 0.96,
    "avg_exit": 3.3,
    "pl_pct": 243.75,
    "pl_usd": 11700
  }
];

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

const formatPercent = (value) => `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;

const dailyMap = tradeData.reduce((acc, trade) => {
  acc[trade.date] = (acc[trade.date] || 0) + trade.pl_usd;
  return acc;
}, {});

const dailyLabels = Object.keys(dailyMap).sort();
const dailyPL = dailyLabels.map(d => dailyMap[d]);

let running = 0;
const cumulativePL = tradeData.map(t => {
  running += t.pl_usd;
  return running;
});

const totalTrades = tradeData.length;
const winningTrades = tradeData.filter(t => t.pl_usd > 0);
const losingTrades = tradeData.filter(t => t.pl_usd < 0);
const totalPL = tradeData.reduce((sum, t) => sum + t.pl_usd, 0);
const winRate = (winningTrades.length / totalTrades) * 100;
const avgPLPct = tradeData.reduce((sum, t) => sum + t.pl_pct, 0) / totalTrades;
const avgWin = winningTrades.reduce((sum, t) => sum + t.pl_usd, 0) / winningTrades.length;
const avgLoss = losingTrades.reduce((sum, t) => sum + t.pl_usd, 0) / losingTrades.length;
const profitFactor =
  winningTrades.reduce((sum, t) => sum + t.pl_usd, 0) /
  Math.abs(losingTrades.reduce((sum, t) => sum + t.pl_usd, 0));
const bestTrade = tradeData.reduce((best, t) => (t.pl_usd > best.pl_usd ? t : best), tradeData[0]);
const worstTrade = tradeData.reduce((worst, t) => (t.pl_usd < worst.pl_usd ? t : worst), tradeData[0]);

document.getElementById('totalPL').textContent = formatCurrency(totalPL);
document.getElementById('totalPL').classList.add(totalPL >= 0 ? 'positive' : 'negative');
document.getElementById('winRate').textContent = `${winRate.toFixed(1)}%`;
document.getElementById('totalTrades').textContent = totalTrades;
document.getElementById('profitFactor').textContent = profitFactor.toFixed(2);
document.getElementById('avgPLPct').textContent = formatPercent(avgPLPct);
document.getElementById('bestTrade').textContent = `${bestTrade.trade} · ${formatCurrency(bestTrade.pl_usd)}`;
document.getElementById('worstTrade').textContent = `${worstTrade.trade} · ${formatCurrency(worstTrade.pl_usd)}`;

const tbody = document.getElementById('tradeTableBody');
tradeData.forEach((trade, index) => {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${index + 1}</td>
    <td>${new Date(trade.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
    <td>${trade.trade}</td>
    <td>${trade.size}</td>
    <td>${trade.entry.toFixed(3)}</td>
    <td>${trade.avg_exit.toFixed(2)}</td>
    <td class="${trade.pl_pct >= 0 ? 'positive' : 'negative'}">${formatPercent(trade.pl_pct)}</td>
    <td class="${trade.pl_usd >= 0 ? 'positive' : 'negative'}">${formatCurrency(trade.pl_usd)}</td>
  `;
  tbody.appendChild(tr);
});

Chart.defaults.color = '#cbd5e1';
Chart.defaults.borderColor = 'rgba(148,163,184,0.15)';
Chart.defaults.font.family = 'Inter, system-ui, sans-serif';

new Chart(document.getElementById('equityCurveChart'), {
  type: 'line',
  data: {
    labels: tradeData.map((t, i) => `Trade ${i + 1}`),
    datasets: [{
      label: 'Cumulative P/L ($)',
      data: cumulativePL,
      borderColor: '#60a5fa',
      backgroundColor: 'rgba(96,165,250,0.18)',
      fill: true,
      tension: 0.28,
      pointRadius: 4,
      pointHoverRadius: 6
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${formatCurrency(ctx.parsed.y)}`
        }
      }
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => formatCurrency(value)
        }
      }
    }
  }
});

new Chart(document.getElementById('dailyPLChart'), {
  type: 'bar',
  data: {
    labels: dailyLabels.map(d => new Date(d + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
    datasets: [{
      label: 'Daily P/L ($)',
      data: dailyPL,
      backgroundColor: dailyPL.map(v => v >= 0 ? 'rgba(52,211,153,0.75)' : 'rgba(248,113,113,0.75)'),
      borderRadius: 8
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${formatCurrency(ctx.parsed.y)}`
        }
      }
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => formatCurrency(value)
        }
      }
    }
  }
});

new Chart(document.getElementById('winLossChart'), {
  type: 'doughnut',
  data: {
    labels: ['Wins', 'Losses'],
    datasets: [{
      data: [winningTrades.length, losingTrades.length],
      backgroundColor: ['rgba(52,211,153,0.85)', 'rgba(248,113,113,0.85)'],
      borderWidth: 0
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '68%',
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  }
});

new Chart(document.getElementById('tradeReturnChart'), {
  type: 'bar',
  data: {
    labels: tradeData.map((t, i) => `T${i + 1}`),
    datasets: [{
      label: 'P/L % by Trade',
      data: tradeData.map(t => t.pl_pct),
      backgroundColor: tradeData.map(t => t.pl_pct >= 0 ? 'rgba(96,165,250,0.78)' : 'rgba(251,191,36,0.78)'),
      borderRadius: 6
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${formatPercent(ctx.parsed.y)}`
        }
      }
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => `${value}%`
        }
      }
    }
  }
});

const insightList = document.getElementById('insights');
[
  `Net realized P/L: ${formatCurrency(totalPL)} across ${totalTrades} trades.`,
  `Win rate: ${winRate.toFixed(1)}% with average win of ${formatCurrency(avgWin)} and average loss of ${formatCurrency(avgLoss)}.`,
  `Best trade: ${bestTrade.trade} returned ${formatCurrency(bestTrade.pl_usd)}.`,
  `Worst trade: ${worstTrade.trade} returned ${formatCurrency(worstTrade.pl_usd)}.`,
  `Profit factor: ${profitFactor.toFixed(2)}. Average return per trade: ${formatPercent(avgPLPct)}.`
].forEach(text => {
  const li = document.createElement('li');
  li.textContent = text;
  insightList.appendChild(li);
});
