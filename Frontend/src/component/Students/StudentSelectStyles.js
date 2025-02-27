import { RxPadding } from "react-icons/rx";

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
    backgroundColor: "#20B2AA",
    padding: "10px",
    position: "sticky",
    top: 0,
    width: "100%",
    textAlign: "center",
    zIndex: 1000,
    height: "100",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "100%",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row", 
    gap: "10px"
  },
    
  studentlist: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: "30px 30px 0px 0px", /* Rounded top corners */
    padding: "15px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", /* Optional shadow for depth */
    overflow: "hidden", /* Prevents child elements from overflowing */
    zIndex:"-1",
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
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: "25px",
    padding: "0px 16px",
    width: "90%",
    maxWidth: "450px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    position: "relative",
  },
  searchBoxActive: {
    position: "absolute",
    top: "10px",
    left: "10px",
    width: "300px",
    zIndex: 2000, // Ensures it stays on top
  },
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


  searchIcon: {
    fontSize: "20px",
    color: "#555",
  },
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

  // New styles for student items
  studentItem: {
    width: "95%",  // Makes it more rectangular
    backgroundColor: "white",
    padding: "10px",
    // margin: "10px 10px", 
    margin: "10px auto",
    borderRadius: "20px 20px 20px 20px ",  // Less rounded edges
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    minHeight: "50px",  // Ensures consistent height
    zIndex: "1",
  },
  
  studentAvatar: {
    width: "40px",
    height: "40px",
    backgroundColor: "#20B2AA", // Match header theme
    color: "white",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    borderRadius: "10px", 
  },
  studentName: {
    fontSize: "14px",
    color: "#6C6C6C",
    // fontWeight: "bold",
  },
};

export default styles;