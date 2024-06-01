import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 4000,
  },
  resolve:{
    alias:{
      src: '/src',
      public: '/public'
    }
  },
  esbuild: {
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment'
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@emotion/react',
      '@emotion/styled',
      '@reduxjs/toolkit',
      'axios',
      'formik',
      'date-fns',
      'yup',
      '@mui/material',
      '@mui/x-data-grid',
      '@mui/x-date-pickers',
      'antd',
      'react-date-range',
      'react-redux',
      'sweetalert',
      'swiper'
    ]
  }
})
