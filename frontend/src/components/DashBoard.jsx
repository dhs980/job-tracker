import styles from "../css/DashBoard.module.css";

import Barchart from "./Barchart";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";
import { startOfMonth, endOfMonth, addMonths, subMonths } from "date-fns";
import Piechart from "./Piechart";
import DashData from "./DashData";

function DashBoard() {
  const { setLoading, loading, error, setError } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [viewDate, setViewDate] = useState(new Date());
  const [role, setRole] = useState("");
  const monthStart = startOfMonth(viewDate);
  const monthEnd = endOfMonth(viewDate);
  const nextMonth = () => setViewDate(addMonths(viewDate, 1));
  const prevMonth = () => setViewDate(subMonths(viewDate, 1));
  useEffect(() => {
    async function fetchJobsApplied() {
      setError(null);
      try {
        setLoading(true);
        const res = await axiosInstance.get("application/job");
        let data = res.data.userJobs;
        const role = res.data.userRole;
        if (role === "admin") {
          const res = await axiosInstance.get("application/all/job");
          data = res.data.userJobs;
        }
        setRole(role);
        setData(() => data);
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message;
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }
    fetchJobsApplied();
  }, [setError, setLoading]);

  return (
    <section className={styles.dashboardPage}>
      {loading ? (
        <div className={styles.statusCard}>Loading dashboard data...</div>
      ) : error ? (
        <div className={`${styles.statusCard} ${styles.errorCard}`}>
          {error}
        </div>
      ) : (
        <>
          <DashData data={data} monthEnd={monthEnd} monthStart={monthStart} />

          <div className={styles.chartGrid}>
            <Piechart data={data} monthEnd={monthEnd} monthStart={monthStart} />

            <Barchart
              data={data}
              viewDate={viewDate}
              monthEnd={monthEnd}
              monthStart={monthStart}
              nextMonth={nextMonth}
              prevMonth={prevMonth}
            />
          </div>
        </>
      )}
    </section>
  );
}

export default DashBoard;
