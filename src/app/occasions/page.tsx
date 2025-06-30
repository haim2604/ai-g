import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBirthdayCake,
  faHeart,
  faRing,
  faGraduationCap,
  faStar,
  faGift,
  faBaby,
  faHome,
  faCrown,
  faTree,
  faFire,
  faEgg,
  faHospital
} from '@fortawesome/free-solid-svg-icons';

export default function Occasions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            מתנות לכל אירוע
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            מצא את המתנה המושלמת לכל אירוע - יום הולדת, יום נישואין, חתונה, חנוכה ועוד
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {occasions.map((occasion, index) => (
            <Link 
              key={index}
              href={`/occasions/${occasion.slug}`}
              className="group bg-white/10 backdrop-blur-md rounded-3xl p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="text-center">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                  <FontAwesomeIcon icon={occasion.icon} className="text-white text-2xl" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {occasion.name}
                </h3>
                
                <p className="text-white/70 text-sm mb-4 leading-relaxed">
                  {occasion.description}
                </p>
                
                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  {occasion.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="bg-white/10 text-white/60 px-2 py-1 rounded-lg text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="text-purple-300 text-sm font-semibold group-hover:text-purple-200 transition-colors">
                  {occasion.timing} →
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">לא מצאת את האירוע שלך?</h2>
          <p className="text-white/80 text-lg mb-6">
            השתמש ב-AI החכם שלנו לקבלת המלצות מותאמות אישית לכל אירוע ואדם
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

const occasions = [
  {
    name: "יום הולדת",
    description: "מתנות מיוחדות לכל גיל - מתינוקות ועד מבוגרים, מתנות אישיות ומפתיעות",
    icon: faBirthdayCake,
    slug: "birthday",
    timing: "כל השנה",
    tags: ["גיל", "חגיגה", "אישי"]
  },
  {
    name: "יום נישואין",
    description: "מתנות רומנטיות ומיוחדות לציון יום הנישואין, מתנות לזוגות",
    icon: faRing,
    slug: "anniversary",
    timing: "תאריך אישי",
    tags: ["רומנטי", "זוגות", "זיכרון"]
  },
  {
    name: "יום אהבה",
    description: "מתנות רומנטיות ליום ולנטיין, מתנות לבן/בת זוג",
    icon: faHeart,
    slug: "valentines",
    timing: "14 בפברואר",
    tags: ["רומנטי", "ולנטיין", "אהבה"]
  },
  {
    name: "חתונה",
    description: "מתנות לחתן וכלה, מתנות לחתונה ומתנות לאורחים",
    icon: faRing,
    slug: "wedding",
    timing: "כל השנה",
    tags: ["חתונה", "כלה", "חתן"]
  },
  {
    name: "חנוכה",
    description: "מתנות לחנוכה, מתנות לחג האורים, 8 ימי חנוכה",
    icon: faFire,
    slug: "hanukkah",
    timing: "דצמבר",
    tags: ["חנוכה", "חג", "יהודי"]
  },
  {
    name: "פורים",
    description: "מתנות לפורים, משלוח מנות, מתנות לעניים",
    icon: faCrown,
    slug: "purim",
    timing: "מרץ",
    tags: ["פורים", "משלוח מנות", "תחפושות"]
  },
  {
    name: "ראש השנה",
    description: "מתנות לראש השנה היהודי, מתנות לחג",
    icon: faStar,
    slug: "rosh-hashana",
    timing: "ספטמבר",
    tags: ["ראש השנה", "חג", "יהודי"]
  },
  {
    name: "סיום לימודים",
    description: "מתנות לסיום לימודים, מתנות לבוגרים, מתנות השכלה",
    icon: faGraduationCap,
    slug: "graduation",
    timing: "יוני-יולי",
    tags: ["לימודים", "בוגרים", "הישגים"]
  },
  {
    name: "לידת תינוק",
    description: "מתנות לתינוק חדש, מתנות להורים הטריים",
    icon: faBaby,
    slug: "new-baby",
    timing: "כל השנה",
    tags: ["תינוק", "לידה", "הורים"]
  },
  {
    name: "חנוכת בית",
    description: "מתנות לחנוכת בית, מתנות לבית חדש",
    icon: faHome,
    slug: "housewarming",
    timing: "כל השנה",
    tags: ["בית", "חנוכה", "חדש"]
  },
  {
    name: "בר/בת מצווה",
    description: "מתנות לבר מצווה ובת מצווה, מתנות לגיל 13",
    icon: faStar,
    slug: "bar-bat-mitzvah",
    timing: "כל השנה",
    tags: ["בר מצווה", "בת מצווה", "13"]
  },
  {
    name: "פרישה",
    description: "מתנות לפרישה, מתנות לסיום קריירה",
    icon: faGift,
    slug: "retirement",
    timing: "כל השנה",
    tags: ["פרישה", "קריירה", "סיום"]
  },
  {
    name: "חג המולד",
    description: "מתנות לחג המולד, מתנות לחג הנוצרי",
    icon: faTree,
    slug: "christmas",
    timing: "דצמבר",
    tags: ["חג המולד", "נוצרי", "חג"]
  },
  {
    name: "פסח",
    description: "מתנות לפסח, מתנות לחג החירות",
    icon: faEgg,
    slug: "passover",
    timing: "מרץ-אפריל",
    tags: ["פסח", "חג", "חירות"]
  },
  {
    name: "יום הולדת עגול",
    description: "מתנות לימי הולדת עגולים - 18, 30, 40, 50 ועוד",
    icon: faStar,
    slug: "milestone-birthday",
    timing: "כל השנה",
    tags: ["עגול", "ציון דרך", "מיוחד"]
  },
  {
    name: "החלמה",
    description: "מתנות להחלמה, מתנות לחולים, מתנות עידוד",
    icon: faHospital,
    slug: "get-well",
    timing: "כל השנה",
    tags: ["החלמה", "בריאות", "עידוד"]
  }
]; 