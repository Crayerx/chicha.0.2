import { useState, useCallback, useEffect, Suspense, lazy, type ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Courses from '@/components/Courses';
import Footer from '@/components/Footer';
import StreakReminder from '@/components/StreakReminder';
import { useAuth } from '@/contexts/AuthContext';

// Vistas pesadas: se cargan bajo demanda (code-splitting) para no inflar
// el bundle inicial. Cada una arrastra sus propios datos/componentes
// (lecciones, juegos, formularios de auth), que no hacen falta en el home.
const Profile = lazy(() => import('@/components/Profile'));
const AuthModal = lazy(() => import('@/components/AuthModal'));
const LessonView = lazy(() => import('@/components/lesson/LessonView'));
const PhaView = lazy(() => import('@/components/PhaView'));

function ViewFallback() {
  return (
    <div className="min-h-screen bg-ink-900 flex items-center justify-center text-slate2-300">
      Cargando…
    </div>
  );
}

type View = 'home' | 'lesson' | 'profile' | 'pha';

export default function App() {
  const { isAuthenticated, user, signOut } = useAuth();

  const [view, setView] = useState<View>('home');
  const [lessonId, setLessonId] = useState<string>('argentina');
  const [reviewMode, setReviewMode] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  // Solo 'profile' necesita retomar una vista pendiente después del login:
  // jugar una lección (goLesson) ya no requiere cuenta, así que no encola nada.
  const [pendingProfile, setPendingProfile] = useState(false);

  const goHome = useCallback(() => setView('home'), []);
  const goPha = useCallback(() => setView('pha'), []);
  const openAuthModal = useCallback(() => setAuthModalOpen(true), []);

  const closeAuthModal = useCallback(() => {
    setAuthModalOpen(false);
    setPendingProfile(false);
  }, []);

  // Jugar una lección es libre: con o sin cuenta se entra directo. Sin cuenta
  // el progreso queda en memoria nomás (useLessonProgress ya lo maneja), y es
  // LessonView el que le avisa a la persona que no se está guardando nada.
  const goLesson = useCallback((id: string, opts?: { review?: boolean }) => {
    setLessonId(id);
    setReviewMode(!!opts?.review);
    setView('lesson');
  }, []);

  const goReview = useCallback((id: string) => goLesson(id, { review: true }), [goLesson]);

  // El perfil sí requiere cuenta (no hay nada que mostrar sin una), así que
  // acá seguimos abriendo el modal y retomando la navegación al loguearse.
  const goProfile = useCallback(() => {
    if (!isAuthenticated) {
      setPendingProfile(true);
      setAuthModalOpen(true);
      return;
    }
    setView('profile');
  }, [isAuthenticated]);

  // Una vez que el login resuelve (magic link, Google o email+contraseña),
  // cerramos el modal siempre. Si había una entrada al perfil pendiente, la
  // retomamos; si el login se abrió suelto (navbar o desde una lección),
  // simplemente se cierra y la persona sigue donde estaba.
  useEffect(() => {
    if (!isAuthenticated) return;
    if (pendingProfile) {
      setView('profile');
      setPendingProfile(false);
    }
    setAuthModalOpen(false);
  }, [isAuthenticated, pendingProfile]);

  // Si cierra sesión estando en el perfil (la única vista que requiere
  // cuenta), volvemos al home. 'lesson' y 'pha' se pueden navegar sin login.
  useEffect(() => {
    if (!isAuthenticated && view === 'profile') {
      setView('home');
    }
  }, [isAuthenticated, view]);

  const handleSignOut = useCallback(async () => {
    await signOut();
  }, [signOut]);

  let content: ReactNode;

  if (view === 'lesson') {
    content = (
      <div className="min-h-screen bg-ink-900 text-slate2-300">
        <LessonView
          lessonId={lessonId}
          onExit={goHome}
          reviewMode={reviewMode}
          onRequestLogin={openAuthModal}
        />
      </div>
    );
  } else if (view === 'profile') {
    content = <Profile onBack={goHome} onReview={goReview} />;
  } else if (view === 'pha') {
    content = <PhaView onPlay={goLesson} onReview={goReview} onBack={goHome} />;
  } else {
    content = (
      <div className="min-h-screen bg-ink-900 text-slate2-300">
        <Navbar
          isAuthenticated={isAuthenticated}
          userEmail={user?.email ?? null}
          onProfile={goProfile}
          onSignIn={openAuthModal}
          onSignOut={handleSignOut}
        />
        {isAuthenticated && <StreakReminder onPlay={() => goLesson('argentina')} />}
        <main>
          <Hero onStart={() => goLesson('argentina')} />
          <Courses onPlay={goLesson} onReview={goReview} onOpenGroup={goPha} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <Suspense fallback={<ViewFallback />}>
      {content}
      {authModalOpen && <AuthModal onClose={closeAuthModal} />}
    </Suspense>
  );
}
