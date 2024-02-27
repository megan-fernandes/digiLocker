require("dotenv").config();

module.exports.verifyAdhaar = async (reqs, resp) => {
  console.log("POST/initiate");

  const https = require("https");
  const url = "https://dg-sandbox.setu.co/api/digilocker";
  const jsonData = JSON.stringify({
    redirectUrl: "http://localhost:3000/checkingStatus.html",
  });
  const options = {
    method: "post",
    headers: {
      "x-client-id": process.env.CLIENT_ID,
      "x-client-secret": process.env.CLIENT_SECRET,
      "x-product-instance-id": process.env.PRODUCT_INSTANCE_ID,
      "Content-Type": "application/json",
    },
  };

  const req = https.request(url, options, (res) => {
    let responseData = "";

    res.on("data", (chunk) => {
      responseData += chunk;
    });

    res.on("end", () => {
      const respData = JSON.parse(responseData);
      console.log(respData.id);

      //add to db

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
