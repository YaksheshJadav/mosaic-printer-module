// app/loading.jsx
// Global loading skeleton shown by Next.js App Router during page transitions.
// Uses CSS variables for background so no white flash appears while loading.
export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        minHeight: "300px",
        flexDirection: "column",
        gap: "0.75rem",
      }}
    >
      <div
        style={{
          width: "1.5rem",
          height: "1.5rem",
          borderRadius: "50%",
          border: "2px solid #5F00BA",
          borderTopColor: "transparent",
          animation: "spin 0.7s linear infinite",
        }}
      />
      <p
        style={{
          fontSize: "0.75rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#7F7B82",
          fontWeight: 500,
        }}
      >
        Loading…
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
