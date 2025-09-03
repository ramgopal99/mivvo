'use client';

import { DynamicPageTitle } from '@/components/DynamicPageTitle';
import { useCourse } from './components/course-context';

export default function CourseDetailPage() {
  const { selectedTopic, selectedTopicData, selectedSubtopic, renderMarkdown } = useCourse();

  return (
    <div className="p-6">
      <div className="space-y-6">
        <DynamicPageTitle />

        {/* Selected Topic Content */}
        {selectedTopic && selectedTopicData && selectedSubtopic && (
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              {selectedTopicData.content?.[selectedSubtopic] ? (
                <div dangerouslySetInnerHTML={{
                  __html: renderMarkdown(selectedTopicData.content[selectedSubtopic])
                }} />
              ) : (
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-card-foreground mb-2">
                    {selectedSubtopic}
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Module {selectedTopicData.id}: {selectedTopicData.title}
                  </p>
                  <p className="text-muted-foreground mt-4">
                    Content coming soon...
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
