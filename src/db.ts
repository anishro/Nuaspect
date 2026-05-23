/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  addDoc,
  getDocs, 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  limit, 
  getDocFromServer,
  Firestore
} from "firebase/firestore";
import firebaseConfig from "./firebase-applet-config.json";
import { Blog, Registration, ContactQuery, SessionConfig } from "./types";

// Operation types for error reporting
export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
  };
}

// Error handler requested in guidelines
function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: false,
    },
    operationType,
    path,
  };
  console.error("Firestore Exception Caught:", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Initial Mock Datasets
const defaultSession: SessionConfig = {
  topic: "Cognitive Behavioral Interventions for Academic Stress & Imposter Syndrome",
  date: "2026-06-08",
  time: "19:00",
  price: 599
};

const defaultBlogs: Blog[] = [
  {
    id: "blog-1",
    title: "Navigating Scholar Burnout: Psychological Strategies",
    content: "Burnout among academic scholars and students is not merely a product of long hours; it is a complex state of physical, emotional, and cognitive exhaustion. Cognitive Reframing helps individuals re-evaluate perfectionist assumptions. Incorporating brief somatic breaks can reset the nervous system before hyper-stress kicks in.\n\n### The Core Strategies\n1. Establish cognitive boundaries between identity and academic achievements.\n2. Leverage active grounding techniques (5-4-3-2-1 sequence) under intense deadline stress.\n3. Implement scheduled detachment to protect psychological reserves.",
    author: "Dr. Elena Vance, PsyD",
    createdAt: "2026-05-22T12:00:00Z"
  },
  {
    id: "blog-2",
    title: "Understanding Somatic Grounding in Therapy Sessions",
    content: "When severe anxiety disrupts clinical processing, somatic grounding is crucial to re-anchor the client. Through physical touchpoints, cold exposure, or paced breathing, the parasympathetic nervous system is stimulated, reducing tachycardia and physiological alarms before talking therapy begins.\n\n### Practical Interventions\n* **Paced Respiration**: Inhaling for 4 seconds, holding for 4, and exhaling for 6 to lower heart rate.\n* **Proprioceptive Focus**: Firmly pressing soles against the floor to restore tactile awareness.\n* **Bilateral Activation**: Alternating light taps on shoulders to balance hemispheric brain activity.",
    author: "Dr. Elena Vance, PsyD",
    createdAt: "2026-05-21T10:30:00Z"
  },
  {
    id: "blog-3",
    title: "Overcoming Imposter Syndrome in Competitive Environments",
    content: "High-achieving environments often trigger the internal belief of fraudulence. Group counseling helps dismantle this cycle. By externalizing these perfectionistic assumptions and sharing them with supportive peers, we learn that self-doubt is a systemic output, not an individual defect.\n\n### Key Interventions\n* Catalog objective certifications separately from internal emotional feedback loops.\n* Learn to view mistakes as natural informational feedback rather than deep moral failures.",
    author: "Dr. Elena Vance, PsyD",
    createdAt: "2026-05-20T14:15:00Z"
  },
  {
    id: "blog-4",
    title: "Attachment Styles and Academic Group Dynamics",
    content: "How we interact in collaborative research groups often mirrors our internal attachment narratives. Anxious attachment styles may lead to hyper-vigilance regarding coordinator feedback, while avoidant attachment styles may lead to premature isolation under pressure. Academic mentorship should account for these patterns.\n\n### Clinical Observations\nIdentifying relational triggers early is the key to maintaining student efficacy and personal contentment throughout multi-year studies.",
    author: "Prof. Sandra Sterling",
    createdAt: "2026-05-18T09:00:00Z"
  },
  {
    id: "blog-5",
    title: "The Neurobiology of Exam-Induced Panic Attacks",
    content: "Exam panic is characterized by a prefrontal cortex shutdown as the amygdala takes full control. Cognitive Behavioral Training prepares individuals by decoupling high stakes from biological threat pathways, keeping logical reasoning pipelines active under time constraints.\n\n### Prevention Tips\n1. Avoid excessive caffeine intake on test mornings.\n2. Dedicate five minutes to expressive journaling right before entering the room to dump anxiety reservoirs.",
    author: "Dr. Elena Vance, PsyD",
    createdAt: "2026-05-15T11:00:00Z"
  },
  {
    id: "blog-6",
    title: "Practical Boundaries for Graduate Student Mentors",
    content: "Effective academic mentorship requires structured boundary configurations. Over-identifying with students' psychological struggles can cause advisor compassion fatigue, while maintaining a distant stance stunts student growth. This article outlines the healthy sweet-spot.",
    author: "Dr. Elena Vance, PsyD",
    createdAt: "2026-05-12T16:00:00Z"
  },
  {
    id: "blog-7",
    title: "Deconstructing Mindfulness: Fact vs. Modern Hype",
    content: "Modern mindfulness is often marketed as a commercial panacea. In clinical practice, non-judgmental observation must be accompanied by active cognitive reframing to achieve long-term resolution of underlying structural fears.",
    author: "Dr. Elena Vance, PsyD",
    createdAt: "2026-05-09T08:30:00Z"
  },
  {
    id: "blog-8",
    title: "Sleep Architecture and Memory Consolidation",
    content: "Depriving oneself of sleep to optimize academic preparation is counterproductive. Memory consolidation happens largely during Slow Wave Sleep and REM cycles. Skipping sleep prevents the brain from cataloging new information correctly.",
    author: "Prof. Sandra Sterling",
    createdAt: "2026-05-05T15:45:00Z"
  }
];

const defaultRegistrations: Registration[] = [
  {
    id: "reg-1",
    name: "Aarav Sharma",
    email: "aarav.sharma@gmail.com",
    phone: "+91 98765 43210",
    topic: "Cognitive Behavioral Interventions for Academic Stress & Imposter Syndrome",
    date: "2026-06-08",
    time: "19:00",
    price: 599,
    createdAt: "2026-05-22T08:12:00Z",
    paymentId: "pay_sim_K3x8N2jPqzR9b",
    status: "paid"
  },
  {
    id: "reg-2",
    name: "Meera Nair",
    email: "meera.n@yahoo.com",
    phone: "+91 99441 55223",
    topic: "Cognitive Behavioral Interventions for Academic Stress & Imposter Syndrome",
    date: "2026-06-08",
    time: "19:00",
    price: 599,
    createdAt: "2026-05-22T10:45:00Z",
    paymentId: "pay_sim_L8w1F7dKsqG8v",
    status: "paid"
  }
];

const defaultQueries: ContactQuery[] = [
  {
    id: "q-1",
    name: "Devika Sen",
    email: "devika.sen@outlook.com",
    phone: "+91 88876 12345",
    message: "Does Dr. Elena accept international insurance or offer online therapy sessions for scholars based outside India?",
    createdAt: "2026-05-22T14:30:00Z"
  },
  {
    id: "q-2",
    name: "Kabir Mehta",
    email: "kabir.m@iit.ac.in",
    phone: "+91 77221 88990",
    message: "I am interested in scheduling a group seminar for PhD scholars at our institute. Could you share the institutional rate sheet?",
    createdAt: "2026-05-22T15:20:00Z"
  }
];

// Determine if we have a real Firebase configuration (not empty placeholders)
const isFirebaseMock = 
  !firebaseConfig || 
  firebaseConfig.apiKey.includes("mock-api-key") || 
  firebaseConfig.projectId.includes("mock-project");

let db: Firestore | null = null;
let isLiveFirebase = false;

if (!isFirebaseMock) {
  try {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app, firebaseConfig.firestoreDatabaseId || "(default)");
    isLiveFirebase = true;
    console.log("Firebase initialized successfully in Nuaspect DB Adapter.");
    
    // Test the connection as instructed in: Validate Connection to Firestore
    getDocFromServer(doc(db, "test", "connection")).catch((err) => {
      if (err instanceof Error && err.message.includes("offline")) {
        console.error("Firebase is offline. Check network configuration.");
      }
    });
  } catch (error) {
    console.warn("Could not start Live Firebase. Falling back to robust Sandbox LocalStorage Adapter.", error);
    isLiveFirebase = false;
  }
} else {
  console.log("Using Nuaspect Sandboxed LocalStorage Adapter (Demo Setup Mode).");
}

// LocalStorage helpers to simulate database operations if offline/not-provisioned
function getLocal<T>(key: string, defaultVal: T): T {
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(defaultVal));
    return defaultVal;
  }
  return JSON.parse(data);
}

function setLocal<T>(key: string, val: T): void {
  localStorage.setItem(key, JSON.stringify(val));
}

// Service Engine
export const NuaspectDB = {
  isLive: () => isLiveFirebase,

  // --- 1. Session Config Operations ---
  async getSessionConfig(): Promise<SessionConfig> {
    if (isLiveFirebase && db) {
      const path = "config/session";
      try {
        const snap = await getDoc(doc(db, "config", "session"));
        if (snap.exists()) {
          return snap.data() as SessionConfig;
        } else {
          // Initialize if missing
          const defaultObj = defaultSession;
          await setDoc(doc(db, "config", "session"), defaultObj);
          return defaultObj;
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, path);
      }
    } else {
      return getLocal<SessionConfig>("nuaspect_session_config", defaultSession);
    }
  },

  async updateSessionConfig(config: SessionConfig): Promise<void> {
    if (isLiveFirebase && db) {
      const path = "config/session";
      try {
        await setDoc(doc(db, "config", "session"), config);
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, path);
      }
    } else {
      setLocal("nuaspect_session_config", config);
    }
  },

  // --- 2. Registrations Operations ---
  async registerClient(registration: Omit<Registration, "id">): Promise<string> {
    if (isLiveFirebase && db) {
      const path = "registrations";
      try {
        const ref = await addDoc(collection(db, path), registration);
        return ref.id;
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, path);
      }
    } else {
      const list = getLocal<Registration[]>("nuaspect_registrations", defaultRegistrations);
      const newReg: Registration = {
        ...registration,
        id: "reg_" + Math.random().toString(36).substr(2, 9)
      };
      list.unshift(newReg);
      setLocal("nuaspect_registrations", list);
      return newReg.id!;
    }
  },

  async getRegistrations(): Promise<Registration[]> {
    if (isLiveFirebase && db) {
      const path = "registrations";
      try {
        const snap = await getDocs(collection(db, path));
        const list: Registration[] = [];
        snap.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...docSnap.data() } as Registration);
        });
        // Sort newest first
        return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, path);
      }
    } else {
      return getLocal<Registration[]>("nuaspect_registrations", defaultRegistrations);
    }
  },

  // --- 3. Contact Queries Operations ---
  async submitQuery(queryData: Omit<ContactQuery, "id">): Promise<string> {
    if (isLiveFirebase && db) {
      const path = "queries";
      try {
        const ref = await addDoc(collection(db, path), queryData);
        return ref.id;
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, path);
      }
    } else {
      const list = getLocal<ContactQuery[]>("nuaspect_queries", defaultQueries);
      const newQuery: ContactQuery = {
        ...queryData,
        id: "query_" + Math.random().toString(36).substr(2, 9)
      };
      list.unshift(newQuery);
      setLocal("nuaspect_queries", list);
      return newQuery.id!;
    }
  },

  async getQueries(): Promise<ContactQuery[]> {
    if (isLiveFirebase && db) {
      const path = "queries";
      try {
        const snap = await getDocs(collection(db, path));
        const list: ContactQuery[] = [];
        snap.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...docSnap.data() } as ContactQuery);
        });
        return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, path);
      }
    } else {
      return getLocal<ContactQuery[]>("nuaspect_queries", defaultQueries);
    }
  },

  // --- 4. Blogs Operations ---
  async getBlogs(page: number, limitCount: number = 6): Promise<{ data: Blog[]; hasMore: boolean }> {
    if (isLiveFirebase && db) {
      const path = "blogs";
      try {
        const snap = await getDocs(collection(db, path));
        const allBlogs: Blog[] = [];
        snap.forEach((docSnap) => {
          allBlogs.push({ id: docSnap.id, ...docSnap.data() } as Blog);
        });
        // Sort newest first
        allBlogs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        
        const start = (page - 1) * limitCount;
        const pageData = allBlogs.slice(start, start + limitCount);
        const hasMore = allBlogs.length > start + limitCount;
        return { data: pageData, hasMore };
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, path);
      }
    } else {
      const list = getLocal<Blog[]>("nuaspect_blogs", defaultBlogs);
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      const start = (page - 1) * limitCount;
      const pageData = list.slice(start, start + limitCount);
      const hasMore = list.length > start + limitCount;
      return { data: pageData, hasMore };
    }
  },

  async addBlog(blog: Omit<Blog, "id">): Promise<string> {
    if (isLiveFirebase && db) {
      const path = "blogs";
      try {
        const ref = await addDoc(collection(db, path), blog);
        return ref.id;
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, path);
      }
    } else {
      const list = getLocal<Blog[]>("nuaspect_blogs", defaultBlogs);
      const newBlog: Blog = {
        ...blog,
        id: "blog_" + Math.random().toString(36).substr(2, 9)
      };
      list.unshift(newBlog);
      setLocal("nuaspect_blogs", list);
      return newBlog.id!;
    }
  }
};
