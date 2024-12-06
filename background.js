chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "startSpeedTest") {
    const startTime = new Date().getTime();
    const testFileUrl =
      "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png";

    fetch(testFileUrl)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.blob();
      })
      .then((blob) => {
        const endTime = new Date().getTime();
        const duration = (endTime - startTime) / 1000; // Time in seconds
        const fileSize = 0.0272; // Size in MB for Google logo (272 KB)

        const downloadSpeed = ((fileSize * 8) / duration).toFixed(2); // Mbps

        const speedData = {
          download: downloadSpeed,
          upload: (downloadSpeed * 0.8).toFixed(2),
          ping: 50, // Mock ping
        };
        sendResponse({ speed: speedData });
      })
      .catch((error) => {
        console.error("Error fetching test file:", error);
        sendResponse({ error: "Unable to get speed data." });
      });

    return true; // Keeps the channel open for async response
  }
});
