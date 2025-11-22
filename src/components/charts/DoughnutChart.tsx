"use client";
import { formatAmount } from "@/lib/utils";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  CoreChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  accounts: PlaidAccount[];
}

const options = {
  cutout: "60%",
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (context: any) => formatAmount(context.raw),
      },
    },
  },
};

function DoughnutChart({ accounts }: DoughnutChartProps) {
  const accountNames = accounts.map((a) => a.name);
  const accountBalances = accounts.map((a) => a.currentBalance);
  const data: ChartData<"doughnut", number[], any> = {
    datasets: [
      {
        label: "Banks",
        data: accountBalances,
        backgroundColor: ["#0747b6", "#2265d8", "#2f91f8"],
      },
    ],
    labels: accountNames,
  };
  return <Doughnut data={data} options={options} />;
}

export default DoughnutChart;
