import React from 'react';

interface RelatedStoriesProps {
  onSelectStory?: (storyId: string) => void;
}

export const RelatedStories: React.FC<RelatedStoriesProps> = ({ onSelectStory }) => {
  const stories = [
    {
      id: 'story-1',
      tag: 'Developer tools',
      title: 'Gemini Omni 1.1 Flash lets you build with more control',
      author: 'By Anish Nangia & Elisa Fortis',
    },
    {
      id: 'story-2',
      tag: 'Gemini models',
      title: 'What does "full-stack" AI actually mean?',
      author: 'By Lindsey Linquist',
    },
    {
      id: 'story-3',
      tag: 'Gemini models',
      title: 'Introducing Gemini 3.7',
      author: 'By Tulsee Doshi',
    },
  ];

  return (
    <section id="related-stories-section" className="mt-16">
      <h2 className="font-google-sans text-2xl font-medium text-[#202124] dark:text-[#f1f3f4] mb-6">
        Related stories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {stories.map((story) => (
          <div
            key={story.id}
            id={story.id}
            onClick={() => onSelectStory?.(story.id)}
            className="border border-[#dadce0] dark:border-[#3c4043] rounded-xl p-4 flex flex-col justify-between min-h-[160px] hover:shadow-md transition-all bg-white dark:bg-[#202124] hover:border-[#1a73e8]/40 dark:hover:border-[#8ab4f8]/50 cursor-pointer group"
          >
            <div>
              <div className="text-xs text-[#5f6368] dark:text-[#9aa0a6] mb-2 font-medium">
                {story.tag}
              </div>
              <div className="font-google-sans text-[15px] font-medium text-[#202124] dark:text-[#f1f3f4] group-hover:text-[#1a73e8] dark:group-hover:text-[#8ab4f8] transition-colors leading-snug mb-4">
                {story.title}
              </div>
            </div>
            <div className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">
              {story.author}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
