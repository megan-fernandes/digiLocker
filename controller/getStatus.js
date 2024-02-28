require("dotenv").config();
const db = require("../config/db");

module.exports.getStatus = async (reqs, resp) => {
  console.log("GET/status");
  const requestId = reqs.query.id;

  const https = require("https");
  const url = `https://dg-sandbox.setu.co/api/digilocker/${requestId}/status`;

  const options = {
    method: "get",
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
      console.log(respData);

      if (respData.status === "authenticated") {
        const sql = `INSERT INTO user_data ("digi_locker_id", "user_id", "status", "valid_upto")
        VALUES ($1, $2, $3, $4)
        `;
        db.query(
          sql,
          [
            respData.digilockerid,
            respData.id,
            respData.status,
            respData.validUpto,
          ],
          (err, result) => {
            if (err) {
              console.log(err);
              resp.status(400).json(err);
            } else {
              resp.status(200).json({
                message: "Success",
                message: "You have been authenticated",
              });
            }
          }
        );
      } else {
        resp.status(200).json({
          message: "Failure",
          message: "Something went wrong. Please try again",
        });
      }
    });
  });

  req.on("error", (error) => {
    console.error("Error:", error.message);
  });
  // req.write(jsonData);
  req.end();
};
