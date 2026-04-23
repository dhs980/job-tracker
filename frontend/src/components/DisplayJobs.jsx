import { useContext, useEffect, useState } from "react";

import axiosInstance from "../api/axiosInstance";
import { AuthContext } from "../context/AuthContext";
import JobList from "./JobList";
import JobCard from "./JobCard";
import styles from "../css/DisplayJobs.module.css";
import { IoIosAddCircle } from "react-icons/io";
import Pagination from "./Pagination";

export function DisplayJobs() {
  const { error, setError, loading, setLoading } = useContext(AuthContext);
  const [jobTrackerData, setJobTrackerData] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const [change, setChange] = useState(0);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = jobTrackerData.slice(firstPostIndex, lastPostIndex);

  //fetching jobs from the backend
  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      setError(null);

      try {
        const res = await axiosInstance.get("application/job");
        const data = res.data.userJobs;
        setJobTrackerData(data);
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message;
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, [setError, setLoading, change]);

  function handleEditJob(id) {
    const jobToEdit = jobTrackerData.find((job) => job._id === id);
    if (!jobToEdit) return;
    setSelectedJob(jobToEdit);
    setShowDialog(true);
  }

  function handleAddJob() {
    setSelectedJob(null);
    setShowDialog(true);
  }

  function handleSaved() {
    setShowDialog(false);
    setSelectedJob(null);
    setChange((prev) => prev + 1);
  }

  function handleDialogClose() {
    setShowDialog(false);
    setSelectedJob(null);
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      handleDialogClose();
    }
  }

  return (
    <>
      <section className={styles.jobsPage}>
        {error && <p className={styles.errorBanner}>{error}</p>}
        {loading && <p className={styles.loadingBanner}>Loading jobs...</p>}

        <div className={styles.jobsGrid}>
          {currentPost.map((job) => (
            <JobCard
              key={job._id}
              companyName={job.companyName}
              jobLocation={job.jobLocation}
              roleTitle={job.roleTitle}
              status={job.status}
              appliedDate={job.appliedDate}
              notes={job.notes}
              id={job._id}
              handelChange={setChange}
              setEditJob={handleEditJob}
            />
          ))}
        </div>

        {!loading && currentPost.length === 0 && !error && (
          <p className={styles.emptyState}>
            No job applications yet. Click the plus button to add one.
          </p>
        )}
      </section>

      {showDialog && (
        <div className={styles.overlay} onClick={handleOverlayClick}>
          <div className={styles.dialog} role="dialog" aria-modal="true">
            <JobList
              handelChange={setChange}
              initialValues={selectedJob}
              onSaved={handleSaved}
            />
          </div>
        </div>
      )}

      <div className={styles.addButtonContainer}>
        <button
          type="button"
          className={styles.addButton}
          onClick={handleAddJob}
          aria-label="Add new job"
        >
          <IoIosAddCircle className={styles.addIcon} />
        </button>
      </div>

      <Pagination
        totalPosts={jobTrackerData.length}
        postsPerPage={postsPerPage}
        handleCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
}
