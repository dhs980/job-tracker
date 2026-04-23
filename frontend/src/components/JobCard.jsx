import { MdDelete, MdEdit } from "react-icons/md";
import styles from "../css/JobCard.module.css";
import axiosInstance from "../api/axiosInstance";
function JobCard({
  companyName,
  roleTitle,
  status,
  jobLocation,
  appliedDate,
  notes,
  id,
  handelChange,
  setEditJob,
}) {
  const normalizedStatus = (status || "").toLowerCase();
  let statusClass = styles.statusDefault;

  if (normalizedStatus.includes("accept")) statusClass = styles.statusSuccess;
  else if (normalizedStatus.includes("reject"))
    statusClass = styles.statusDanger;
  else if (normalizedStatus.includes("pending"))
    statusClass = styles.statusWarning;

  async function DeleteJobs(id) {
    const res = await axiosInstance.delete(`application/${id}`);
    if (res) {
      handelChange((prev) => prev + 1);
    }
  }

  return (
    <div className={styles.JobCard_Container}>
      <div className={styles.header}>
        <h3 className={styles.companyName}>{companyName || "Unknown company"}</h3>
        <span className={`${styles.statusBadge} ${statusClass}`}>
          {status || "Unknown"}
        </span>
      </div>

      <p className={styles.roleTitle}>{roleTitle || "Role not provided"}</p>

      <p className={styles.metaRow}>
        <strong>Location</strong>
        <span>{jobLocation || "Not specified"}</span>
      </p>
      <p className={styles.metaRow}>
        <strong>Applied</strong>
        <span>{new Date(appliedDate).toLocaleDateString("en-GB")}</span>
      </p>

      <p className={styles.notes}>{notes || "No notes added yet."}</p>

      <div className={styles.actions}>
        <button
          className={`${styles.actionButton} ${styles.editButton}`}
          onClick={() => setEditJob(id)}
          type="button"
          aria-label="Edit job"
        >
          <MdEdit />
          Edit
        </button>
        <button
          className={`${styles.actionButton} ${styles.deleteButton}`}
          onClick={() => DeleteJobs(id)}
          type="button"
          aria-label="Delete job"
        >
          <MdDelete />
          Delete
        </button>
      </div>
    </div>
  );
}
export default JobCard;
