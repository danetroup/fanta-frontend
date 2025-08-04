// src/pages/LibraryReferencePage.tsx
import React from 'react';
import { wizardManifest } from '../wizardManifest'; // Import the manifest value
import type { WizardEntry } from '../types/wizard'; // <--- UPDATED IMPORT PATH

import Card from '../components/ui/Card';
import PageHeader from '../components/templates/PageHeader';
import { List, ListItem } from '../components/ui/List';
import Badge from '../components/ui/Badge';

const LibraryReferencePage: React.FC = () => {
  // Group entries by category
  const categorizedEntries: { [key: string]: WizardEntry[] } = {};

  // Sort components by name within each category for consistency
  const allEntries = [
    ...wizardManifest.components,
    ...wizardManifest.layouts,
    ...wizardManifest.utils,
    ...wizardManifest.hooks,
    ...wizardManifest.data,
  ].sort((a, b) => a.name.localeCompare(b.name));

  allEntries.forEach(entry => {
    if (!categorizedEntries[entry.category]) {
      categorizedEntries[entry.category] = [];
    }
    categorizedEntries[entry.category].push(entry);
  });

  return (
    <div className="p-8 space-y-8">
      <PageHeader
        title="Component & Library Reference"
        description="A detailed overview of all available components, layouts, and utilities in this boilerplate, generated directly from the codebase."
      />

      {Object.entries(categorizedEntries).map(([category, entries]) => (
        <Card key={category} className="p-6">
          <h2 className="text-3xl font-semibold mb-6 text-text">
            {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
          </h2>
          <div className="space-y-8">
            {entries.map(entry => (
              <div key={entry.name} className="border-b border-border pb-6 last:border-b-0 last:pb-0">
                <h3 className="text-xl font-semibold text-primary-dark mb-2">{entry.name}</h3>
                <p className="text-text-light mb-2">{entry.description}</p>

                {entry.tags && entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {entry.tags.map(tag => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                )}

                {(entry.props && entry.props.length > 0) && (
                  <div className="mt-4">
                    <h4 className="text-lg font-medium text-text mb-2">Key Properties:</h4>
                    <List type="ul" className="list-disc list-inside space-y-1 text-sm text-text-light">
                      {entry.props.map(prop => (
                        <ListItem key={prop.name}>
                          <strong>{prop.name}</strong>: `{prop.type}` - {prop.description}
                          {prop.default && <span className="text-xs italic ml-1">(Default: {prop.default})</span>}
                        </ListItem>
                      ))}
                    </List>
                  </div>
                )}

                {(entry.returns && entry.returns.length > 0) && (
                  <div className="mt-4">
                    <h4 className="text-lg font-medium text-text mb-2">Returns:</h4>
                    <List type="ul" className="list-disc list-inside space-y-1 text-sm text-text-light">
                      {entry.returns.map(ret => (
                        <ListItem key={ret.name}>
                          <strong>{ret.name}</strong>: `{ret.type}` - {ret.description}
                        </ListItem>
                      ))}
                    </List>
                  </div>
                )}

                {entry.availableData && entry.availableData.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-lg font-medium text-text mb-2">Available Data Sets:</h4>
                    <List type="ul" className="list-disc list-inside space-y-1 text-sm text-text-light">
                      {entry.availableData.map(dataName => (
                        <ListItem key={dataName}>{dataName}</ListItem>
                      ))}
                    </List>
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-4">
                    Source: `{entry.filePath}`
                </p>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default LibraryReferencePage;