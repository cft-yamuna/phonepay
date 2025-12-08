import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const OutputScreen = () => {
  const navigate = useNavigate();
  const { outputImageUrl, resetState } = useAppContext();

  useEffect(() => {
    if (!outputImageUrl) {
      navigate("/");
      return;
    }
  }, [outputImageUrl, navigate]);

  const handleStartOver = () => {
    resetState();
    navigate("/");
  };

  const handlePrint = () => {
    // Create a new window with only the image
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Image</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            img {
              max-width: 100%;
              height: auto;
            }
          </style>
        </head>
        <body>
          <img src="${outputImageUrl}" onload="window.print(); window.close();" />
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div
      className="screen-container"
      style={{
        backgroundImage: "url(/images/common_bg.png)",
        backgroundColor: "#0f172a",
      }}
    >
      <div className="screen-content">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "30px",
            width: "100%",
            height: "100%",
            paddingTop: "123px",
            marginTop: "400px",
          }}
        >
          {/* Print Button */}
          <button
            onClick={handlePrint}
            style={{
         width: "277px",
    height: "103px",
    position: "absolute",
    marginTop:" 1120px",
              fontSize: "80px",
              fontWeight: "600",
              backgroundImage: "url(/images/printbg.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "transparent",
              color: "black",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-family)",
              textTransform: "uppercase",
              letterSpacing: "1px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
            }}
          >
          </button>

          {/* Output Image with Background */}
          <div
            style={{
              width: "804px",
              height: "1200px",
              backgroundImage: "url(/images/output_bg.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={outputImageUrl}
              alt="Transformed"
              style={{
                width: "690px",
                height: "1101px",
                display: "block",
                objectFit: "cover",
                borderRadius:"113px"
              }}
            />
          </div>

          {/* Restart Button - Centered */}
          <button
            onClick={handleStartOver}
            style={{
              width: "588px",
              height: "159px",
              fontSize: "80px",
              fontWeight: "600",
              backgroundImage: "url(/images/restartbg.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "transparent",
              color: "black",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-family)",
              textTransform: "uppercase",
              letterSpacing: "1px",
              transition: "all 0.3s ease",
              marginTop: "43px",
              marginBottom: "80px",
            }}

            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
            }}
          >
          </button>
        </div>
      </div>
    </div>
  );
};

export default OutputScreen;
