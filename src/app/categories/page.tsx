import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChild,
  faGamepad,
  faHeart,
  faHome,
  faLaptopCode,
  faTshirt,
  faBaby,
  faRing,
  faPalette,
  faCamera,
  faMusic,
  faBookOpen,
  faDumbbell,
  faPlane,
  faStar,
  faGift
} from '@fortawesome/free-solid-svg-icons';

export default function Categories() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            קטגוריות מתנות AI
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            חפש מתנות לפי קטגוריה - מתנות לילדים, מתנות טכנולוגיות, מתנות רומנטיות ועוד
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {categories.map((category, index) => (
            <Link 
              key={index}
              href={`/categories/${category.slug}`}
              className="group bg-white/10 backdrop-blur-md rounded-3xl p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="text-center">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                  <FontAwesomeIcon icon={category.icon} className="text-white text-2xl" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {category.name}
                </h3>
                
                <p className="text-white/70 text-sm mb-4 leading-relaxed">
                  {category.description}
                </p>
                
                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  {category.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="bg-white/10 text-white/60 px-2 py-1 rounded-lg text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="text-purple-300 text-sm font-semibold group-hover:text-purple-200 transition-colors">
                  {category.itemCount} רעיונות מתנות →
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">לא מצאת מה שחיפשת?</h2>
          <p className="text-white/80 text-lg mb-6">
            השתמש ב-AI החכם שלנו לקבלת המלצות מותאמות אישית לכל אדם ואירוע
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

const categories = [
  {
    name: "מתנות לילדים",
    description: "מתנות מיוחדות לילדים בכל הגילאים - צעצועים, משחקים חינוכיים ועוד",
    icon: faChild,
    slug: "kids",
    itemCount: 50,
    tags: ["צעצועים", "משחקים", "חינוכיים"]
  },
  {
    name: "מתנות טכנולוגיות",
    description: "גאדג'טים חכמים, אלקטרוניקה, וכל מה שקשור לטכנולוגיה מתקדמת",
    icon: faLaptopCode,
    slug: "tech",
    itemCount: 45,
    tags: ["גאדג'טים", "אלקטרוניקה", "חכם"]
  },
  {
    name: "מתנות רומנטיות",
    description: "מתנות לבן/בת זוג, מתנות ליום אהבה ויום נישואין",
    icon: faHeart,
    slug: "romantic",
    itemCount: 35,
    tags: ["רומנטי", "זוגות", "אהבה"]
  },
  {
    name: "מתנות בית ומטבח",
    description: "כלי מטבח מיוחדים, עיצוב הבית, וכל מה שישדרג את הבית",
    icon: faHome,
    slug: "home-kitchen",
    itemCount: 40,
    tags: ["מטבח", "בית", "עיצוב"]
  },
  {
    name: "מתנות לגיימרים",
    description: "ציוד גיימינג, אביזרים למשחקים, ומתנות לחובבי משחקים",
    icon: faGamepad,
    slug: "gaming",
    itemCount: 30,
    tags: ["גיימינג", "משחקים", "ציוד"]
  },
  {
    name: "מתנות אופנה וסטייל",
    description: "בגדים, אביזרים, תיקים, ומתנות אופנתיות",
    icon: faTshirt,
    slug: "fashion",
    itemCount: 42,
    tags: ["אופנה", "בגדים", "סטייל"]
  },
  {
    name: "מתנות לתינוקות",
    description: "מתנות לתינוקות ולהורים טריים - ממוצרי תינוקות ועד צעצועי התפתחות",
    icon: faBaby,
    slug: "baby",
    itemCount: 25,
    tags: ["תינוקות", "התפתחות", "הורים"]
  },
  {
    name: "מתנות יוקרה",
    description: "מתנות מיוחדות ויוקרתיות למי שרוצה להרשים",
    icon: faStar,
    slug: "luxury",
    itemCount: 20,
    tags: ["יוקרה", "מיוחד", "יקר"]
  },
  {
    name: "מתנות לחתונה",
    description: "מתנות לחתן וכלה, מתנות לחתונה ומתנות לאורחים",
    icon: faRing,
    slug: "wedding",
    itemCount: 28,
    tags: ["חתונה", "כלה", "חתן"]
  },
  {
    name: "מתנות יצירתיות",
    description: "מתנות לאמנים, ציירים, ולכל מי שאוהב ליצור",
    icon: faPalette,
    slug: "creative",
    itemCount: 33,
    tags: ["יצירה", "אמנות", "ציור"]
  },
  {
    name: "מתנות ספורט ופיטנס",
    description: "ציוד ספורט, מתנות לכושר, ומתנות לאוהבי פעילות גופנית",
    icon: faDumbbell,
    slug: "sports",
    itemCount: 38,
    tags: ["ספורט", "כושר", "פעילות"]
  },
  {
    name: "מתנות לנסיעות",
    description: "מתנות לאוהבי נסיעות, אביזרי נסיעה, ומתנות לחופשה",
    icon: faPlane,
    slug: "travel",
    itemCount: 22,
    tags: ["נסיעות", "חופשה", "טיולים"]
  },
  {
    name: "מתנות חינוכיות",
    description: "ספרים, משחקים חינוכיים, ומתנות שמפתחות ומלמדות",
    icon: faBookOpen,
    slug: "educational",
    itemCount: 35,
    tags: ["חינוך", "ספרים", "למידה"]
  },
  {
    name: "מתנות מוזיקה",
    description: "כלי נגינה, אביזרי מוזיקה, ומתנות לאוהבי מוזיקה",
    icon: faMusic,
    slug: "music",
    itemCount: 27,
    tags: ["מוזיקה", "נגינה", "כלים"]
  },
  {
    name: "מתנות צילום",
    description: "ציוד צילום, אביזרים למצלמות, ומתנות לצלמים",
    icon: faCamera,
    slug: "photography",
    itemCount: 24,
    tags: ["צילום", "מצלמה", "צלמים"]
  },
  {
    name: "מתנות מפתיעות",
    description: "מתנות מיוחדות ומפתיעות שלא רואים כל יום",
    icon: faGift,
    slug: "surprise",
    itemCount: 31,
    tags: ["מפתיע", "מיוחד", "לא רגיל"]
  }
]; 