import WebSocket, { WebSocketServer } from "ws";
import db from "./db.js";

const WSPORT = process.env.WSPORT || 3500;
const wss = new WebSocketServer({ port: WSPORT });

let activeTeachers = {};

wss.on("connection", (ws) => {
    console.log("🔵 New client connected");

    ws.on("message", (message) => {
        const teacherData = JSON.parse(message);
        const { name, email } = teacherData;
        console.log("Received teacher data:", teacherData);
        if (name && email) {
            const currentTime = new Date();
            db.query(
                "INSERT INTO teachers (name,email, status, last_seen) VALUES (?,?, 'active', ?) ON DUPLICATE KEY UPDATE status='active', last_seen=?",
                [name, email, currentTime, currentTime],
                (err) => {
                    if (err) {
                        console.error("❌ Error inserting/updating teacher:", err);
                        return;
                    }
                    activeTeachers[name] = ws;
                    sendUpdatedList();
                }
            );
        }
    });

    ws.on("close", () => {
        // Object.keys(activeTeachers).forEach((name) => {
        //     if (activeTeachers[name] === ws) {
        //         const lastSeenTime = new Date();
        //         db.query(
        //             "UPDATE teachers SET status='inactive', last_seen=? WHERE name=?",
        //             [lastSeenTime, name],
        //             (err) => {
        //                 if (err) console.error("❌ Error updating teacher status:", err);
        //                 delete activeTeachers[name];
        //                 sendUpdatedList();
        //             }
        //         );
        //         console.log("🔴 A client disconnected");
        //     }
        // });

        for (let teacher in activeTeachers) {
            if (activeTeachers[teacher] === ws) {
                // Set last seen time to current timestamp when teacher disconnects
                const lastSeenTime = new Date();

                db.query("UPDATE teachers SET status='inactive', last_seen=? WHERE name=?", [lastSeenTime, teacher], (err) => {
                    if (err) {
                        console.error("Error updating teacher status in DB:", err);
                    }
                    delete activeTeachers[teacher];
                    sendUpdatedList();
                });
            }
        }
        console.log("🔴 A client disconnected");
    });
});

// Send updated list to all clients
function sendUpdatedList() {
    db.query("SELECT name, status, last_seen FROM teachers", (err, results) => {
        if (err) {
            console.error("❌ Error fetching teacher list:", err);
            return;
        }

        const formattedResults = results.map((teacher) => {
            const lastSeen = new Date(teacher.last_seen);
            const currentDate = new Date();
            teacher.last_seen = lastSeen.toDateString() === currentDate.toDateString()
                ? lastSeen.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                : lastSeen.toLocaleString("en-US", { weekday: "short", hour: "2-digit", minute: "2-digit" });
            return teacher;
        });

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(formattedResults));
            }
        });
    });
}

console.log(`✅ WebSocket server is running on ${WSPORT}`);
export default wss;
