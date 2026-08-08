import { useState, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Courses from '@/components/Courses';
import Footer from '@/components/Footer';
import Profile from '@/components/Profile';
import LessonView from '@/components/lesson/LessonView';

type View = 'home' | 'lesson' | 'profile';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [lessonId, setLessonId] = useState<string>('argentina');

  const goHome = useCallback(() => setView('home'), []);
  const goLesson = useCallback((id: string) => {
    setLessonId(id);
    setView('lesson');
  }, []);
  const goProfile = useCallback(() => setView('profile'), []);

  if (view === 'lesson') {
    return (
      <div className="min-h-screen bg-ink-900 text-slate2-300">
        <LessonView lessonId={lessonId} onExit={goHome} />
      </div>
    );
  }

  if (view === 'profile') {
    return <Profile onBack={goHome} />;
  }

  return (
    <div className="min-h-screen bg-ink-900 text-slate2-300">
      <Navbar onProfile={goProfile} />
      <main>
        <Hero />
        <Courses onPlay={goLesson} />
      </main>
      <Footer />
    </div>
  );
}
