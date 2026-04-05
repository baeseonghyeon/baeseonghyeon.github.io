import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { ProfileDTO } from "interface/dto/profile";
import { WorkDTO } from "interface/dto/work";

const COLLECTION = "portfolio";

export async function fetchProfile(): Promise<ProfileDTO> {
    const snap = await getDoc(doc(db, COLLECTION, "profile"));
    if (!snap.exists()) throw new Error("profile 문서가 존재하지 않습니다.");
    return snap.data() as ProfileDTO;
}

export async function fetchWork(): Promise<WorkDTO> {
    const snap = await getDoc(doc(db, COLLECTION, "work"));
    if (!snap.exists()) throw new Error("work 문서가 존재하지 않습니다.");
    return snap.data() as WorkDTO;
}
