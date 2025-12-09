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
    // Create a hidden iframe for printing without opening a new tab
    const printFrame = document.createElement("iframe");
    printFrame.style.position = "absolute";
    printFrame.style.top = "-9999px";
    printFrame.style.left = "-9999px";
    printFrame.style.width = "0";
    printFrame.style.height = "0";
    document.body.appendChild(printFrame);

    const printDocument = printFrame.contentDocument || printFrame.contentWindow.document;
    printDocument.open();
    printDocument.write(`
      <html>
        <head>
          <title>Print Image</title>
          <style>
            @page {
              size: auto;
              margin: 0;
            }
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            html, body {
              width: 100%;
              height: 100%;
              margin: 0;
              padding: 0;
            }
            body {
              display: flex;
              justify-content: center;
              align-items: center;
            }
            img {
              max-width: 100%;
              max-height: 100vh;
              width: auto;
              height: auto;
              object-fit: contain;
              page-break-after: avoid;
              page-break-inside: avoid;
            }
          </style>
        </head>
        <body>
          <img src="${outputImageUrl}" />
        </body>
      </html>
    `);
    printDocument.close();

    // Wait for image to load then print
    const img = printDocument.querySelector("img");
    img.onload = () => {
      printFrame.contentWindow.focus();
      printFrame.contentWindow.print();
      // Remove iframe after printing
      setTimeout(() => {
        document.body.removeChild(printFrame);
      }, 1000);
    };

    // If image is already cached/loaded
    if (img.complete) {
      printFrame.contentWindow.focus();
      printFrame.contentWindow.print();
      setTimeout(() => {
        document.body.removeChild(printFrame);
      }, 1000);
    }
  };

  return (
    <div
      className="screen-container"
      style={{
        backgroundImage: "url(/images/bg.png)",
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
            marginTop: "230px",
          }}
        >
          {/* Print Button */}
          <button
            onClick={handlePrint}
            style={{
         width: "277px",
    height: "103px",
    position: "absolute",
    marginTop:" 1051px",
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
              width: "750px",
              height: "1130px",
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
                width: "662px",
                height: "1029px",
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
