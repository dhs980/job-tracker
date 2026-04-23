import styles from "../css/Pagination.module.css";

function Pagination({
  totalPosts,
  postsPerPage,
  handleCurrentPage,
  currentPage,
}) {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className={styles.paginationContainer} aria-label="Jobs pagination">
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => handleCurrentPage(page)}
          className={`${styles.pageButton} ${
            page === currentPage ? styles.active : ""
          }`}
        >
          {page}
        </button>
      ))}
    </nav>
  );
}

export default Pagination;
