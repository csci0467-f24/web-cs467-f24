export default function Banner({ text }) {
  return (
    <div
      style={{
        width: "100%",
        background: "red",
        color: "white",
        textAlign: "center",
      }}
    >
      {text}
    </div>
  );
}
