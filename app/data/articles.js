export const articles = [
    {
      id: 1,
      author: {
        name: "مهراندیش",
        avatar: "/default-avatar.png"
      },
      tags: ["برنامه‌نویسی", "هوش مصنوعی"],
      summary: "در این مقاله به بررسی کاربردهای هوش مصنوعی در توسعه نرم‌افزار می‌پردازیم",
      content: "محتوای تخصصی درباره هوش مصنوعی",
      podcast: {
        url: "/podcast/1.mp3",
        duration: "35:20",
        size: "28MB"
      },
      tableOfContents: [],
      relatedArticles: [6, 8],
      title: "کاربرد هوش مصنوعی در برنامه‌نویسی",
      excerpt: "بررسی نقش AI در آینده توسعه نرم‌افزار و ابزارهای کاربردی",
      image: "/img/articles/ai-programming.png",
      category: "هوش مصنوعی",
      readTime: "14 دقیقه",
      views: 290,
      date: "1402/08/18",
      slug: "ai-in-programming"
    },
    {
      id: 2,
      author: {
        name: "مهراندیش",
        avatar: "/default-avatar.png"
      },
      tags: ["دیتابیس", "SQL", "پایگاه داده"],
      summary: "آموزش جامع پایگاه داده‌های رابطه‌ای و کار با SQL",
      content: "محتوای تخصصی درباره دیتابیس",
      podcast: {
        url: "/podcast/2.mp3",
        duration: "35:20",
        size: "28MB"
      },
      tableOfContents: [],
      relatedArticles: [],
      title: "آموزش جامع SQL",
      excerpt: "یادگیری اصول پایگاه داده و دستورات SQL از مبتدی تا پیشرفته",
      image: "/img/articles/sql-tutorial.png",
      category: "پایگاه داده",
      readTime: "20 دقیقه",
      views: 445,
      date: "1402/08/25",
      slug: "comprehensive-sql-tutorial"
    },
    {
      id: 3,
      author: {
        name: "مهراندیش",
        avatar: "/default-avatar.png"
      },
      tags: ["React", "فرانت‌اند", "جاوااسکریپت"],
      summary: "آموزش هوک‌های React و نحوه استفاده بهینه از آنها",
      content: "محتوای تخصصی درباره هوک‌های ری‌اکت",
      podcast: {
        url: "/podcast/3.mp3",
        duration: "35:20",
        size: "28MB"
      },
      tableOfContents: [],
      relatedArticles: [6, 8],
      title: "هوک‌های کاربردی React",
      excerpt: "معرفی و آموزش عمیق هوک‌های پرکاربرد در React.js",
      image: "/img/articles/react-hooks.png",
      category: "فرانت اند",
      readTime: "16 دقیقه",
      views: 520,
      date: "1402/08/22",
      slug: "react-hooks-guide"
    },
    {
      id: 4,
      author: {
        name: "مهراندیش",
        avatar: "/default-avatar.png"
      },
      tags: ["DevOps", "Docker", "کانتینر"],
      summary: "آشنایی با Docker و کانتینرایزیشن در توسعه نرم‌افزار",
      content: "محتوای تخصصی درباره داکر",
      podcast: {
        url: "/podcasts/ai-programming.mp3",
        duration: "35:20",
        size: "28MB"
      },
      tableOfContents: [],
      relatedArticles: [],
      title: "آموزش Docker برای توسعه‌دهندگان",
      excerpt: "راهنمای کامل کار با Docker و مدیریت کانتینرها",
      image: "/img/articles/docker-guide.png",
      category: "DevOps",
      readTime: "25 دقیقه",
      views: 310,
      date: "1402/08/20",
      slug: "docker-for-developers"
    },
    {
      id: 5,
      author: {
        name: "مهراندیش",
        avatar: "/default-avatar.png"
      },
      tags: ["امنیت", "رمزنگاری", "وب"],
      summary: "آموزش پیاده‌سازی JWT در پروژه‌های وب",
      content: "محتوای تخصصی درباره JWT",
      podcast: {
        url: "/podcasts/ai-programming.mp3",
        duration: "35:20",
        size: "28MB"
      },
      tableOfContents: [],
      relatedArticles: [],
      title: "احراز هویت با JWT",
      excerpt: "پیاده‌سازی سیستم احراز هویت امن با استفاده از JWT",
      image: "/img/articles/jwt-auth.png",
      category: "امنیت",
      readTime: "12 دقیقه",
      views: 380,
      date: "1402/08/28",
      slug: "jwt-authentication"
    },
    {
      id: 6,
      author: {
        name: "مهراندیش", 
        avatar: "/default-avatar.png"
      },
      tags: ["TypeScript", "جاوااسکریپت", "برنامه‌نویسی"],
      summary: "آموزش اصول TypeScript برای توسعه‌دهندگان جاوااسکریپت",
      content: "محتوای تخصصی درباره تایپ‌اسکریپت",
      podcast: {
        url: "/podcasts/ai-programming.mp3",
        duration: "35:20",
        size: "28MB"
      },
      tableOfContents: [],
      relatedArticles: [],
      title: "تایپ‌اسکریپت برای توسعه‌دهندگان جاوااسکریپت",
      excerpt: "یادگیری TypeScript از صفر تا صد برای برنامه‌نویسان JS",
      image: "/img/articles/typescript.png",
      category: "برنامه‌نویسی",
      readTime: "22 دقیقه", 
      views: 420,
      date: "1402/08/30",
      slug: "typescript-for-js-developers"
    },
    {
      id: 7,
      author: {
        name: "مهراندیش",
        avatar: "/default-avatar.png"
      },
      tags: ["TDD", "تست", "برنامه‌نویسی"],
      summary: "اصول توسعه نرم‌افزار مبتنی بر تست",
      content: "محتوای تخصصی درباره TDD",
      podcast: {
        url: "/podcasts/ai-programming.mp3",
        duration: "35:20",
        size: "28MB"
      },
      tableOfContents: [],
      relatedArticles: [],
      title: "توسعه مبتنی بر تست (TDD)",
      excerpt: "آموزش Test-Driven Development و پیاده‌سازی عملی",
      image: "/img/articles/tdd.png",
      category: "متدولوژی",
      readTime: "18 دقیقه",
      views: 290,
      date: "1402/09/02",
      slug: "test-driven-development"
    },
    {
      id: 8,
      author: {
        name: "مهراندیش",
        avatar: "/default-avatar.png"
      },
      tags: ["مهندسی نرم‌افزار", "معماری", "طراحی"],
      summary: "الگوهای طراحی رایج در توسعه نرم‌افزار",
      content: "محتوای تخصصی درباره الگوهای طراحی",
      podcast: {
        url: "/podcasts/ai-programming.mp3",
        duration: "35:20",
        size: "28MB"
      },
      tableOfContents: [],
      relatedArticles: [],
      title: "الگوهای طراحی در جاوااسکریپت",
      excerpt: "پیاده‌سازی Design Patterns معروف با جاوااسکریپت مدرن",
      image: "/img/articles/design-patterns.png",
      category: "معماری نرم‌افزار",
      readTime: "25 دقیقه",
      views: 510,
      date: "1402/09/05",
      slug: "js-design-patterns"
    },
    {
      id: 9,
      author: {
        name: "مهراندیش",
        avatar: "/default-avatar.png"
      },
      tags: ["GraphQL", "API", "بک‌اند"],
      summary: "مقایسه GraphQL با REST و کاربردهای آن",
      content: "محتوای تخصصی درباره GraphQL",
      podcast: {
        url: "/podcasts/ai-programming.mp3",
        duration: "35:20",
        size: "28MB"
      },
      tableOfContents: [],
      relatedArticles: [],
      title: "آشنایی با GraphQL",
      excerpt: "مقدمه‌ای بر GraphQL و مزایای استفاده از آن",
      image: "/img/articles/graphql.png",
      category: "بک‌اند",
      readTime: "16 دقیقه",
      views: 340,
      date: "1402/09/08",
      slug: "graphql-introduction"
    },
    {
      id: 10,
      author: {
        name: "مهراندیش",
        avatar: "/default-avatar.png"
      },
      tags: ["Linux", "DevOps", "سیستم‌عامل"],
      summary: "دستورات ضروری لینوکس برای توسعه‌دهندگان",
      content: "محتوای تخصصی درباره لینوکس",
      podcast: {
        url: "/podcasts/ai-programming.mp3",
        duration: "35:20",
        size: "28MB"
      },
      tableOfContents: [],
      relatedArticles: [],
      title: "لینوکس برای برنامه‌نویسان",
      excerpt: "آموزش دستورات پرکاربرد لینوکس در توسعه نرم‌افزار",
      image: "/img/articles/linux.png",
      category: "DevOps",
      readTime: "20 دقیقه",
      views: 280,
      date: "1402/09/10",
      slug: "linux-for-developers"
    },
    {
      id: 11,
      author: {
        name: "مهراندیش",
        avatar: "/default-avatar.png"
      },
      tags: ["Redis", "کش", "پایگاه‌داده"],
      summary: "استفاده از Redis برای بهبود کارایی برنامه",
      content: "محتوای تخصصی درباره Redis",
      podcast: {
        url: "/podcasts/ai-programming.mp3",
        duration: "35:20",
        size: "28MB"
      },
      tableOfContents: [],
      relatedArticles: [],
      title: "کش‌گذاری با Redis",
      excerpt: "پیاده‌سازی سیستم کش با استفاده از Redis",
      image: "/img/articles/redis.png",
      category: "پایگاه‌داده",
      readTime: "15 دقیقه",
      views: 320,
      date: "1402/09/12",
      slug: "redis-caching"
    },
    {
      id: 12,
      author: {
        name: "مهراندیش",
        avatar: "/default-avatar.png"
      },
      tags: ["مایکروسرویس", "معماری", "طراحی"],
      summary: "طراحی و پیاده‌سازی معماری مایکروسرویس",
      content: "محتوای تخصصی درباره مایکروسرویس",
      podcast: {
        url: "/podcasts/ai-programming.mp3",
        duration: "35:20",
        size: "28MB"
      },
      tableOfContents: [],
      relatedArticles: [],
      title: "معماری مایکروسرویس",
      excerpt: "اصول طراحی و پیاده‌سازی سیستم‌های مایکروسرویس",
      image: "/img/articles/microservices.png",
      category: "معماری نرم‌افزار",
      readTime: "28 دقیقه",
      views: 450,
      date: "1402/09/15",
      slug: "microservices-architecture"
    },
    {
      id: 13,
      author: {
        name: "مهراندیش",
        avatar: "/default-avatar.png"
      },
      tags: ["WebSocket", "realtime", "وب"],
      summary: "پیاده‌سازی ارتباطات بلادرنگ با WebSocket",
      content: "محتوای تخصصی درباره WebSocket",
      podcast: {
        url: "/podcasts/ai-programming.mp3",
        duration: "35:20",
        size: "28MB"
      },
      tableOfContents: [],
      relatedArticles: [],
      title: "برنامه‌نویسی WebSocket",
      excerpt: "ساخت اپلیکیشن‌های realtime با WebSocket",
      image: "/img/articles/websocket.png",
      category: "وب",
      readTime: "16 دقیقه",
      views: 380,
      date: "1402/09/18",
      slug: "websocket-programming"
    },
    {
      id: 14,
      author: {
        name: "مهراندیش",
        avatar: "/default-avatar.png"
      },
      tags: ["CI/CD", "DevOps", "اتوماسیون"],
      summary: "پیاده‌سازی CI/CD با GitHub Actions",
      content: "محتوای تخصصی درباره CI/CD",
      podcast: {
        url: "/podcasts/ai-programming.mp3",
        duration: "35:20",
        size: "28MB"
      },
      tableOfContents: [],
      relatedArticles: [],
      title: "آموزش GitHub Actions",
      excerpt: "اتوماسیون فرآیند توسعه با GitHub Actions",
      image: "/img/articles/github-actions.png",
      category: "DevOps",
      readTime: "22 دقیقه",
      views: 290,
      date: "1402/09/20",
      slug: "github-actions-tutorial"
    },
    {
      id: 15,
      author: {
        name: "مهراندیش",
        avatar: "/default-avatar.png"
      },
      tags: ["MongoDB", "NoSQL", "پایگاه‌داده"],
      summary: "آموزش کار با پایگاه‌داده MongoDB و Mongoose",
      content: "محتوای تخصصی درباره مونگو",
      podcast: {
        url: "/podcasts/ai-programming.mp3",
        duration: "35:20",
        size: "28MB"
      },
      tableOfContents: [],
      relatedArticles: [],
      title: "کار با MongoDB و Mongoose",
      excerpt: "آموزش جامع پایگاه‌داده NoSQL با MongoDB",
      image: "/img/articles/mongodb.png",
      category: "پایگاه‌داده",
      readTime: "24 دقیقه",
      views: 410,
      date: "1402/09/22",
      slug: "mongodb-mongoose"
    },
    {
      id: 16,
      author: {
        name: "مهراندیش",
        avatar: "/default-avatar.png"
      },
      tags: ["PWA", "وب", "موبایل"],
      summary: "ساخت اپلیکیشن‌های پیشرو وب",
      content: "محتوای تخصصی درباره PWA",
      podcast: {
        url: "/podcasts/ai-programming.mp3",
        duration: "35:20",
        size: "28MB"
      },
      tableOfContents: [],
      relatedArticles: [],
      title: "توسعه Progressive Web Apps",
      excerpt: "آموزش ساخت PWA با قابلیت‌های آفلاین",
      image: "/img/articles/pwa.png",
      category: "وب",
      readTime: "19 دقیقه",
      views: 325,
      date: "1402/09/25",
      slug: "progressive-web-apps"
    },
    {
      id: 17,
      author: {
        name: "مهراندیش",
        avatar: "/default-avatar.png"
      },
      tags: ["Kubernetes", "DevOps", "کانتینر"],
      summary: "مدیریت کانتینرها با Kubernetes",
      content: "محتوای تخصصی درباره کوبرنتیز",
      podcast: {
        url: "/podcasts/ai-programming.mp3",
        duration: "35:20",
        size: "28MB"
      },
      tableOfContents: [],
      relatedArticles: [],
      title: "آموزش Kubernetes",
      excerpt: "اصول اولیه و پیشرفته کار با Kubernetes",
      image: "/img/articles/kubernetes.png",
      category: "DevOps",
      readTime: "30 دقیقه",
      views: 280,
      date: "1402/09/28",
      slug: "kubernetes-tutorial"
    },
    {
      id: 18,
      author: {
        name: "مهراندیش",
        avatar: "/default-avatar.png"
      },
      tags: ["SEO", "بهینه‌سازی", "وب"],
      summary: "تکنیک‌های بهینه‌سازی سایت برای موتورهای جستجو",
      content: "محتوای تخصصی درباره سئو",
      podcast: {
        url: "/podcasts/ai-programming.mp3",
        duration: "35:20",
        size: "28MB"
      },
      tableOfContents: [],
      relatedArticles: [],
      title: "اصول SEO در توسعه وب",
      excerpt: "راهنمای جامع بهینه‌سازی سایت برای موتورهای جستجو",
      image: "/img/articles/seo.png",
      category: "وب",
      readTime: "17 دقیقه",
      views: 520,
      date: "1402/10/02",
      slug: "seo-principles"
    },
    {
      id: 19,
      author: {
        name: "مهراندیش",
        avatar: "/default-avatar.png"
      },
      tags: ["Rust", "برنامه‌نویسی", "سیستمی"],
      summary: "مقدمه‌ای بر زبان برنامه‌نویسی Rust",
      content: "محتوای تخصصی درباره راست",
      podcast: {
        url: "/podcasts/ai-programming.mp3",
        duration: "35:20",
        size: "28MB"
      },
      tableOfContents: [],
      relatedArticles: [],
      title: "شروع برنامه‌نویسی Rust",
      excerpt: "آموزش مفاهیم پایه زبان Rust برای توسعه‌دهندگان",
      image: "/img/articles/rust.png",
      category: "برنامه‌نویسی",
      readTime: "26 دقیقه",
      views: 245,
      date: "1402/10/05",
      slug: "rust-programming"
    }
  ];