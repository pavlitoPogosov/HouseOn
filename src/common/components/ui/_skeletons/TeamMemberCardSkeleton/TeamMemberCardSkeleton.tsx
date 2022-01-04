import React from 'react';
import ContentLoader from 'react-content-loader';

export interface TeamMemberCardSkeletonProps {
  countElements?: number;
}

export const TeamMemberCardSkeleton: React.FC<TeamMemberCardSkeletonProps> = ({ countElements = 1 }) => (
  <>
    {[...Array(countElements)].map((value, index) => (
      <ContentLoader
        key={index}
        speed={2}
        width="100%"
        height={74}
        viewBox="0 0 400 74"
        backgroundColor="#dedede"
        foregroundColor="#b8b8b8">
        <rect x="56" y="38" rx="3" ry="3" width="52" height="6" />
        <circle cx="30" cy="34" r="20" />
        <rect x="56" y="21" rx="3" ry="3" width="104" height="7" />
      </ContentLoader>
    ))}
  </>
);
