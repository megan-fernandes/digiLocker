module.exports.verifyAdhaar = async (reqs, resp) => {
  console.log("in here");

  const https = require("https");
  const url = "https://dg-sandbox.setu.co/api/digilocker";
  const jsonData = JSON.stringify({
    redirectUrl: "http://localhost:3000",
  });
  const options = {
    method: "post",
    headers: {
      "x-client-id": "b62ace35-122c-4a18-9b5c-f60b2a6a2f9c",
      "x-client-secret": "UoZYWrl8NVc10XysYLPCY61sD6JQfGxg",
      "x-product-instance-id": "e733678e-ad25-4286-af23-0ef738b564d9",
      "Content-Type": "application/json",
    },
    body: jsonData,
  };

  const req = https.request(url, options, (res) => {
    let responseData = "";

    res.on("data", (chunk) => {
      responseData += chunk;
    });

    res.on("end", () => {
      // resp.send(JSON.parse(responseData).url);
      // console.log("HELLO", JSON.parse(responseData).url);

      const redirectUrl = JSON.parse(responseData).url;
      console.log("Redirecting to:", redirectUrl);
      resp.redirect(redirectUrl);
    });
  });

  req.on("error", (error) => {
    console.error("Error:", error.message);
  });

  req.write(jsonData);
  req.end();
};
