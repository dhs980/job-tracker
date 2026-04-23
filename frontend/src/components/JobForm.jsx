import { useState, useEffect } from "react";
import dayjs from "dayjs";
import styles from "../css/JobForm.module.css";

import DatePicker from "./DatePicker";

function getInitialFormData(initialValues) {
  return {
    companyName: initialValues?.companyName || "",
    roleTitle: initialValues?.roleTitle || "",
    jobLocation: initialValues?.jobLocation || "",
    status: initialValues?.status || "",
    appliedDate: initialValues?.appliedDate
      ? dayjs(initialValues.appliedDate).format("YYYY-MM-DD")
      : dayjs().format("YYYY-MM-DD"),
    notes: initialValues?.notes || "",
  };
}

function JobForm({
  statuslist,
  initialValues,
  onSubmit,
  isLoading,
  submitLabel,
}) {
  const [formData, setFormData] = useState(getInitialFormData(initialValues));
  function handleDateChange(newValue) {
    const formattedDate = newValue ? newValue.format("YYYY-MM-DD") : "";
    setFormData((prev) => ({ ...prev, appliedDate: formattedDate }));
  }

  useEffect(() => {
    setFormData(getInitialFormData(initialValues));
  }, [initialValues]);

  function handleFormData(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
    <div className={styles.Jobform_Container1}>
      <form className={styles.Jobform_Container2} onSubmit={handleSubmit}>
        <div className={styles.formHeader}>
          <h2>{initialValues?._id ? "Edit Application" : "Add Application"}</h2>
          <p>Keep your job search organized in one place.</p>
        </div>
        <input
          className={` ${styles.input}`}
          type="text"
          placeholder="Enter the company name"
          name="companyName"
          value={formData.companyName}
          onChange={handleFormData}
        />
        <input
          className={` ${styles.input}`}
          type="text"
          placeholder="Role title"
          name="roleTitle"
          value={formData.roleTitle}
          onChange={handleFormData}
        />
        <input
          className={` ${styles.input}`}
          type="text"
          placeholder="Job location"
          name="jobLocation"
          value={formData.jobLocation}
          onChange={handleFormData}
        />
        <input
          className={` ${styles.input}`}
          type="text"
          list="statusList"
          placeholder="Application status"
          name="status"
          value={formData.status}
          onChange={handleFormData}
        />
        <datalist id="statusList">
          {statuslist.map((el, index) => (
            <option key={index} value={el} />
          ))}
        </datalist>
        <div className={styles.dateField}>
          <DatePicker
            label="Applied Date"
            value={dayjs(formData.appliedDate)}
            onChange={handleDateChange}
          />
        </div>
        <textarea
          className={`${styles.input} ${styles.notesInput}`}
          name="notes"
          value={formData.notes}
          onChange={handleFormData}
          placeholder="Add notes"
        />
        <button className={styles.button} type="submit">
          {isLoading ? "Saving..." : submitLabel}
        </button>
      </form>
    </div>
  );
}

export default JobForm;
