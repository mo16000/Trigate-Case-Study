'use client';
import { usePathname, useRouter } from 'next/navigation';
import { chapters } from '@/lib/case-study';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
const pages = [
  { value: '/', label: 'Overview' },
  ...chapters.map((c) => ({ value: `/${c.slug}`, label: c.title })),
];
export default function SiteNav() {
  const pathname = usePathname();
  const router = useRouter();
  const current = pages.find((page) => page.value === pathname) ?? pages[0];
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Trigate case study overview">
        <img
          src="/assets/Trigate-Logo-2.svg"
          width={150}
          height={20}
          alt="Trigate"
        />
      </a>
      <span className="header-context">A product design case study</span>
      <nav className="header-nav" aria-label="Main navigation">
        <Select
          items={pages}
          value={current.value}
          onValueChange={(value) => {
            if (value && value !== pathname) router.push(value);
          }}
        >
          <SelectTrigger
            className="chapter-select-trigger"
            aria-label="Choose a page"
            title={current.label}
          >
            <SelectValue>{current.label}</SelectValue>
          </SelectTrigger>
          <SelectContent
            className="chapter-select-list"
            align="end"
            alignItemWithTrigger={false}
            sideOffset={12}
          >
            {pages.map((page) => (
              <SelectItem
                key={page.value}
                value={page.value}
                className="chapter-select-option"
              >
                {page.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </nav>
    </header>
  );
}
