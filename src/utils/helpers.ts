import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import * as LucideIcons from 'lucide-react'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getIconComponent(iconName: string) {
  const icons = LucideIcons as unknown as Record<string, typeof LucideIcons.HelpCircle>
  return icons[iconName] || LucideIcons.HelpCircle
}
