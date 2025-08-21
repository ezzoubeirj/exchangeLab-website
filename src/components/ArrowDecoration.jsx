import { useLocale } from "next-intl"


export default function ArrowDecorationFlipped({ className = 'w-12 h-12' }) {
  const locale = useLocale();
  const isRTL = locale === "ar";

    return (
      <svg
        className={className}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        transform={isRTL ? 'rotate(90)' : 'rotate(30)'}
        // "rotate(180, 50, 50)">
      >
        <g transform={`${isRTL ? '' : 'rotate(180, 50, 50)'}`}>
          <rect x="20" y="15" width="8" height="40" rx="6" transform="rotate(40 20 15)" fill="tomato" />
          <rect x="40" y="30" width="8" height="80" rx="10" transform="rotate(20 40 30)" fill="tomato" />
          <rect x="55" y="50" width="8" height="45" rx="6" transform="rotate(0 55 50)" fill="tomato" />
        </g>
      </svg>
    );
  }