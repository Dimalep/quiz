export default function UserInfoBlock() {
  return (
    <div
      style={{
        height: "30%",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginTop: "20px",
        paddingBottom: 0,
        fontSize: 30,
        justifyContent: "center",
        alignItems: "center",
        borderBottom: "1px solid black",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "black",
            minWidth: "150px",
            minHeight: "150px",
            borderRadius: "20px",
          }}
        ></div>
        <span>username</span>
      </div>
    </div>
  );
}
