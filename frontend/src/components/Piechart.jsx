import "chart.js/auto";
import { useMemo } from "react";
import { Pie } from "react-chartjs-2";

import styles from "../css/DashBoard.module.css";
import { groupDataByMonths } from "../utils/groupData";
function Piechart({ data, monthEnd, monthStart }) {
  const chartData = useMemo(() => {
    const filteredMonthData = groupDataByMonths(data, monthStart, monthEnd);

    if (!filteredMonthData || filteredMonthData.length === 0) return null;

    const counts = filteredMonthData.reduce((acc, curr) => {
      const status = curr.status || "Unknown";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(counts),
      datasets: [
        {
          data: Object.values(counts),
          backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"],
          borderWidth: 1,
        },
      ],
    };
  }, [data, monthStart, monthEnd]);

  return (
    <section className={`${styles.panel} ${styles.piePanel}`}>
      <header className={styles.panelHeader}>
        <div>
          <p className={styles.panelEyebrow}>Status mix</p>
          <h2 className={styles.panelTitle}>Where this month stands</h2>
          <p className={styles.panelDescription}>
            See which stages are taking up the most space in your current
            application cycle.
          </p>
        </div>
      </header>

      {!chartData ? (
        <div className={styles.emptyChart}>No application data for this period.</div>
      ) : (
        <div className={styles.chartWrap}>
          <Pie
            data={chartData}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "bottom",
                  labels: {
                    usePointStyle: true,
                    pointStyle: "circle",
                    useBorderRadius: true,
                    padding: 18,
                    color: "#41505d",
                    font: {
                      size: 12,
                    },
                  },
                },
              },
            }}
          />
        </div>
      )}
    </section>
  );
}

export default Piechart;
