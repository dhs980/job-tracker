import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";

import JobForm from "./JobForm";

function JobList({ handelChange, initialValues, onSaved }) {
  const { setLoading, loading, error, setError } = useContext(AuthContext);
  const [statuslist, setStatuslist] = useState([]);
  const isEditMode = Boolean(initialValues?._id);
  useEffect(() => {
    setLoading(true);
    setError(null);

    async function fetchStatus() {
      try {
        // we are getting the status list from the db
        const res = await axiosInstance.get("application/status");
        setStatuslist(res.data);
      } catch (err) {
        console.error("error fetching status", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStatus();
  }, [setError, setLoading]);

  async function handleSubmitJob(formdata) {
    setLoading(true);
    try {
      const res = isEditMode
        ? await axiosInstance.patch(
            `application/${initialValues._id}`,
            formdata,
          )
        : await axiosInstance.post("application/job", formdata);

      if (res) {
        handelChange((prev) => prev + 1);
        onSaved?.();
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }
  if (error) return <div>{error}</div>;
  return (
    <div>
      <JobForm
        statuslist={statuslist}
        initialValues={initialValues}
        onSubmit={handleSubmitJob}
        isLoading={loading}
        submitLabel={isEditMode ? "update" : "submit"}
      />
    </div>
  );
}

export default JobList;
