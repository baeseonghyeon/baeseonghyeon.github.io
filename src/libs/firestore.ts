import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { ProfileDTO } from "interface/dto/profile";
import { WorkDTO } from "interface/dto/work";

const COLLECTION = "portfolio";

// 모듈 레벨 메모리 캐시 — SPA 내 페이지 이동 시 재요청 방지
let profileCache: ProfileDTO | null = null;
let workCache: WorkDTO | null = null;

export async function fetchProfile(): Promise<ProfileDTO> {
    if (profileCache) return profileCache;
    const snap = await getDoc(doc(db, COLLECTION, "profile"));
    if (!snap.exists()) throw new Error("profile 문서가 존재하지 않습니다.");
    profileCache = snap.data() as ProfileDTO;
    return profileCache;
}

export async function fetchWork(): Promise<WorkDTO> {
    if (workCache) return workCache;
    const snap = await getDoc(doc(db, COLLECTION, "work"));
    if (!snap.exists()) throw new Error("work 문서가 존재하지 않습니다.");
    workCache = snap.data() as WorkDTO;
    return workCache;
}
