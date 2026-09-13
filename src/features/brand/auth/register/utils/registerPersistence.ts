const STORAGE_KEY = "registerStepData";

export interface RegisterPersistedData {
  step1?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    birthDate: string | null;
    gender: string;
    profileImage: string | null;
  };
  step3?: {
    brandName: string;
    numberOfEmployees: string;
    brandLogo: string | null;
    category: string;
    country: string;
    city: string;
    district: string;
    aboutBrand: string;
    brandPolicy: string;
  };
  step4?: {
    fullName: string;
    nationalId: string;
    taxNumber: string;
    phone: string;
    frontId: string | null;
    backId: string | null;
    selfie: string | null;
  };
  completedSteps: number[];
}

function getStored(): RegisterPersistedData {
  if (typeof window === "undefined") return { completedSteps: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { completedSteps: [] };
}

function setStored(data: RegisterPersistedData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn("Failed to persist register data:", e);
  }
}

export function loadPersistedData(): RegisterPersistedData {
  return getStored();
}

export function saveData(partial: Partial<Omit<RegisterPersistedData, "completedSteps">>): void {
  const current = getStored();
  Object.assign(current, partial);
  setStored(current);
}

export function markStepCompleted(step: number): void {
  const current = getStored();
  if (!current.completedSteps.includes(step)) {
    current.completedSteps.push(step);
    setStored(current);
  }
}

export function isStepCompleted(step: number): boolean {
  return getStored().completedSteps.includes(step);
}

export function clearData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function base64ToFile(base64: string, filename: string): File {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  const n = bstr.length;
  const u8arr = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    u8arr[i] = bstr.charCodeAt(i);
  }
  return new File([u8arr], filename, { type: mime });
}
