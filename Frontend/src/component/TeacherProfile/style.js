const styles = {
  container: {
    backgroundColor: "#ffffff", 
    color: "#000",
    minHeight: "100vh",
    padding: "20px",
  },
  darkContainer: {
    backgroundColor: "#121212", 
    color: "#fff",
    minHeight: "100vh",
    padding: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  backButton: {
    fontSize: "24px",
    background: "none",
    border: "none",
    color: "inherit",
    cursor: "pointer",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  notification: {
    cursor: "pointer",
  },
  profileContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
  },
  userName: {
    fontSize: "20px",
    fontWeight: "bold",
    marginTop: "10px",
  },
  userId: {
    fontSize: "14px",
    color: "#888",
  },
  settingsContainer: {
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#21c3bc",
  },
  darkSettingsContainer: {
    backgroundColor: "#1f1f1f",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.5)",
  },
  settingsTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "14px",
    marginBottom: "5px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "15px",
  },
  switchRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },
  updateButton: {
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default styles;
