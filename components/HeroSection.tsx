"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaEnvelope, FaTerminal, FaCode } from "react-icons/fa";
import { SiTypescript, SiPython, SiReact, SiNextdotjs, SiTensorflow, SiDocker } from "react-icons/si";

const skills = [
  { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
  { name: "Python", icon: SiPython, color: "#3776ab" },
  { name: "React", icon: SiReact, color: "#61dafb" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "TensorFlow", icon: SiTensorflow, color: "#ff6f00" },
  { name: "Docker", icon: SiDocker, color: "#2496ed" },
];

const commands = [
  { cmd: "whoami", output: "蒋胜 - Full-Stack Developer & AI Enthusiast" },
  { cmd: "cat /etc/skills", output: "TypeScript, Python, React, Next.js, TensorFlow, PyTorch, Docker, K8s" },
  { cmd: "echo $MISSION", output: "Building the future with code and AI" },
  { cmd: "uptime", output: "Coding since 2019 | 200+ GitHub contributions this year" },
];

export default function HeroSection() {
  const [typedText, setTypedText] = useState("");
  const [currentCmd, setCurrentCmd] = useState(0);
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    if (currentCmd >= commands.length) return;

    const cmd = commands[currentCmd].cmd;
    let i = 0;
    setTypedText("");
    setShowOutput(false);

    const typingInterval = setInterval(() => {
      if (i < cmd.length) {
        setTypedText(cmd.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setShowOutput(true);
          setTimeout(() => {
            setCurrentCmd((prev) => prev + 1);
          }, 1500);
        }, 500);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [currentCmd]);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* 左侧：个人信息 */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* 头像 */}
          <div className="relative inline-block">
            <div className="w-32 h-32 rounded-full overflow-hidden neon-border">
              <img
                src="/avatar.svg"
                alt="蒋胜"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-[#0a0a0a] px-3 py-1 rounded-full neon-border text-xs">
              <span className="text-[#00ff88]">● </span>
              <span>ONLINE</span>
            </div>
          </div>

          {/* 名字和标题 */}
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-2">
              <span className="text-white glow-text">蒋胜</span>{" "}
            </h1>
            <div className="flex items-center gap-2 text-[#888888]">
              <FaTerminal className="text-[#00ff88]" />
              <span className="typing-cursor">Full-Stack Developer & AI Enthusiast</span>
            </div>
          </div>

          {/* 简介 */}
          <p className="text-[#888888] leading-relaxed border-l-2 border-[#00ff88] pl-4">
            <span className="text-[#00ff88]">{">"}</span> Passionate about building intelligent systems and 
            contributing to open-source projects. Specializing in AI/ML, 
            full-stack development, and developer tools.
          </p>

          {/* 技能标签 */}
          <div className="tag-cloud">
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${skill.color}` }}
                className="flex items-center gap-2 px-4 py-2 border border-[#222] rounded-lg hover:border-[#00ff88] transition-all cursor-default"
              >
                <skill.icon className="text-lg" style={{ color: skill.color }} />
                <span className="text-sm">{skill.name}</span>
              </motion.div>
            ))}
          </div>

          {/* 社交链接 */}
          <div className="flex gap-4">
            <motion.a
              whileHover={{ scale: 1.1, boxShadow: "0 0 20px #00ff88" }}
              href="https://github.com/js110"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-[#222] rounded-lg hover:border-[#00ff88] transition-all"
            >
              <FaGithub className="text-xl" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, boxShadow: "0 0 20px #ff0080" }}
              href="mailto:js0905@foxmail.com"
              className="p-3 border border-[#222] rounded-lg hover:border-[#ff0080] transition-all"
            >
              <FaEnvelope className="text-xl" />
            </motion.a>
          </div>

          {/* 统计数据 */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#222]">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#00ff88] glow-text">50+</div>
              <div className="text-xs text-[#888888]">Repositories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#00ffff] glow-text-cyan">200+</div>
              <div className="text-xs text-[#888888]">Contributions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#bf00ff] glow-text-purple">10+</div>
              <div className="text-xs text-[#888888]">Projects</div>
            </div>
          </div>
        </motion.div>

        {/* 右侧：终端窗口 */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="terminal-window">
            {/* 终端头部 */}
            <div className="terminal-header">
              <div className="terminal-dot terminal-dot-red" />
              <div className="terminal-dot terminal-dot-yellow" />
              <div className="terminal-dot terminal-dot-green" />
              <span className="ml-2 text-sm text-[#888888]">sheng@portfolio ~ %</span>
            </div>

            {/* 终端内容 */}
            <div className="p-6 space-y-4 min-h-[400px]">
              {/* 历史命令 */}
              {commands.slice(0, currentCmd).map((cmd, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[#00ff88]">➜</span>
                    <span className="text-[#00ffff]">~/portfolio</span>
                    <span className="text-white">$ {cmd.cmd}</span>
                  </div>
                  <div className="text-[#888888] pl-6">{cmd.output}</div>
                </div>
              ))}

              {/* 当前输入 */}
              {currentCmd < commands.length && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[#00ff88]">➜</span>
                    <span className="text-[#00ffff]">~/portfolio</span>
                    <span className="text-white">$ {typedText}</span>
                    <span className="inline-block w-2 h-5 bg-[#00ff88] cursor-blink" />
                  </div>
                  {showOutput && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[#888888] pl-6"
                    >
                      {commands[currentCmd].output}
                    </motion.div>
                  )}
                </div>
              )}

              {/* 完成后的提示 */}
              {currentCmd >= commands.length && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4 pt-4"
                >
                  <div className="text-[#00ff88] glow-text">
                    ✓ System ready. Welcome to my portfolio!
                  </div>
                  <div className="flex gap-4">
                    <a
                      href="#projects"
                      className="flex items-center gap-2 px-4 py-2 bg-[#00ff88] text-[#0a0a0a] rounded hover:bg-[#00cc6a] transition-colors"
                    >
                      <FaCode /> View Projects
                    </a>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* 底部提示 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-4 text-center text-sm text-[#888888]"
          >
            <span className="text-[#00ff88]">{">"}</span> Type{" "}
            <code className="px-2 py-1 bg-[#1a1a1a] rounded text-[#00ffff]">help</code>{" "}
            for available commands
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
