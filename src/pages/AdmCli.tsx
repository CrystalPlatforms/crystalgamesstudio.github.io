import { cn } from '../utils/helpers'
import { glowAnimation } from '../utils/game-effects'
import {
  Terminal,
  ExternalLink,
  Settings,
  Bot,
  Plug,
  FolderGit2,
  KeyRound,
  GitBranch,
  Sparkles,
  CheckCircle,
  Zap,
  Package,
  Clock,
  Shield
} from 'lucide-react'

export function AdmCli() {
  return (
    <div className="min-h-screen bg-gray-900">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className={cn(
              "text-4xl sm:text-5xl font-bold mb-4",
              "bg-clip-text text-transparent",
              "bg-gradient-to-r from-indigo-400 to-purple-400",
              glowAnimation
            )}>
              ADM-CLI
            </h1>
            <p className={cn(
              "text-indigo-300 text-lg",
              "max-w-2xl mx-auto"
            )}>
              A full-screen terminal UI (TUI) for developers — automate new-machine setup, chat with a GLM-powered AI assistant, and manage GitHub &amp; GitLab, all from a single <code className="bg-gray-800 px-1.5 py-0.5 rounded text-indigo-200">adm</code> command on macOS, Linux, and Windows.
            </p>
          </div>

          {/* GitHub CTA */}
          <div className={cn(
            "bg-gradient-to-b from-indigo-900/50 to-purple-900/50",
            "rounded-xl p-8 mb-12",
            "border border-indigo-500/30",
            "shadow-lg shadow-indigo-500/20",
            "text-center"
          )}>
            <h2 className={cn(
              "text-3xl font-bold mb-4",
              "bg-gradient-to-r from-indigo-400 to-purple-400",
              "bg-clip-text text-transparent"
            )}>
              Get Started with ADM-CLI
            </h2>
            <p className="text-indigo-300 mb-6">
              Install in seconds, set up your dev environment in minutes.
            </p>
            <a
              href="https://github.com/CrystalPlatforms/ADM-CLI"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-2",
                "px-8 py-3 rounded-lg",
                "bg-gradient-to-r from-indigo-600 to-purple-600",
                "text-white font-medium text-lg",
                "hover:from-indigo-500 hover:to-purple-500",
                "transition-all duration-300",
                "shadow-lg shadow-indigo-500/20",
                "hover:shadow-xl hover:shadow-indigo-500/30"
              )}
            >
              View on GitHub <ExternalLink className="h-5 w-5" />
            </a>
          </div>

          {/* Installation */}
          <div className="mb-12">
            <h2 className={cn(
              "text-3xl font-bold text-center mb-4",
              "bg-clip-text text-transparent",
              "bg-gradient-to-r from-indigo-400 to-purple-400"
            )}>
              Installation
            </h2>
            <p className="text-indigo-300 mb-8 text-center max-w-2xl mx-auto">
              Requires <span className="text-indigo-200 font-medium">Node.js 18+</span>. The curl and PowerShell installers check for Node.js and guide you if it&apos;s missing.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* npm */}
              <div className={cn(
                "bg-gradient-to-b from-indigo-900/50 to-purple-900/50",
                "rounded-xl p-6",
                "border border-indigo-500/30",
                "shadow-lg shadow-indigo-500/20"
              )}>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
                    <Package className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-indigo-200">npm</h3>
                </div>
                <code className="block bg-gray-900/70 rounded-lg px-3 py-2 font-mono text-sm text-indigo-200 overflow-x-auto whitespace-pre-wrap break-all">
                  npm install -g @crystalplatforms/adm
                </code>
              </div>

              {/* Homebrew */}
              <div className={cn(
                "bg-gradient-to-b from-indigo-900/50 to-purple-900/50",
                "rounded-xl p-6",
                "border border-indigo-500/30",
                "shadow-lg shadow-indigo-500/20"
              )}>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
                    <Package className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-indigo-200">Homebrew (macOS/Linux)</h3>
                </div>
                <code className="block bg-gray-900/70 rounded-lg px-3 py-2 font-mono text-sm text-indigo-200 overflow-x-auto whitespace-pre">
{`brew tap CrystalPlatforms/tap
brew install CrystalPlatforms/tap/adm`}
                </code>
              </div>

              {/* curl */}
              <div className={cn(
                "bg-gradient-to-b from-indigo-900/50 to-purple-900/50",
                "rounded-xl p-6",
                "border border-indigo-500/30",
                "shadow-lg shadow-indigo-500/20"
              )}>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
                    <Terminal className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-indigo-200">macOS / Linux (curl)</h3>
                </div>
                <code className="block bg-gray-900/70 rounded-lg px-3 py-2 font-mono text-sm text-indigo-200 overflow-x-auto whitespace-pre-wrap break-all">
                  curl -fsSL https://raw.githubusercontent.com/CrystalPlatforms/ADM-CLI/main/scripts/installer.sh | sh
                </code>
              </div>

              {/* Windows PowerShell */}
              <div className={cn(
                "bg-gradient-to-b from-indigo-900/50 to-purple-900/50",
                "rounded-xl p-6",
                "border border-indigo-500/30",
                "shadow-lg shadow-indigo-500/20"
              )}>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
                    <Terminal className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-indigo-200">Windows (PowerShell)</h3>
                </div>
                <code className="block bg-gray-900/70 rounded-lg px-3 py-2 font-mono text-sm text-indigo-200 overflow-x-auto whitespace-pre-wrap break-all">
                  irm https://raw.githubusercontent.com/CrystalPlatforms/ADM-CLI/main/scripts/install.ps1 | iex
                </code>
              </div>
            </div>

            {/* Launch */}
            <div className={cn(
              "bg-gradient-to-b from-gray-900 to-gray-950",
              "rounded-xl p-6 mt-6",
              "border border-indigo-500/20",
              "font-mono text-sm"
            )}>
              <div className="flex items-center space-x-2 mb-3">
                <Terminal className="h-5 w-5 text-indigo-400" />
                <span className="text-indigo-300 font-sans font-medium">Launch the TUI</span>
              </div>
              <p><span className="text-green-400">$</span> <span className="text-indigo-300">adm</span> <span className="text-gray-500"># Start the full-screen terminal UI</span></p>
            </div>
          </div>

          {/* Core Features */}
          <div className="mb-12">
            <h2 className={cn(
              "text-3xl font-bold text-center mb-8",
              "bg-clip-text text-transparent",
              "bg-gradient-to-r from-indigo-400 to-purple-400"
            )}>
              Core Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={cn(
                "bg-gradient-to-b from-indigo-900/50 to-purple-900/50",
                "rounded-xl p-6",
                "border border-indigo-500/30",
                "shadow-lg shadow-indigo-500/20"
              )}>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
                    <Settings className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-indigo-200">One-Command Setup</h3>
                </div>
                <p className="text-indigo-300 text-sm">Run <code className="bg-gray-800 px-2 py-0.5 rounded text-indigo-200">/download</code> in the TUI and get Node.js, pnpm, git, SSH keys, and dotfiles configured automatically. From hours to minutes.</p>
              </div>
              <div className={cn(
                "bg-gradient-to-b from-indigo-900/50 to-purple-900/50",
                "rounded-xl p-6",
                "border border-indigo-500/30",
                "shadow-lg shadow-indigo-500/20"
              )}>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-indigo-200">AI Assistant</h3>
                </div>
                <p className="text-indigo-300 text-sm">Interactive shell with AI-powered code suggestions, commit messages, and debugging. Ask questions directly from your terminal.</p>
              </div>
              <div className={cn(
                "bg-gradient-to-b from-indigo-900/50 to-purple-900/50",
                "rounded-xl p-6",
                "border border-indigo-500/30",
                "shadow-lg shadow-indigo-500/20"
              )}>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
                    <GitBranch className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-indigo-200">GitHub & GitLab</h3>
                </div>
                <p className="text-indigo-300 text-sm">Manage PRs, issues, and commits without leaving the terminal. Draft PRs, list issues, suggest commit messages — all from CLI.</p>
              </div>
              <div className={cn(
                "bg-gradient-to-b from-indigo-900/50 to-purple-900/50",
                "rounded-xl p-6",
                "border border-indigo-500/30",
                "shadow-lg shadow-indigo-500/20"
              )}>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
                    <Plug className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-indigo-200">Plugin System</h3>
                </div>
                <p className="text-indigo-300 text-sm">Extend ADM with custom commands. Write plugins as .js files, share via npm or GitHub gists, and load at startup.</p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-12">
            <h2 className={cn(
              "text-3xl font-bold text-center mb-8",
              "bg-clip-text text-transparent",
              "bg-gradient-to-r from-indigo-400 to-purple-400"
            )}>
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={cn(
                "bg-gradient-to-b from-indigo-900/50 to-purple-900/50",
                "rounded-xl p-6",
                "border border-indigo-500/30",
                "shadow-lg shadow-indigo-500/20",
                "text-center"
              )}>
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
                    <Package className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-indigo-200 mb-2">1. Install</h3>
                <p className="text-indigo-300 text-sm"><code className="bg-gray-800 px-2 py-0.5 rounded text-indigo-200">brew install</code> or <code className="bg-gray-800 px-2 py-0.5 rounded text-indigo-200">curl | sh</code> — one command and ADM is ready.</p>
              </div>
              <div className={cn(
                "bg-gradient-to-b from-indigo-900/50 to-purple-900/50",
                "rounded-xl p-6",
                "border border-indigo-500/30",
                "shadow-lg shadow-indigo-500/20",
                "text-center"
              )}>
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
                    <Settings className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-indigo-200 mb-2">2. Setup</h3>
                <p className="text-indigo-300 text-sm">Interactive wizard installs your tools, syncs dotfiles, configures SSH keys and git — all in under 5 minutes.</p>
              </div>
              <div className={cn(
                "bg-gradient-to-b from-indigo-900/50 to-purple-900/50",
                "rounded-xl p-6",
                "border border-indigo-500/30",
                "shadow-lg shadow-indigo-500/20",
                "text-center"
              )}>
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
                    <Bot className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-indigo-200 mb-2">3. Work</h3>
                <p className="text-indigo-300 text-sm">Keep ADM running as your daily assistant — AI queries, PR management, commit suggestions, and more.</p>
              </div>
            </div>
          </div>

          {/* Key Features List */}
          <div className={cn(
            "bg-gradient-to-b from-indigo-900/50 to-purple-900/50",
            "rounded-xl p-6 mb-12",
            "border border-indigo-500/30",
            "shadow-lg shadow-indigo-500/20"
          )}>
            <h2 className={cn(
              "text-2xl font-bold mb-6",
              "bg-gradient-to-r from-indigo-400 to-purple-400",
              "bg-clip-text text-transparent"
            )}>
              What's Inside
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <FolderGit2 className="h-5 w-5 text-indigo-400 mt-0.5" />
                <div>
                  <p className="text-indigo-200 font-medium">Dotfiles Sync</p>
                  <p className="text-indigo-300 text-sm">Auto-restore bashrc, zshrc, gitconfig, and SSH config from your GitHub repo or gist.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <KeyRound className="h-5 w-5 text-indigo-400 mt-0.5" />
                <div>
                  <p className="text-indigo-200 font-medium">Secure Credentials</p>
                  <p className="text-indigo-300 text-sm">Tokens stored in OS keychain (macOS) or encrypted file (Linux). Connect GitHub & GitLab via OAuth or PAT.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Zap className="h-5 w-5 text-indigo-400 mt-0.5" />
                <div>
                  <p className="text-indigo-200 font-medium">Smart Commits</p>
                  <p className="text-indigo-300 text-sm">AI-powered commit message suggestions based on staged changes.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Sparkles className="h-5 w-5 text-indigo-400 mt-0.5" />
                <div>
                  <p className="text-indigo-200 font-medium">Vibe Features</p>
                  <p className="text-indigo-300 text-sm">ASCII clock, dev quotes, theme support, and fuzzy command search for a polished terminal experience.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Package className="h-5 w-5 text-indigo-400 mt-0.5" />
                <div>
                  <p className="text-indigo-200 font-medium">Repo Templates</p>
                  <p className="text-indigo-300 text-sm">Pre-made templates for React, Node, and full-stack projects. Clone and start coding instantly.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-indigo-400 mt-0.5" />
                <div>
                  <p className="text-indigo-200 font-medium">Clean Uninstall</p>
                  <p className="text-indigo-300 text-sm"><code className="bg-gray-800 px-2 py-0.5 rounded text-indigo-200">adm uninstall</code> removes everything cleanly — no leftover files.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Commands Preview */}
          <div className={cn(
            "bg-gradient-to-b from-gray-900 to-gray-950",
            "rounded-xl p-6 mb-12",
            "border border-indigo-500/20",
            "font-mono text-sm"
          )}>
            <div className="flex items-center space-x-2 mb-4">
              <Terminal className="h-5 w-5 text-indigo-400" />
              <span className="text-indigo-300 font-sans font-medium">Commands Preview</span>
            </div>
            <div className="space-y-2">
              <p><span className="text-green-400">$</span> <span className="text-indigo-300">adm</span> <span className="text-gray-500"># Launch the full-screen TUI</span></p>
              <p><span className="text-green-400">$</span> <span className="text-indigo-300">/ai "how do I ..."</span> <span className="text-gray-500"># One-off AI query (GLM)</span></p>
              <p><span className="text-green-400">$</span> <span className="text-indigo-300">/github</span> <span className="text-gray-500"># GitHub PRs, issues & commits</span></p>
              <p><span className="text-green-400">$</span> <span className="text-indigo-300">/download</span> <span className="text-gray-500"># Run the setup wizard</span></p>
              <p><span className="text-green-400">$</span> <span className="text-indigo-300">/theme cyberpunk</span> <span className="text-gray-500"># Switch theme (6 built-in)</span></p>
              <p><span className="text-green-400">$</span> <span className="text-indigo-300">/dotfiles</span> <span className="text-gray-500"># Sync dotfiles from your repo</span></p>
              <p><span className="text-green-400">$</span> <span className="text-indigo-300">/upgrade</span> <span className="text-gray-500"># Check for and install updates</span></p>
            </div>
          </div>

          {/* Target */}
          <div className={cn(
            "bg-gradient-to-b from-indigo-900/50 to-purple-900/50",
            "rounded-xl p-6",
            "border border-indigo-500/30",
            "shadow-lg shadow-indigo-500/20"
          )}>
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="h-6 w-6 text-indigo-400" />
              <h2 className={cn(
                "text-2xl font-bold",
                "bg-gradient-to-r from-indigo-400 to-purple-400",
                "bg-clip-text text-transparent"
              )}>
                Built For
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-indigo-400 mt-0.5" />
                <div>
                  <p className="text-indigo-200 font-medium">New Team Members</p>
                  <p className="text-indigo-300 text-sm">Set up dev machine in under 5 minutes.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-indigo-400 mt-0.5" />
                <div>
                  <p className="text-indigo-200 font-medium">Experienced Devs</p>
                  <p className="text-indigo-300 text-sm">Automate daily GitHub/GitLab tasks with AI.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-indigo-400 mt-0.5" />
                <div>
                  <p className="text-indigo-200 font-medium">Team Leads</p>
                  <p className="text-indigo-300 text-sm">Standardize toolchain across the team.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
