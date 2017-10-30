import { TansTest } from "./test/tansTest";

const tansTest = new TansTest();
tansTest.deleteSuccess()
    .then((effectCount) => {
        console.log("effectCount: ", effectCount);
    })
    .catch((err) => {
        console.error(err);
    });
