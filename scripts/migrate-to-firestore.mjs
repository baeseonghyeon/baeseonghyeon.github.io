/**
 * Firestore 마이그레이션 스크립트 (1회 실행용)
 * 실행: node scripts/migrate-to-firestore.mjs
 */
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const profileData = JSON.parse(
    readFileSync(resolve(__dirname, "../src/data/profile.json"), "utf-8"),
);
const workData = JSON.parse(
    readFileSync(resolve(__dirname, "../src/data/work.json"), "utf-8"),
);

const firebaseConfig = {
    apiKey: "AIzaSyCQLLuGFgjLEom3JiI7gvUoNf3zW9fGkKo",
    authDomain: "my-portfolio-cb110.firebaseapp.com",
    projectId: "my-portfolio-cb110",
    storageBucket: "my-portfolio-cb110.firebasestorage.app",
    messagingSenderId: "687198982713",
    appId: "1:687198982713:web:e8ce510bc41c539b8b33e8",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function migrate() {
    console.log("🔥 Firestore 마이그레이션 시작...");

    await setDoc(doc(db, "portfolio", "profile"), profileData);
    console.log("✅ profile 업로드 완료");

    await setDoc(doc(db, "portfolio", "work"), workData);
    console.log("✅ work 업로드 완료");

    console.log("🎉 마이그레이션 완료!");
    process.exit(0);
}

migrate().catch((err) => {
    console.error("❌ 마이그레이션 실패:", err.message);
    process.exit(1);
});
