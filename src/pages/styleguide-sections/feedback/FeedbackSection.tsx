import React from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import TippyTooltip from '../../../components/ui/TippyTooltip';
import EmptyState from '../../../components/ui/EmptyState';
import Alert from '../../../components/ui/Alert';
import { useToast } from '../../../components/ui/ToastContainer';

const FeedbackSection: React.FC = () => {
  const { addToast } = useToast();

  const handleEmptyStateClearSearch = () => {
    alert('Empty State: Clear Search clicked!');
  };
  const handleEmptyStateAddItem = () => {
    alert('Empty State: Add New Item clicked!');
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-semibold text-text">Feedback Components</h2>
      <p className="text-text-light">
        Use these components to provide feedback to the user in response to their actions or system events.
      </p>

      {/* Alerts */}
      <Card id="feedback-alerts" padding="p-6">
        <h3 className="text-2xl font-semibold mb-4 text-text">Alerts</h3>
        <div className="space-y-4">
          <Alert variant="info" title="Informational Message">
            This is a standard informational alert.
          </Alert>
          <Alert variant="success" title="Success!">
            Your action was completed successfully.
          </Alert>
          <Alert variant="warning" title="Warning">
            There might be a problem with your configuration.
          </Alert>
          <Alert variant="danger" title="Error: Unable to Proceed">
            We could not save your changes.
          </Alert>
        </div>
      </Card>

      {/* Tooltips */}
      <Card id="feedback-tooltip" padding="p-6">
        <h3 className="text-2xl font-semibold mb-4 text-text">Tooltips (using Tippy.js)</h3>
        <div className="flex flex-wrap items-center gap-8">
          <TippyTooltip content="This is a top tooltip." placement="top">
            <Button variant="secondary">Hover Me (Top)</Button>
          </TippyTooltip>
          <TippyTooltip content="This is a right tooltip." placement="right">
            <Button variant="secondary">Hover Me (Right)</Button>
          </TippyTooltip>
        </div>
      </Card>

      {/* Toast Notifications */}
      <Card id="feedback-toast" padding="p-6">
        <h3 className="text-2xl font-semibold mb-4 text-text">Toast Notifications</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button onClick={() => addToast('Success message!', 'success')}>Show Success Toast</Button>
          <Button onClick={() => addToast('Error message!', 'error')}>Show Error Toast</Button>
        </div>
      </Card>

      {/* Empty State */}
      <Card id="feedback-empty" padding="p-6">
        <h3 className="text-2xl font-semibold mb-4 text-text">Empty State / No Data</h3>
        <div className="space-y-8">
          <EmptyState
            title="No Data Found"
            description="It looks like there's no information to display here yet."
            icon="bar-chart-2"
          />
          <EmptyState
            title="Search Results Empty"
            description="We couldn't find any items matching your search criteria."
            icon="search"
            actionButton={<Button variant="primary" onClick={handleEmptyStateClearSearch}>Clear Search</Button>}
          />
           <EmptyState
            title="Welcome! Get Started"
            description="You haven't created any items yet. Click the button below to add your first entry."
            icon="rocket"
            actionButton={<Button variant="accent" onClick={handleEmptyStateAddItem}>Add New Item</Button>}
          />
        </div>
      </Card>
    </div>
  );
};

export default FeedbackSection;
