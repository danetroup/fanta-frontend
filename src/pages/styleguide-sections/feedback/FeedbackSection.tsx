import React from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import TippyTooltip from '../../../components/ui/TippyTooltip'; // <-- Replaced with TippyTooltip
import EmptyState from '../../../components/ui/EmptyState';
import { useToast } from '../../../components/ui/ToastContainer';
import { type ToastType } from '../../../components/ui/Toast';

const FeedbackSection: React.FC = () => {
  const { addToast } = useToast(); // Initialize useToast

  // Empty State Example
  const handleEmptyStateClearSearch = () => {
    alert('Empty State: Clear Search clicked!');
  };
  const handleEmptyStateAddItem = () => {
    alert('Empty State: Add New Item clicked!');
  };

  return (
    <Card className="p-6">
      <h2 className="text-3xl font-semibold mb-4 text-text">Feedback Components</h2>

      <h3 className="text-xl font-semibold mt-8 mb-4 text-text">Tooltips (using Tippy.js)</h3>
      <div className="flex flex-wrap items-center gap-8">
        <TippyTooltip content="This is a top tooltip." placement="top">
          <Button variant="secondary">Hover Me (Top)</Button>
        </TippyTooltip>
        <TippyTooltip content="This is a right tooltip with more content." placement="right">
          <Button variant="secondary">Hover Me (Right)</Button>
        </TippyTooltip>
        <TippyTooltip content="Tooltip at the bottom." placement="bottom">
          <Button variant="secondary">Hover Me (Bottom)</Button>
        </TippyTooltip>
        <TippyTooltip content="Left-aligned tooltip." placement="left">
          <Button variant="secondary">Hover Me (Left)</Button>
        </TippyTooltip>
      </div>

      <h3 className="text-xl font-semibold mt-8 mb-4 text-text">Toast Notifications</h3>
      <div className="flex flex-wrap items-center gap-4">
        <Button onClick={() => addToast('Success message!', 'success')}>Show Success Toast</Button>
        <Button onClick={() => addToast('Error message!', 'error')}>Show Error Toast</Button>
        <Button onClick={() => addToast('Info message!', 'info')}>Show Info Toast</Button>
        <Button onClick={() => addToast('Warning message!', 'warning')}>Show Warning Toast</Button>
        <Button onClick={() => addToast('Sticky Toast (no auto-dismiss)', 'info', 0)}>Show Sticky Toast</Button>
      </div>

      <h3 className="text-xl font-semibold mt-8 mb-4 text-text">Empty State / No Data</h3>
      <div className="space-y-8">
        <EmptyState
          title="No Data Found"
          description="It looks like there's no information to display here yet. Please try adjusting your filters or adding new data."
          icon="📊"
        />
        <EmptyState
          title="Search Results Empty"
          description="We couldn't find any items matching your search criteria. Try a different keyword or broaden your search."
          icon="🔍"
          actionButton={<Button variant="primary" onClick={handleEmptyStateClearSearch}>Clear Search</Button>}
        />
        <EmptyState
          title="Welcome! Get Started"
          description="You haven't created any items yet. Click the button below to add your first entry."
          icon="🚀"
          actionButton={<Button variant="accent" onClick={handleEmptyStateAddItem}>Add New Item</Button>}
        />
      </div>
    </Card>
  );
};

export default FeedbackSection;
