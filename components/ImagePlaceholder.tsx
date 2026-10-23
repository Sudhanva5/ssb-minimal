import { ImageSquare } from '@phosphor-icons/react/dist/ssr';
import { cn } from '@kishanscaler/ssx-ui';

type ImagePlaceholderProps = {
  /** What the real image will show. Read out as the image's name, and drawn as its caption. */
  label: string;
  className?: string;
  /** Hide the icon and caption, for a backdrop that sits behind other content. */
  bare?: boolean;
};

/** Stands in for a photograph until the real asset lands. */
export function ImagePlaceholder({ label, className, bare = false }: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn('img-placeholder relative flex items-center justify-center overflow-hidden', className)}
    >
      {!bare && (
        <div className="flex flex-col items-center gap-2 px-4 text-center text-content-secondary">
          <ImageSquare className="size-icon-lg" weight="duotone" aria-hidden />
          <span className="type-caption">{label}</span>
        </div>
      )}
    </div>
  );
}
