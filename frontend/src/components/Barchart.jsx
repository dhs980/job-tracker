import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { format } from "date-fns";
import { useMemo } from "react";

import styles from "../css/DashBoard.module.css";
import { groupDataByWeeks } from "../utils/groupData";
function Barchart({
  data,
  viewDate,
  monthEnd,
  monthStart,
  nextMonth,
  prevMonth,
}) {
  const weeklyStats = useMemo(() => {
    return groupDataByWeeks(data, monthStart, monthEnd);
  }, [data, monthEnd, monthStart]);

  return (
    <section className={`${styles.panel} ${styles.barPanel}`}>
      <header className={styles.barHeader}>
        <div>
          <p className={styles.panelEyebrow}>Weekly trend</p>
          <h2 className={styles.panelTitle}>Applications submitted per week</h2>
          <p className={styles.panelDescription}>
            A quick look at how consistent your outreach has been this month.
          </p>
        </div>

        <div className={styles.monthControls}>
          <button
            type="button"
            className={styles.monthButton}
            onClick={prevMonth}
          >
            Previous
          </button>
          <span className={styles.monthLabel}>
            {format(viewDate, "MMMM yyyy")}
          </span>
          <button
            type="button"
            className={styles.monthButton}
            onClick={nextMonth}
          >
            Next
          </button>
        </div>
      </header>

      {weeklyStats.length === 0 ? (
        <div className={`${styles.emptyChart} ${styles.emptyChartDark}`}>
          No applications logged for this month yet.
        </div>
      ) : (
        <div className={`${styles.chartWrap} ${styles.chartWrapTall}`}>
          <Bar
            data={{
              labels: weeklyStats.map((item) => item.weekLabel),
              datasets: [
                {
                  label: "Applications",
                  data: weeklyStats.map((item) => item.items),
                  backgroundColor: "rgba(240, 181, 77, 0.88)",
                  borderColor: "rgba(255, 237, 207, 0.92)",
                  borderRadius: 14,
                  borderSkipped: false,
                  maxBarThickness: 54,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    color: "rgba(255, 248, 242, 0.76)",
                  },
                },
                y: {
                  beginAtZero: true,
                  grid: {
                    color: "rgba(255, 255, 255, 0.12)",
                  },
                  border: {
                    display: false,
                  },
                  ticks: {
                    color: "rgba(255, 248, 242, 0.76)",
                    precision: 0,
                    stepSize: 1,
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

export default Barchart;
