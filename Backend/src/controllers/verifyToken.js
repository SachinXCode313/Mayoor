import {adminAuth} from "../config/firebase-admin.js";

const allowedDomains = ["gitjaipur.com"];

const verifyToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).send({ message: "Token is required." });
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    const email = decodedToken.email;
    const domain = email.split("@")[1]; 
    if (allowedDomains.includes(domain)) {
      console.log("User verified and authorized.");
      res.status(200).send({
        success: true,
        message: "User verified",
        user: decodedToken,
      });
    } else {
      res.status(403).send({
        success: false,
        message: "Access denied: Unauthorized domain.",
      });
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).send({ success: false, message: "Unauthorized" });
  }
};

export default verifyToken;
