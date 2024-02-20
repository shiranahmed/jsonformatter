import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { JSONTree } from "react-json-tree";
import clipboardCopy from "clipboard-copy";

const UnescapeComponent = () => {
  const [input, setInput] = useState("");
  const [unescapedOutput, setUnescapedOutput] = useState(null);

  const handleUnescape = () => {
    try {
      // Unescape the input first
      const unescapedString = input.replace(/\\/g, "");

      // Parse the unescaped string as JSON
      const jsonObject = JSON.parse(unescapedString);
      setUnescapedOutput(jsonObject);
    } catch (error) {
      setUnescapedOutput({ error: "Invalid JSON" });
    }
  };

  const handleCopyToClipboard = () => {
    if (unescapedOutput) {
      clipboardCopy(JSON.stringify(unescapedOutput, null, 2));
      // Optionally provide feedback to the user, e.g., show a tooltip
      // alert('JSON copied to clipboard!');
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      {/* Input TextField for the user to enter the escaped string */}
      <TextField
        label="Input"
        multiline
        rows={4}
        variant="outlined"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        fullWidth
      />
      {/* Button to trigger the unescape logic */}
      <Button
        variant="contained"
        onClick={handleUnescape}
        style={{ marginTop: "10px" }}
      >
        Unescape
      </Button>
      {/* Display the unescaped output */}
      <div
        style={{
          marginTop: "10px",
          textAlign: "left",
          backgroundColor: "white",
          fontSize: "16px",
        }}
      >
        {unescapedOutput && (
          <>
            <JSONTree
              data={unescapedOutput}
              hideRoot
              theme={{
                tree: { marginLeft: 0 }, // Set marginLeft to 0 to align JSON content to the left
                base00: "white", // Set background color to white
                fontSize: "16px", // Set font size
              }}
            />
            {/* Copy to Clipboard Button */}
            <Button
              variant="contained"
              onClick={handleCopyToClipboard}
              style={{ marginTop: "10px" }}
            >
              Copy to Clipboard
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default UnescapeComponent;
