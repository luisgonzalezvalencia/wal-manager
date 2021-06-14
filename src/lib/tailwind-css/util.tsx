const TextSizes = [
  'text-xs',
  'text-sm',
  'text-base',
  'text-lg',
  'text-xl',
  'text-2xl',
  'text-3xl',
  'text-4xl',
  'text-5xl',
  'text-6xl',
  'text-7xl',
  'text-8xl',
  'text-9xl',
];

export const SizeAlreadyExists = (classNames: string): boolean =>
  classNames.split(' ').some((value) => TextSizes.some((size) => size === value));
