const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    width: "100vw",
    alignItems: "center",
    maxWidth: "100%",
    boxSizing: "border-box",
    overflowX: "hidden",
  },
  header: {
    backgroundColor: "#21c2ba",
    padding: "20px",
    position: "sticky",
    top: 0,
    width: "100%",
    textAlign: "center",
    zIndex: 1000,
    height: "95px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "100%",
    boxSizing: "border-box",
  },
  menu: {
      marginRight: "px",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    width: "100%",
    maxWidth: "600px",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#a6e0dd",
    borderRadius: "25px",
    padding: "0px 16px",
    width: "70%",
    maxWidth: "450px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    position: "relative",
  },
  // searchBoxActive: {
  //   position: "absolute",
  //   top: "10px",
  //   left: "10px",
  //   width: "300px",
  //   zIndex: 2000, // Ensures it stays on top
  // },
  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "transparent",
    transition: "all 0.3s ease",
  },
  searchInputActive: {
    fontSize: "14px",
    fontWeight: "bold",
    textAlign: "left",
  },
  // searchIcon: {
  //   fontSize: "20px",
  //   color: "#555",
  // },
  iconWrapper: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },
  icon: {
    fontSize: "22px",
    color: "#ffffff",
    cursor: "pointer",
  },
  title: {
    color: "white",
    fontSize: "20px",
    fontWeight: "bold",
    marginTop: "8px",
  },
 
  noResults: {
    textAlign: "center",
    color: "gray",
    fontSize: "16px",
    marginTop: "10px",
  },
  loading: {
    height: "30px",  
    width: "30px",
    display: "block", 
    margin: "auto",   
  },
  
}

export default styles