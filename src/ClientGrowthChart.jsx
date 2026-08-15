import React from "react";
import {
  CategoryScale,
  Chart,
  Filler,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

Chart.register(CategoryScale, Filler, LineController, LineElement, LinearScale, PointElement, Tooltip);

const clientTotals = [10, 14, 18, 22, 31, 43, 57, 72, 88, 104, 119, 132];
const inquiries = [8, 10, 13, 16, 25, 38, 51, 67, 84, 102, 119, 137];
const labels = Array.from({ length: 12 }, (_, index) => `Month ${index + 1}`);
const launchIndex = 3;

const launchMarker = {
  id: "launchMarker",
  afterDatasetsDraw(chart, _args, options) {
    const { ctx, chartArea, scales } = chart;
    if (!chartArea || !scales.x) return;

    const x = scales.x.getPixelForValue(options.index);
    ctx.save();
    ctx.strokeStyle = "rgba(240, 209, 142, 0.78)";
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, chartArea.top + 28);
    ctx.lineTo(x, chartArea.bottom);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.font = "700 11px Inter, system-ui, sans-serif";
    const label = options.label;
    const paddingX = 8;
    const labelWidth = ctx.measureText(label).width + paddingX * 2;
    const labelX = Math.min(Math.max(x - labelWidth / 2, chartArea.left), chartArea.right - labelWidth);
    ctx.fillStyle = "#1a202b";
    ctx.strokeStyle = "rgba(240, 209, 142, 0.62)";
    ctx.beginPath();
    ctx.roundRect(labelX, chartArea.top + 2, labelWidth, 22, 7);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#f0d18e";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, labelX + labelWidth / 2, chartArea.top + 13);
    ctx.restore();
  },
};

export function ClientGrowthChart({ isPortuguese = false }) {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const chart = new Chart(canvas, {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: "Active clients",
          data: clientTotals,
          borderColor: "#68c3f3",
          borderWidth: 3,
          cubicInterpolationMode: "monotone",
          fill: true,
          pointBackgroundColor: (context) => context.dataIndex === launchIndex ? "#f0d18e" : "#68c3f3",
          pointBorderColor: "#0b0f19",
          pointBorderWidth: (context) => context.dataIndex === launchIndex ? 3 : 2,
          pointHoverRadius: 7,
          pointRadius: (context) => context.dataIndex === launchIndex ? 7 : 3,
          backgroundColor: (context) => {
            const { chart: currentChart } = context;
            const { ctx, chartArea } = currentChart;
            if (!chartArea) return "rgba(104, 195, 243, 0.14)";
            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            gradient.addColorStop(0, "rgba(104, 195, 243, 0.34)");
            gradient.addColorStop(1, "rgba(104, 195, 243, 0.015)");
            return gradient;
          },
          tension: 0.38,
        }],
      },
      plugins: [launchMarker],
      options: {
        animation: { duration: 700 },
        maintainAspectRatio: false,
        responsive: true,
        interaction: { intersect: false, mode: "index" },
        layout: { padding: { top: 12, right: 6, left: 2 } },
        plugins: {
          legend: { display: false },
          launchMarker: { index: launchIndex, label: "New Website Launched" },
          tooltip: {
            backgroundColor: "rgba(8, 14, 22, 0.96)",
            borderColor: "rgba(104, 195, 243, 0.42)",
            borderWidth: 1,
            displayColors: false,
            padding: 12,
            titleColor: "#f7f9fc",
            bodyColor: "#cbd5e1",
            callbacks: {
              title: (items) => items[0]?.label || "",
              label: (item) => `Total Clients: ${item.parsed.y}`,
              afterLabel: (item) => `Inquiries Generated: ${inquiries[item.dataIndex]}`,
            },
          },
        },
        scales: {
          x: {
            border: { display: false },
            grid: { display: false },
            ticks: { color: "#93a1b3", font: { size: 11, weight: "600" }, maxRotation: 0 },
          },
          y: {
            beginAtZero: true,
            border: { display: false },
            grid: { color: "rgba(255, 255, 255, 0.08)" },
            ticks: { color: "#93a1b3", font: { size: 11, weight: "600" }, padding: 8, stepSize: 25 },
          },
        },
      },
    });

    return () => chart.destroy();
  }, []);

  const heading = isPortuguese ? "Crescimento que acompanha o seu negócio." : "Growth that follows a stronger web presence.";
  const description = isPortuguese
    ? "Um exemplo ilustrativo de como um site claro e orientado à conversão pode apoiar a geração de oportunidades ao longo do tempo."
    : "An illustrative example of how a clear, conversion-focused website can support lead generation over time.";

  return (
    <section className="client-growth" aria-labelledby="client-growth-title">
      <div className="intl-shell client-growth__grid">
        <div className="client-growth__copy">
          <p className="eyebrow">{isPortuguese ? "Impacto digital" : "Digital impact"}</p>
          <h2 id="client-growth-title">{heading}</h2>
          <p>{description}</p>
          <dl className="client-growth__stats">
            <div><dt>{isPortuguese ? "Antes do site" : "Before the website"}</dt><dd>10–18</dd></div>
            <div><dt>{isPortuguese ? "Após o lançamento" : "After launch"}</dt><dd>132</dd></div>
          </dl>
        </div>
        <div className="client-growth__chart-wrap">
          <canvas
            ref={canvasRef}
            className="client-growth__chart"
            role="img"
            aria-label="Illustrative active client growth from 10 in month one to 132 in month twelve, with a new website launched in month four."
          />
        </div>
      </div>
    </section>
  );
}
