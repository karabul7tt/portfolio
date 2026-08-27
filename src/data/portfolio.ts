export interface Metric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  deploymentStatus: 'Production' | 'Staging' | 'Ready';
  featured: boolean;
  threeDType: 'hologram' | 'neural' | 'prism' | 'swarm' | 'torus';
  primaryColor: string;
  secondaryColor: string;
  metrics: Metric[];
}

export interface SkillItem {
  name: string;
  level: number;
  highlight?: boolean;
}

export interface SkillCategory {
  name: string;
  skills: SkillItem[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  location?: string;
  technologies?: string[];
  achievements: string[];
  techStack: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "MEHMET KARABULUT",
    role: "iOS Geliştirici",
    title: "iOS Geliştirici & Bilgisayar Mühendisliği Öğrencisi",
    university: "Üniversite Eğitimi (Lisans)",
    faculty: "Mühendislik Fakültesi",
    department: "Bilgisayar Mühendisliği",
    educationPeriod: "2023 — 2027",
    years: "2023 — 2027",
    gpa: "3.20",
    clubRole: "Yazılım, Yapay Zeka ve Yaratıcılık Kulübü — Sosyal Medya Sorumlusu",
    phone: "+90 534 784 34 84",
    email: "karabulutmehmet686@gmail.com",
    location: "İstanbul, Türkiye",
    github: "https://github.com/karabul7tt",
    instagram: "https://instagram.com/mehmetkarabul7tt",
    linkedin: "https://www.linkedin.com/in/mehmetkarabul7tt/",
    twitter: "https://instagram.com/mehmetkarabul7tt",
    status: "Aktif & Projelere Açık",
    tagline: "Modern iOS & Yazılım Mühendisliği",
    cliCommand: "npx karabulut",
    bio: "Bilgisayar Mühendisliği lisans öğrencisiyim. Swift ile iOS uygulama geliştirme, C#, C++, C ve modern web teknolojileri üzerinde çalışıyorum. Temiz kod, performans ve Apple kullanıcı deneyimi standartlarına odaklanıyorum.",
  },
  stats: {
    experienceYears: "2+",
    projectsCompleted: "5+",
    projectsShipped: "5+",
    technologiesCount: "12+",
    githubContributions: "400+",
    codeQualityScore: "A+",
    uptime: "99.99%",
    edgeLatency: "<20ms",
  },
  skills: [
    {
      name: "Programlama Dilleri & iOS",
      skills: [
        { name: "Swift (iOS)", level: 90, highlight: true },
        { name: "C#", level: 85, highlight: true },
        { name: "C++", level: 85, highlight: true },
        { name: "C", level: 80, highlight: true },
        { name: "JavaScript", level: 85 },
        { name: "HTML5", level: 95 },
        { name: "CSS3", level: 90 },
      ],
    },
    {
      name: "Teknik Beceriler & Analiz",
      skills: [
        { name: "iOS Uygulama Geliştirme", level: 92, highlight: true },
        { name: "Algoritma Tasarımı", level: 88 },
        { name: "Mantıksal Analiz & Optimizasyon", level: 90 },
        { name: "Veri Analizi ve Yorumlama", level: 85 },
        { name: "Donanım & Bilişim Bilgisi", level: 85 },
        { name: "Web Tasarımı", level: 90 },
        { name: "Sosyal Medya Yönetimi", level: 95 },
      ],
    },
    {
      name: "Çalışma Dinamikleri & Yetkinlikler",
      skills: [
        { name: "Problem Çözme", level: 95, highlight: true },
        { name: "Hızlı Öğrenme & Adaptasyon", level: 95, highlight: true },
        { name: "Ekip Çalışmasına Uyum", level: 92 },
        { name: "Zaman & Stres Yönetimi", level: 90 },
        { name: "Liderlik & Sorumluluk Alma", level: 90 },
      ],
    },
    {
      name: "Yabancı Diller",
      skills: [
        { name: "İngilizce", level: 80, highlight: true },
        { name: "Almanca", level: 65 },
      ],
    },
  ] as SkillCategory[],
  projects: [
    {
      id: "figume-3d",
      title: "FiguME-3D",
      description: "SwiftUI ve iOS için geliştirilen, sesli yanıt ve hareket tepkili 3D etkileşimli dijital karakter ve figür uygulaması.",
      category: "iOS & Swift",
      tags: ["Swift", "iOS", "SwiftUI", "3D Karakter", "Xcode"],
      githubUrl: "https://github.com/karabul7tt/FiguME-3D",
      liveUrl: "/demos/figume-3d/index.html",
      deploymentStatus: "Ready",
      featured: true,
      threeDType: "hologram",
      primaryColor: "#ffffff",
      secondaryColor: "#a1a1aa",
      metrics: [
        { label: "Platform", value: "iOS / Swift" },
      ],
    },
    {
      id: "talking-pet",
      title: "talkingPet",
      description: "Swift ve iOS platformu için geliştirilen, etkileşimli ve sesli yanıt veren 3D sanal evcil hayvan iOS uygulaması.",
      category: "iOS & Swift",
      tags: ["Swift", "iOS", "Xcode", "SwiftUI", "Audio"],
      githubUrl: "https://github.com/karabul7tt/talkingPet",
      deploymentStatus: "Ready",
      featured: true,
      threeDType: "hologram",
      primaryColor: "#ffffff",
      secondaryColor: "#a1a1aa",
      metrics: [
        { label: "Dil", value: "Swift (iOS)" },
      ],
    },
    {
      id: "sakura-hand-gesture",
      title: "SakuraHandGesture",
      description: "MediaPipe Hands ve WebGL 3D kullanarak el jestleri ve hareketleriyle gerçek zamanlı etkileşime giren sihirli Sakura simülasyonu.",
      category: "AI & ML",
      tags: ["JavaScript", "Three.js", "MediaPipe Hands", "WebGL"],
      githubUrl: "https://github.com/karabul7tt/SakuraHandGesture",
      liveUrl: "/demos/sakura/index.html",
      deploymentStatus: "Ready",
      featured: true,
      threeDType: "swarm",
      primaryColor: "#ffffff",
      secondaryColor: "#a1a1aa",
      metrics: [
        { label: "AI", value: "El Hareketi Takibi" },
      ],
    },
    {
      id: "chefagent",
      title: "chefagent",
      description: "Buzdolabındaki malzemeleri ve besin değerlerini analiz ederek yapay zeka ile kişiye özel tarifler ve kalori hesabı sunan akıllı mutfak asistanı.",
      category: "AI & ML",
      tags: ["JavaScript", "React", "AI SDK", "Tailwind CSS"],
      githubUrl: "https://github.com/karabul7tt/chefagent",
      liveUrl: "/demos/chef-agent/index.html",
      deploymentStatus: "Ready",
      featured: true,
      threeDType: "prism",
      primaryColor: "#ffffff",
      secondaryColor: "#a1a1aa",
      metrics: [
        { label: "Tür", value: "Yapay Zeka Asistanı" },
      ],
    },
    {
      id: "personel-finance",
      title: "personelFinance",
      description: "Gelir, gider ve birikim takibini görselleştiren, kullanıcı dostu kişisel bütçe ve finans yönetim arayüzü.",
      category: "Web & Frontend",
      tags: ["CSS3", "JavaScript", "HTML5", "Finans & Bütçe"],
      githubUrl: "https://github.com/karabul7tt/personelFinance",
      deploymentStatus: "Ready",
      featured: true,
      threeDType: "neural",
      primaryColor: "#ffffff",
      secondaryColor: "#a1a1aa",
      metrics: [
        { label: "Kategori", value: "Kişisel Finans" },
      ],
    },
    {
      id: "eagriculture",
      title: "eagriculture",
      description: "Zirai süreçler, tarımsal ürün verimliliği ve modern tarım yönetimi için geliştirilen e-tarım platformu.",
      category: "Web & Frontend",
      tags: ["HTML5", "CSS3", "JavaScript", "E-Tarım"],
      githubUrl: "https://github.com/karabul7tt/eagriculture",
      deploymentStatus: "Ready",
      featured: true,
      threeDType: "torus",
      primaryColor: "#ffffff",
      secondaryColor: "#a1a1aa",
      metrics: [
        { label: "Sektör", value: "Akıllı Tarım" },
      ],
    },
  ] as Project[],
  experiences: [] as Experience[],
};
