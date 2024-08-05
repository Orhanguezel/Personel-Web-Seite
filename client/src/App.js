import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import TestimonialsPage from './pages/TestimonialsPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import LoginPage from './pages/LoginPage';
import AdminBlogPage from './pages/AdminBlogPage';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/testimonials" element={<TestimonialsPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blogs/:id" element={<BlogDetailPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin" element={<AdminBlogPage />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
