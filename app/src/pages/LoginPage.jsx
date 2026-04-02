import supabase from '../lib/supabase';

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) {
        console.error('Login error:', error);
        alert('Login failed: ' + error.message);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('Unexpected error during login');
    }
  };

  return (
    <div className="h-screen w-full max-w-[412px] mx-auto flex flex-col justify-center items-center bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-amber-950 mb-4">BeerBank</h1>
        <p className="text-xl text-amber-900 mb-8">Earn your beer 🍺</p>
        <button
          onClick={handleGoogleLogin}
          className="bg-white text-amber-900 hover:bg-amber-100 text-lg px-8 py-3 rounded-lg shadow-md transition-all active:scale-95"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}