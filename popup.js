document.addEventListener("DOMContentLoaded", function () {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "<p>Testing speed, please wait...</p>";

  chrome.runtime.sendMessage({ type: "startSpeedTest" }, function (response) {
    if (
      response &&
      response.speed &&
      response.speed.download &&
      response.speed.upload &&
      response.speed.ping
    ) {
      resultDiv.innerHTML = `
      <div class="speed-results">
  <div class="speed-row">
    <div class="speed-item">
        <p><strong>Download Speed:</strong> <span class="download"> ${response.speed.download} Mbps</p></span>
         </div>
    <div class="speed-item">
        <p><strong>Upload Speed:</strong> <span class="upload">  ${response.speed.upload} Mbps</p></span>
         </div>
  </div>
  <div class="speed-row">
    <div class="speed-item full-width">
        <p><strong>Ping:</strong>  <span class="ping"> ${response.speed.ping} ms</p></span>
      
        </div>
  </div>
</div>  `;
    } else {
      resultDiv.innerHTML = `
        <p>Error in testing speed. Please check your connection or try again later.</p>
      `;
    }
  });
});
