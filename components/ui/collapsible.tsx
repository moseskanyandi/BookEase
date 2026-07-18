import { PropsWithChildren } from 'react';

import { CollapsibleView } from './collapsible-view';
import { useCollapsible } from '@/hooks/use-collapsible';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const { isOpen, toggle } = useCollapsible(false);

  return (
    <CollapsibleView title={title} isOpen={isOpen} onToggle={toggle}>
      {children}
    </CollapsibleView>
  );
}
