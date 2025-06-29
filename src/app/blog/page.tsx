import Link from 'next/link';

export default function Blog() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            מדריך מתנות AI מקיף
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            הכל על מתנות AI, חיפוש מתנות חכם, ומדריכים מקיפים למציאת המתנה המושלמת לכל אירוע
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogPosts.map((post, index) => (
            <article key={index} className="bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden hover:bg-white/15 transition-all duration-300">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {post.category}
                  </span>
                  <span className="text-white/60 text-sm">{post.readTime}</span>
                </div>
                
                <h2 className="text-xl font-bold text-white mb-3 hover:text-purple-300 transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-white/80 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex} 
                      className="bg-white/10 text-white/70 px-2 py-1 rounded-lg text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  קרא עוד
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">מוכן למצוא את המתנה המושלמת?</h2>
          <p className="text-white/80 text-lg mb-6">
            השתמש ב-AI החכם שלנו כדי לקבל המלצות מותאמות אישית
          </p>
          <Link 
            href="/quiz"
            className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            התחל שאלון מתנות AI
          </Link>
        </div>
      </div>
    </div>
  );
}

const blogPosts = [
  {
    title: "המדריך השלם למתנות AI - איך לבחור מתנה מושלמת בעזרת בינה מלאכותית",
    excerpt: "גלה איך טכנולוגיית AI מהפכת את עולם המתנות. מדריך מקיף לבחירת מתנות חכמות עם המלצות מותאמות אישית.",
    category: "מדריכים",
    readTime: "5 דקות",
    slug: "guide-to-ai-gifts",
    tags: ["מתנות AI", "בינה מלאכותית", "מדריך מתנות", "טכנולוגיה"]
  },
  {
    title: "50 רעיונות מתנות ליום הולדת - המדריך המקיף לכל הגילאים",
    excerpt: "רשימה מקיפה של רעיונות מתנות ליום הולדת לכל הגילאים. מתינוקות ועד למבוגרים - מצא את המתנה המושלמת.",
    category: "רעיונות",
    readTime: "8 דקות", 
    slug: "50-birthday-gift-ideas",
    tags: ["יום הולדת", "רעיונות מתנות", "מתנות לגילאים", "מתנות אישיות"]
  },
  {
    title: "מתנות יום נישואין - 25 רעיונות רומנטיים ומיוחדים",
    excerpt: "רעיונות מתנות מיוחדים ליום נישואין. מתנות רומנטיות, מתנות חוויה, ומתנות מותאמות אישית לזוגות.",
    category: "יום נישואין",
    readTime: "6 דקות",
    slug: "anniversary-gifts-ideas", 
    tags: ["יום נישואין", "מתנות רומנטיות", "מתנות לזוגות", "מתנות חוויה"]
  },
  {
    title: "מתנות יום אהבה 2024 - רעיונות מיוחדים לוולנטיין",
    excerpt: "רעיונות מתנות מיוחדים ליום אהבה. מתנות רומנטיות, מתנות DIY, ומתנות שיפגישו את הלב.",
    category: "יום אהבה",
    readTime: "7 דקות",
    slug: "valentines-day-gifts-2024",
    tags: ["יום אהבה", "וולנטיין", "מתנות רומנטיות", "מתנות DIY"]
  },
  {
    title: "מתנות לחגים יהודיים - מדריך מקיף לחנוכה, פורים ועוד",
    excerpt: "מדריך מקיף למתנות בחגים יהודיים. רעיונות מתנות לחנוכה, פורים, ראש השנה, ופסח.",
    category: "חגים יהודיים",
    readTime: "9 דקות",
    slug: "jewish-holidays-gifts",
    tags: ["חנוכה", "פורים", "ראש השנה", "חגים יהודיים", "מתנות דתיות"]
  },
  {
    title: "מתנות לילדים - המדריך המקיף לפי גיל ותחביבים",
    excerpt: "מדריך מקיף למתנות לילדים. רעיונות מתנות לפי גיל, תחביבים, ושלבי התפתחות. מתינוקות ועד גיל 18.",
    category: "מתנות לילדים",
    readTime: "10 דקות",
    slug: "gifts-for-kids-by-age",
    tags: ["מתנות לילדים", "צעצועים", "מתנות חינוכיות", "מתנות פיתוח"]
  },
  {
    title: "מתנות לגיימרים - המדריך השלם לחובבי משחקים",
    excerpt: "מדריך מקיף למתנות לגיימרים. מעקסים ועד ציוד גיימינג מתקדם. כל מה שגיימר צריך.",
    category: "גיימינג",
    readTime: "6 דקות",
    slug: "gamer-gifts-guide",
    tags: ["גיימינג", "משחקי מחשב", "ציוד גיימינג", "מתנות טכנולוגיות"]
  },
  {
    title: "מתנות בית ומטבח - רעיונות מעשיים וחכמים",
    excerpt: "רעיונות מתנות מעשיים לבית ולמטבח. גאדג'טים חכמים, כלי מטבח מיוחדים, ומתנות שישדרגו כל בית.",
    category: "בית ומטבח",
    readTime: "8 דקות",
    slug: "home-kitchen-gifts",
    tags: ["כלי מטבח", "גאדג'טים לבית", "מתנות מעשיות", "בית חכם"]
  },
  {
    title: "מתנות DIY - איך להכין מתנות אישיות בבית",
    excerpt: "מדריך יצירת מתנות DIY בבית. רעיונות יצירתיים, מתנות אישיות, ומתנות מהלב שלא עולות הרבה.",
    category: "DIY",
    readTime: "12 דקות",
    slug: "diy-gifts-guide",
    tags: ["DIY", "מתנות יצירתיות", "מתנות מהלב", "יצירה בבית"]
  }
]; 