import { Clock, Moon, Sun, TrendingUp, Wallet } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { useTheme } from '@/hooks/useTheme'
import { Button } from '../Button'
import { Divider } from '../Divider'

export function Header() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="border-b border-(--border) px-6 py-3">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
            <Wallet size={20} className="text-primary-foreground" />
          </div>
          <span className="text-lg">
            <span className="font-medium text-muted-foreground">planeja</span>
            <span className="font-extrabold">.ai</span>
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="secondary"
            icon={TrendingUp}
            onClick={() => void navigate('/')}
          >
            <span className="hidden sm:inline">Nova Simulação</span>
          </Button>
          <Button
            variant="ghost"
            icon={Clock}
            onClick={() => void navigate('/historico')}
          >
            <span className="hidden sm:inline">Histórico</span>
          </Button>
          <Divider orientation="vertical" />
          <Button
            aria-label={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
            variant="ghost"
            icon={theme === 'light' ? Moon : Sun}
            onClick={toggleTheme}
          />
        </div>
      </nav>
    </header>
  )
}