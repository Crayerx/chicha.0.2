import { useState, useCallback, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Courses from '@/components/Courses';
import Footer from '@/components/Footer';
import Profile from '@/components/Profile';
import AuthModal from '@/components/AuthModal';
import StreakReminder from '@/components/StreakReminder';
import LessonView from '@/components/lesson/LessonView';
import { useAuth } from '@/contexts/AuthContext';

type View = 'home' | 'lesson' | 'profile';

export default function App() {
  const { isAuthenticated, user, signOut } = useAuth();

  const [view, setView] = useState<View>('home');
  const [lessonId, setLessonId] = useState<string>('argentina');
  const [reviewMode, setReviewMode] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [pendingView, setPendingView] = useState<Exclude<View, 'home'> | null>(null);
  const [pendingLessonId, setPendingLessonId] = useState<string | null>(null);

  const goHome = useCallback(() => setView('home'), []);

  const closeAuthModal = useCallback(() => {
    setAuthModalOpen(false);
    setPendingView(null);
    setPendingLessonId(null);
  }, []);

  const goLesson = useCallback(
    (id: string, opts?: { review?: boolean }) => {
      if (!isAuthenticated) {
        setPendingView('lesson');
        setPendingLessonId(id);
        setAuthModalOpen(true);
        return;
      }
      setLessonId(id);
      setReviewMode(!!opts?.review);
      setView('lesson');
    },
    [isAuthenticated],
  );

  const goReview = useCallback((id: string) => goLesson(id, { review: true }), [goLesson]);

  const goProfile = useCallback(() => {
    if (!isAuthenticated) {
      setPendingView('profile');
      setPendingLessonId(null);
      setAuthModalOpen(true);
      return;
    }
    setView('profile');
  }, [isAuthenticated]);

  // Una vez que el login resuelve (magic link, Google o email+contraseña),
  // cerramos el modal siempre. Si había una acción pendiente (empezar una
  // lección o entrar al perfil), la retomamos; si el login se abrió suelto
  // desde el navbar, simplemente se cierra y el usuario sigue en el home.
  useEffect(() => {
    if (!isAuthenticated) return;
    if (pendingView) {
      if (pendingView === 'lesson' && pendingLessonId) setLessonId(pendingLessonId);
      setView(pendingView);
    }
    setPendingView(null);
    setPendingLessonId(null);
    setAuthModalOpen(false);
  }, [isAuthenticated, pendingView, pendingLessonId]);

  // Si cierra sesión estando en una vista que requiere cuenta, volvemos al home.
  useEffect(() => {
    if (!isAuthenticated && view !== 'home') {
      setView('home');
    }
  }, [isAuthenticated, view]);

  const handleSignOut = useCallback(async () => {
    await signOut();
  }, [signOut]);

  if (view === 'lesson') {
    return (
      <div className="min-h-screen bg-ink-900 text-slate2-300">
        <LessonView lessonId={lessonId} onExit={goHome} reviewMode={reviewMode} />
      </div>
    );
  }

  if (view === 'profile') {
    return <Profile onBack={goHome} onReview={goReview} />;
  }

  return (
    <div className="min-h-screen bg-ink-900 text-slate2-300">
      <Navbar
        isAuthenticated={isAuthenticated}
        userEmail={user?.email ?? null}
        onProfile={goProfile}
        onSignIn={() => setAuthModalOpen(true)}
        onSignOut={handleSignOut}
      />
      {isAuthenticated && <StreakReminder onPlay={() => goLesson('argentina')} />}
      <main>
        <Hero onStart={() => goLesson('argentina')} />
        <Courses onPlay={goLesson} onReview={goReview} />
      </main>
      <Footer />
      {authModalOpen && <AuthModal onClose={closeAuthModal} />}
    </div>
  );
}
