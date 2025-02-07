import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/HomePage';
import { HistoryPage } from './pages/HistoryPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { useEffect } from 'react';
import axios from 'axios';

export const App = () => {
  useEffect(() => {
    // Test backend connection
    const testConnection = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/`);
        console.log('Backend connection successful:', response.data);
      } catch (error) {
        co