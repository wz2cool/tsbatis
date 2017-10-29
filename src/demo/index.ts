import { TansTest } from "./test/tansTest";

const tansTest = new TansTest();
tansTest.insertSuccess()
    .then(() => {
        console.log("success");
    })
    .catch((err) => {
        console.error(err);
    });
