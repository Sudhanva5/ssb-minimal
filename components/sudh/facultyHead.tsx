import * as React from 'react';

/**
 * The people sections' frame: the section (a size container, so the layout
 * follows the column, not the viewport) and its eyebrow, title and lede.
 * The panel below runs edge to edge of the section.
 */
export function PeopleSection({
  id,
  eyebrow,
  title,
  lede,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lede: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} data-density="roomy" className="pt-section @container min-w-0 overflow-x-clip">
      <div className="py-12 @min-[42rem]:py-24">
        <div className="pt-head mb-8 flex flex-col gap-6 @min-[42rem]:mb-12 @min-[42rem]:flex-row @min-[42rem]:items-end @min-[42rem]:justify-between">
          <div className="pt-panel flex max-w-(--size-measure-max) flex-col gap-3">
            <p className="m-0 font-sans [overflow-wrap:anywhere] type-eyebrow text-content-brand">{eyebrow}</p>
            <div className="pt-subs">
              <h2 id={`${id}-title`} data-on className="m-0 font-sans [overflow-wrap:anywhere] type-display">
                {title}
              </h2>
            </div>
            <div className="pt-subs">
              <p data-on className="font-sans [overflow-wrap:anywhere] text-content-secondary type-body-lg">
                {lede}
              </p>
            </div>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
