import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import clipboardCopy from "clipboard-copy";

const EscapeComponent = () => {
  const [input, setInput] = useState("");
  const [escapedOutput, setEscapedOutput] = useState("");

  const handleEscape = () => {
    try {
      const jsonObject = JSON.parse(input);
      const jsonString = JSON.stringify(jsonObject);

      // Add slashes only around the content of the JSON string
      const escapedString = jsonString.replace(/"/g, '\\"');

      setEscapedOutput(escapedString);
    } catch (error) {
      // Handle non-JSON input, escaping special characters
      const escapedString = `/${input
        .replace(/\\/g, "\\\\")
        .replace(/"/g, '\\"')}/`;
      setEscapedOutput(escapedString);
    }
  };

  const handleCopyToClipboard = () => {
    if (escapedOutput) {
      clipboardCopy(escapedOutput);
      // Optionally provide feedback to the user, e.g., show a tooltip
      // alert('Escaped JSON copied to clipboard!');
    }
  };

  const beautifyOutput = () => {
    try {
      const beautifiedOutput = JSON.stringify(
        JSON.parse(escapedOutput),
        null,
        2
      );
      setEscapedOutput(beautifiedOutput);
    } catch (error) {
      // Handle non-JSON input
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      {/* Input TextField for the user to enter the string */}
      <TextField
        label="Input"
        multiline
        rows={4}
        variant="outlined"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        fullWidth
      />
      {/* Button to trigger the escape logic */}
      <Button
        variant="contained"
        onClick={handleEscape}
        style={{ marginTop: "10px" }}
      >
        Escape
      </Button>
      {/* Copy to Clipboard Button */}
      <Button
        variant="contained"
        onClick={handleCopyToClipboard}
        style={{ marginTop: "10px", marginLeft: "10px" }}
      >
        Copy to Clipboard
      </Button>
      {/* Beautify Output Button */}
      <Button
        variant="contained"
        onClick={beautifyOutput}
        style={{ marginTop: "10px", marginLeft: "10px" }}
      >
        Beautify Output
      </Button>
      {/* Display the escaped output in a box similar to the input box */}
      <div
        style={{
          marginTop: "10px",
          maxHeight: "40%", // Remove maxHeight to allow auto-adjustable height
          overflow: "auto", // Enable scrollbar if needed
          border: "1px solid #ccc",
          padding: "10px",
          whiteSpace: "pre-wrap", // Allow text to wrap
          width: "100%", // Make the box take the full width
        }}
      >
        <pre>{escapedOutput}</pre>
      </div>
    </div>
  );
};

export default EscapeComponent;
