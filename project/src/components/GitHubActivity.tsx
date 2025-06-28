import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Star, GitFork, Activity } from 'lucide-react';

const GITHUB_USERNAME = 'Abdul-HaqZ';

const GitHubActivity = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  type ContributionDay = { date: string; count: number };
  type ContributionWeek = { days: ContributionDay[] };
  const [contributions, setContributions] = useState<ContributionWeek[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayCols, setDisplayCols] = useState<number>(53); // Default for desktop

  useEffect(() => {
    const calculateCols = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) { // Tailwind's sm breakpoint
        setDisplayCols(25); // Show ~25 weeks on mobile
      } else if (screenWidth < 1024) { // Tailwind's md breakpoint (tablet)
        setDisplayCols(35); // Show ~35 weeks on tablet
      } else {
        setDisplayCols(53); // Default for larger screens
      }
    };

    calculateCols(); // Initial calculation
    window.addEventListener('resize', calculateCols);
    return () => window.removeEventListener('resize', calculateCols);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`https://github-contributions-api.deno.dev/${GITHUB_USERNAME}.json`)
      .then(res => res.json())
      .then((data: unknown) => {
        if (typeof data === 'object' && data !== null && 'years' in data) {
          const years = (data as { years: { contributions: ContributionWeek[] }[] }).years;
          const year = years[0];
          setContributions(year.contributions);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load GitHub contributions.');
        setLoading(false);
      });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const stats = [
    { label: "Public Repos", value: "42", icon: Github },
    { label: "Total Stars", value: "156", icon: Star },
    { label: "Total Forks", value: "23", icon: GitFork },
    { label: "Contributions", value: "500+", icon: Activity }
  ];

  const pinnedRepos = [
    {
      name: "ai-task-manager",
      description: "Smart task management with ML-driven priority suggestions",
      language: "Python",
      stars: 45,
      forks: 12
    },
    {
      name: "devops-pipeline",
      description: "Complete CI/CD pipeline with Docker and Kubernetes",
      language: "Shell",
      stars: 38,
      forks: 8
    },
    {
      name: "analytics-dashboard",
      description: "Real-time analytics dashboard with WebSocket integration",
      language: "JavaScript",
      stars: 29,
      forks: 6
    },
    {
      name: "ecommerce-platform",
      description: "Full-stack e-commerce solution with Stripe integration",
      language: "TypeScript",
      stars: 52,
      forks: 15
    }
  ];

  const getLanguageColor = (language: string) => {
    const colors = {
      Python: "bg-yellow-500",
      JavaScript: "bg-yellow-400",
      TypeScript: "bg-blue-500",
      Shell: "bg-green-500",
      Java: "bg-orange-500",
      React: "bg-cyan-500"
    };
    return colors[language as keyof typeof colors] || "bg-gray-500";
  };

  function getRandomGrid(cols: number = 53, rows = 7) {
    return Array.from({ length: cols }, () =>
      Array.from({ length: rows }, () => (Math.random() > 0.6 ? (Math.random() > 0.7 ? 4 : 2) : 0))
    );
  }

  // Helper to generate a random contributions grid in the same format as real data
  function getRandomContributions(cols: number, rows: number) {
    return Array.from({ length: cols }, () => ({
      days: Array.from({ length: rows }, () => {
        const count = Math.random() > 0.6 ? (Math.random() > 0.7 ? 4 : 2) : 0;
        return { count, date: '' };
      })
    }));
  }

  // Store random grid in state so it only regenerates on reset
  const [randomContributions, setRandomContributions] = useState(() => getRandomContributions(displayCols, 7));
  // If displayCols changes (resize), regenerate random grid
  useEffect(() => {
    setRandomContributions(getRandomContributions(displayCols, 7));
  }, [displayCols]);
  const tableData = contributions.length > 0 ? contributions.slice(-displayCols) : randomContributions;

  // --- SINGLE SOURCE OF TRUTH ---
  // Flatten tableData to a 2D array of numbers for easier indexing
  const grid = tableData.map(week => week.days.map(day => day.count));
  const rows = 7;
  const cols = displayCols;
  // Eaten state and snake state in parent
  const [eaten, setEaten] = useState<Set<string>>(new Set());
  const [snake, setSnake] = useState<{ x: number; y: number }[]>([{ x: 0, y: 0 }]);
  const [step, setStep] = useState(0);

  // Snake movement logic
  function getNextCellGridMajor(x: number, y: number, cols: number, rows: number) {
    let nextCol = x + 1;
    let nextRow = y;
    if (nextCol >= cols) {
      nextCol = 0;
      nextRow = y + 1;
      if (nextRow >= rows) {
        nextRow = 0;
      }
    }
    return { x: nextCol, y: nextRow };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setSnake((prev) => {
        const head = prev[0];
        const next = getNextCellGridMajor(head.x, head.y, cols, rows);
        let newSnake = [next, ...prev];
        // Grow if on colored and not already eaten
        if (grid[next.x][next.y] > 0 && !eaten.has(`${next.x},${next.y}`)) {
          setEaten((old) => new Set(old).add(`${next.x},${next.y}`));
          return newSnake;
        } else {
          return [next];
        }
      });
      setStep((s) => s + 1);
    }, 100);
    return () => clearInterval(timer);
  }, [cols, rows, grid, eaten]);

  // Check if all colored blocks are eaten
  useEffect(() => {
    let allEaten = true;
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        if (grid[x][y] > 0 && !eaten.has(`${x},${y}`)) {
          allEaten = false;
          break;
        }
      }
      if (!allEaten) break;
    }
    if (allEaten && step > 0) {
      setTimeout(() => {
        setSnake([{ x: 0, y: 0 }]);
        setStep(0);
        setEaten(new Set());
        // Only regenerate random grid if using random data
        if (contributions.length === 0) {
          setRandomContributions(getRandomContributions(displayCols, 7));
        }
      }, 600);
    }
  }, [eaten, grid, cols, rows, step]);

  // --- END SINGLE SOURCE OF TRUTH ---

  return (
    <section id="github" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
          >
            GitHub{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Activity
            </span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-slate-300 max-w-3xl mx-auto"
          >
            My open-source contributions and coding journey
          </motion.p>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 text-center hover:border-slate-600 transition-all duration-300"
              >
                <Icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-slate-300 text-sm">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>

        {/* Contribution Chart Placeholder */}
        <motion.div
          variants={itemVariants}
          className="relative bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-8 border border-slate-700 mb-16 min-h-[120px]"
        >
          <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Activity className="w-6 h-6 mr-3 text-green-400" />
            Contribution Activity
          </h3>
          {/* Overlay error message if error */}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/70 z-30">
              <span className="text-red-400 text-center text-sm sm:text-base font-semibold">Could not load GitHub contributions.</span>
            </div>
          )}
          {/* Only render the currently displayed grid as the table, with snake overlayed on blocks */}
          <div className={`relative z-20 ${error ? 'opacity-60 pointer-events-none' : ''}`}>
            <div className="grid grid-rows-7 grid-flow-col gap-1">
              {grid.map((col, colIdx) =>
                col.map((val, rowIdx) => {
                  const isEaten = eaten.has(`${colIdx},${rowIdx}`);
                  // Snake logic: is this cell the snake's head or body?
                  const isHead = snake.length > 0 && snake[0].x === colIdx && snake[0].y === rowIdx;
                  const isBody = !isHead && snake.some((s) => s.x === colIdx && s.y === rowIdx);
                  return (
                    <div
                      key={colIdx + '-' + rowIdx}
                      className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 rounded-full md:rounded-sm
                        ${isHead ? 'bg-lime-400 scale-150 z-20' :
                          isBody ? 'bg-yellow-300 scale-125 z-10' :
                          isEaten && val > 0
                          ? 'bg-slate-800'
                          : val === 0
                          ? 'bg-slate-700'
                          : val < 2
                          ? 'bg-green-600/30'
                          : val < 5
                          ? 'bg-green-600/60'
                          : 'bg-green-500'}
                        transition-all duration-100`
                      }
                      style={{ transition: 'background 0.1s, transform 0.1s' }}
                      title={''}
                    />
                  );
                })
              )}
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 text-xs sm:text-sm text-slate-400 relative z-20">
            <span>Less</span>
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-slate-700 rounded-full md:rounded-sm"></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-green-600/30 rounded-full md:rounded-sm"></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-green-600/60 rounded-full md:rounded-sm"></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-green-500 rounded-full md:rounded-sm"></div>
            </div>
            <span>More</span>
          </div>
        </motion.div>

        {/* Pinned Repositories */}
        <motion.div variants={itemVariants}>
          <h3 className="text-3xl font-semibold text-white mb-8 text-center">
            Pinned Repositories
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pinnedRepos.map((repo, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <Github className="w-5 h-5 text-blue-400 mr-2" />
                    <h4 className="text-lg font-semibold text-white">{repo.name}</h4>
                  </div>
                </div>
                
                <p className="text-slate-300 text-sm mb-4">{repo.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)} mr-2`}></div>
                      <span className="text-slate-300 text-sm">{repo.language}</span>
                    </div>
                    
                    <div className="flex items-center text-slate-300 text-sm">
                      <Star className="w-4 h-4 mr-1" />
                      {repo.stars}
                    </div>
                    
                    <div className="flex items-center text-slate-300 text-sm">
                      <GitFork className="w-4 h-4 mr-1" />
                      {repo.forks}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubActivity;