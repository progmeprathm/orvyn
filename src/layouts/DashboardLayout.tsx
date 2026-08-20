import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Home, Compass, PlusSquare, Bell, User, LogOut } from 'lucide-react';
import { useSessionStore } from '../store/useSessionStore';
import { AuthUseCases } from '../application/authUseCases';
import { Avatar } from '../components/ui/Avatar';
import { OfflineBanner } from '../components/system/OfflineBanner';

export default function DashboardLayout() {
  const { profile, clearSession } = useSessionStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await AuthUseCases.logout();
    clearSession();
    navigate('/login');
  };

  const navItems = [
    { name: 'Home', path: '/dashboard', icon: Home, exact: true },
    { name: 'Explore', path: '/dashboard/explore', icon: Compass },
    { name: 'Create', path: '/dashboard/create', icon: PlusSquare },
    { name: 'Activity', path: '/dashboard/activity', icon: Bell },
    { name: 'Profile', path: `/dashboard/profile/${profile?.username || 'me'}`, icon: User },
  ];

  return (
    <>
      <OfflineBanner />
      <div className="min-h-screen flex max-w-[1400px] mx-auto relative pb-16 md:pb-0">
        
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-72 fixed h-screen flex-col border-r border-border bg-background p-6 z-40">
          <div className="mb-10 pl-4 pt-4">
            <h1 className="font-display text-3xl font-bold bg-gradient-to-r from-primary to-primaryHover bg-clip-text text-transparent">Orvyn</h1>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center gap-5 px-5 py-4 rounded-2xl transition-all ${
                    isActive 
                      ? 'bg-surfaceElevated text-primary font-bold shadow-sm border border-white/5' 
                      : 'text-textSecondary hover:bg-surface/50 hover:text-textPrimary font-medium'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={`w-6 h-6 ${isActive ? 'text-primary' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
                    <span className="text-lg tracking-wide">{item.name}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto border-t border-border pt-6">
            <div className="flex items-center gap-4 mb-6 px-4">
              <Avatar url={profile?.avatarUrl} size={44} />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate">{profile?.displayName}</p>
                <p className="text-textSecondary text-sm truncate">@{profile?.username}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-5 px-5 py-4 text-error hover:bg-error/10 w-full rounded-2xl transition-colors font-medium"
            >
              <LogOut className="w-6 h-6" />
              <span className="text-lg">Log out</span>
            </button>
          </div>
        </aside>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surfaceElevated/95 backdrop-blur-md border-t border-border z-50 flex justify-around items-center px-2 pb-safe">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.exact}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-16 h-full transition-colors ${
                  isActive ? 'text-primary' : 'text-textSecondary hover:text-textPrimary'
                }`
              }
            >
              {({ isActive }) => (
                <div className="flex flex-col items-center gap-1">
                  <item.icon className={`w-6 h-6 ${isActive ? 'text-primary' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-[10px] font-medium">{item.name}</span>
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 md:ml-72 min-h-screen border-r border-border max-w-3xl w-full">
          <Outlet />
        </main>
        
        {/* Right Sidebar (Optional for future content like Trending) */}
        <aside className="w-[350px] hidden lg:block p-8 h-screen sticky top-0">
          <div className="glass-card p-6">
            <h3 className="font-bold text-lg mb-4">Trending Spaces</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary font-bold group-hover:bg-primary group-hover:text-white transition-colors">
                  #
                </div>
                <div>
                  <p className="font-bold">Indie Devs</p>
                  <p className="text-sm text-textSecondary">1.2k members</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
