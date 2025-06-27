import { FC } from "react";
import { Linkedin, Github } from "lucide-react";

export const Footer: FC = () => {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-black/80 py-4 px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate-600 dark:text-slate-400">
      <div className="flex items-center gap-2">
        <span className="text-sm font-small text-foreground font-league-spartan">
          Making prompt time easier by{' '}
          <a
            href="https://srishiram.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
          >
            this guy
          </a>
        </span>
      </div>
      <div className="flex items-center gap-4">
        <a
          href="https://www.linkedin.com/in/sriganeshshiramshetty"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <a
          href="https://github.com/GaneshVarma1"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-slate-900 dark:hover:text-white transition-colors"
          aria-label="GitHub"
        >
          <Github className="w-5 h-5" />
        </a>
      </div>
    </footer>
  );
}; 