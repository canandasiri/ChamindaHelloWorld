
let Swagger = require('swagger-client');

exports.handler = function (event, context, callback) {
    console.log("-----------Getting app token -----------")
    Swagger.http({
        url: 'https://services.apixplatform.com/api-sandbox/application/token',
        method: 'post',
        query: {},
        headers: { "Accept": "*/*", "Content-Type": "application/json" },
        body: JSON.stringify({
            "userName": "modelbankuser@inboxbear.com",
            "password": "1qaz2wsx@"
        })
    }).then((response) => {
        console.log("-----------Calling Account -----------")
        var access_token = "bearer " + response.body.access_token;
        // Insert new API calls here to call with APIX Access Token
        Swagger.http({
            url: `https://api.apixplatform.com/sbaccount/1.0/account/accounts/accounts`,
            method: 'get',
            query: { "page": "0", "size": "1" },
            headers: { "X-Authorization": access_token, "Accept": "*/*" }
        }).then((response) => {
            // your code goes here
            console.log(response.body)
            console.log("-----------Calling banks -----------")
            Swagger.http({
                url: `https://api.apixplatform.com/sbbank/1.0/bank/banks/banks`,
                method: 'get',
                query: { "page": "0", "size": "1" },
                headers: { "X-Authorization": access_token, "Accept": "*/*" }
            }).then((response) => {
                // your code goes here
                console.log(response.body)
                console.log("-----------Calling branches -----------")
                Swagger.http({
                    url: `https://api.apixplatform.com/sbbank/1.0/bank/banks/branches`,
                    method: 'get',
                    query: { "page": "1", "size": "2" },
                    headers: { "X-Authorization": access_token, "Accept": "*/*" }
                }).then((response) => {
                    // your code goes here
                    console.log(response.body)
                    Swagger.http({
                        url: `https://api.apixplatform.com/facematch/1.0/v1/photo/verifyPair`,
                        method: 'post',
                        query: {},
                        headers: { "appId": "2d9288", "appKey": "506505f70970ce16988f", "X-Authorization": access_token, "Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded" },
                        body: `image1=@/Users/chamindaa/Documents/OIP/APIX/Hyperverge/Passport.png&image2=@/Users/chamindaa/Documents/OIP/APIX/Hyperverge/Selfie.jpg&type=id`
                    }).then((response) => {
                        // your code goes here
                    }).catch((err) => {
                        // error handling goes here
                        console.log(err);
                    });
                }).catch((err) => {
                    // error handling goes here
                    console.log(err);
                });
                console.log(response.body)
            }).catch((err) => {
                // error handling goes here
                console.log(err);
            });

        }).catch((err) => {
            // error handling goes here
            console.log(err);
        });

        callback(null, access_token);
    }).catch((err) => {
        console.log(err);
        callback("Execution failed");
    });
}