import { storInitDataPath } from "./utils/Glob_Functions/GlobalFunction";

export async function loadStoreInit(retries = 3, delay = 1000) {
    const path = `${storInitDataPath()}/StoreInit.json`;

    for (let attempt = 0; attempt < retries; attempt++) {
        const start = performance.now();
        let fetchSuccess = false;

        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const text = await response.text();
            const json = JSON.parse(text);
            const [rd0] = json.rd;

            if (!rd0) throw new Error("rd0 is empty");

            sessionStorage.setItem("storeInit", JSON.stringify(rd0));
            sessionStorage.setItem("myAccountFlags", JSON.stringify(json.rd1));
            sessionStorage.setItem("CompanyInfoData", JSON.stringify(json.rd2?.[0] || {}));

            console.log("✅ sessionStorage set: storeInit");
            fetchSuccess = true;
        } catch (error) {
            console.log(`❌ Attempt ${attempt + 1} failed:`, error);
        }

        const isStored = !!sessionStorage.getItem("storeInit");
        const end = performance.now();
        console.log(`⏱️ Attempt ${attempt + 1} took: ${Math.floor(end - start)}ms`);

        // 🧠 Check here after try-catch
        if (fetchSuccess && isStored) {
            console.log("✅ StoreInit loaded and verified from sessionStorage");
            return true;
        } else {
            console.log(`⚠️ StoreInit not stored, retrying attempt ${attempt + 2}`);
        }

        if (attempt < retries - 1) {
            await new Promise((res) => setTimeout(res, delay));
        }
    }

    console.log("❌ All attempts failed. StoreInit not loaded or stored.");
    return false;
}
