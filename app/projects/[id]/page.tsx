'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { usePortfolioData } from '@/hooks/usePortfolioData';
import ProjectDetailView from '@/components/ProjectDetailView';
import Navbar from '@/components/Navbar';

const ProjectDetailPage: React.FC = () => {
  const params = useParams<{ id: string }>();
  const { data, loading } = usePortfolioData();
  if (loading) return null;
  const project = data.projects.find(p => p.id === params.id);

  if (!project) {
    return (
      <div className="relative flex min-h-screen flex-col bg-[#f7f8fa] group/design-root overflow-x-hidden" style={{ fontFamily: 'Manrope, \"Noto Sans\", sans-serif' }}>
        <Navbar />
        <div className="layout-container flex h-full grow flex-col items-center justify-center px-6 py-12">
          <h1 className="text-2xl font-semibold text-[#121416]">项目不存在</h1>
          <p className="mt-2 text-sm text-[#6a7681]">请返回项目列表重新选择。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-[#f7f8fa] group/design-root overflow-x-hidden" style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}>
      <Navbar />
      <div className="layout-container flex h-full grow flex-col items-center justify-center">
        <div className="layout-content-container w-full max-w-full sm:max-w-[1200px] flex-1 flex items-center justify-center py-8">
          <ProjectDetailView project={project} />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage; 
