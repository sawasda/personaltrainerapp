import { Link } from "react-router-dom";

export default function Error() {

    return (
        <div style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center"
        }}>
            <h1 style={{ fontSize: "3rem" }}>404</h1>
            <h2>Page Not Found</h2>
            <Link
                to="/"
                style={{
                    marginTop: "40px",
                    padding: "10px 16px",
                    backgroundColor: "#305b86",
                    color: "white",
                    borderRadius: "6px",
                    textDecoration: "none",
                    fontWeight: "500"
                }}>
                Go back home
            </Link>
        </div>
    );
}