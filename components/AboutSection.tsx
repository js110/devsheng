"use client";

import { motion } from "framer-motion";
import { FaGraduationCap, FaBriefcase, FaCode, FaRocket, FaLinux, FaDocker, FaAws, FaPython, FaReact, FaNodeJs, FaUser } from "react-icons/fa";
import { SiTypescript, SiTensorflow, SiPytorch, SiKubernetes, SiPostgresql, SiMongodb } from "react-icons/si";

const experiences = [
  {
    title: "Full-Stack Developer",
    company: "Open Source contributor",
    period: "2019 - Present",
    description: "Building and maintaining various open-source projects. Contributing to AI/ML tools and web applications.",
    icon: FaCode,
  },
  {
    title: "AI/ML Engineer",
    company: "Research Projects",
    period: "2020 - Present",
    description: "Developing machine learning models and AI-powered applications. Specializing in NLP and computer vision.",
    icon: FaRocket,
  },
];

const education = [
  {
    degree: "本科 - 物联网工程",
    school: "湖南农业大学",
    period: "2016 - 2020",
    description: "物联网工程专业，学习嵌入式系统、传感器网络、软件开发等。",
  },
  {
    degree: "硕士 - 电子信息",
    school: "佳木斯大学",
    period: "2024 - 2027",
    description: "电子信息专业，研究方向包括人工智能、机器学习和数据处理。",
  },
];

const techStack = [
  { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
  { name: "Python", icon: FaPython, color: "#3776ab" },
  { name: "React", icon: FaReact, color: "#61dafb" },
  { name: "Node.js", icon: FaNodeJs, color: "#339933" },
  { name: "TensorFlow", icon: SiTensorflow, color: "#ff6f00" },
  { name: "PyTorch", icon: SiPytorch, color: "#ee4c2c" },
  { name: "Docker", icon: FaDocker, color: "#2496ed" },
  { name: "Kubernetes", icon: SiKubernetes, color: "#326ce5" },
  { name: "AWS", icon: FaAws, color: "#ff9900" },
  { name: "Linux", icon: FaLinux, color: "#fcc624" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169e1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47a248" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 标题 */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <FaUser className="text-[#00ff88] text-2xl" />
            <h2 className="text-3xl font-bold">
              <span className="text-[#00ff88] glow-text">{"<"}</span>
              <span className="text-[#00ffff] glow-text-cyan">About</span>
              <span className="text-[#00ff88] glow-text">{" />"}</span>
            </h2>
          </div>
          <p className="text-[#888888] max-w-2xl mx-auto">
            <span className="text-[#00ff88]">$</span> cat ./about.md | head -n 20
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* 左侧：个人简介 */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dot terminal-dot-red" />
                <div className="terminal-dot terminal-dot-yellow" />
                <div className="terminal-dot terminal-dot-green" />
                <span className="ml-2 text-sm text-[#888888]">about-me.md</span>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <span className="text-[#00ff88]"># </span>
                  <span className="text-[#00ffff] font-bold">About Me</span>
                </div>
                <p className="text-[#888888] leading-relaxed">
                  I'm a passionate full-stack developer and AI enthusiast with a love for building 
                  intelligent systems and contributing to open-source projects. My journey in tech 
                  started with curiosity about how things work, and it has evolved into a career 
                  building innovative solutions.
                </p>
                <p className="text-[#888888] leading-relaxed">
                  When I'm not coding, you can find me exploring new technologies, contributing 
                  to open-source, or working on side projects that solve real-world problems.
                </p>

                <div className="pt-4 border-t border-[#222]">
                  <div className="text-sm text-[#888888] mb-2">
                    <span className="text-[#00ff88]">const</span> <span className="text-[#00ffff]">interests</span> = [
                  </div>
                  <div className="pl-4 space-y-1">
                    <div className="text-[#888888]">"Artificial Intelligence",</div>
                    <div className="text-[#888888]">"Open Source",</div>
                    <div className="text-[#888888]">"Web Development",</div>
                    <div className="text-[#888888]">"Machine Learning",</div>
                    <div className="text-[#888888]">"Developer Tools"</div>
                  </div>
                  <div className="text-sm text-[#888888]">];</div>
                </div>
              </div>
            </div>

            {/* 工作经历 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <FaBriefcase className="text-[#00ff88]" />
                Experience
              </h3>
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={false}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-[#111] rounded-lg border border-[#222] hover:border-[#00ff88] transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <exp.icon className="text-[#00ff88]" />
                      <h4 className="font-semibold text-white">{exp.title}</h4>
                    </div>
                    <span className="text-xs text-[#888888] px-2 py-1 bg-[#1a1a1a] rounded">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm text-[#00ffff] mb-1">{exp.company}</p>
                  <p className="text-sm text-[#888888]">{exp.description}</p>
                </motion.div>
              ))}
            </div>

            {/* 教育经历 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <FaGraduationCap className="text-[#bf00ff]" />
                Education
              </h3>
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={false}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="p-4 bg-[#111] rounded-lg border border-[#222] hover:border-[#bf00ff] transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-white">{edu.degree}</h4>
                    <span className="text-xs text-[#888888] px-2 py-1 bg-[#1a1a1a] rounded">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-sm text-[#bf00ff] mb-1">{edu.school}</p>
                  <p className="text-sm text-[#888888]">{edu.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 右侧：技能和工具 */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* 技能 */}
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dot terminal-dot-red" />
                <div className="terminal-dot terminal-dot-yellow" />
                <div className="terminal-dot terminal-dot-green" />
                <span className="ml-2 text-sm text-[#888888]">skills.json</span>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <span className="text-[#00ff88]">const</span> <span className="text-[#00ffff]">techStack</span> = {"{"}
                </div>
                <div className="grid grid-cols-3 gap-4 pl-4">
                  {techStack.map((tech) => (
                    <motion.div
                      key={tech.name}
                      whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${tech.color}40` }}
                      className="flex flex-col items-center gap-2 p-3 bg-[#1a1a1a] rounded-lg border border-[#222] hover:border-[#00ff88] transition-all cursor-default"
                    >
                      <tech.icon className="text-2xl" style={{ color: tech.color }} />
                      <span className="text-xs text-[#888888]">{tech.name}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4">{"}"}</div>
              </div>
            </div>

            {/* GitHub 贡献图 */}
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dot terminal-dot-red" />
                <div className="terminal-dot terminal-dot-yellow" />
                <div className="terminal-dot terminal-dot-green" />
                <span className="ml-2 text-sm text-[#888888]">github-stats.md</span>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <span className="text-[#00ff88]"># </span>
                  <span className="text-[#00ffff] font-bold">GitHub Activity</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#222]">
                    <div className="text-3xl font-bold text-[#00ff88] glow-text">50+</div>
                    <div className="text-sm text-[#888888]">Repositories</div>
                  </div>
                  <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#222]">
                    <div className="text-3xl font-bold text-[#00ffff] glow-text-cyan">200+</div>
                    <div className="text-sm text-[#888888]">Contributions</div>
                  </div>
                  <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#222]">
                    <div className="text-3xl font-bold text-[#bf00ff] glow-text-purple">10+</div>
                    <div className="text-sm text-[#888888]">Projects</div>
                  </div>
                  <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#222]">
                    <div className="text-3xl font-bold text-[#ff0080]">5+</div>
                    <div className="text-sm text-[#888888]">Stars</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 工具 */}
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dot terminal-dot-red" />
                <div className="terminal-dot terminal-dot-yellow" />
                <div className="terminal-dot terminal-dot-green" />
                <span className="ml-2 text-sm text-[#888888]">tools.sh</span>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <span className="text-[#00ff88]">$</span> <span className="text-[#00ffff]">cat</span> /etc/tools.conf
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-[#00ff88]">▸</span>
                    <span className="text-[#888888]">VS Code / Neovim</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-[#00ff88]">▸</span>
                    <span className="text-[#888888]">Git & GitHub</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-[#00ff88]">▸</span>
                    <span className="text-[#888888]">Docker & Kubernetes</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-[#00ff88]">▸</span>
                    <span className="text-[#888888]">AWS / GCP</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-[#00ff88]">▸</span>
                    <span className="text-[#888888]">PostgreSQL / MongoDB</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-[#00ff88]">▸</span>
                    <span className="text-[#888888]">Jupyter Notebooks</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
