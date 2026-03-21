import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'BeerBank',
        short_name: 'BeerBank',
        description: 'Exchange exercises for beer credits',
        theme_color: '#f59e0b',
        background_color: '#ffffff',
        display: 'standalone',
        icons: []
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})