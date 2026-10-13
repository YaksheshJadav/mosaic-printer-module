// app/not-found.jsx
// Themed 404 page – uses CSS variables so it is always the correct theme color,
// even before JS hydrates. No white flash.
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        minHeight: "300px",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontSize: "4rem",
          fontWeight: 900,
          color: "#5F00BA",
          lineHeight: 1,
          marginBottom: "0.5rem",
        }}
      >
        404
      </p>
      <p
        style={{
          fontSize: "1rem",
          fontWeight: 700,
          color: "var(--fg-primary)",
          marginBottom: "0.25rem",
        }}
      >
        Page Not Found
      </p>
      <p
        style={{
          fontSize: "0.75rem",
          color: "#7F7B82",
          marginBottom: "1.5rem",
        }}
      >
        This page does not exist yet in MOSAIC.
      </p>
      <Link
        href="/"
        style={{
          fontSize: "0.75rem",
          fontWeight: 600,
          color: "#5F00BA",
          textDecoration: "underline",
        }}
      >
        ← Return to Dashboard
      </Link>
    </div>
  );
}
