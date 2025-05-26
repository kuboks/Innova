import { Search, Menu, Home, Heart, LogIn, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useNavigate } from "react-router"
import axios from "axios"

interface HeaderComponentProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}
export function HeaderComponent({searchQuery, setSearchQuery }: HeaderComponentProps) {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/auth', {replace: true});
  }

  const handleLogout = async() => {
    try {
        const response = await axios.post("http://localhost:8880/api/logout",{}, { withCredentials: true });
        console.log(response.data)
        if(response.data.success){
          localStorage.clear();
          sessionStorage.clear();
          window.location.href = '/';
        }
        console.log("No hice nada")
      } catch (error) {
        console.error("No hay sesión activa Header", error);
      }
  }
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        {/* Left section - Menu and Logo */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">IB</span>
            </div>
            <span className="font-bold text-lg hidden sm:block">Innovatube</span>
          </div>
        </div>

        {/* Center section - Search */}
        <div className="flex-1 max-w-2xl mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </div>

        {/* Right section - Navigation and User */}
        <div className="flex items-center gap-2">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              Favorites
            </Button>
          </div>

          {/* User Section */}
          {localStorage.getItem('usuario') ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>{localStorage.getItem('usuario')?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:block">{localStorage.getItem('usuario')}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="md:hidden">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </DropdownMenuItem>
                <DropdownMenuItem className="md:hidden">
                  <Heart className="h-4 w-4 mr-2" />
                  Favorites
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={handleLogin} size="sm">
              <LogIn className="h-4 w-4 mr-2" />
              <span className="hidden sm:block">Sign In</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
