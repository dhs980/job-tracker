import { format } from "date-fns";

import styles from "../css/DashBoard.module.css";
import { groupDataByMonths } from "../utils/groupData";

function normalizeStatus(value) {
  return value?.trim().toLowerCase() || "";
}

function DashData({ data, monthStart, monthEnd }) {
  const totalApplications = data.length;
  const monthApplications = groupDataByMonths(data, monthStart, monthEnd).length;
  const interviewCount = data.filter(
    (item) => normalizeStatus(item.status) === "interview",
  ).length;
  const offerCount = data.filter(
    (item) => normalizeStatus(item.status) === "offer",
  ).length;
  const activePipeline = data.filter((item) => {
    const status = normalizeStatus(item.status);
    return status !== "rejected" && status !== "closed";
  }).length;
  const percent = totalApplications
    ? ((interviewCount / totalApplications) * 100).toFixed(1)
    : "0.0";

  const cards = [
    {
      label: "Total applications",
      value: totalApplications,
      hint: "All roles tracked so far",
    },
    {
      label: "This month",
      value: monthApplications,
      hint: format(monthStart, "MMMM yyyy"),
    },
    {
      label: "Interviews",
      value: interviewCount,
      hint: `${offerCount} offers recorded`,
    },
    {
      label: "Interview rate",
      value: `${percent}%`,
      hint: `${activePipeline} active in pipeline`,
    },
  ];

  return (
    <section className={styles.statsGrid}>
      {cards.map((card) => (
        <article key={card.label} className={styles.statCard}>
          <span className={styles.statLabel}>{card.label}</span>
          <strong className={styles.statValue}>{card.value}</strong>
          <p className={styles.statHint}>{card.hint}</p>
        </article>
      ))}
    </section>
  );
}

export default DashData;
