'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="relative flex min-h-screen items-center justify-center bg-gray-50/60 p-4 transition-colors duration-500 dark:bg-[#09090b]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md rounded-3xl border border-gray-200/80 bg-white/95 p-8 text-center shadow-xl backdrop-blur-xl transition-all duration-500 dark:border-zinc-800/80 dark:bg-zinc-900/95 dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:border dark:border-red-900/50 dark:bg-red-950/40"
            >
              <AlertTriangle className="text-red-600 dark:text-red-400" size={32} />
            </motion.div>

            <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
              เกิดข้อผิดพลาด
            </h2>

            <p className="mb-6 text-gray-600 dark:text-zinc-400">
              ขออภัย เกิดข้อผิดพลาดบางอย่าง กรุณาลองใหม่อีกครั้ง
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="mb-2 cursor-pointer text-sm text-gray-500 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-zinc-200">
                  รายละเอียดข้อผิดพลาด
                </summary>
                <pre className="overflow-auto rounded-lg bg-gray-100 p-4 text-xs text-red-600 dark:border dark:border-zinc-800 dark:bg-zinc-950 dark:text-red-400">
                  {this.state.error.message}
                </pre>
              </details>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 via-rose-600 to-amber-500 px-6 py-3.5 font-bold text-white shadow-lg transition-all hover:shadow-xl dark:from-white dark:via-zinc-100 dark:to-zinc-200 dark:text-zinc-950 dark:shadow-[0_8px_25px_rgba(255,255,255,0.15)]"
            >
              <RefreshCw size={18} />
              โหลดหน้าใหม่
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.history.back()}
              className="mt-3 w-full rounded-full border border-gray-200 bg-gray-100 px-6 py-3.5 font-medium text-gray-700 transition-all hover:bg-gray-200 dark:border-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200 dark:hover:bg-zinc-700 dark:hover:text-white"
            >
              กลับหน้าก่อนหน้า
            </motion.button>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}
