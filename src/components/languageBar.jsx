import { Badge } from "@/components/ui/badge";

const languages = [
  { name: 'German', learners: '7.3k', flag: '🇩🇪' },
  { name: 'English', learners: '6.8k', flag: '🇺🇸' },
  { name: 'Business English', learners: '5.3k', flag: '🇬🇧' },
  { name: 'French', learners: '4.9k', flag: '🇫🇷' },
  { name: 'Spanish', learners: '3.3k', flag: '🇪🇸' },
  { name: 'Italian', learners: 'NEW', flag: '🇮🇹', isNew: true },
];

export default function LanguageBar() {
  return (
    <div className="w-full bg-transparent rounded-full p-2 flex items-center justify-between gap-2 overflow-x-auto">
      {languages.map((lang, index) => (
        <button
          key={index}
          className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-50/90 transition-colors whitespace-nowrap"
        >
          <span className="text-xl">{lang.flag}</span>
          <div className="text-left">
            <div className="text-sm font-medium text-white flex items-center gap-2">
              {lang.name}
              {lang.isNew && (
                <Badge className="bg-[#d81b60] text-white">NEW</Badge>
              )}
            </div>
            <div className="text-xs text-white/60">{lang.learners} Learners</div>
          </div>
        </button>
      ))}
    </div>
  );
}