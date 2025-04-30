import searchErrorIcon from '@/assets/icons/downloads/search-error.svg';

const iconLists: Record<string, string> = {
  'search-error': searchErrorIcon,
};

export function getErrorIcon(iconName: string): string | undefined {
  return iconLists[iconName];
}
