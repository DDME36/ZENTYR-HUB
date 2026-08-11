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
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100"
            >
              <AlertTriangle className="text-red-600" size={32} />
            </motion.div>

            <h2 className="mb-3 text-2xl font-bold text-gray-900">เกิดข้อผิดพลาด</h2>

            <p className="mb-6 text-gray-600">ขออภัย เกิดข้อผิดพลาดบางอย่าง กรุณาลองใหม่อีกครั้ง</p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="mb-2 cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                  รายละเอียดข้อผิดพลาด
                </summary>
                <pre className="overflow-auto rounded-lg bg-gray-100 p-4 text-xs text-red-600">
                  {this.state.error.message}
                </pre>
              </details>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-400 to-purple-400 px-6 py-3 font-bold text-white transition-all hover:shadow-lg"
            >
              <RefreshCw size={18} />
              โหลดหน้าใหม่
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.history.back()}
              className="mt-3 w-full rounded-full bg-gray-100 px-6 py-3 font-medium text-gray-700 transition-all hover:bg-gray-200"
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
