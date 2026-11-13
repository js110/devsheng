"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch, FaCode } from "react-icons/fa";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  github: string;
  demo?: string;
  stars: number;
  forks: number;
  language: string;
  languageColor: string;
  category: string;
}

const projects: Project[] = [
  {
    id: "1",
    title: "PDF Translate",
    description: "论文翻译工具",
    longDescription: "学术论文翻译工具，支持多种语言互译，保留原文格式，支持批量翻译。",
    image: "/covers/pdf-translate.svg",
    tags: ["Translation", "PDF", "NLP", "Python"],
    github: "https://github.com/js110/pdftranslate",
    stars: 1,
    forks: 0,
    language: "Python",
    languageColor: "#3776ab",
    category: "Tools"
  },
  {
    id: "2",
    title: "Voice2Text",
    description: "Voice to text conversion tool",
    longDescription: "语音转文字工具，支持多种语言和音频格式，使用先进的语音识别技术。",
    image: "/covers/voice2text.svg",
    tags: ["ASR", "Voice", "Python", "ML"],
    github: "https://github.com/js110/voice2text",
    stars: 0,
    forks: 0,
    language: "Python",
    languageColor: "#3776ab",
    category: "AI/ML"
  },
  {
    id: "3",
    title: "AI Companionship",
    description: "复刻亲友声音并与之正常对话",
    longDescription: "复刻亲友声音并与之正常对话的AI陪伴系统，支持语音克隆和多轮对话。",
    image: "/covers/ai-companionship.svg",
    tags: ["Voice Clone", "TTS", "AI", "Python"],
    github: "https://github.com/js110/aiCompanionship",
    stars: 0,
    forks: 0,
    language: "Python",
    languageColor: "#3776ab",
    category: "AI/ML"
  },
];

const categories = ["All", "AI/ML", "Tools"];

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 标题 */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <FaCode className="text-[#00ff88] text-2xl" />
            <h2 className="text-3xl font-bold">
              <span className="text-[#00ff88] glow-text">{"<"}</span>
              <span className="text-[#00ffff] glow-text-cyan">Projects</span>
              <span className="text-[#00ff88] glow-text">{" />"}</span>
            </h2>
          </div>
          <p className="text-[#888888] max-w-2xl mx-auto">
            <span className="text-[#00ff88]">$</span> ls -la ./projects/ | grep -E "^(d|-).*"
          </p>
        </motion.div>

        {/* 分类过滤器 */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-lg border transition-all ${
                selectedCategory === category
                  ? "bg-[#00ff88] text-[#0a0a0a] border-[#00ff88] shadow-[0_0_20px_#00ff88]"
                  : "border-[#222] text-[#888888] hover:border-[#00ff88] hover:text-[#00ff88]"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* 项目网格 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={false}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5 }}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
                className="group relative bg-[#111] rounded-lg overflow-hidden border border-[#222] hover:border-[#00ff88] transition-all cursor-pointer"
                onClick={() => window.open(project.github, "_blank")}
              >
                {/* 项目图片 */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

                  {/* 悬浮时显示的链接 */}
                  <AnimatePresence>
                    {hoveredProject === project.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center gap-4 bg-black/60"
                      >
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-[#00ff88] text-[#0a0a0a] rounded-full hover:bg-[#00cc6a] transition-colors"
                        >
                          <FaGithub className="text-xl" />
                        </a>
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-[#00ffff] text-[#0a0a0a] rounded-full hover:bg-[#00cccc] transition-colors"
                          >
                            <FaExternalLinkAlt className="text-xl" />
                          </a>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 项目信息 */}
                <div className="p-6">
                  {/* 标题和统计 */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white group-hover:text-[#00ff88] transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-[#888888]">
                      <span className="flex items-center gap-1">
                        <FaStar className="text-yellow-400" />
                        {project.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaCodeBranch className="text-[#00ffff]" />
                        {project.forks}
                      </span>
                    </div>
                  </div>

                  {/* 描述 */}
                  <p className="text-sm text-[#888888] mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* 标签 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs border border-[#222] rounded text-[#00ff88] hover:bg-[#00ff88] hover:text-[#0a0a0a] transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-1 text-xs text-[#888888]">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* 语言和分类 */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#222]">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: project.languageColor }}
                      />
                      <span className="text-xs text-[#888888]">{project.language}</span>
                    </div>
                    <span className="text-xs px-2 py-1 bg-[#1a1a1a] rounded text-[#00ffff]">
                      {project.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 查看更多 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/js110"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 border border-[#00ff88] text-[#00ff88] rounded-lg hover:bg-[#00ff88] hover:text-[#0a0a0a] transition-all hover:shadow-[0_0_30px_#00ff88]"
          >
            <FaGithub />
            <span>View All on GitHub</span>
            <FaExternalLinkAlt className="text-sm" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
