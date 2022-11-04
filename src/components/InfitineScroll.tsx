import { ReactNode, useEffect, useRef } from 'react';

interface Props {
  children: ReactNode;
  loadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  loader: ReactNode;
}

function InfitineScroll({
  children,
  loadMore,
  hasMore,
  isLoading,
  loader,
}: Props) {
  const lastElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lastElement = lastElementRef.current as HTMLDivElement;

    const options: IntersectionObserverInit = {
      threshold: 1.0,
    };

    let observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!isLoading && hasMore && entry.isIntersecting) {
          loadMore();
        }
      });
    }, options);

    observer.observe(lastElement);

    return () => observer.unobserve(lastElement);
  }, [hasMore, isLoading, loadMore]);

  return (
    <>
      {children}
      <div ref={lastElementRef} />
      {isLoading && loader}
    </>
  );
}

export default InfitineScroll;
